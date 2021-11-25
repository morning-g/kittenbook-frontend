//<Resumen>
//Clase 404 sirve para cuando no se encuentra una ruta que no esta definida en la clase App aparezca un gif
//</Resumen>
//<Para> Muesta un gif al no encontrar una ruta que no esta definida en la aplicación.
//<Autor>Omegaware</Autor>
//<Fecha de creación> 15 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import React from "react";
import Container from "@mui/material/Container";

//Función principal en la cual se contiene un gif en caso de que la inferfaz que se busque no se encuentre.
export default function Componente404() {
  return (
    <Container maxWidth="md">
      <br />
      <br />
      <img
        style={{
          //formato de estilo para el gif
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
        alt={"Un gato"}
        src={
          //dirección de ruta donde se encuentra el gif
          "http://amazinganimalphotos.com/wp-content/uploads/2014/10/best-slow-mo-video-ever.gif"
        }
      />
    </Container>
  );
}
