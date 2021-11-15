import React from "react";
import Axios from "axios";

import logo from "../bookish.png";
import logoDark from "../bookishDark.png";
import "./image.css";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

export default function MenuAppBarLogeado(props) {
    Axios.defaults.withCredentials = true;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = (e) => {
        Axios.get("http://localhost:3005/api/usuarios/logout").then((res) => {
            console.log("request made");
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <React.Fragment>
            <GlobalStyles
                styles={{ul: {margin: 0, padding: 0, listStyle: "none"}}}
            />
            <CssBaseline/>

            <AppBar
                position="sticky"
                color="default"
                elevation={0}
                sx={{borderBottom: (theme) => `2px solid ${theme.palette.divider}`}}
            >
                <Container maxWidth="md">
                    <Toolbar sx={{flexWrap: "wrap"}}>
                        <Typography
                            variant="h4"
                            color="inherit"
                            width="60%"
                            sx={{flexGrow: 1}}
                        >
                            <Link
                                color="#125394"
                                href="/"
                                sx={{my: 1, mx: 1.5}}
                                underline="none"
                            >
                                {!props.dark ? <img alt={"Un gato."} src={logoDark} style={{
                                    width: "42%",
                                    float: "initial",
                                    className: "unselectable"
                                }}/> : <img alt={"Un gato."} src={logo}
                                            style={{width: "42%", float: "initial", className: "unselectable"}}/>}
                            </Link>
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem divider={true}>{props.username}</MenuItem>
                                <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}
