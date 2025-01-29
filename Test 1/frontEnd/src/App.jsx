import { useState } from 'react';
import './App.css';
import {Toaster} from 'react-hot-toast';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import SignUpPage from './pages/signUpPage';
import AdminHomePage from './pages/adminHomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';





// Ensure this component exists and is correctly imported

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='bg-primary'>
    <BrowserRouter>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
   <GoogleOAuthProvider clientId="178730954348-2u5imu69o3a01b9n0dhvh8oi5m1mrbke.apps.googleusercontent.com">
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin/*" element={<AdminHomePage />} />

        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
