import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';

export function render(url: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return renderToString(<React.StrictMode><StaticRouter basename={base || '/'} location={`${base}${url}`}><App /></StaticRouter></React.StrictMode>);
}
