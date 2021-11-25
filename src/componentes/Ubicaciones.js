//<Resumen>
//Clase Ubicaciones que contiene un mapa mostrando mediante google maps de donde se
//encuentran las instalaciones de la empresa Omegaware.
//</Resumen>
//<Para> En esta clase se puede visualizar la ubicación de donde se encuentran nuestras oficinas
//fisicas mediante la ubicación de google maps.
//<Autor>Omegaware</Autor>
//<Fecha de creación> 11 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import React from "react";

import Container from "@mui/material/Container";

//Función principal que nos muestra un mapa en google maps
//de donde se encuentran las oficinas fisicas de Omegaware.
export default function Ubicaciones() {
  return (
    <Container maxWidth="sm">
      <br />
      <h3 align="center">Nuestras ubicaciones</h3>
      <div>
        <div>
          <iframe //formato del contenido
            title={"Ubicaciones Tec"}
            width="600"
            height="500"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Instituto%20Tecnologia%20de%20la%20Laguna&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}
