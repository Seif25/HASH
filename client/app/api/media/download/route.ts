import { NextRequest, NextResponse } from "next/server";

// /api/media/download?filename=foo.png
export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get("filename");
  const mediaType = request.nextUrl.searchParams.get("type");
  const res = await fetch(filename!);
  const blob = await res.blob();
  const headers = new Headers();
  mediaType === "image"
    ? headers.set("Content-Type", "image/*")
    : headers.set("Content-Type", "video/*");
  // headers.set("Content-Type", "image/*");
  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
