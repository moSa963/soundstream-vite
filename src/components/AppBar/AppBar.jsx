import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { Avatar, Box, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { APP_URL } from "../../utils/Request";
import ThemeToggle from "./ThemeToggle";


const AppBar = () => {
    const { user } = useAuth();

    return (
        <MuiAppBar elevation={0} position="sticky" color="transparent" sx={{ backdropFilter: "blur(10px)" }}>
            <Toolbar variant="dense">
                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" spacing={2}>
                    <ThemeToggle />

                    <Link to="/account">
                        <Avatar src={`${APP_URL}api/account/${user.username}/profile/photo/${user.photo}`}
                            sx={{ transform: "scale(0.95)", ":hover": { transform: "scale(1)" }, cursor: "pointer" }} />
                    </Link>
                </Stack>
            </Toolbar>
        </MuiAppBar>
    );
}


export default AppBar;