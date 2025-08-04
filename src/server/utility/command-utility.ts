import { Command } from "@effect/platform";
import { Effect, Stream, String, pipe } from "effect";

const runString = <E, R>(
  stream: Stream.Stream<Uint8Array, E, R>,
): Effect.Effect<string, E, R> =>
  stream.pipe(Stream.decodeText(), Stream.runFold(String.empty, String.concat));

export const makeScopedCommand = (command: Command.Command) =>
  Effect.scoped(
    pipe(
      Command.start(command),
      Effect.flatMap((process) =>
        Effect.all(
          [
            process.exitCode,
            runString(process.stdout),
            runString(process.stderr),
          ],
          { concurrency: 3 },
        ),
      ),
    ),
  );
