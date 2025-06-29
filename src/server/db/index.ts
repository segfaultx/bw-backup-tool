import * as Reactivity from "@effect/experimental/Reactivity";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { SqliteClient } from "@effect/sql-sqlite-node";
import * as Client from "@effect/sql/SqlClient";
import { Context, Effect, Layer, ManagedRuntime, Redacted } from "effect";
import "server-only";
import { EnvVars } from "~/env";
import * as schema from "./schema";

const makeSqlLiteClient = () => Effect.gen(function* () {
  const { DATABASE_URL } = yield* EnvVars;

  return yield* SqliteClient.make({
    filename: Redacted.value(DATABASE_URL),
  });
}).pipe(Effect.provide(EnvVars.Default));

const SqlLive = Layer.scopedContext(
  Effect.map(makeSqlLiteClient(), (client) =>
    Context.make(SqliteClient.SqliteClient, client).pipe(
      Context.add(Client.SqlClient, client)
    ))
).pipe(Layer.provide(Reactivity.layer))

const DrizzleLive = SqliteDrizzle.layer
  .pipe(Layer.provide(SqlLive));

const DatabaseLive = Layer.mergeAll(DrizzleLive, SqlLive)

const dbRuntime = ManagedRuntime.make(DatabaseLive);

export default dbRuntime;
