"use server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/rateLimit";
// import { workflowClient } from "@/lib/workflow";
import config from "@/lib/config";
import { success } from "zod";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  Param: Pick<AuthCredentials, "email" | "password">
): Promise<{ success: boolean; message?: string; redirectTo?: string }> => {
  try {
    const { email, password } = Param;

    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    // if (!success) return redirect("/too-fast");

    if (!success) {
      return {
        success: false,
        redirectTo: "/too-fast",
        message: "Rate limit exceeded.",
      };
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message: "Sign in failed.",
      };
    }

    return { success: true, message: "Signin sucessfully." };
  } catch (error) {
    console.log("signin error", error);
    return {
      success: false,
      message: "Sign in failed.",
    };
  }
};

export const signUp = async (Param: AuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } = Param;

  const existUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existUser.length > 0) {
    return {
      success: false,
      message: "User with the same email already exists",
    };
  }
  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });
    await signInWithCredentials({ email, password });

    return { success: true, message: "Signup sucessfully" };
  } catch (error) {
    console.log("signup error", error);
    return {
      success: false,
      message: "Sign Up failed.",
    };
  }
};
