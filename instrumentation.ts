import { Effect } from "effect";
import dbRuntime, { Database } from "~/server/db";
import { posts } from "~/server/db/schema";

export async function register() {
    await dbRuntime.runPromise(Effect.gen(function* () {
        const { db } = yield* Database

        const data = yield* Effect.promise(async () => {
            return await db.select().from(posts).all();
        });

        yield* Effect.log(`Fetched ${data.length} posts from the database.`);
    }));
}