import { type Config } from "drizzle-kit";
import { Effect, Redacted } from "effect";
import { EnvVars } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: Effect.runSync(Effect.gen(function* () {
      const { DATABASE_URL } = yield* EnvVars;

      return Redacted.value(DATABASE_URL);
    }).pipe(Effect.provide(EnvVars.Default))
  ),
  },
  tablesFilter: ["bw-backup-tool_*"],
} satisfies Config;