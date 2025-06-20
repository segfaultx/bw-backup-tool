import { drizzle } from "drizzle-orm/libsql";
import { Effect, Layer, ManagedRuntime, Redacted } from "effect";
import "server-only";
import { EnvVars } from "~/env";

let dbInstance: ReturnType<typeof drizzle> | null = null;

const db = Effect.gen(function* () {
  if (dbInstance) return {
    db: dbInstance
  } as const;

  yield* Effect.log('Setting up database connection...');
  const { DATABASE_URL } = yield* EnvVars;
  dbInstance = drizzle(Redacted.value(DATABASE_URL));
  yield* Effect.log('Database connection established');

  return {
    db: dbInstance
  } as const;
});

export class Database extends Effect.Tag('Database')<Database, Effect.Effect.Success<typeof db>>() { }

const dbLive = Layer.scoped(Database, db)
  .pipe(Layer.provide(EnvVars.Default));

const dbRuntime = ManagedRuntime.make(dbLive);

export default dbRuntime;
