import React from 'react';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Account from "../pages/Account/Account";

function App() {
    return (
        <Routes>
            <Route path="/auth/*" element={<Auth/>}/>
            <Route path="/*" element={<Account/>}/>
        </Routes>
    );
}

export default App;
