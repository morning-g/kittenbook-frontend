import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function Materia({ tarea, materia }) {
  const {
    id,
    titulo,
    tab,
    grupo,
    clave,
    docente,
    semestre,
    oportunidad,
    calificacion,
  } = tarea;
  if (tab == materia) {
    return (
      <Grid item sx={{ display: "block", position: "relative" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            borderRadius: "20px",
            background: "white",
          }}
        >
          <CardActionArea sx={{ display: "flex", height: "100%" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Grupo: {grupo},Clave: {clave}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="#000"
              >
                {titulo}
              </Typography>
              <Typography color="text.secondary">{docente}</Typography>
              <Typography color="text.secondary">Semestre: {semestre}</Typography>
              <Typography color="text.secondary">Oportunidad: {oportunidad}</Typography>
            </CardContent>
            {/*Formato para la calificacion */}
            <CardContent>
            <Typography 
              sx={{ float: "right",
              height: "100%",
              marginTop: "-20px",
              marginLeft: "300px",
              marginRight: "20px",
              width: "20%",
              padding: "20px",
              display: "inline-block",
              position: "relative",
              border: "solid .1px",
              borderColor: "divider",
              flexDirection: "column",
              borderRadius: "20px",}}
              align="center"
              > {calificacion}</Typography>
            </CardContent>
          </CardActionArea>
          {/*Icono del lapiz
            <IconButton
                sx={{
                padding: 16 + "px",
                position: "absolute",
                right: 0,
                bottom: 0,
                }}
            >
                <EditIcon />
            </IconButton>*/}
        </Card>
      </Grid>
    );
  } else {
    return null;
  }
}
