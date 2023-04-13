import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from './pages/loginPage/loginPage';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
