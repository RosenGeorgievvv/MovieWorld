// src/App.jsx
import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Register from "./pages/Register";
import Create from "./pages/Create";
import EditForm from "./components/EditForm"; 
import { AuthProvider } from "./components/Authentication";
import ErrorPage from "./pages/404";

function App() {
  
  return (
    <AuthProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<EditForm />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
    </AuthProvider>
  );
}

export default App;
