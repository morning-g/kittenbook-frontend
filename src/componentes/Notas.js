import React, { Component } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Notas() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div>
          <h2>Tus notas</h2>
        </div>
      <main>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h7" component="h7">
                      Materia: materia
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Titulo
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit sed magnis maecenas quam, vivamus convallis leo rhoncus primis duis sollicitudin senectus nostra. 
                    </Typography>
                    <Typography textAlign="right">
                      N°:1 
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Nota anterior</Button>
                    <Button size="small">Siguiente nota</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}