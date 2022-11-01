import React from 'react';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Layout from "./Layout/Layout";

function App() {
  return (
      <Routes>
          <Route element={<Layout />}>
              <Route path="/auth/*" element={<Auth />} />
          </Route>
      </Routes>
  );
}

export default App;
