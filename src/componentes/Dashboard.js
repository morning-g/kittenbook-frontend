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
                width: "50%"}} alt={"Un gato."} src={"http://media1.giphy.com/media/c54YHGDH63jJC/giphy.gif"}/>
            <br/>
            <br/>
            <h4>¿Cómo usar esta plataforma?</h4>
            <p>Kittenbook es una plataforma destinada al estudiante universitario. Como tal, te ayuda a organizarte en tu día a día.</p>
            <ul type="square">
                <li><b>Notas</b> te ayuda a tomar notas rápidas o recordatorios que no quieras olvidar.</li>
                <li><b>Horario</b> te ayuda a administrar tu agenda diaria, llevando cuenta de tu carga académica. <i>Sólo puedes añadir materias que estés cursando actualmente a tu horario.</i></li>
                <li><b>Tareas</b> te ayuda a administrar tus deberes o trabajos asignados. <i>Sólo puedes añadir tareas a materias que estés cursando y que estén registradas en tu horario.</i></li>
                <li><b>Retícula</b> te ayuda a administrar tu historial académico, llevando cuenta de tu promedio y de los créditos que tengas completados.</li>
            </ul>
        </Container>
    )
}