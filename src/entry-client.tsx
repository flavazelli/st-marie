import '@fontsource/cookie/latin-400.css';
import '@fontsource/lato/latin-400.css';
import '@fontsource/lato/latin-700.css';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/global.css';

const root = document.getElementById('root')!;
const app = <React.StrictMode><BrowserRouter basename={import.meta.env.BASE_URL}><App /></BrowserRouter></React.StrictMode>;
// Support both Vite development and the pre-rendered production build.
if (root.hasChildNodes() && root.querySelector('main')) hydrateRoot(root, app);
else createRoot(root).render(app);
