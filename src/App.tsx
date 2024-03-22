import React, { useState, useEffect, useRef } from "react";
import BookCard from "./components/BookCard";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import { Book, fetchBooks, buyBook } from "./services/api";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useRef<HTMLDivElement | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchBooks(page)
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setBooks((prevBooks) => [...prevBooks, ...data]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, [page, selectedTags]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);
    if (lastBookElementRef.current)
      observer.current.observe(lastBookElementRef.current);
  }, [loading, hasMore, selectedTags]);

  const handleBuyBook = async (bookId: number) => {
    try {
      await buyBook(bookId);
      // Update the book list after buying
      const updatedBooks = books.map((book) =>
        book.id === bookId ? { ...book, sold: true } : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Failed to buy book:", error);
    }
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onFilterChange = (tags: string[]) => {
    setSelectedTags(tags);
    setPage(1); // Reset pagination when filters change
  };

  return (
    <div className="app">
      <h1>Welcome to the Bookstore</h1>
      <Filters onFilterChange={onFilterChange} />
      <div className="book-list">
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div ref={lastBookElementRef} key={book.id}>
                <BookCard book={book} onBuy={handleBuyBook} />
              </div>
            );
          } else {
            return <BookCard key={book.id} book={book} onBuy={handleBuyBook} />;
          }
        })}
        {loading && <p className="loading">Loading...</p>}
      </div>
      <Pagination
        totalPages={Math.ceil(books.length / 10)}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
