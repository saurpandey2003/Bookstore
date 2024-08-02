import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Favourite = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const fetchBook = async () => {
        try {
            const response = await axios.get('http://localhost:5000/favourites/get-fav-book', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setBooks(response.data.userWithFavourites.favourites);
            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error fetching');
            setLoading(false);
        }
    };

    const deleteBook = async (bookId) => {
        try {
            const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
            const response = await axios.put(
                'http://localhost:5000/favourites/fav_delete',
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
            alert(err.response ? err.response.data.message : 'Error removing book from favourite');
        }
    }

    useEffect(() => {
        fetchBook();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>Favourite Books</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {books.length > 0 ? (
                <div className="books-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {books.map((book) => (
                        <div key={book._id} className="book-item" style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <img src={book.url} alt={book.title} className="book-image" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginBottom: '16px' }} />
                            <div className="book-details" style={{ textAlign: 'center' }}>
                                <h2 style={{ fontSize: '1.5em', marginBottom: '8px' }}>{book.title}</h2>
                                <p style={{ marginBottom: '8px', color: '#555' }}>{book.desc}</p>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Price:</strong> ${book.price}</p>
                                <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
                                    <button className="button-remove" onClick={() => deleteBook(book._id)} style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '1em', transition: 'background-color 0.3s', flex: '1' }}>
                                        Remove from Favourite
                                        {/* <h1>{book._id}</h1> */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>No favourite books available.</p>
            )}
        </div>
    );
};
export default Favourite;
