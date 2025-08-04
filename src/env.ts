import { PlatformConfigProvider } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { Config, Effect, Layer } from "effect";

const EnvProviderLayer = Layer.unwrapEffect(
  PlatformConfigProvider.fromDotEnv(".env").pipe(
    Effect.map(Layer.setConfigProvider),
    Effect.provide(NodeContext.layer)
  )
)

export class EnvVars extends Effect.Service<EnvVars>()('EnvVars', {
  accessors: true,
  effect: Effect.gen(function* () {
    yield* Effect.log('Loading environment variables...');

    return {
      DATABASE_URL: yield* Config.redacted('DATABASE_URL'),
      BW_CLIENTID: yield* Config.redacted('BW_CLIENTID'),
      BW_CLIENTSECRET: yield* Config.redacted('BW_CLIENTSECRET'),
    } as const;
  }).pipe(Effect.provide(EnvProviderLayer))
}) { }