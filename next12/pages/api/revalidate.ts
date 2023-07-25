// https://<your-site.com>/api/revalidate?secret=<token>

// http://localhost:3000/api/revalidate?path=/&secret=DaveGrayTeachesCode

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.query.secret !== process.env.MY_SECRET_TOKEN) {
    return response.status(401).json({ message: "invalid token" });
  }

  const path = request.query.path as string;

  await response.revalidate(path);

  return response.json({ revalidated: true });
}
