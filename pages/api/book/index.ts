// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import type { Book } from "@prisma/client";

type PostBody = {
  title: string;
  ISBN: string;
  author: string[];
  publisher: string;
  published: string;
  description: string;
  thumbnail: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book | Book[] | { message: string }>
) {
  if (req.method === "POST") {
    const { title, ISBN, author, description, publisher, published, thumbnail } = req.body as PostBody;
    const book = await prisma.book.create({
      include: {
        author: true,
      },
      data: {
        title,
        ISBN: +ISBN,
        description,
        publisher,
        thumbnail,
        published: new Date(published),
        firstAuthor: author[0],
        author: {
          connectOrCreate: author.map((a) => {
            let { firstName, lastName, otherNames } = parseName(a);
            return {
              where: {
                fullName: {
                  firstName,
                  lastName,
                  otherNames,
                },
              },
              create: {
                firstName,
                lastName,
                otherNames,
              },
            };
          }),
        },
      },
    });
    return res.status(200).json(book);
  }
  if (req.method === "GET") {
    const books = await prisma.book.findMany({ include: { author: true } });
    return res.status(200).json(books);
  }
  return res.status(404).json({ message: "Method not allowed" });
}

function parseName(name: string) {
  let splitName = name.trim().split(" ");
  let firstName = splitName[0];
  let lastName = splitName[splitName.length - 1];
  let otherNames = splitName.slice(1, splitName.length - 1).join(" ");
  return { firstName, lastName, otherNames };
}
