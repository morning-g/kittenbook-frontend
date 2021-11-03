import React, { Component } from "react";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default function OldivoPassword() {
  return (
    <Container maxWidth="md">
      <br />
      <h2>Escribe aquí tu correo electrónico:</h2>
      <br />
      <TextField id="standard-basic" label="Correo electrónico" variant="standard" fullWidth={true} />
      <br />
      <Button variant="contained">Enviar</Button>
    </Container>
  );
}
