import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="text-center text-lg-start" style={{ backgroundColor: '#db6930' }}>
      <div className="d-flex justify-content-center py-5">
        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
          <i className="fab fa-facebook-f"></i>
        </button>
        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
          <i className="fab fa-youtube"></i>
        </button>
        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
          <i className="fab fa-instagram"></i>
        </button>
        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
          <i className="fab fa-twitter"></i>
        </button>
      </div>

      <div className="text-center text-white p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright made by saurabh pandey
       
      </div>
    </footer>
  );
};

export default Footer;
