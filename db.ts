import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts"

const client = new MongoClient();

// Connecting to a Local Database
// await client.connect("mongodb://127.0.0.1:27017");

// Connecting to a Mongo Atlas Database
await client.connect({
  db: "toxithread-config",
  tls: true,
  servers: [
    {
      host: "localhost",
      port: 27017,
    },
  ]
});

export default client