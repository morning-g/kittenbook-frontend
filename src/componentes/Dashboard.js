import React from "react";
import Container from "@mui/material/Container";

export default function Dashboard (props) {
    return (
        <Container maxWidth="md">
            <br />
            <br />
            <h2>¡Bienvenido, {props.username}!</h2>
        </Container>
    )
}