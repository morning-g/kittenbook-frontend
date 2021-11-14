import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function Tarea({ tarea, materia }) {
  const {
    contenido,
    titulo,
    tab,
    categoria,
    actual,
    limite,
    recurso,
    grupo,
    docente,
    semestre,
    oportunidad,
    calificacion
  } = tarea;
  var fecha_limite = ( limite.getDate() ) - ( actual.getDate() )
  if  ( tab == materia ) {
  return (
    <Grid item sx={{ display: "block", position: "relative" }}>
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background: "white",
            }}
            >
            <CardActionArea
                sx={{ display: "flex", height: "100%", alignItems: "flex-start" }}
            >
                <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="#000"
                >
                    {titulo}
                </Typography>
                {/* <Typography>
                    {fecha_limite}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {actual.getFullYear() +
                    "-" +
                    ("0" + (actual.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + actual.getDate()).slice(-2) +
                    " - " +
                    ("0" + actual.getHours()).slice(-2) +
                    ":" +
                    ("0" + actual.getMinutes()).slice(-2) +
                    ":" +
                    ("0" + actual.getSeconds()).slice(-2)}
                </Typography> */}
                { fecha_limite > 3 && (
                    <Typography variant="body2" color="green">
                    {limite.getFullYear() +
                        "-" +
                        ("0" + (limite.getMonth() + 1)).slice(-2) +
                        "-" +
                        ("0" + limite.getDate()).slice(-2) +
                        " - " +
                        ("0" + limite.getHours()).slice(-2) +
                        ":" +
                        ("0" + limite.getMinutes()).slice(-2) +
                        ":" +
                        ("0" + limite.getSeconds()).slice(-2)}
                    </Typography>
                )}
                { fecha_limite <= 3 && fecha_limite > 1 && (
                    <Typography variant="body2" color="yellow">
                    {limite.getFullYear() +
                        "-" +
                        ("0" + (limite.getMonth() + 1)).slice(-2) +
                        "-" +
                        ("0" + limite.getDate()).slice(-2) +
                        " - " +
                        ("0" + limite.getHours()).slice(-2) +
                        ":" +
                        ("0" + limite.getMinutes()).slice(-2) +
                        ":" +
                        ("0" + limite.getSeconds()).slice(-2)}
                    </Typography>
                )}
                { fecha_limite <= 1 && (
                    <Typography variant="body2" color="red">
                    {limite.getFullYear() +
                        "-" +
                        ("0" + (limite.getMonth() + 1)).slice(-2) +
                        "-" +
                        ("0" + limite.getDate()).slice(-2) +
                        " - " +
                        ("0" + limite.getHours()).slice(-2) +
                        ":" +
                        ("0" + limite.getMinutes()).slice(-2) +
                        ":" +
                        ("0" + limite.getSeconds()).slice(-2)}
                    </Typography>
                )}
                { categoria === "Individual" && ( 
                    <Typography variant="body2" color="text.secondary" color="orange">
                        {categoria}
                    </Typography>
                )}
                { categoria === "En equipo" && ( 
                    <Typography variant="body2" color="text.secondary" color="green">
                        {categoria}
                    </Typography>
                )}
                <Typography
                    variant="string"
                    align={"justify"}
                    color="text.primary"
                >
                    {contenido}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {recurso !== null && recurso}
                </Typography>
                </CardContent>
            </CardActionArea>
            <IconButton
                sx={{
                padding: 16 + "px",
                position: "absolute",
                right: 0,
                bottom: 0,
                }}
            >
                <EditIcon />
            </IconButton>
        </Card>
    </Grid>
  );
}
else {
    return null;
}
}
