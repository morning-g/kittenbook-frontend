import React, {Component} from "react";
import Button from "@mui/material/Button";
import { Container } from "react-bootstrap";

function Tarea () {
    return (
        <Container>
            <h3>Tarea Random</h3>
            <Button>Icono notificaciones</Button>
            <p style={{color: 'red'}}>Fecha límite: 21/Oct/2021: 23:59</p>
            <p style={{color: 'blue'}}>Individual</p>
            <textarea disabled></textarea>
            <a>tarea.jpg</a>
        </Container>
    );
}

export default Tarea;