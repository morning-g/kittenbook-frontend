// Imports utilizados por esta clase
import React from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";

// Función que exporta la clase
export default function MenuAppBarLogeado(props) {
  // Estado original del menú
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Función para abrir el menú
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      {/* Componente AppBar */}
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `2px solid ${theme.palette.divider}` }}
      >
        <Container maxWidth="md">
          {/* Barra de herramientas */}
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h4"
              color="inherit"
              width="60%"
              sx={{ flexGrow: 1 }}
            >
              {/* Logo y link a la página de inicio */}
              <Link
                color="#125394"
                href="/"
                sx={{ my: 1, mx: 1.5 }}
                underline="none"
              >
                {!props.dark ? (
                  <img
                    alt={"Un gato."}
                    src={logoDark}
                    style={{
                      width: "31%",
                      float: "initial",
                      className: "unselectable",
                    }}
                  />
                ) : (
                  <img
                    alt={"Un gato."}
                    src={logo}
                    style={{
                      width: "33%",
                      float: "initial",
                      className: "unselectable",
                    }}
                  />
                )}
              </Link>
            </Typography>
            <div>
              {/* Boton que abre un menú de acciones del usuario */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {/* Menú */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* Datos del usuario */}
                <MenuItem divider={true}>{props.username}</MenuItem>
                {/* Botón para cerrar la sesión */}
                <MenuItem
                  onClick={() => {
                    props.handleLogout();
                    props.logout();
                  }}
                >
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
