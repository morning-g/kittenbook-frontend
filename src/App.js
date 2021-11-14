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
import Creditos from "./componentes/Creditos";
import Pie from "./componentes/Pie";
import Dashboard from "./componentes/Dashboard"
import MenuAppBar from "./componentes/AppBar";
import MenuAppBarLogeado from "./componentes/AppBarLogeado";
import Precios from "./componentes/Precios";
import PoliticaPrivacidad from "./componentes/PoliticaPrivacidad";
import ToS from "./componentes/ToS";
import Componente404 from "./componentes/404";
import React, {useEffect, useState} from "react";
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Axios from "axios";

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    Axios.defaults.withCredentials = true;

    const [username, setUsername] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:3005/api/usuarios/autenticado').then((res) => {
            console.log(res.data);
            if (res.data.username !== undefined && res.data.authenticated !== undefined) {
                setUsername(res.data.username);
                setAuthenticated(res.data.authenticated === "true" ? true : false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    if (authenticated) {
        return (
            <div className="App">
                {theme.palette.mode} mode
                <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>
                <MenuAppBarLogeado username={username} position="fixed"/>
                <Navegacion/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Inicio}/>
                        <Route exact path="/inicio"
                               render={(props) => <Dashboard {...props} username={username}/>}/>
                        <Route exact path="/notas" component={Notas}/>
                        <Route exact path="/horario" component={Horario}/>
                        <Route exact path="/tareas" component={Tareas}/>
                        <Route exact path="/reticula" component={Reticula}/>
                        <Route exact path="/creditos" component={Creditos}/>
                        <Route exact path="/login" component={Acceso}/>
                        <Route exact path="/registro" component={Registro}/>
                        <Route exact path="/precios" component={Precios}/>
                        <Route exact path="/tos" component={ToS}/>
                        <Route
                            exact
                            path="/politicaprivacidad"
                            component={PoliticaPrivacidad}
                        />
                        <Route exact path="/olvidopassword" component={OlvidoPassword}/>
                        <Route exact path="/contacto" component={Contacto}/>
                        <Route exact path="/ubicaciones" component={Ubicaciones}/>
                        <Route exact path="/acercade" component={AcercaDe}/>
                        <Route exact path="/equipo" component={Equipo}/>
                        <Route exact path="/producto" component={Producto}/>
                        <Route path='*' exact={true} component={Componente404}/>
                    </Switch>
                </BrowserRouter>
                <Pie/>
            </div>
        );
    }

    return (
        <div className="App">
            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
            <MenuAppBar position="fixed"/>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Inicio}/>

                    {/*<Route exact path="/inicio"*/}
                    {/*       render={(props) => <Dashboard {...props} username="usuario"/>}/>*/}
                    {/*<Route exact path="/notas" component={Notas}/>*/}
                    {/*<Route exact path="/horario" component={Horario}/>*/}
                    {/*<Route exact path="/tareas" component={Tareas}/>*/}
                    {/*<Route exact path="/reticula" component={Reticula}/>*/}
                    {/*<Route exact path="/creditos" component={Creditos}/>*/}

                    <Route exact path="/login" component={Acceso}/>
                    <Route exact path="/registro" component={Registro}/>
                    <Route exact path="/precios" component={Precios}/>
                    <Route exact path="/tos" component={ToS}/>
                    <Route
                        exact
                        path="/politicaprivacidad"
                        component={PoliticaPrivacidad}
                    />
                    <Route exact path="/olvidopassword" component={OlvidoPassword}/>
                    <Route exact path="/contacto" component={Contacto}/>
                    <Route exact path="/ubicaciones" component={Ubicaciones}/>
                    <Route exact path="/acercade" component={AcercaDe}/>
                    <Route exact path="/equipo" component={Equipo}/>
                    <Route exact path="/producto" component={Producto}/>
                    <Route path='*' exact={true} component={Componente404}/>
                </Switch>
            </BrowserRouter>
            <Pie/>
        </div>
    );
}

function ToggleColorMode() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ToggleColorMode;
