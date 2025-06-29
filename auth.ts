import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Effect } from "effect";
import "server-only";
import dbRuntime from "~/server/db";
import { account, session, user, verification } from "~/server/db/schema";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(
        dbRuntime.runSync(Effect.gen(function* () {
            const db = yield* SqliteDrizzle.SqliteDrizzle;

            return db;
        })),
        {
            provider: "sqlite",
            schema: { user, verification, account, session }
        })
})