import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Effect } from "effect";
import "server-only";
import dbRuntime, { Database } from "~/server/db";
import { account, session, user, verification } from "~/server/db/schema";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(
        dbRuntime.runSync(Effect.gen(function* () {
            const { db } = yield* Database

            return db;
        })),
        {
            provider: "sqlite",
            schema: { user, verification, account, session }
        })
})