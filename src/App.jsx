import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
