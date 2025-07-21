import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export const checkDb = async () => {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  try {
    const result = await db.select().from(users);
    const data = JSON.stringify(result);
    console.log("ok: ", data,"/n");
    return data;
  } catch (error) {
    console.log("not connected db", error);
  }
};
