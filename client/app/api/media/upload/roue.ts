import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "edge";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export async function POST(request: Request): Promise<NextResponse> {
  const file = await request.json();
  const contentType = request.headers.get("content-type") || "text/plain";
  const filename = `${nanoid()}.${contentType.split("/")[1]}`;
  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });
  return NextResponse.json(blob);
}
