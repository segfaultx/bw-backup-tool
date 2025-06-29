import { Effect } from "effect";
import dbRuntime from "~/server/db";
import { VaultService } from "~/server/vault/vault-service";

export async function register() {
    await dbRuntime.runPromise(Effect.gen(function* () {
        yield* Effect.log("Registering VaultService instrumentation...");
        const vaultService = yield* VaultService;
        const result = yield* vaultService.getVaultConfigByUserId("95N2uG7aNLfOt2m5JJ6t1jHsZ2sIth85")
            .pipe(Effect.catchAll(error =>
                Effect.logInfo("doof gelaufen").pipe(Effect.flatMap(() => Effect.succeed({ asd: 123 }))))
            );
        yield* Effect.log(`Vault Config: ${JSON.stringify(result)}`);
    }).pipe(Effect.provide(VaultService.Default)))
}