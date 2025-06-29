import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./test_db.sqlite',
  },
  tablesFilter: ["bw-backup-tool_*"],
} satisfies Config;