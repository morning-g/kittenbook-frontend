import React from "react";
import Container from "@mui/material/Container";

export default function Dashboard(props) {
    return (
        <Container maxWidth="md">
            <br/>
            <br/>
            <h2 style={{textAlign: "center"}}>¡Bienvenid@, {props.username}!</h2>
            <br/>
            <img style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%"}} src={"http://media1.giphy.com/media/c54YHGDH63jJC/giphy.gif"}/>
        </Container>
    )
}