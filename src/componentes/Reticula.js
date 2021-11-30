//imports utilizados por esta clase
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Slider from "@mui/material/Slider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReticulaSistemasEspTICs from "../ReticulaSistemasEspTICs.png";
import ReticulaSistemasEspTecnologiasWeb from "../ReticulaSistemasEspTecnologiasWeb.png";
import ReticulaElectronicaEspMecatronica from "../ReticulaElectronicaEspMecatronica.png";
import ReticulaElectronicaEspSistemasEnergeticos from "../ReticulaElectronicaEspSistemasEnergeticos.png";
import ReticulaElectricaEspSistemasElectricos from "../ReticulaElectricaEspSistemasElectricos.png";
import ReticulaGestionEmpresarial from "../ReticulaGestionEmpresarial.png";
import ReticulaQuimicaEspGestionAmbiental from "../ReticulaQuimicaEspGestionAmbiental.png";
import ReticulaMecanicaEspDisenoMecanico from "../ReticulaMecanicaEspDisenoMecanico.png";
import ReticulaMecanicaEspTermica from "../ReticulaMecanicaEspTermica.png";
import Axios from "axios";

//Funcion para generar los paneles de materia y reticula
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    //Propiedades para cada panel
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }} //tamaño de la barra de paneles
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/*Espaciado entre paneles*/}
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
//Propiedades para generar los paneles
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
//Funcion principal para devolver el contenido
export default function Reticula() {
  return (
    <Box sx={{ width: "100%" }}>
      {/*Tamaño del cuadro de contenido*/}
      <ListaTabs />
    </Box>
  );
}
//Funcion para generar los tabs de la reticula, solo accesible por inicio de sesion
function ListaTabs() {
  Axios.defaults.withCredentials = true;
  const headers = {
    "Content-Type": "application/json",
  };

  //Estados para agregar las materias, semestres, datos, etc.
  const [accionUsuario, setAccionUsuario] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [historialPartido, setHistorialPartido] = useState([]);
  const [idCurso, setIdCurso] = useState("");
  const [claveMateria, setClaveMateria] = useState("");
  const [estadoMateria, setEstadoMateria] = useState("");
  const [semestreMateria, setSemestreMateria] = useState(0);
  const [calificacionMateria, setCalificacionMateria] = useState(0);
  const [periodoMateria, setPeriodo] = useState("");
  const [anoMateria, setAnoMateria] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [dialogoAgregarAbierto, setDialogoAgregarAbierto] = useState(false);
  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
  const [presionoAprobada, setPresionoAprobada] = useState(false);
  let i = 0; //Contador para casos
  let condicion;
  //Condicion por si la materia fue aprobada para pedir los datos correspondientes
  if (presionoAprobada) {
    condicion =
      claveMateria === "" ||
      estadoMateria === "" ||
      semestreMateria === 0 ||
      periodoMateria === "" ||
      anoMateria === 0;
  } else {
    condicion = claveMateria === "" || estadoMateria === "";
  }

  useEffect(() => {
    Axios.get("https://kittenbook.software:3005/api/materias")
      .then((res) => {
        setMaterias(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get("https://kittenbook.software:3005/api/historial")
      .then((res) => {
        setHistorialPartido(partirReticula(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accionUsuario]);

  //Funcion que pone en 0 o vacio los datos
  const limpiar = () => {
    setClaveMateria("");
    setEstadoMateria("");
    setSemestreMateria(0);
    setCalificacionMateria(0);
    setPeriodo("");
    setAnoMateria(0);
  };

  //dividir reticula en categorias para una mejor organizacion, primero aprobadas, en curso, y por ultimo
  //pendientes de cursar (entiendase reprobada por materia por cursar)
  const partirReticula = (reticula) => {
    let aprobadasReticula = [];
    let enCursoReticula = [];
    let porCursarReticula = [];
    reticula.forEach((materiaReticula) => {
      if (materiaReticula.estado === "Aprobada") {
        aprobadasReticula.push(materiaReticula);
      } else if (materiaReticula.estado === "En curso") {
        enCursoReticula.push(materiaReticula);
      } else if (materiaReticula.estado === "Por cursar") {
        porCursarReticula.push(materiaReticula);
      }
    });
    return [aprobadasReticula, enCursoReticula, porCursarReticula];
  };

  //Las siguientes funciones controlan los eventos que pueden ocurrir en esta seccion
  //incluyendo eliminar materias, agregarlas, cambiar estado, abrir cuadros de dialogo etc.
  const handleEliminarAbierto = () => {
    setDialogoEliminarAbierto(true);
  };

  const handleEliminarCerrado = () => {
    setDialogoEliminarAbierto(false);
  };

  const handleAgregarAbierto = () => {
    setDialogoAgregarAbierto(true);
  };

  const handleAgregarCerrado = () => {
    setDialogoAgregarAbierto(false);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //con estas funciones se obtienen los datos que el usuario tiene que introducir
  //en el cuadro de dialogo al seleccionar el tipo de materia que agregara a su seccion reticula
  //se obtienen los valores para cada elemento de cada materia recorriendo un ciclo
  const getNombreMateria = (clave_materia) => {
    let result;
    materias.forEach((materia) => {
      if (materia.clave_materia === clave_materia) {
        result = materia.nombre_materia;
      }
    });
    return result;
  };

  const getCreditosMateria = (ClaveMateria) => {
    let creditos;
    materias.forEach((materia) => {
      if (materia.clave_materia === ClaveMateria) {
        creditos = materia.creditos_materia;
      }
    });
    return creditos;
  };
  //En esta funcion se realiza una operacion suma para obtener los creditos acumulados
  const getCreditos = (materiasAprobadas) => {
    let suma = 0;
    materiasAprobadas.forEach((materia) => {
      suma += getCreditosMateria(materia.clave_materia);
    });
    return suma;
  };
  //Aqui se realizan operaciones para obtener la calificacion de cada materia aprobada
  //despues se realiza una division entre la cantidad de materias aprobadas
  const getPromedio = (materiasAprobadas) => {
    let suma = 0;
    let i;
    for (i = 0; i < materiasAprobadas.length; i++) {
      suma += materiasAprobadas[i]["calificacion"];
    }
    return suma / i;
  };

  //funcion para recojer los valores que el usuario ingresa en el formulario
  //al seleccionar una materia para agregar
  const agregarMateria = () => {
    // getMaterias();
    setAccionUsuario(!accionUsuario);
    Axios.post(
      "https://kittenbook.software:3005/api/historial",
      {
        clave_materia: claveMateria,
        estado: estadoMateria,
        semestre_cursada: semestreMateria,
        calificacion: calificacionMateria,
        periodo_cursada: periodoMateria + " " + anoMateria,
      },
      { headers }
    )
      .then((res) => {
        console.log("Materia creada.");
      })
      .catch((err) => {
        console.log(err);
      });
    limpiar();
  };
  //funcion para elminar materias identificandolas por su id del curso
  const eliminarMateria = (idCurso) => {
    setAccionUsuario(!accionUsuario);
    Axios.delete(
      "https://kittenbook.software:3005/api/historial",
      {
        data: {
          id_curso: idCurso,
        },
      },
      { headers }
    )
      .then((res) => {
        console.log("Materia eliminada.");
      })
      .catch((err) => {
        console.log(err);
      });
    limpiar(); //se limpia la seccion de esa materia
  };

  //funcion de react para generar los tabs
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    //Box para el contenido debajo del nav bar entre materias y reticula
    <div>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {/*TABS y sus propiedades*/}
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="primary"
          variant="scrollable"
        >
          {" "}
          {/*Tabs generadas */}
          <Tab label="Materias" {...a11yProps(0)} />
          <Tab label="Retículas por carrera" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/*Contenido de la reticula*/}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
        }}
      >
        <TabPanel index={0} value={tabValue}>
          <Grid container spacing={0.5} sx={{ width: "100%" }}>
            {historialPartido[0] !== undefined
              ? historialPartido[0].length !== 0
                ? historialPartido[0].map((materiaReticula) => (
                    <Grid //Formato para el grid de la materia en aprobada
                      item
                      xs={12}
                      sm={6}
                      md={2}
                      key={materiaReticula.id_curso.toString() + "0"}
                    >
                      <Card
                        sx={{
                          //Formato para el card de la materia aprobada
                          height: "110%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "15px",
                          border: "divider",
                        }}
                      >
                        <CardActionArea
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(255, 0, 0, 0.2)",
                              transform: "scale3d(1.05, 1.05, 1)",
                            },
                          }}
                          onClick={() => {
                            setIdCurso(materiaReticula.id_curso);
                            handleEliminarAbierto();
                          }}
                        >
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {"Clave: " + materiaReticula.clave_materia}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              style={{ color: "green" }}
                            >
                              {getNombreMateria(materiaReticula.clave_materia)}
                            </Typography>
                            <Typography color="text.secondary">
                              {"Cursada: " + materiaReticula.periodo_cursada}
                            </Typography>
                            <Typography color="text.secondary">
                              {"Semestre " + materiaReticula.semestre_cursada}
                            </Typography>
                          </CardContent>
                          {/*Formato para el numero de la calificacion*/}
                          <CardContent>
                            <Typography
                              sx={{
                                float: "left",
                                height: "100%",
                                marginTop: "-20px",
                                marginLeft: "40px",
                                marginRight: "40px",
                                width: "48%",
                                padding: "20px",
                                display: "inline-block",
                                position: "relative",
                                border: "solid .1px",
                                borderColor: "divider",
                                flexDirection: "column",
                                borderRadius: "20px",
                                align: "center",
                              }}
                            >
                              {materiaReticula.calificacion}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : null
              : null}
            {/*Cars de las materias en curso*/}
            {historialPartido[1] !== undefined
              ? historialPartido[1].length !== 0
                ? historialPartido[1].map((materiaReticula) => (
                    <Grid //Propiedades del grid
                      item
                      xs={12}
                      sm={6}
                      md={2}
                      key={materiaReticula.id_curso.toString() + "1"}
                    >
                      <Card
                        sx={{
                          height: "110%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "15px",
                          border: "divider",
                        }}
                      >
                        <CardActionArea
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(255, 0, 0, 0.2)",
                              transform: "scale3d(1.05, 1.05, 1)",
                            },
                          }}
                          onClick={() => {
                            setIdCurso(materiaReticula.id_curso);
                            handleEliminarAbierto();
                          }}
                        >
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {"Clave: " + materiaReticula.clave_materia}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              style={{ color: "blue" }}
                            >
                              {getNombreMateria(materiaReticula.clave_materia)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : null
              : null}
            {/*Formatos para materias aprobadas */}
            {historialPartido[2] !== undefined
              ? historialPartido[2].length !== 0
                ? historialPartido[2].map((materiaReticula) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={2}
                      key={materiaReticula.id_curso.toString() + "2"}
                    >
                      <Card
                        sx={{
                          height: "110%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "15px",
                          border: "divider",
                        }}
                      >
                        <CardActionArea
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(255, 0, 0, 0.2)",
                              transform: "scale3d(1.05, 1.05, 1)",
                            },
                          }}
                          onClick={() => {
                            setIdCurso(materiaReticula.id_curso);
                            handleEliminarAbierto();
                          }}
                        >
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {"Clave: " + materiaReticula.clave_materia}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              style={{ color: "#b9b900" }}
                            >
                              {getNombreMateria(materiaReticula.clave_materia)}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : null
              : null}
          </Grid>
        </TabPanel>
        {/*Segundo tab que muestra las reticulas de las carreras*/}
        <TabPanel index={1} value={tabValue}>
          <Grid
            container //El selector ocupa el ancho de la pantalla
            sx={{ justifyContent: "space-between", columnGap: 1, rowGap: 1 }}
          >
            <Accordion>
              <AccordionSummary //Fomrato de panel para esta seccion
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  {" "}
                  {/*Se escribe el titulo de la carrera para la reticula que se mostrara*/}
                  Ing. Sistemas (especialidad tecnologías de la información y la
                  comunicación)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/*Se agrega la imagen de la reticula al accordion*/}
                <img
                  alt={"Reticula Sistemas"}
                  src={ReticulaSistemasEspTICs}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  Ing. Sistemas (especialidad en tecnologías web y móvil)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Sistemas"}
                  src={ReticulaSistemasEspTecnologiasWeb}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  Ing. Electrónica (especialidad mecatrónica y control
                  automático)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Electronica"}
                  src={ReticulaElectronicaEspMecatronica}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  Ing. Electrónica (especialidad sistemas energéticos e
                  industriales)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Electronica"}
                  src={ReticulaElectronicaEspSistemasEnergeticos}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  Ing. Eléctrica (especialidad sistemas eléctricos)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Electrica"}
                  src={ReticulaElectricaEspSistemasElectricos}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  Ing. Gestión Empresarial (especialidad innovación para el
                  desarrollo empresarial)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Gestion Empresarial"}
                  src={ReticulaGestionEmpresarial}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  Ing. Química (especialidad gestión ambiental)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Química"}
                  src={ReticulaQuimicaEspGestionAmbiental}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>Ing. Mecánica (especialidad térmica)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Mecánica"}
                  src={ReticulaMecanicaEspTermica}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  Ing. Mecánica (especialidad diseño mecánico)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img
                  alt={"Reticula Mecánica"}
                  src={ReticulaMecanicaEspDisenoMecanico}
                  width={"100%"}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </TabPanel>
      </Box>
      <br/>
      {/*Formato de leyenda*/}
      <br />
      <h5 style={{ textAlign: "center" }}>Leyenda: </h5>
      <p style={{ color: "green", textAlign: "center" }}>
        <strong>Aprobadas</strong>
      </p>
      <p style={{ color: "blue", textAlign: "center" }}>
        <strong>En curso</strong>
      </p>
      <p style={{ color: "#b9b900", textAlign: "center" }}>
        <strong>Por cursar</strong>
      </p>
      {/*Establecer formato para mostrar el promedio y los creditos completados */}
      <br />
      {historialPartido[0] !== undefined ? (
        historialPartido[0].length !== 0 ? (
          <h5 style={{ textAlign: "center" }}>
            {"Promedio: " + getPromedio(historialPartido[0])}
          </h5>
        ) : (
          <h5 style={{ textAlign: "center" }}>Promedio: n/a</h5>
        )
      ) : null}
      {historialPartido[0] !== undefined ? (
        historialPartido[0].length !== 0 ? (
          <h5 style={{ textAlign: "center" }}>
            {"Créditos completados: " + getCreditos(historialPartido[0])}
          </h5>
        ) : (
          <h5 style={{ textAlign: "center" }}>Créditos completados: n/a</h5>
        )
      ) : null}
      {historialPartido[0] !== undefined ? (
        historialPartido[0].length !== 0 ? (
          <h5 style={{ textAlign: "center" }}>
            {"Créditos faltantes: " + (250 - getCreditos(historialPartido[0]))}
          </h5>
        ) : (
          <h5 style={{ textAlign: "center" }}>Créditos faltantes: n/a</h5>
        )
      ) : null}
      <br/>
      {/*Boton agregar*/}
      <Container sx={{ py: 1 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item sx={{ display: "flex", width: "90em" }}>
            {/* Inicio Card del boton + (agregar)*/}
            <Card
              sx={{
                //Propiedas para genera el diseño del card
                width: "100%",
                borderRadius: "20px",
                maxWidth: 952,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "flex-start",
                }}
                onClick={handleAgregarAbierto}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <AddCircleOutlineIcon //Icono +
                    sx={{ fontSize: 100, color: "#1976d2" }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Dialogo agregar materia*/}
      <Dialog
        open={dialogoAgregarAbierto}
        onClose={handleAgregarCerrado}
        maxWidth="false"
        fullWidth
      >
        <DialogTitle>Agregar materia a tu historial académico</DialogTitle>
        <DialogContent>
          <Box m={1} sx={{ justifyContent: "space-between" }}>
            <FormControl fullWidth>
              <InputLabel>Clave de la materia</InputLabel>
              <Select //Tipo de selector para que el usuario ingrese datos
                value={claveMateria}
                label="Clave de la materia"
                onChange={(e) => {
                  setClaveMateria(e.target.value);
                }}
              >
                {/*LLamar funcion para guardar los datos */}
                {materias.map((materiaReticula) => (
                  <MenuItem
                    value={materiaReticula.clave_materia}
                    key={materiaReticula.id_curso || ++i}
                  >
                    {materiaReticula.clave_materia +
                      ": " +
                      materiaReticula.nombre_materia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Estado de la materia
              </InputLabel>
              <Select
                value={estadoMateria}
                label="Estado de la materia"
                onChange={(e) => {
                  setEstadoMateria(e.target.value);
                }}
              >
                <MenuItem
                  value={"Aprobada"}
                  onClick={() => {
                    setPresionoAprobada(true);
                  }}
                >
                  Aprobada
                </MenuItem>
                <MenuItem
                  value={"En curso"}
                  onClick={() => {
                    setPresionoAprobada(false);
                  }}
                >
                  En curso
                </MenuItem>
                <MenuItem
                  value={"Por cursar"}
                  onClick={() => {
                    setPresionoAprobada(false);
                  }}
                >
                  Por cursar
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            {presionoAprobada ? (
              <div>
                <br />
                <DialogContentText>
                  Semestre (en número arábigo)
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  size="small"
                  id="titulo"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setSemestreMateria(parseInt(e.target.value));
                  }}
                />
                <br />
                <br />
                <DialogContentText>Calificación</DialogContentText>
                <Slider
                  defaultValue={70}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={70}
                  max={100}
                  onChange={(e) => {
                    setCalificacionMateria(e.target.value);
                  }}
                />
                <br />
                <br />
                <FormControl fullWidth>
                  <InputLabel>Periodo</InputLabel>
                  <Select
                    value={periodoMateria}
                    label="Clave de la materia"
                    onChange={(e) => {
                      setPeriodo(e.target.value);
                    }}
                  >
                    <MenuItem value={"Enero-junio"}>Enero-junio</MenuItem>
                    <MenuItem value={"Agosto-diciembre"}>
                      Agosto-diciembre
                    </MenuItem>
                  </Select>
                </FormControl>
                <br />
                <br />
                <DialogContentText>Año (en número arábigo)</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  size="small"
                  id="titulo"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon
                          sx={{ color: "action.active", mr: 1, my: 0.5 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setAnoMateria(parseInt(e.target.value));
                  }}
                />
                <br />
              </div>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleAgregarCerrado();
              setTabValue(0);
              setPresionoAprobada(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            disabled={condicion}
            onClick={() => {
              agregarMateria();
              setPresionoAprobada(false);
              handleAgregarCerrado();
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      {/*Dialogo eliminar*/}
      <Dialog open={dialogoEliminarAbierto} onClose={handleEliminarCerrado}>
        <DialogTitle>
          {"¿Estás segur@ que quieres eliminar el curso?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción es permanente y no se puede revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleEliminarCerrado();
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              eliminarMateria(idCurso);
              handleEliminarCerrado();
            }}
            autoFocus
          >
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
