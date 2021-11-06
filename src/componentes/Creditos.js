import React, { Component } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./estilo.css";

const cards = [1, 2, 3, 4, 5, 6];

const theme = createTheme();

export default function Creditos() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 2,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Creditos
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Restantes: 160 Cursados: 120
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Creditos aportados por tus materias cursadas
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="xl">
          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={2}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0px 15px 25px rgba(0,0,0,0.50)",
                    borderRadius: "15px",
                    border: "divider",
                  }}
                >
                  <a href="reticula">
                    <div class="contenedor">
                      <figure>
                        <CardMedia
                          component="img"
                          sx={{
                            pt: "10%",
                          }}
                          image="https://lh3.googleusercontent.com/036_VeX0TwYq3kBHafBiR2ty69mrlNWwYgrOR_5N06HR2R2ZTNMhLiX60hR_9taHAsApOlQ=s146"
                          alt="random"
                        />
                        <div class="capa">
                          <h3 fontFamily="-apple-system"> 5</h3>
                          <p fontFamily="-apple-system">Ver materia</p>
                        </div>
                      </figure>
                    </div>
                  </a>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                      fontFamily="arial"
                    >
                      Nombre de la materia
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
