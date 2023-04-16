import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import Navbar from './components/navbar/navbar';
import UserProfile from './pages/userProfile';
import AllUserPage from './pages/allUserPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/allUsers" element={<AllUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
