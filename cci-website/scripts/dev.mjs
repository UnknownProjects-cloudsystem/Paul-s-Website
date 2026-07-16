import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const inputArgs = process.argv.slice(2);
const nextArgs = [];

for (let index = 0; index < inputArgs.length; index += 1) {
  const arg = inputArgs[index];

  if (arg === "--host") {
    nextArgs.push("--hostname");
    if (inputArgs[index + 1]) {
      nextArgs.push(inputArgs[index + 1]);
      index += 1;
    }
    continue;
  }

  if (arg === "--strictPort") {
    continue;
  }

  nextArgs.push(arg);
}

const nextBin = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

const child = spawn(process.execPath, [nextBin, "dev", ...nextArgs], {
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
