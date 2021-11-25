//<Resumen>
//Clase Pie en la cual se muestra el pie de la página principal
//Contiene la función Copyright, footers, rutasDiccionario y la principal para
//realizar lo mencionado
//</Resumen>
//<Para> En esta clase se muestra la estructura del pie de página.
//<Autor>Omegaware</Autor>
//<Fecha de creación> 12 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

//Función para mostrar que la app es de uso exclusivo por OmegaWare
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://kittenbook.software/">
        OmegaWare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//Función para mostrar la parte inferior de la estructura web
const footers = [
  {
    title: "Compañía",
    description: ["Equipo", "Acerca de", "Contacto", "Ubicaciones"],
  },
  {
    title: "Kittenbook",
    description: ["¿Qué es?", "Precios"],
  },
  {
    title: "Legal",
    description: ["Política de privacidad", "Términos de uso"],
  },
];

//Función para incluir las rutas de navegación del pie de página
const rutasDiccionario = {
  Equipo: "/equipo",
  "Acerca de": "/acercade",
  Contacto: "/contacto",
  Ubicaciones: "/ubicaciones",
  "¿Qué es?": "/producto",
  Precios: "/precios",
  "Política de privacidad": "/politicaprivacidad",
  "Términos de uso": "/tos",
};

//Función principal para mostrar el pie de página con todo su contenido
export default function Pie() {
  return (
    <React.Fragment>
      <Container //Formato para el contenedor de la parte inferior de la estructura
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map(
            (
              footer //Formato del grid para el contenido del pie de página
            ) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link //formato para las rutas de dirrección
                        href={rutasDiccionario[item]}
                        variant="subtitle1"
                        color="text.secondary"
                        underline={"none"}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            )
          )}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </React.Fragment>
  );
}
