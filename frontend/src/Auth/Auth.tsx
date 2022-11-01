import { Outlet, redirect, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";


function Auth() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" action={() => redirect('./login')}></Route>
            </Routes>
            <Outlet />
        </div>
    );
}

export default Auth;
