export interface Book {
  sold: any;
  id: number;
  title: string;
  writer: string;
  cover_image: string;
  point: number;
  tags: string[];
}

export const fetchBooks = async (page: number): Promise<Book[]> => {
  const response = await fetch(
    `https://bookstore-backend-alpha.vercel.app/books?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};

export const buyBook = async (bookId: number): Promise<void> => {
  const response = await fetch(`https://bookstore-backend-alpha.vercel.app/orders/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookId }),
  });
  if (!response.ok) {
    throw new Error("Failed to buy book");
  }
};
