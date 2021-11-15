import React from "react";
import Container from "@mui/material/Container";

export default function Dashboard (props) {
    return (
        <Container maxWidth="md">
            <br />
            <br />
            <h2>¡Bienvenid@, {props.username}!</h2>
            <br/>
            <img src={"http://media1.giphy.com/media/c54YHGDH63jJC/giphy.gif"}/>
        </Container>
    )
}