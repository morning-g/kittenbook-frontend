//<Resumen>
//Clase Precios en la cual se muestra información de los precios de la app
//Contiene la función tiers, Precios y la función principal en lo que se realiza lo mencionado
//</Resumen>
//<Para> En esta clase se encuentra información de los precios para adquirir
//la aplicación kittenbook
//<Autor>Omegaware</Autor>
//<Fecha de creación> 15 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

//función para mostrar la información de cada paquete de precios
const tiers = [
  {
    //información del paquete gratis
    title: "Gatito negro",
    price: "0",
    description: [
      "Productividad básica",
      "Caja de arena",
      "Leche diaria",
      "Estambre incluido",
    ],
    buttonText: "Elegir",
    buttonVariant: "outlined",
  },
  {
    //información del paquete normal
    title: "Gato negro",
    subheader: "Sugerido",
    price: "111",
    description: [
      "Productividad moderada",
      "Salidas permitidas",
      "Ratones incluidos",
      "Árbol propio",
    ],
    buttonText: "Elegir",
    buttonVariant: "contained",
  },
  {
    //información del paquete especial con todas las funcionalidades
    title: "Pantera negra",
    price: "279",
    description: [
      "Productividad máxima",
      "Sardinas semanales",
      "Contacto con otras camadas",
      "Sabana propia",
    ],
    buttonText: "Contáctanos",
    buttonVariant: "outlined",
  },
];

//función para mostrar la información estructurada por paquete de precios
function Precios() {
  return (
    <React.Fragment>
      <GlobalStyles //formato de estilo grobal para el contenido
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      {/* Espaciado entre contenido de paquetes */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography //formato para la tipografía de la palabra "Precios"
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Precios
        </Typography>
        <Typography //formato para la tipografía de "Productividad. Aprendizaje. Planificación."
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Productividad. Aprendizaje. Planificación.
        </Typography>
      </Container>
      {/* Espaciado entre contenido de paquetes */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // formato para el grid y card para el contenido de la información
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader //formato para las tarjetas del encabezado
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box //formato del Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography //formato de la tipografía
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mes
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography //formato para la tipografia de la descripción
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

//función principal donde se hace la llamada de la función anterior y así mostrar
//la información de los precios de la aplicación kittenbook
export default function Pricing() {
  return <Precios />;
}
