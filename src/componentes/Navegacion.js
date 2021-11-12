import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from "@mui/icons-material/Notes";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckIcon from "@mui/icons-material/Check";
import FeedIcon from "@mui/icons-material/Feed";

import React from "react";

export default function Navegacion(props) {
    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction
                label="Inicio"
                icon={<HomeIcon/>}
                href="/inicio"
            />
            <BottomNavigationAction
                label="Notas"
                icon={<NotesIcon/>}
                href="/notas"
            />
            <BottomNavigationAction
                label="Horario"
                icon={<ScheduleIcon/>}
                href="/horario"
            />
            <BottomNavigationAction
                label="Tareas"
                icon={<CheckIcon/>}
                href="/tareas"
            />
            <BottomNavigationAction
                label="Retícula"
                icon={<FeedIcon/>}
                href="/reticula"
            />
        </BottomNavigation>

    );
}
