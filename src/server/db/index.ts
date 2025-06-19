import "server-only";

import { drizzle } from "drizzle-orm/libsql";

import { Effect, Layer, ManagedRuntime, Redacted } from "effect";
import { EnvVars } from "~/env";

const db = Effect.gen(function* () {
  yield* Effect.log('Setting up database connection...');
  return {
    db: yield* EnvVars.pipe(
      Effect.map(({ DATABASE_URL }) => drizzle(Redacted.value(DATABASE_URL))),
      Effect.tap(() => Effect.log("Database created")),
    )
  } as const;
});

export class Database extends Effect.Tag('Database')<Database, Effect.Effect.Success<typeof db>>() { }

const dbLive = Layer.scoped(Database, db).pipe(
  Layer.provide(EnvVars.Default),
);

const dbRuntime = ManagedRuntime.make(dbLive);

export default dbRuntime;
