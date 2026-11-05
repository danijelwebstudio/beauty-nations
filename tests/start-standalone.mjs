import { cpSync } from "node:fs";

// Mirror the Docker image's static/public copies and run the actual standalone server.
cpSync(new URL("../public", import.meta.url), new URL("../.next/standalone/public", import.meta.url), { recursive: true });
cpSync(new URL("../.next/static", import.meta.url), new URL("../.next/standalone/.next/static", import.meta.url), { recursive: true });
process.env.HOSTNAME = "127.0.0.1";
process.env.PORT = "3100";
await import("../.next/standalone/server.js");
