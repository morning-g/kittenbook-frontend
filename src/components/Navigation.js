import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from "@mui/icons-material/Notes";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckIcon from "@mui/icons-material/Check";
import FeedIcon from "@mui/icons-material/Feed";
import React from "react";
import Horario from "./Horario";
import Notas from "./Notas";
import Tareas from "./Tareas";
import Reticula from "./Reticula";
import Inicio from "./Inicio";
import { Link } from "react-router-dom";

export default class Navigation extends React.Component {
  render() {
    return (
      <BottomNavigation showLabels>
        <Link to="/" ><BottomNavigationAction label="Inicio" icon={<HomeIcon />}/></Link>
        <Link to="/notas" ><BottomNavigationAction label="Notas" icon={<NotesIcon />} /></Link>
        <Link to="/horario" ><BottomNavigationAction label="Horario" icon={<ScheduleIcon />} /></Link>
        <Link to="/tareas" ><BottomNavigationAction label="Tareas" icon={<CheckIcon />} /></Link>
        <Link to="/reticula" ><BottomNavigationAction label="Retícula" icon={<FeedIcon />} /></Link>
      </BottomNavigation>
    );
  }
}
