import { redirect, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "../../common/components/Layout/Layout";


function Auth() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" action={() => redirect('./login')}></Route>
            </Route>
        </Routes>
    );
}

export default Auth;
