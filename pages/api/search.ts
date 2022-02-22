import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  titles: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { query } = req.query;
  let response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}+intitle:${query}`
  );
  let results = (await response.json()).items;
  console.log(results);
  res.status(200).json(results);
}
