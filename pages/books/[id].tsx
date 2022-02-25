import React from "react";
import type { BookWithAuthors } from "../../lib/prisma";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Image from "next/image";
type Props = {
  book: BookWithAuthors;
};

export default function id({ book }: Props) {
  const date = new Date(book.published);
  
  return (
    <div>
      <Image
        src={book.thumbnail}
        alt={`cover of ${book.title}`}
        width="128px"
        height="199px"
      ></Image>
      <h1>{book.title}</h1>
      <h5>{book.publisher} {date.getFullYear()}</h5>
      <h2>Author(s): {book.author.map(a => (<h3 key={a.id}>{a.firstName} {a.otherNames} {a.lastName}</h3>))}</h2>
      <article><h3>Description</h3><p>{book.description}</p></article>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/book");
  const books: BookWithAuthors[] = await res.json();
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
  if (!context.params) return { props: {} };
  let id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/book/${id}`);
  let book = await res.json();
  return { props: { book } };
};
