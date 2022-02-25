import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  titles: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { q } = req.query;
  let response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${q}+intitle:${q}`
  );
  /**@Todo fix type */
  let results = (await response.json()).items;
  res.status(200).json(results);
}
