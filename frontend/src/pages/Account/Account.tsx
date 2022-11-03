import { Route, Routes } from "react-router-dom";
import InProgress from "./pages/InProgress/InProgress";
import { AppBar, Container, Drawer, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useReducer } from "react";

export default function Account() {
    const [isDrawerOpened, toggleDrawer] = useReducer(flag => !flag, false);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Routes>
                    <Route path="/in-progress" element={<InProgress/>}/>
                </Routes>
            </Container>
            <Drawer anchor="bottom" open={isDrawerOpened} onClose={toggleDrawer}>
                Hello
            </Drawer>
        </div>
    )
}
