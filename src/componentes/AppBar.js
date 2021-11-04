import * as React from "react";

import logo from "../bookish.png";

import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Button from "@mui/material/Button";

export default function MenuAppBar() {
  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Container maxWidth="md">
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <img src={logo} style={{width: "5%"}}/>
            <Typography
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Link
                color="#125394"
                href="/"
                sx={{ my: 1, mx: 1.5 }}
                underline="none"
              >
                ΩW
              </Link>
              
            </Typography>
            {/* <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Features
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Enterprise
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Soporte
              </Link>
            </nav> */}
            <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Iniciar sesión
            </Button>
            <Button href="/registro" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Registro
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
