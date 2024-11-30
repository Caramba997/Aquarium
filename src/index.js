import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './normalize.css';
import Layout from "./Layout.js";
import Home from './pages/Home.js';
import Fish from './pages/Fish.js';
import Create from './pages/Create.js';
import Edit from './pages/Edit.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/fish/:id" element={<Fish />} />
          <Route path="/fish/:id/edit" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
