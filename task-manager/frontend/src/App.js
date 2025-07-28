import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProjectBoardPage from './pages/ProjectBoardPage';
import SettingsPage from './pages/SettingsPage';

function App() {
    return ( <
        > { /* Header будет отображаться на всех страницах */ } <
        Header / >
        <
        main className = "container mx-auto p-4" >
        <
        Routes > { /* Главная страница, можно перенаправить на дашборд или логин */ } <
        Route path = "/"
        element = { < DashboardPage / > }
        /> <
        Route path = "/dashboard"
        element = { < DashboardPage / > }
        /> <
        Route path = "/project/:projectId"
        element = { < ProjectBoardPage / > }
        /> <
        Route path = "/login"
        element = { < LoginPage / > }
        /> <
        Route path = "/register"
        element = { < RegisterPage / > }
        /> <
        Route path = "/settings"
        element = { < SettingsPage / > }
        /> <
        /Routes> <
        /main> <
        />
    );
}

export default App;