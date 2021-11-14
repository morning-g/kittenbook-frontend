import React from "react";
import Container from "@mui/material/Container";
import logo from "../owlogo.png";
import caraGato from "../CaradeGato.PNG";
import "./image.css";

export default function AcercaDe(props) {
  const EstiloLogo = {};
  const mision = { fontSize: "1.2rem" };
  return (
    <Container maxWidth="md">
      <br />
      <div>
      <h3 align ="center">Contacto</h3>
        <br />
        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img alt={"Un gato."} src={caraGato} width="40%" position="center"/>
          </p>
          <p style={mision}>
            <br/>
            En este espacio encontrará los correos electrónicos
            para cualquier duda o sugerencia sobre la aplicación, 
            también puede contactarnos si necesita ayuda técnica y de proyectos.
            <br />
            <br />
            <br />
            <h3>Contáctanos en los siguientes correo:</h3>
            <br />
            <ol>
              <li>contacto.kittenbook@gmail.com</li>
              <li>programacion.kittenbook@gmail.com</li>
            </ol>
            <br />
            <br />
            <br />
            <h3>Contáctanos en los siguientes teléfonos:</h3>
            <br/>
            <ol>
              <li>+(872) 1373963</li>
              <li>+(871) 4839795</li>
            </ol>
          </p>
          <br />
        </div>
        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img alt={"Logo de la empresa."} src={logo} width="20%" />
          </p>
        </div>
      </div>
    </Container>
  );
}
