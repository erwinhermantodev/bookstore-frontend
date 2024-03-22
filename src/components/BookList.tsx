import React, { useState } from "react";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { Book } from "../services/api";

interface Props {
  books: Book[];
  onBuy: (bookId: number) => void;
}

const BookList: React.FC<Props> = ({ books, onBuy }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onFilterChange = (tags: string[]) => {
    setSelectedTags(tags);
    setCurrentPage(1); // Reset pagination when filters change
  };

  // Filter books based on selected tags
  const filteredBooks = selectedTags.length
    ? books.filter((book) =>
        book.tags.some((tag) => selectedTags.includes(tag))
      )
    : books;

  // Paginate books
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <Filters onFilterChange={onFilterChange} />
      {paginatedBooks.map((book) => (
        <BookCard key={book.id} book={book} onBuy={onBuy} />
      ))}
      <Pagination
        totalPages={Math.ceil(filteredBooks.length / pageSize)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default BookList;
