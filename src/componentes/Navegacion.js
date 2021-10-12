import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from "@mui/icons-material/Notes";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckIcon from "@mui/icons-material/Check";
import FeedIcon from "@mui/icons-material/Feed";

import React from "react";
import { Link } from "react-router-dom";

export default function Navegacion(props) {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Inicio"
        icon={<HomeIcon />}
        value="/"
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Notas"
        icon={<NotesIcon />}
        value="/notas"
        component={Link}
        to="/notas"
      />
      <BottomNavigationAction
        label="Horario"
        icon={<ScheduleIcon />}
        value="/horario"
        component={Link}
        to="/horario"
      />
      <BottomNavigationAction
        label="Tareas"
        icon={<CheckIcon />}
        value="/tareas"
        component={Link}
        to="/tareas"
      />
      <BottomNavigationAction
        label="Retícula"
        icon={<FeedIcon />}
        value="/reticula"
        component={Link}
        to="/reticula"
      />
    </BottomNavigation>
  );
}
