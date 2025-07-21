// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/postgres-js";

export const db = drizzle(process.env.DATABASE_URL!);

// const result = await db.execute("select 1");

// const result = await db.execute("select 1");

// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";

// const client = new Client({ connectionString: process.env.DATABASE_URL });
// await client.connect();
// export const db = drizzle(client);

// // import { drizzle } from "drizzle-orm/neon-http";
// // import { neon } from "@neondatabase/serverless";

// // const sql = neon(process.env.DATABASE_URL!);
// // export const db = drizzle(sql);

// // import { drizzle } from 'drizzle-orm/node-postgres';
// // import { Client } from 'pg';

// // const client = new Client({ connectionString: process.env.DATABASE_URL });
// // await client.connect();
// // export const db = drizzle(client);

// // import config from "@/lib/config";
// // import { neon } from "@neondatabase/serverless";
// // import { drizzle } from "drizzle-orm/neon-http";

// // const sql = neon(config.env.databaseUrl);
// // console.log("DATABASE_URL:", process.env.DATABASE_URL);

// // export const db = drizzle({ client: sql });

// // // import { drizzle } from "drizzle-orm/neon-http";

// // // export const db = drizzle(process.env.DATABASE_URL!);
