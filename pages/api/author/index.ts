// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { Author } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Author | Author[] | { message: String }>
) {
  if (req.method === "POST") {
    const { firstName, lastName } = req.body;
    const author = await prisma.author.create({
      data: {
        firstName,
        lastName,
      },
    });
    return res.status(200).json(author);
  }
  if (req.method === "GET") {
    const books = await prisma.book.findMany();
    return res.status(200).json(books);
  }
  return res.status(404).json({ message: "Method not allowed" });
}
