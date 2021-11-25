//<Resumen>
//Clase Producto en la cual se muestra información del proyecto de la empresa
//Contiene una sola función en lo que se realiza lo mencionado
//</Resumen>
//<Para> En esta clase se encuentra información del proyecto kittenbook
//<Autor>Omegaware</Autor>
//<Fecha de creación> 14 de octubre de 2021</Fecha de creación>

//imports utilizados por esta clase
import React from "react";
import logoKitten from "../bookish.png";
import "./image.css";
import Container from "@mui/material/Container";

//función principal para mostrar la información del proyecto kittenbook
export default function Producto() {
  const EstiloLogo = {};
  const producto = { fontSize: "1.2rem", alignText: "justify" }; //formato para el contenido
  return (
    <Container maxWidth="md">
      <div>
        <br />
        <h3 align="center">¿Qué es?</h3>

        <div style={EstiloLogo}>
          <p className="aligncenter">
            <img //formato para el logo del proyecto
              alt={"Un gato."}
              src={logoKitten}
              width="60%"
            />
          </p>
          <p style={producto}>
            Kittenbook es un software orientado a mejorar la organización de la
            vida estudiantil, es ideal para alumnos que se les dificulta
            organizar sus tiempos y responsabilidades académicas.
            <br />
            <br />
            En el mundo académico surge la necesidad de administrar información
            de corto plazo, tales como tareas pendientes, proyectos en progreso,
            compromisos, notas tomadas en clase, etc., así como también
            información a largo plazo, tal como historial de asignaturas,
            créditos a cumplir, aplicaciones a residencias profesionales, etc.
            El lidiar de manera efectiva y organizada con la abundante
            información que surja es nuestro objetivo.
            <br />
            <br />
            Kittenbook resolverá la problemática de los estudiantes para
            organizar sus actividades escolares, (apuntes, horarios, retícula,
            etc), ya que esto les provoca que tengan problemas a la hora de
            buscar estos documentos.
            <br />
          </p>
          <br />
        </div>
        <br />
        <div style={EstiloLogo}>
          <p style={producto}>
            <h5>Novedades que ofrecemos</h5>
            <h6>Retícula</h6>
            Visualiza el estado de tus materias de una manera más rápida y
            fácil.
            <br />
            <br />
            <br />
            <h6>Horario</h6>
            Organiza tus día, creando tu propio horario de materias.
            <br />
            <br />
            <br />
            <h6>Lista de Tareas</h6>
            Crea tu propia lista de tareas y consulta su estado.
            <br />
            <br />
            <br />
            <h6>Apuntes</h6>
            ¿Necesitas guardar información importante? Aquí podrás crear notas y
            organizarlas con etiquetas.
            <br />
            <br />
            <br />
            <h6>Conteo de créditos</h6>
            Visualiza los créditos que llevas realizando durante el semestre en
            que te encuentres.
            <br />
            <br />
            <br />
          </p>
          <h2 align="center">¡Tu vida estudiantil al alcance de tu mano!</h2>
        </div>
      </div>
    </Container>
  );
}
