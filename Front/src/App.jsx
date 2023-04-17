import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import Navbar from './components/navbar/navbar';
import UserProfile from './pages/userProfile';
import AllUserPage from './pages/allUserPage';
import PofilePage from './pages/profilePage';
import ChatPage from './pages/chatPage';
import ConversationPage from './pages/conversationPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/allUsers" element={<AllUserPage />} />
        <Route path="/getUser/:id" element={<PofilePage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/conversations" element={<ConversationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
