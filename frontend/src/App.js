import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import MainHomepage from './main_homepage'; // Import your MainHomepage component
import Homepage from './homepage'; // Import your Homepage component

function App() {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/main_homepage" /> : <Navigate to="/login" />}
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/main_homepage" /> : <Login setUser={setUser} />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/main_homepage" /> : <Register setUser={setUser} />} 
        />
        <Route
          path="/main_homepage"
          element={
            isAuthenticated ? (
              <MainHomepage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/homepage"
          element={
            isAuthenticated ? (
              <Homepage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
