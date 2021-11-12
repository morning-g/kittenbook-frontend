import React from "react";
import { Tarea } from "./Tarea";
import Grid from "@mui/material/Grid";

export default function ListadoTareas({ tareas, materia }) {
  return (
    <Grid container sx={{columnGap:1, rowGap:1, display:"contents"}}>
      {tareas.map((tarea) => (
        <Tarea tarea={tarea} materia={materia} />
      ))}
    </Grid>
  );
}
