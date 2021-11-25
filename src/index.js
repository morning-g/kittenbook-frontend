//<Resumen>
//Clase index que ayuda a renderizar la aplicación completa
//</Resumen>
//<Para> Renderizar la aplicación web
//<Autor>Omegaware</Autor>
//<Fecha de creación> 12 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import React from "react";
import ReactDOM from "react-dom";
import ToggleColorMode from "./App";

//función que ayuda a renderizar toda la aplicación web
ReactDOM.render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>,
  document.getElementById("root") //se obtiene el elemento por Id
);
