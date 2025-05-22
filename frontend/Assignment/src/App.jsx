import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';

import Home from './pages/Home';
import Search from './pages/Search';
import AdminPanel from './pages/AdminPanel';

import Navbar from './components/Navbar';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';

import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace /> : <Signup />}
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
