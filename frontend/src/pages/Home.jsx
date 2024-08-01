import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import RecentBooks from './RecentBook';

const Home = () => {
  const containerStyle = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Full viewport height
    display: 'flex',
    flexDirection: 'column', // Ensure content and RecentBooks are in a column
    alignItems: 'center',
    color: 'white',
    padding: '0',
    margin: '0',
    width: '100vw',
    position: 'relative'
  };

  const contentStyle = {
    padding: '50px',
    textAlign: 'center',
    flex: '1', // Make sure this div takes the available space
    width: '100%' // Ensure it takes full width of the viewport
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '20px',
    width: '100%'
  };

  const imageStyle = {
    height: 'auto',
    maxWidth: '100%',
    borderRadius: '10px'
  };

  const paragraphStyle = {
    width: '100%',
    marginBottom: '20px'
  };

  const buttonStyle = {
    backgroundColor: '#db6930',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <div className="row no-gutters w-100" style={{ flex: '1' }}> {/* Ensure it takes full width and height */}
        <div className="col-md-12 d-flex flex-column justify-content-center align-items-center" style={contentStyle}>
          <h1 className="mb-4">Discover Your Next Great Read</h1>
          <p className="mb-4" style={{ ...paragraphStyle, fontWeight: 'bold', fontSize: '1.25rem' }}>
            Dive into a world of literature where every page opens a door to new adventures, timeless stories, and boundless imagination. Whether you're seeking inspiration, knowledge, or a moment of escape, your next favorite book is just a click away.
          </p>
          <Link to="/allBooks">
            <button type="button" style={buttonStyle}>Discover Books</button>
          </Link>
        </div>
      </div>

    </div>

  );

}

export default Home;
