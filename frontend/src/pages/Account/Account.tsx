import { Route, Routes } from "react-router-dom";
import InProgress from "./pages/InProgress/InProgress";

export default function Account() {
    return (
        <Routes>
            <Route path="/in-progress" element={<InProgress/>}/>
        </Routes>
    )
}
