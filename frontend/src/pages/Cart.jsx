import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentBook.css';

const Cart = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/get-cart-book', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBooks(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCartBooks();
  }, []);

  const removeCart = async (bookId) => {
    try {
      const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
      const response = await axios.put(
        'http://localhost:5000/cart/delete',
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

      // Refresh the cart after removing a book
      const updatedBooks = books.filter(book => book._id !== bookId);
      setBooks(updatedBooks);

    } catch (err) {
      console.error(err);
      alert(err.response ? err.response.data.message : 'Error removing book from cart');
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
                <button className="button-remove" onClick={() => removeCart(book._id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No books in the cart.</p>
      )}
    </div>
  );
};

export default Cart;
