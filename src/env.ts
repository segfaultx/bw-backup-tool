import * as dotenv from "dotenv";
import { Config, Effect } from "effect";

(() => {
  if (process.env.NODE_ENV !== 'production') {
    Effect.runSync(Effect.gen(function* () {
      yield* Effect.log('Loading environment variables from .env file...');
      dotenv.config({ path: '../.env' });
    }));
  }
})()

export class EnvVars extends Effect.Service<EnvVars>()('EnvVars', {
  accessors: true,
  effect: Effect.gen(function* () {
    yield* Effect.log('Loading environment variables...');
    return {
      DATABASE_URL: yield* Config.redacted('DATABASE_URL')
    } as const;
  })
}) { }