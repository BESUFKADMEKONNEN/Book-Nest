import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { urlEndpoint, publicKey, privateKey },
  },
} = config;
// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: privateKey, // Never expose this on client side
    publicKey: publicKey,
    // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
    // token: "random-token", // Optional, a unique token for request
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}

// const imagekit = new ImageKit({
//   privateKey: privateKey,
//   publicKey: publicKey,
//   urlEndpoint,
// });

// export async function GET() {
//   return NextResponse.json(imagekit.getAuthenticationParameters);
// }
