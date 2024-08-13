import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import NavBar from "./Components/Navbar/NavBar";
import "./App.css";
import Banner from "./Components/Banner/Banner";
import Home from "./Home";
import LogIn from "./Components/Auth/LogIn";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
}

export default App;
