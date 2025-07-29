import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectBoardPage from './pages/ProjectBoardPage';
import SettingsPage from './pages/SettingsPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          
          {/* Защищенные маршруты */}
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<DashboardPage />} />
          </Route>
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
          <Route path='/project/:projectId' element={<PrivateRoute />}>
            <Route path='/project/:projectId' element={<ProjectBoardPage />} />
          </Route>
          <Route path='/settings' element={<PrivateRoute />}>
            <Route path='/settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;