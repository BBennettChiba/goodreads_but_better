// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { Book } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book | Book[] | { message: String }>
) {
  if (req.method === "POST") {
    const {
      name,
      ISBN,
      author: { firstName, lastName },
    } = req.body;
    const book = await prisma.book.create({
      data: {
        name,
        ISBN,
        author: {
          connectOrCreate: {
            where: { fullName: { firstName, lastName } },
            create: { firstName, lastName },
          },
        },
      },
    });
    return res.status(200).json(book);
  }
  if (req.method === "GET") {
    const books = await prisma.book.findMany();
    return res.status(200).json(books);
  }
  return res.status(404);
}
