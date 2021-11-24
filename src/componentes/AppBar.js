// Imports utilizados por esta clase
import * as React from "react";
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
import Button from "@mui/material/Button";

// Función que exporta la clase
export default function MenuAppBar(props) {
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
              {/* Logo y link a la pagina de inicio */}
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
                      width: "45%",
                      float: "initial",
                      className: "unselectable",
                    }}
                  />
                ) : (
                  <img
                    alt={"Un gato."}
                    src={logo}
                    style={{
                      width: "45%",
                      float: "initial",
                      className: "unselectable",
                    }}
                  />
                )}
              </Link>
            </Typography>
            {props.dark ? (
              <div>
                {/* Botón para iniciar sesión modo oscuro */}
                <Button
                  href="/login"
                  variant="outlined"
                  sx={{
                    my: 1,
                    mx: 1.5,
                    borderColor: "#000000",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#000000",
                      borderColor: "#000000",
                      color: "white",
                    },
                  }}
                >
                  Iniciar sesión
                </Button>
                {/* Botón para registrar usuario modo oscuro */}
                <Button
                  href="/registro"
                  variant="contained"
                  sx={{
                    my: 1,
                    mx: 1.5,
                    backgroundColor: "#141414",
                    "&:hover": {
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FFFFFF",
                      color: "black",
                    },
                  }}
                >
                  Registro
                </Button>
              </div>
            ) : (
              <div>
                {/* Botón para registrar usuario modo claro */}
                <Button
                  href="/login"
                  variant="outlined"
                  sx={{
                    my: 1,
                    mx: 1.5,
                    borderColor: "#FFFFFF",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#FFFFFF",
                      borderColor: "#FFFFFF",
                      color: "black",
                    },
                  }}
                >
                  Iniciar sesión
                </Button>
                {/* Botón para registrar usuario modo claro */}
                <Button
                  href="/registro"
                  variant="contained"
                  sx={{
                    my: 1,
                    mx: 1.5,
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#000000",
                      borderColor: "#000000",
                      color: "white",
                    },
                  }}
                >
                  Registro
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
