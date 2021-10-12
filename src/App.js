import Navigation from "./components/Navegacion";
import Horario from "./components/Horario";
import Notas from "./components/Notas";
import Tareas from "./components/Tareas";
import Reticula from "./components/Reticula";
import Inicio from "./components/Inicio";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/notas" component={Notas} />
          <Route exact path="/horario" component={Horario} />
          <Route exact path="/tareas" component={Tareas} />
          <Route exact path="/reticula" component={Reticula} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
