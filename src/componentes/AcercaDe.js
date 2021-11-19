import React from "react";
import Container from "@mui/material/Container";
import logo from "../owlogo.png";
import logoKitten from "../bookish.png";
import "./image.css";

export default function AcercaDe() {
    const EstiloLogo = {};
    const mision = {fontSize: "1.2rem"};
    return (
        <Container maxWidth="md">
            <div>
                <br/>
                <h3 align="center">Acerca de OmegaWare</h3>

                <div style={EstiloLogo}>
                    <p className="aligncenter">
                        <img alt={"Logo de la empresa."} src={logo} width="25%" position="center"/>
                    </p>
                    <p style={mision}>
                        OmegaWare es una empresa dedicada a la creación de programas
                        (software) que actualmente esta establecida en la ciudad de Torreón,
                        Coahuila.
                        <br/>
                        <br/>
                        Nuestra mision es brindar una solución estable y eficiente a
                        nuestros clientes, que sea segura, cómoda y fácil de usar para
                        mejorar el rendimiento de su empresa y el de sus empleados.
                        <br/>
                        <br/>
                        La empresa comienza lanzando su app kittenbook la cual se enfoca en
                        mejorar la organización de los estudiantes mediante la
                        categorización de sus recursos más comunes: horario, retícula,
                        notas, tareas, y créditos.
                        <br/>
                    </p>
                    <br/>
                </div>
                <br/>
                <div style={EstiloLogo}>
                    <p className="aligncenter">
                        <img alt={"Un gato."} src={logoKitten} width="60%"/>
                    </p>
                    <p style={mision}>
                        Nuestra primera app y con la que se pretende crear un mercado de
                        usuarios universitarios, cuenta con modalidades gratis y paga.
                        <br/>
                        <br/>
                    </p>
                    <h2 align="center">¡Tu vida estudiantil al alcance de tu mano!</h2>
                </div>
            </div>
        </Container>
    );
}
