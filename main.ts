/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

import mongoose from "npm:mongoose@6.7";

await mongoose.connect("mongodb://localhost:27017/toxithread-config");
console.log(
  `Mongoose ${
    mongoose.connection.readyState === 1 ? "connected" : "not connected"
  }`,
);

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
