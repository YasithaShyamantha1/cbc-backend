import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import SignUpPage from './pages/signUpPage';
import AdminHomePage from './pages/adminHomePage'; // Ensure this component exists and is correctly imported

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/*" element={<AdminHomePage />} />
        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
