import React from "react";
import { NextResponse } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.yoursite.com", "https://yoursite.com"]
    : [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://www.google.com",
        "https://www.mozilla.org",
      ];



export function middleware(request: Request) {
  console.log("middleware-request-headers:", request.headers);

  const origin = request.headers.get("origin");

  console.log("middleware-origin", origin);

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: { "Content-Type": "text/plain" },
    });
  }

  const regex = new RegExp("/api/*");
  if (regex.test(request.url)) {
    console.log("REGEX");
    console.log(request.method);
    console.log(request.url);
  }

  if (request.url.includes("/api/")) {
    console.log("Includes");
    console.log(request.method);
    console.log(request.url);
  }

  console.log("Middleware");
  console.log(request.method);
  console.log(request.url);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
