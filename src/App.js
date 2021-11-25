//<Resumen>
//Clase App que sirve como la conexión de todas las siguientes clases hacia el sitio, es decir sirve para que existan
//las rutas de cada una de las clases y poder encontrarlas en la aplicación principal
//</Resumen>
//<Para> Sirve como conexión de todas las clases hacia la página web principal para que estas interfaces sean encontradas.
//<Autor>Omegaware</Autor>
//<Fecha de creación> 10 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import Navegacion from "./componentes/Navegacion";
import OlvidoPassword from "./componentes/OlvidoPassword";
import Ubicaciones from "./componentes/Ubicaciones";
import AcercaDe from "./componentes/AcercaDe";
import Contacto from "./componentes/Contacto";
import Equipo from "./componentes/Equipo";
import Producto from "./componentes/Producto";
import Horario from "./componentes/Horario";
import Notas from "./componentes/Notas";
import Tareas from "./componentes/Tareas";
import Reticula from "./componentes/Reticula";
import Inicio from "./componentes/Inicio";
import Acceso from "./componentes/Login";
import Registro from "./componentes/Registro";
import Pie from "./componentes/Pie";
import Dashboard from "./componentes/Dashboard";
import MenuAppBar from "./componentes/AppBar";
import MenuAppBarLogeado from "./componentes/AppBarLogeado";
import Precios from "./componentes/Precios";
import PoliticaPrivacidad from "./componentes/PoliticaPrivacidad";
import ToS from "./componentes/ToS";
import Componente404 from "./componentes/404";
import React, { useEffect, useState } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Axios from "axios";

//constante para indicar el modo de color del contexto
const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

//Función principal que hace el vinculo entre entre la clase principal y las otras que existe, para cuando se busquen
//puedan ser encontradas dentro del sitio web KittenBook
function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  Axios.defaults.withCredentials = true;

  //constantes definidas para el nombre de usuario, la autenticidad,
  //estado de uso y estatus
  const [username, setUsername] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [darkState, setDarkState] = useState(true);
  const [estatus, setEstatus] = useState(0);

  useEffect(() => {
    //efecto de uso
    Axios.get("http://localhost:3005/api/usuarios/autenticado")
      .then((res) => {
        if (
          res.data.username !== undefined &&
          res.data.authenticated !== undefined
        ) {
          setUsername(res.data.username); //asignar el nombre de usuario
          setAuthenticated(res.data.authenticated === "true" ? true : false); //asignar la autenticidad
        }
      })
      .catch((err) => {
        //encapsular cuando ocurra un error
        console.log(err);
      });
    const existingPreference = localStorage.getItem("darkState");
    if (existingPreference === "dark") {
      //condición para cambiar el modo de color de la interfaz a color negro
      colorMode.toggleColorMode();
      setItemLS();
    }
  }, []);

  //constante para manejar el cierre de sesión
  const handleLogout = () => {
    setAuthenticated(false);
  };

  //constante para el acceso a la aplicación
  const login = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const data = new FormData(e.currentTarget);
    Axios.post(
      "http://localhost:3005/api/usuarios/login",
      {
        //nombre de usuario y contraseña para acceder a la aplicación
        username: data.get("username"),
        password: data.get("password"),
      },
      { headers }
    )
      .then(function (response) {
        setEstatus(response.status);
        setAuthenticated(true);
      })
      .catch(function (error) {
        console.log(error);
        setEstatus(error.response.status);
      });
  };

  //constante para el cierre de sesión
  const logout = (e) => {
    Axios.get("http://localhost:3005/api/usuarios/logout")
      .then((res) => {
        console.log("Logout successful.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //constante para manejar el modo de color de la interfaz (negro o blanco)
  const setItemLS = () => {
    setDarkState(!darkState);
    if (darkState) {
      localStorage.setItem("darkState", "dark");
    } else {
      localStorage.setItem("darkState", "light");
    }
  };

  //condición para manejar el autenticado de la app
  if (authenticated) {
    return (
      <div className="App">
        <Container>
          <Box sx={{ mx: "auto", width: 55 }}>
            <IconButton //formato de icono del botón
              sx={{ ml: 1 }}
              onClick={() => {
                colorMode.toggleColorMode();
                setItemLS();
              }}
              color="inherit"
              align="center"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Container>
        <MenuAppBarLogeado //formato del menu de la barra de aplicaciones logeado
          username={username}
          dark={darkState}
          logout={logout}
          handleLogout={handleLogout}
          position="fixed"
        />
        <Navegacion />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route
              exact
              path="/inicio"
              render={(props) => (
                <Dashboard {...props} username={username} theme={theme} />
              )}
            />
            <Route exact path="/notas" component={Notas} />
            <Route exact path="/horario" component={Horario} />
            <Route exact path="/tareas" component={Tareas} />
            <Route exact path="/reticula" component={Reticula} />
            {/*<Route exact path="/login" render={(props) => <Acceso estatus={estatus} login={login}/>}/>*/}
            {/*<Route exact path="/registro" component={Registro}/>*/}
            <Route exact path="/precios" component={Precios} />
            <Route exact path="/tos" component={ToS} />
            <Route
              exact
              path="/politicaprivacidad"
              component={PoliticaPrivacidad}
            />
            <Route exact path="/olvidopassword" component={OlvidoPassword} />
            <Route exact path="/contacto" component={Contacto} />
            <Route exact path="/ubicaciones" component={Ubicaciones} />
            <Route exact path="/acercade" component={AcercaDe} />
            <Route exact path="/equipo" component={Equipo} />
            <Route exact path="/producto" component={Producto} />
            <Route path="*" exact={true} component={Componente404} />
          </Switch>
        </BrowserRouter>
        <Pie />
      </div>
    );
  }

  return (
    <div className="App">
      <Container>
        <Box sx={{ mx: "auto", width: 55 }}>
          <IconButton //formato de icono del botón
            sx={{ ml: 1 }}
            onClick={() => {
              colorMode.toggleColorMode();
              setItemLS();
            }}
            color="inherit"
            align="center"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Container>
      <MenuAppBar dark={darkState} position="fixed" />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Inicio} />

          {/* {<Route exact path="/inicio"
                         render={(props) => <Dashboard {...props} username="usuario"/>}/>}
                    {<Route exact path="/notas" component={Notas}/>}
                    {<Route exact path="/horario" component={Horario}/>}
                    {<Route exact path="/tareas" component={Tareas}/>}
                    {<Route exact path="/reticula" component={Reticula}/>*/}

          <Route //asignar la ruta exacta para acceder a cada apartado
            exact
            path="/login"
            render={(props) => <Acceso estatus={estatus} login={login} />}
          />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/precios" component={Precios} />
          <Route exact path="/tos" component={ToS} />
          <Route
            exact
            path="/politicaprivacidad"
            component={PoliticaPrivacidad}
          />
          <Route exact path="/olvidopassword" component={OlvidoPassword} />
          <Route exact path="/contacto" component={Contacto} />
          <Route exact path="/ubicaciones" component={Ubicaciones} />
          <Route exact path="/acercade" component={AcercaDe} />
          <Route exact path="/equipo" component={Equipo} />
          <Route exact path="/producto" component={Producto} />
          <Route path="*" exact={true} component={Componente404} />
        </Switch>
      </BrowserRouter>
      <Pie />
    </div>
  );
}

//función para alternar el modo de color de la interfaz
function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  //constante para poder usar el modo y paleta de color
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

//exportar por defecto la función para alternar el modo de color de la interfaz
export default ToggleColorMode;
