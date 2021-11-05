import React from "react";
import styles from './estilo.css';
import Container from "@mui/material/Container";
import logo from "../bookish.png";
export default function AcercaDe(props) {
    return (
        <Container maxWidth="md">
            <div>
                <h3>Kitten Book un producto de OmegaWare</h3>
                <p>Omega Ware es una empresa dedicada a la creación de programas (software) que actualmente esta establecida en la ciudad de Torreón, Coahuila<br/><br/>La empresa comienza lanzando su app kittenbook la cual se enfoca en mejorar la organización de los estudiantes mediante la categorización de sus recursos más comunes: horario, retícula, notas, tareas, y créditos.<br/>La app surge de la necesidad de tener un software dedicado a la vida estudiantil<br/><br/>.</p>  
            </div>
        </Container>
    );
}