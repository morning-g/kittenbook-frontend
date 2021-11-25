//<Resumen>
//Clase Contacto que sirve para vias de contacto hacia nosotros, ya sea que requiera contactarse a
//nosotros por ayuda con la aplicación, proponer mejoras, futuros proyectos o cualquier clase de
//incoveniente con nuestra aplicación.
//</Resumen>
//<Para> Proporcionamos números de teléfono y correos electrónicos para que pueda contactarse con la empresa Omegaware.
//<Autor>Omegaware</Autor>
//<Fecha de creación> 13 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import React from "react";
import Container from "@mui/material/Container";
import logo from "../owlogo.png";
import caraGato from "../CaradeGato.PNG";
import "./image.css";

//Función principal que muestra información sobre como pueden contactarnos
//proporcionando correos electrónicos y teléfonos de la empresa.
export default function AcercaDe() {
  const EstiloLogo = {};
  const mision = { fontSize: "1.2rem" }; //formato del contenido
  return (
    <Container maxWidth="md">
      <br />
      <div>
        <h3 align="center">Contacto</h3>
        <br />
        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img //formato de imagen de un gato
              alt={"Un gato."}
              src={caraGato}
              width="40%"
              position="center"
            />
          </p>
          <p style={mision}>
            <br />
            En este espacio encontrará los correos electrónicos para cualquier
            duda o sugerencia sobre la aplicación, también puede contactarnos si
            necesita ayuda técnica y de proyectos.
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
            <br />
            <ol>
              <li>+(872) 1373963</li>
              <li>+(871) 4839795</li>
            </ol>
          </p>
          <br />
        </div>
        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img //formato del logo de la empresa
              alt={"Logo de la empresa."}
              src={logo}
              width="20%"
            />
          </p>
        </div>
      </div>
    </Container>
  );
}
