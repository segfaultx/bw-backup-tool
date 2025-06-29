import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import { Effect, Layer, Redacted } from "effect";
import "server-only";
import { EnvVars } from "~/env";
import * as schema from "./schema";

class SqliteClient extends Effect.Tag("SqliteClient")<SqliteClient, Client>() { }

const SqliteLive = Layer.scoped(SqliteClient, Effect.gen(function* () {
  const { DATABASE_URL } = yield* EnvVars;
  yield* Effect.log("Creating SQLite client...");

  return createClient({
    url: Redacted.value(DATABASE_URL),
  });
}).pipe(Effect.provide(EnvVars.Default)));

const makeDb = Effect.gen(function* () {
  const sqliteClient = yield* SqliteClient;

  yield* Effect.log('Setting up database connection...');
  const db = drizzle(sqliteClient, { schema });
  yield* Effect.log('Database connection established');

  return db;
});

export class Database extends Effect.Tag('Database')<Database, LibSQLDatabase<typeof schema>>() { }

export const DatabaseLive = Layer.scoped(Database, makeDb)
  .pipe(Layer.provide(SqliteLive));
