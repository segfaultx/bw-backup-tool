import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { BWClient } from "~/server/bw/bw-client";

export async function register() {
  await Effect.runPromise(
    Effect.gen(function* () {
      const service = yield* BWClient;

      const [a, b, c] = yield* Effect.scoped(service.login());

      yield* Effect.logInfo(`Result: ${a} - ${b} - ${c}`);
    }).pipe(
      Effect.provide(BWClient.Default),
      Effect.provide(NodeContext.layer),
    ),
  );
}
