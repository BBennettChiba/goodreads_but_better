import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Index() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  useEffect(() => {
    if (!input) return;
    fetch(`http://localhost:3000/api/search?q=${input}`)
      .then((response) => response.json())
      .then((results) => {
        setSearchResults(results);
      });
  }, [input]);

  const navigateTo = async (result) => {
    const getISBN = (identifiers: { type: string; identifier: string }[]) => {
      for (const i of identifiers) {
        if (i.type === "ISBN_13") return i.identifier;
      }
    };
    const ISBN = getISBN(result.industryIdentifiers);
    const response = await fetch(`http://localhost:3000/api/book?ISBN=${ISBN}`);
    const bookExists = await response.json();
    console.log(bookExists);
    if (!bookExists.message) {
      return window.location.href = `http://localhost:3000/books/${bookExists.id}`;
    }
    const data = {
      title: result.title,
      author: result.authors,
      description: result.description,
      published: result.publishedDate,
      publisher: result.publisher,
      thumbnail: result.imageLinks.thumbnail,
      ISBN,
      subtitle: result.subtitle,
    };
    if (result.subtitle) data.subtitle = result.subtitle;
    const res = await fetch("http://localhost:3000/api/book", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });
    const book = await res.json();
    console.log(book);
    // window.location.href = `/books/${result.id}`;
  };

  const mapResults = (r) => {
    const result = r.volumeInfo;
    return (
      <div key={r.id} onClick={() => navigateTo(result)}>
        <h1>{result.title}</h1>
        {(!!result.imageLinks?.thumbnail ||
          !!result.imageLinks?.smallThumbnail) && (
          <Image
            height="199"
            width="128"
            src={
              result.imageLinks.thumbnail || result.imageLinks.smallThumbnail
            }
            alt={`cover of ${result.title}`}
          ></Image>
        )}
        {result.authors && result.authors.map((a) => <h3>{a}</h3>)}
      </div>
    );
  };

  return (
    <div>
      <input type="text" onChange={handleInput}></input>
      {searchResults.length > 0 && searchResults.map(mapResults)}
    </div>
  );
}
