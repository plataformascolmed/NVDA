import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // USAR supabaseAdmin PARA BYPASSEAR RLS
  const { supabaseAdmin } = await import("@/lib/supabase/admin");

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  console.log("🛠️ Admin Layout Check | Email:", user?.email, "| Profile Role:", profile?.role);
  const isAdmin = profile?.role?.toUpperCase() === "ADMIN" || user?.email === "admin@nvdacapital.co";
  console.log("🔍 Es Admin?", isAdmin);

  if (!isAdmin) {
    console.log("🚫 NO ES ADMIN. Redirigiendo a Dashboard...");
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-transparent text-nvda-white overflow-hidden relative">
       {/* Distinct background for admin to avoid confusion */}
      <div className="fixed top-0 right-0 w-[1000px] h-[1000px] bg-nvda-cyan/[0.04] blur-[180px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[800px] h-[800px] bg-nvda-green/[0.02] blur-[180px] rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      {/* Sidebar */}
      <Sidebar user={user} profile={profile} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 relative z-10 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-10 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
}
