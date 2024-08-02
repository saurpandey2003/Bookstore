import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setData(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        password: '',
        address: response.data.address
      });
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      // Update username
      if (formData.username !== data.username) {
        await axios.put('http://localhost:5000/update-username', { username: formData.username }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // Update email
      if (formData.email !== data.email) {
        await axios.put('http://localhost:5000/update-email', { email: formData.email }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // Update address
      if (formData.address !== data.address) {
        await axios.put('http://localhost:5000/update-address', { address: formData.address }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // Fetch updated profile data
      await fetchProfile();
      setEditing(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error updating profile");
      alert(err.response ? err.response.data.message : "Error updating profile");
    }
  };

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-10 col-lg-8">
          <div className="card">
            <div className="card-header text-center">
              <h2 className="card-title">Profile</h2>
            </div>
            <div className="card-body">
             
              {data ? (
                <>
                  <div className="text-center mb-4">
                    <img
                      src="https://via.placeholder.com/150"
                      className="rounded-circle"
                      alt="Profile"
                    />
                  </div>
                  {editing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-bold">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                        <textarea
                          className="form-control"
                          id="address"
                          name="address"
                          rows="3"
                          value={formData.address}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Save</button>
                      <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditing(false)}>Cancel</button>
                    </form>
                  ) : (
                    <>
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
                      <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit</button>
                    </>
                  )}
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
