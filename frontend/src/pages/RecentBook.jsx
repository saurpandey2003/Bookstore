import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentBook.css';

// RecentBooks component
const RecentBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:5000/book/recent-4");
      setBooks(response.data.getTop4);
      console.log(response.data.getTop4);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="recent-books">
      <h1>Recently Added Books</h1>
      {loading && <p>Loading...</p>}
      {books.length > 0 ? (
        <div className="books-container">
          {books.map((book) => (
            <div key={book._id} className="book-item">
              <img src={book.url} alt={book.title} className="book-image" />
              <div className="book-details">
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Price:</strong> ${book.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No recent books available.</p>
      )}
    </div>
  );
};

export default RecentBooks;
