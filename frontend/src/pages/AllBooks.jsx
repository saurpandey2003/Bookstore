import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentBook.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/book/AllBooks");
        setBooks(response.data.allBooks);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching books");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const addToCart = async (bookId) => {
    try {
      const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
      const response = await axios.post(
        'http://localhost:5000/cart/add-to-cart',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            id: userId,
            bookid: bookId
          }
        }
      );
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response ? err.response.data.message : 'Error adding book to cart');
    }
  };

  const addToFavourite = async (bookId) => {
    try {
      const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
      const response = await axios.put(
        'http://localhost:5000/favourites/favBook',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            id: userId,
            bookid: bookId
          }
        }
      );
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response ? err.response.data.message : 'Error adding book to favourites');
    }
  };

  return (
    <div className="recent-books">
     
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
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
                <div className="button-container">
                  <button className="button-remove" onClick={() => addToCart(book._id)}>Add to Cart</button>
                  <button className="button-remove" onClick={() => addToFavourite(book._id)}>Add to Favourite</button>
                </div>
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

export default AllBooks;
