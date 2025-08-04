import { Command } from "@effect/platform";
import { Effect, Redacted } from "effect";
import { EnvVars } from "~/env";
import { makeScopedCommand } from "../utility/command-utility";

const bwLoginCommand = Command.make("bw", "login", "--apikey").pipe(
  Command.runInShell(true),
);

export class BWClient extends Effect.Service<BWClient>()("BWClient", {
  accessors: true,
  dependencies: [EnvVars.Default],
  effect: Effect.gen(function* () {
    const { BW_CLIENTID, BW_CLIENTSECRET } = yield* EnvVars;

    const login = () =>
      makeScopedCommand(
        bwLoginCommand.pipe(
          Command.env({
            BW_CLIENTID: Redacted.value(BW_CLIENTID),
            BW_CLIENTSECRET: Redacted.value(BW_CLIENTSECRET),
          }),
        ),
      );

    return {
      login,
    } as const;
  }),
}) {}
