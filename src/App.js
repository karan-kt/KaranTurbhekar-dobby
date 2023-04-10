import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Homepage from './Components/Pages/Homepage';
import Mygallery from './Components/Pages/Mygallery';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mygallery" element={<Mygallery />} />
      </Routes>
    </div>
  );
}

export default App;
