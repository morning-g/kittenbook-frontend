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
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    if (user) {
        return (
            <div className="App">
                <MenuAppBarLogeado username={username} position="fixed"/>
                <Navegacion/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Inicio}/>
                        <Route exact path="/inicio"
                               render={(props) => <Dashboard {...props} username="usuario"/>}/>
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
            <MenuAppBarLogeado position="fixed"/>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Inicio}/>

                    <Route exact path="/inicio"
                           render={(props) => <Dashboard {...props} username="usuario"/>}/>
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

export default App;
