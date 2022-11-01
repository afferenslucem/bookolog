import { Outlet } from "react-router-dom";

import './Layout.scss'

function Layout() {
    return <div className="app-layout">
        <Outlet />
    </div>
}

export default Layout;
