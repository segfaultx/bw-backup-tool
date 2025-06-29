import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Effect } from "effect";
import "server-only";
import { Database, DatabaseLive } from "~/server/db";
import { account, session, user, verification } from "~/server/db/schema";

export const auth = await Effect.runPromise(Effect.gen(function* () {
    return betterAuth({
        emailAndPassword: {
            enabled: true
        },
        database: drizzleAdapter(
            yield* Database,
            {
                provider: "sqlite",
                schema: { user, verification, account, session }
            })
    })
}).pipe(Effect.provide(DatabaseLive))
);