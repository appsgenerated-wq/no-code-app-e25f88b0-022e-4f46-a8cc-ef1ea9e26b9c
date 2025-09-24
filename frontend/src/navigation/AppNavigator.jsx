import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import DashboardPage from '../screens/DashboardPage';
import CreateRecipePage from '../screens/CreateRecipePage';
import PrivateRoute from '../components/PrivateRoute';

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
      </Route>
    </Routes>
  );
};

export default AppNavigator;
