import { Grid } from "@mui/material";
import React from "react";
import { Tarea } from "./Tarea";

export default function ListadoTareas({ tareas, materia }) {
  return (
    <Grid container spacing={1}>
      {tareas.map((tarea) => (
        <Tarea tarea={tarea} materia={materia} />
      ))}
    </Grid>
  );
}
