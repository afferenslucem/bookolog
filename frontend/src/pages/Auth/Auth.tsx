import { redirect, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";


function Auth() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" action={() => redirect('./login')}></Route>
        </Routes>
    );
}

export default Auth;
