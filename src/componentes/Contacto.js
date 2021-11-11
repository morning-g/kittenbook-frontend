import React from "react";
import Container from "@mui/material/Container";
import logo from "../owlogo.png";
import logoKitten from "../bookish.png";
import caraGato from "../CaradeGato.PNG";
import "./image.css";

export default function AcercaDe(props) {
  const EstiloLogo = {};
  const mision = { fontSize: "1.2rem" };
  return (
    <Container maxWidth="md">
      <div>
      <h1 align ="center">Contacto</h1>
        <br />
        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img src={caraGato} width="40%" position="center"/>
          </p>
          <p style={mision}>
            <br/>
            En este espacio encontrara los correos electronicos 
            para cualquier duda o sugerencia sobre la aplicación, 
            también puede contactarnos si necesita ayuda tecnica y de proyectos.
            <br />
            <br />
            <br />
            <h3>Contactenos en los siguientes correos</h3>
            <br />
            contacto.kittenbook@gmail.com
            <br/>
            <br />
            programacion.kittenbook@gmail.com
            <br />
            <br />
            <br />
            <h3>Telefonos en los que nos puede contactar.</h3>
            <br/>
            (872) 1373963
            <br/>
            <br />
            (871) 4839795
          </p>
          <br />
        </div>
        <br />
        <br />
        <br />
        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img src={logo} width="20%" />
          </p>
        </div>
      </div>
    </Container>
  );
}
