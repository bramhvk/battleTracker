import {AppBar, Box, Link, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink, Outlet} from "react-router-dom";
import React from "react";

const Layout: React.FC = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Top AppBar */}
            <AppBar position="fixed">
                <Toolbar sx={{ display: "flex", gap: 2 }}>
                    <Typography variant="h6" noWrap component="div">
                    {/*<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>*/}
                        My App
                    </Typography>

                    {/* Navigation Links */}
                    <Link
                        component={RouterLink}
                        to="/campaigns"
                        color="inherit"
                        underline="hover"
                        sx={{ cursor: "pointer" }}
                    >
                        Campaigns
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/monsters"
                        color="inherit"
                        underline="hover"
                        sx={{ cursor: "pointer" }}
                    >
                        Monsters
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/player-characters"
                        color="inherit"
                        underline="hover"
                        sx={{ cursor: "pointer" }}
                    >
                        Players
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/encounters"
                        color="inherit"
                        underline="hover"
                        sx={{ cursor: "pointer" }}
                    >
                        Encounters
                    </Link>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                    mt: 8, // push down so content isn't hidden under AppBar
                }}
            >
                {/* This renders the routed child component */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
