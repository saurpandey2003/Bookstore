import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-10 col-lg-8">
          <div className="card">
            <div className="card-header text-center">
              <h2 className="card-title">Profile</h2>
            </div>
            <div className="card-body">
              {error && <p className="text-danger">{error}</p>}
              {data ? (
                <>
                  <div className="text-center mb-4">
                    <img
                      src="https://via.placeholder.com/150"
                      className="rounded-circle"
                      alt="Profile"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Username</label>
                    <p className="form-control-plaintext">{data.username}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <p className="form-control-plaintext">{data.email}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <p className="form-control-plaintext">{data.address}</p>
                  </div>
                 
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
