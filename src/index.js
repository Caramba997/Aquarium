import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './normalize.css';
import Layout from "./Layout";
import Home from './pages/Home';
import Fish from './pages/Fish';
import Create from './pages/Create';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/fish/:id" element={<Fish />} />
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
