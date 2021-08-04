import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'index.css';
import Editor from 'pages/Editor';
import URLS from 'URLS';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Editor />} path={URLS.LANDING} />
        <Route element={<Editor />} path={`${URLS.CODE}:id/*`} />
        <Route element={<h1>404</h1>} path='*' />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
