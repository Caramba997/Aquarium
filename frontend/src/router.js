import React from 'react';
import Layout from "./Layout.js";
import Home from './pages/Home.js';
import Fish from './pages/Fish.js';
import Create from './pages/Create.js';
import Edit from './pages/Edit.js';
import Stats from './pages/Stats.js';
import Login from './pages/Login.js';
import Account from './pages/Account.js';
import About from './pages/About.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute.js';


const AquariumRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/fish/:id" element={<Fish />} />
          <Route path="/fish/:id/edit" element={<PrivateRoute><Edit /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><Create /></PrivateRoute>} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AquariumRouter;