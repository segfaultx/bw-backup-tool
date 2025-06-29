import { Effect } from "effect";
import { VaultService } from "~/server/db/vault-service";

export async function register() {
    await Effect.runPromise(Effect.gen(function* () {
        yield* Effect.log("Registering VaultService instrumentation...");
        const vaultService = yield* VaultService;
        const result = yield* vaultService.getVaultConfigByUserId("pTLkkx3zcA70FmKWCAjjrVWPhhK6yAwg")
            .pipe(Effect.catchAll(error =>
                Effect.logInfo("doof gelaufen").pipe(Effect.flatMap(() => Effect.succeed({ asd: 123 }))))
            );
        yield* Effect.log(`Vault Config: ${JSON.stringify(result)}`);
    }).pipe(Effect.provide(VaultService.Default)))
}