import * as dotenv from "dotenv";
import { type Config } from "drizzle-kit";

dotenv.config({ path: "../.env" });

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:./db.sqlite",
  },
  tablesFilter: ["bw-backup-tool_*"],
} satisfies Config;