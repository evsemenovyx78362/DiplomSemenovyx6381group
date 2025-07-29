import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <
    React.StrictMode > { /* Оборачиваем приложение в Provider, чтобы Redux store был доступен везде */ } <
    Provider store = { store } > { /* Оборачиваем в Router для работы маршрутизации */ } <
    Router >
    <
    App / >
    <
    /Router> <
    /Provider> <
    /React.StrictMode>
);