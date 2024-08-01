import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Footer from './components/footer';
import AllBooks from './pages/AllBooks';
import Heropage from './pages/MapPages';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import auth, { login,changerole } from './Stores/auth';
import Cart from './pages/Cart';


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (id && token && role) {
      dispatch(login({ user: id, token, role })); // Dispatch login with payload
      dispatch(changerole(role)); // Dispatch changerole with role
    }
  }, [dispatch]);
 
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Heropage />} />
          <Route path="/allBooks" element={<AllBooks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart/>} />
          


        </Routes>
       
        <Footer />
      </Router>
    );
}

export default App;
