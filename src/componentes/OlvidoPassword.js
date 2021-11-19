import React from "react";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function OldivoPassword() {
    return (
        <Container maxWidth="md">
            <br/>
            <h5>Escribe aquí tu correo electrónico:</h5>

            <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    id="standard-basic"
                    label="Correo electrónico"
                    variant="standard"
                    fullWidth={true}
                />
                <Button variant="contained">Enviar</Button>
            </Stack>
        </Container>
    );
}
