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
import { NavLink } from "react-router-dom";

export default class Navigation extends React.Component {
  render() {
    return (
      <BottomNavigation showLabels={true}>
        <NavLink to="/" activeClassName="selected">
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
        </NavLink>
        <NavLink to="/notas" activeClassName="selected">
          <BottomNavigationAction label="Notas" icon={<NotesIcon />} />
        </NavLink>
        <NavLink to="/horario" activeClassName="selected">
          <BottomNavigationAction label="Horario" icon={<ScheduleIcon />} />
        </NavLink>
        <NavLink to="/tareas" activeClassName="selected">
          <BottomNavigationAction label="Tareas" icon={<CheckIcon />} />
        </NavLink>
        <NavLink to="/reticula" activeClassName="selected">
          <BottomNavigationAction label="Retícula" icon={<FeedIcon />} />
        </NavLink>
      </BottomNavigation>
    );
  }
}
