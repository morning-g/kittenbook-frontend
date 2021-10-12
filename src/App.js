import Navegacion from "./componentes/Navegacion";
import Horario from "./componentes/Horario";
import Notas from "./componentes/Notas";
import Tareas from "./componentes/Tareas";
import Reticula from "./componentes/Reticula";
import Inicio from "./componentes/Inicio";
import Acceso from "./componentes/Login";
import Registro from "./componentes/Registro";
import Pie from "./componentes/Pie";
import MenuAppBar from "./componentes/AppBar";

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
          <Route exact path="/login" component={Acceso} />
          <Route exact path="/registro" component={Registro} />
        </Switch>
        <Stack spacing={2} direction="row">
          <Button variant="contained">Acceder</Button>
        </Stack>
      </BrowserRouter>
      <Pie />
    </div>
  );
}

export default App;
