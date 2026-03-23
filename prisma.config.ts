import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Supabase URL
    url: process.env.DATABASE_URL,
  },
});
