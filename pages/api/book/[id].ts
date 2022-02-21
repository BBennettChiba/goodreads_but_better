// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { Book } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book | Book[] | { message: String }>
) {
  const { id } = req.query;
  if (!id) return res.status(404).json({ message: "No id provided" });
  if (typeof id !== "string")
    return res.status(404).json({ message: "No id provided" });
  if (req.method === "GET") {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(book);
  }
  if (req.method === "DELETE") {
    await prisma.book.delete({ where: { id } });
    return res.status(200).json({ message: "Book deleted" });
  }
  return res.status(404);
}
