import React from "react";
import Container from "@mui/material/Container";

export default function Componente404() {
    return (
        <Container maxWidth="md">
            <br/>
            <br/>
            <img style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%"
            }} alt={"Un gato"}
                 src={"http://amazinganimalphotos.com/wp-content/uploads/2014/10/best-slow-mo-video-ever.gif"}/>
        </Container>
    )
}