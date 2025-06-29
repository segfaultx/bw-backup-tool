import { eq } from "drizzle-orm";
import { Effect } from "effect";
import { Database, DatabaseLive } from ".";
import { vaultConfig } from "./schema";

export class VaultService extends Effect.Service<VaultService>()('VaultService', {
    accessors: true,
    dependencies: [DatabaseLive],
    effect: Effect.gen(function* () {
        const db = yield* Database;

        const getVaultConfigByUserId = (userId: string) => {
            return Effect.promise(async () => {
                const config = await db.query.vaultConfig.findFirst({
                    where: eq(vaultConfig.userId, userId)
                })
                return config;
            });
        }

        return {
            getVaultConfigByUserId
        } as const;
    })
}) { }