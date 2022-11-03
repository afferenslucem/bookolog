import React from 'react';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import Auth from "../../../pages/Auth/Auth";
import Layout from "../Layout/Layout";
import Account from "../../../pages/Account/Account";

function App() {
  return (
      <Routes>
          <Route element={<Layout />}>
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/*" element={<Account />} />
          </Route>
      </Routes>
  );
}

export default App;
