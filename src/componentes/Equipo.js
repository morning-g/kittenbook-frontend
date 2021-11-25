//<Resumen>
//Clase Equipo en la cual se muestra información del equipo de la empresa
//Contiene una sola función en lo que se realiza lo mencionado
//</Resumen>
//<Para> En esta clase se encuentra información del equipo de la empresa Omegaware
//<Autor>Omegaware</Autor>
//<Fecha de creación> 13 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import React from "react";
import logo from "../owlogo.png";
import "./image.css";
import Container from "@mui/material/Container";

//Función principal para mostrar la información del equipo de la empresa,
//se describe en forma general lo que realiza OmegaWare.
export default function Equipo() {
  const EstiloLogo = {};
  const equipo = { fontSize: "1.2rem" }; //formato para el contenido
  return (
    <Container maxWidth="md">
      <div>
        <br />
        <h3 align="center">Equipo OmegaWare</h3>

        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img //formato del logo de la empresa
              alt={"Logo de la empresa."}
              src={logo}
              width="25%"
              position="center"
            />
          </p>
          <p style={equipo}>
            Somos una empresa que busca la mejora de los estudiantes en la
            educación. Es por eso que nos enfocamos en proporcionar distintas
            herramientas para poder estructura y organizar mejor el tiempo del
            usuario dentro del ámbito educativo.
            <br />
            <br />
            Nuestro equipo de trabajo está operando de manera conjunta para
            poder alcanzar los objetivos y todos estamos yendo hacia una misma
            dirección, en base a la responsabilidad y el respeto.
            <br />
            <br />
            Para mantenernos confiables, estamos trabajando de manera
            trasparente y escuchando la opinión de ustedes. Estamos en mejoras
            constantes para que así el usuario se sienta seguro y confiable de
            pertenecer a nuestro equipo.
            <br />
          </p>
          <br />
        </div>
      </div>
    </Container>
  );
}
