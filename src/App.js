import Navegacion from "./componentes/Navegacion";
import OlvidoPassword from "./componentes/OlvidoPassword";
import Ubicaciones from "./componentes/Ubicaciones";
import AcercaDe from "./componentes/AcercaDe";
import Contacto from "./componentes/Contacto";
import Equipo from "./componentes/Equipo";
import Horario from "./componentes/Horario";
import Producto from "./componentes/Producto";
import Notas from "./componentes/Notas";
import Tareas from "./componentes/Tareas";
import Reticula from "./componentes/Reticula";
import Inicio from "./componentes/Inicio";
import Acceso from "./componentes/Login";
import Registro from "./componentes/Registro";
import Creditos from "./componentes/Creditos"
import Pie from "./componentes/Pie";
import MenuAppBar from "./componentes/AppBar";
import Precios from './componentes/Precios';
import PoliticaPrivacidad from './componentes/PoliticaPrivacidad';
import ToS from "./componentes/ToS";


import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navegacion /> */}
        <MenuAppBar />
        <Switch>
          <Route exact path="/" component={Inicio} />

          <Route exact path="/notas" component={Notas} />
          <Route exact path="/horario" component={Horario} />
          <Route exact path="/tareas" component={Tareas} />
          <Route exact path="/reticula" component={Reticula} />
          <Route exact path="/creditos" component={Creditos} />
          <Route exact path="/login" component={Acceso} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/precios" component={Precios} />
          <Route exact path="/tos" component={ToS} />
          <Route exact path="/politicaprivacidad" component={PoliticaPrivacidad} />
          <Route exact path="/olvidopassword" component={OlvidoPassword} />
          <Route exact path="/contacto" component={Contacto} />
          <Route exact path="/ubicaciones" component={Ubicaciones} />
          <Route exact path="/acercade" component={AcercaDe} />
          <Route exact path="/equipo" component={Equipo} />
          <Route exact path="/producto" component={Producto} />
        </Switch>
        {/* <Stack spacing={2} direction="row">
          <Button variant="contained">Acceder</Button>
        </Stack> */}
      </BrowserRouter>
      <Pie />
    </div>
  );
}

export default App;
