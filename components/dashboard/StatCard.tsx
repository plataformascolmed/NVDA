import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color?: 'green' | 'red' | 'cyan' | 'gold' | 'white';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  trendType = 'positive',
  color = 'green'
}) => {
  const colors = {
    green: 'text-nvda-green bg-nvda-green/10 border-nvda-green/20',
    red: 'text-nvda-red bg-nvda-red/10 border-nvda-red/20',
    cyan: 'text-nvda-cyan bg-nvda-cyan/10 border-nvda-cyan/20',
    gold: 'text-nvda-gold bg-nvda-gold/10 border-nvda-gold/20',
    white: 'text-white bg-nvda-white/10 border-nvda-white/20',
  };

  return (
    <div className="group p-6 bg-nvda-card/50 backdrop-blur-xl border border-nvda-border rounded-3xl hover:border-nvda-green/30 transition-all duration-500 hover:translate-y-[-4px] relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-nvda-green/[0.02] blur-3xl pointer-events-none group-hover:bg-nvda-green/[0.05] transition-colors" />
      
      <div className="flex items-center justify-between mb-6">
        <div className={cn("p-3 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 duration-500", colors[color])}>
          <Icon size={24} className="group-hover:animate-pulse" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-sm transition-all duration-300",
            trendType === 'positive' && "bg-nvda-green/10 text-nvda-green border-nvda-green/20",
            trendType === 'negative' && "bg-nvda-red/10 text-nvda-red border-nvda-red/20",
            trendType === 'neutral' && "bg-nvda-white/10 text-nvda-white border-nvda-white/20",
          )}>
            {trend}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-nvda-muted text-xs font-black uppercase tracking-widest">{label}</span>
        <span className="text-3xl font-space font-extrabold text-white tracking-tighter tabular-nums truncate">
          {value}
        </span>
      </div>

      {/* Modern bottom indicator bar */}
      <div className="mt-6 h-1 w-full bg-nvda-border rounded-full overflow-hidden">
        <div className={cn(
          "h-full rounded-full transition-all duration-1000 origin-left ease-out",
          color === 'green' && "bg-nvda-green w-2/3 group-hover:w-full shadow-[0_0_10px_#76b90040]",
          color === 'cyan' && "bg-nvda-cyan w-1/2 group-hover:w-3/4 shadow-[0_0_10px_#00d4ff40]",
          color === 'gold' && "bg-nvda-gold w-1/3 group-hover:w-1/2 shadow-[0_0_10px_#f59e0b40]",
          color === 'red' && "bg-nvda-red w-full",
          color === 'white' && "bg-nvda-white w-full",
        )} />
      </div>
    </div>
  );
};
