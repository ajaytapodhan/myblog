//http://localhost:3000/api/revalidate?path=/&secret=SECRET_TOKEN

//Here we set path as / because we have to revalidate home page if there is any other path
//that you need to revalidate then set that path.
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const path = req.query.path as string;

  await res.revalidate(path);

  return res.json({ revalidate: true });
}
