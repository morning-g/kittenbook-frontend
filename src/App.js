// import Table from "react-bootstrap/Table";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Container from "react-bootstrap/Container";
// import Button from "@mui/material/Button";
// import DataGrid from "@mui/material/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
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
