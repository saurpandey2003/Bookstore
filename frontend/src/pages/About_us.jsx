import React from 'react';

const About_us = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>BookStore Web App</h1>
      <p>
        The <strong>BookStore Web App</strong> is a robust and interactive platform developed using the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, and Node.js). This application offers a seamless and intuitive experience for managing and exploring books.
      </p>
      
      <h2 style={{ color: '#4CAF50', marginBottom: '10px' }}>Key Features:</h2>
      <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
        <li>
          <strong>Book Management:</strong> Users can view a diverse catalog of books, each with detailed information including title, author, description, and price. The interface is designed to display books in an organized and visually appealing manner, with a responsive layout that adapts to various screen sizes.
        </li>
        <li>
          <strong>Favorite and Cart Functionality:</strong> Users can add books to their favorites and cart, making it easy to keep track of books they’re interested in. The app provides functionality to view, add, and remove items from both the favorite list and the cart.
        </li>
        <li>
          <strong>Authentication and Security:</strong> The application uses JSON Web Tokens (JWT) for secure authentication, ensuring that user data is protected. Users must log in to access personalized features like managing their favorites and cart.
        </li>
        <li>
          <strong>Responsive Design:</strong> The app is designed to be fully responsive, providing a consistent user experience across different devices, from desktops to mobile phones.
        </li>
        <li>
          <strong>Error Handling and User Feedback:</strong> The app includes user-friendly error handling and feedback mechanisms to ensure that users are informed of any issues and can navigate the app smoothly.
        </li>
      </ul>

      <h2 style={{ color: '#4CAF50', marginBottom: '10px' }}>Technology Stack:</h2>
      <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
        <li>
          <strong>Frontend:</strong> React.js for building dynamic user interfaces and managing application state.
        </li>
        <li>
          <strong>Backend:</strong> Node.js and Express.js for server-side logic and API management.
        </li>
        <li>
          <strong>Database:</strong> MongoDB for storing and managing book and user data.
        </li>
        <li>
          <strong>Authentication:</strong> JWT for secure user authentication and session management.
        </li>
      </ul>
      
      <p>
        The <strong>BookStore Web App</strong> aims to deliver a comprehensive and engaging experience for book enthusiasts, offering all the essential features needed to manage and explore their favorite books effectively.
      </p>
    </div>
  );
};

export default About_us;
