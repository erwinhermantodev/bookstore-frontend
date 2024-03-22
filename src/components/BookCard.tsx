import React from "react";
import { Book } from "../services/api";
import "./BookCard.css";

interface Props {
  book: Book;
  onBuy: (bookId: number) => void;
}

const BookCard: React.FC<Props> = ({ book, onBuy }) => {
  const tags = Array.isArray(book.tags) ? book.tags.join(", ") : book.tags;

  return (
    <div className="book-card">
      <img className="book-image" src={book.cover_image} alt={book.title} />
      <div className="book-details">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-writer">By {book.writer}</p>
        <p className="book-price">${book.point}</p>
        <p className="book-tags">Tags: {tags}</p>
        {!book.sold && (
          <button className="buy-button" onClick={() => onBuy(book.id)}>
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
