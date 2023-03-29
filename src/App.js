import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assistant from './pages/assistant/Assistant'

function App() {


  return (
    <>
      <Router>
      <Routes>
          <Route path="/" element={<Assistant />} />

          
          </Routes>
      </Router>
    
    </>
  );
}

export default App;
