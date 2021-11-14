import React from "react";
import Materia from "./Materia";
import Grid from "@mui/material/Grid";

export default function MateriasEstilo({ tareas, materia }) {
  return (
    <Grid container sx={{display:"block"}}>
      {tareas.map((tarea) => (
        <Materia tarea={tarea} materia={materia} />
      ))}
    </Grid>
  );
}
