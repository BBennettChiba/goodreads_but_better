import React from "react";
import type { Book } from "@prisma/client";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

type Props = {
  book: Book;
};

export default function id({ book }: Props) {
  return <div>{JSON.stringify(book)}</div>;
}

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/book");
  const books: Book[] = await res.json();
  console.log(books);
  // Get the paths we want to pre-render based on posts
  const paths = books.map(({ id }) => ({
    params: { id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/book/${id}`);
  let book = await res.json();
  return { props: { book } };
};
