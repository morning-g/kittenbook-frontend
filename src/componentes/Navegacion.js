//<Resumen>
//Clase Navegacion la cual nos permite navegar entre las diferentes categorias
//Contiene una funcion el cual hace el llamado a las clases que son de las de categorias de la aplicación
//</Resumen>
//<para> En esta clase se llama a: inicio, notas, horario, tareas y reticula
//<Autor>Omegaware</Autor>
//<Fecha de creacion> 11 de octubre de 2021 </Fecha de creacion>

//**********************Imports************************************
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from "@mui/icons-material/Notes";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckIcon from "@mui/icons-material/Check";
import FeedIcon from "@mui/icons-material/Feed";

import React, { useEffect } from "react";
//*****************************************************************

//Funcion principal que determina la categoria que el usuario selecciono
export default function Navegacion() {
  const [value, setValue] = React.useState(0);

  //Comprueba mediante un switch el bóton que se seleecciono
  //para saber la clase a la que se dirigira
  useEffect(() => {
    switch (window.location.pathname) {
      case "/inicio":
        setValue(0);
        break;
      case "/notas":
        setValue(1);
        break;
      case "/horario":
        setValue(2);
        break;
      case "/tareas":
        setValue(3);
        break;
      case "/reticula":
        setValue(4);
        break;
      default:
        setValue(null);
    }
  }, []);

  return (
    //CREACIÓN DEL MENU SUPERIOR
    <BottomNavigation showLabels value={value}>
      {/*Creación del botón de inicio*/}
      <BottomNavigationAction
        label="Inicio"
        icon={<HomeIcon />}
        href="/inicio"
      />
      {/*Creación del botón de notas*/}
      <BottomNavigationAction
        label="Notas"
        icon={<NotesIcon />}
        href="/notas"
      />
      {/*Creación del botón de horario*/}
      <BottomNavigationAction
        label="Horario"
        icon={<ScheduleIcon />}
        href="/horario"
      />
      {/*Creación del botón de tareas*/}
      <BottomNavigationAction
        label="Tareas"
        icon={<CheckIcon />}
        href="/tareas"
      />
      {/*Creación del botón de tareas*/}
      <BottomNavigationAction
        label="Retícula"
        icon={<FeedIcon />}
        href="/reticula"
      />
    </BottomNavigation>
  );
}
