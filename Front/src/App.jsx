import { Routes, Route } from 'react-router-dom';
import React from 'react';
import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from './pages/loginPage/loginPage';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
