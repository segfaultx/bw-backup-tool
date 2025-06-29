import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { eq } from "drizzle-orm";
import { Effect } from "effect";
import { vaultConfig } from "../db/schema";

export class VaultService extends Effect.Service<VaultService>()('VaultService', {
    accessors: true,
    effect: Effect.gen(function* () {
        const db = yield* SqliteDrizzle.SqliteDrizzle;

        const getVaultConfigByUserId = (userId: string) => {
            return Effect.promise(async () => {
                const config = await db.select().from(vaultConfig).where(eq(vaultConfig.userId, userId));

                return config;
            }).pipe(Effect.catchAll((error) => { Effect.logError(`Failed to fetch vault config: ${error}`); return Effect.fail("doof"); }));
        }

        return {
            getVaultConfigByUserId
        } as const;
    })
}) { }