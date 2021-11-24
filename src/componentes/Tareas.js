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
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TitleIcon from "@mui/icons-material/Title";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TimerIcon from "@mui/icons-material/Timer";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Axios from "axios";

//Funcion para crear TabPanels de las categorias de las tareas.
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div //Propiedades del panel
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }} //Ancho del componente
    >
      {/* Verifica que TabPanel se esta seleccionando */}
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* Componentes dentro del tabpanel */}
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//Propiedades requeridas por el tabpanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

//Agregar propiedades de react a los tabpanel
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//Función que exporta la clase
export default function Tareas() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Retorna ListaTabs */}
      <ListaTabs />
    </Box>
  );
}

//Funcion de la ListaTabs
function ListaTabs() {
  Axios.defaults.withCredentials = true;
  const headers = {
    "Content-Type": "application/json",
  };

  //Declaración de los hooks (arrays) de diversos parámetros como las materias, tareas, clases, titulos, estados, etc.
  const [accionUsuario, setAccionUsuario] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [clases, setClases] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [dialogoAgregarAbierto, setDialogoAgregarAbierto] = useState(false);
  const [dialogoEditarAbierto, setDialogoEditarAbierto] = useState(false);
  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
  const [idTarea, setIdTarea] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("No iniciada");
  const [claveMateria, setClaveMateria] = useState("");
  const [tareaActiva, setTareaActiva] = useState({});
  const [estaAbiertoSnackbarComenzada, setEstaAbiertoSnackbarComenzada] =
    useState(false);
  const [estaAbiertoSnackbarFinalizada, setEstaAbiertoSnackbarFinalizada] =
    useState(false);
  let condicion = titulo === "" || descripcion === "" || claveMateria === "";
  let i = 0;
  let j = 0; //Contador de tabs

  useEffect(() => {
    Axios.get("http://localhost:3005/api/materias")
      .then((res) => {
        setMaterias(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get("http://localhost:3005/api/horario")
      .then((res) => {
        setClases(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get("http://localhost:3005/api/tareas")
      .then((res) => {
        setTareas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accionUsuario]);

  //Función para validar la materia
  const getNombreMateria = (clave_materia) => {
    let result;
    materias.forEach((materia) => {
      if (materia.clave_materia === clave_materia) {
        result = materia.nombre_materia;
      }
    });
    return result; //Devuelve el nombre de la materia que tenga la misma clave
  };

  //Funcion para recuperar las tareas de una materia
  const encontrarTareas = (clave_materia) => {
    let tareasMateria = [];
    tareas.forEach((tarea) => {
      if (tarea.clave_materia === clave_materia) {
        tareasMateria.push(tarea); //Guarda la tarea obtenida en un arreglo
      }
    });
    return tareasMateria; //Devuelve el arreglo
  };

  //Función para limpiar los parámetros de la tarea
  const limpiar = () => {
    setTitulo("");
    setDescripcion("");
    setEstado("No iniciada");
    setClaveMateria("");
  };

  //Función para añadir una tarea
  const agregarTarea = () => {
    setAccionUsuario(!accionUsuario);
    Axios.post(
      "http://localhost:3005/api/tareas",
      {
        //Asigna el valor correspondiente a cada variable
        clave_materia: claveMateria,
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
      },
      { headers }
    )
      .then((res) => {
        //Mensaje cuando la tarea se crea correctamente
        console.log("Tarea creada.");
      })
      .catch((err) => {
        //Mensaje cuando ocurre algún error
        console.log(err);
      });
    //Limpia los campos
    limpiar();
  };

  //Función empezarTarea
  const empezarTarea = () => {
    setAccionUsuario(!accionUsuario);
    Axios.post(
      "http://localhost:3005/api/tareas/empezar",
      {
        //Asigna la id de la tarea que va a empezar
        id_tarea: idTarea,
      },
      { headers }
    )
      .then((res) => {
        //Si es correcta, muestra un mensaje de tarea comenzada
        console.log("Tarea comenzada.");
      })
      .catch((err) => {
        //Sino, arroja un error
        console.log(err);
      });
  };

  //Función finalizarTarea
  const finalizarTarea = () => {
    setAccionUsuario(!accionUsuario);
    Axios.post(
      "http://localhost:3005/api/tareas/finalizar",
      {
        //Asigna la idTarea seleccionada
        id_tarea: idTarea,
      },
      { headers }
    )
      .then((res) => {
        //Mensaje si la tarea es correcta
        console.log("Tarea finalizada.");
      })
      .catch((err) => {
        //Mensaje si hubo un error
        console.log(err);
      });
  };

  //Función para actualizar los datos de una tarea
  const actualizarTarea = () => {
    setAccionUsuario(!accionUsuario);
    Axios.post(
      "http://localhost:3005/api/tareas/actualizar",
      {
        id_tarea: idTarea, //Asigna la id de la tarea
        titulo: titulo, //Asigna el título
        descripcion: descripcion, //Asigna la descripción de la tarea
      },
      { headers }
    )
      .then((res) => {
        //Si se realizó correctamente, arroja un mensaje de tarea editada
        console.log("Tarea editada.");
      })
      .catch((err) => {
        //Sino arroja un mensaje de error
        console.log(err);
      });
    //Limpia los campos
    limpiar();
  };

  //Función eliminarTarea
  const eliminarTarea = () => {
    setAccionUsuario(!accionUsuario);
    Axios.delete(
      "http://localhost:3005/api/tareas",
      {
        data: {
          id_tarea: idTarea, //Asigna el id de la tarea
        },
      },
      { headers }
    )
      .then((res) => {
        //Si se realizó, arroja mensaje de tarea eliminada
        console.log("Tarea eliminada.");
      })
      .catch((err) => {
        //Sino, muestra un mensaje de error
        console.log(err);
      });
    //Limpia los campos
    limpiar();
  };

  //Abrir dialog de editar
  const handleEditarAbierto = () => {
    setDialogoEditarAbierto(true);
  };

  //Cerrar dialog de editar
  const handleEditarCerrado = () => {
    setDialogoEditarAbierto(false);
  };

  //Abrir dialog para eliminar
  const handleEliminarAbierto = () => {
    setDialogoEliminarAbierto(true);
  };

  //Cerrar dialog para eliminar
  const handleEliminarCerrado = () => {
    setDialogoEliminarAbierto(false);
  };

  //Abrir dialog para agregar
  const handleAgregarAbierto = () => {
    setDialogoAgregarAbierto(true);
  };

  //Cerrar dialog para agregar
  const handleAgregarCerrado = () => {
    setDialogoAgregarAbierto(false);
  };

  //Cambiar entre Tabs
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    //Contenedor de los componentes que retorna la función
    <div>
      {/* Contenedor de la barra de tabs */}
      <Box
        sx={{
          width: "95%",
          maxWidth: 1000,
          margin: "0 auto",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Tabs
          // Muestra el tab seleccionado
          value={tabValue}
          //Manejar cambios de tab
          onChange={handleChange}
          //Variante de los tabs
          variant="scrollable"
        >
          {/* Retorna los tabs, según la lista de clases */}
          {clases !== undefined
            ? clases.length !== 0
              ? clases.map((clase) => (
                  <Tab
                    key={clase.id_clase} //Clave del tab
                    label={getNombreMateria(clase.clave_materia)} //Etiqueta del tab
                    {...a11yProps(j++)} //Contador de tabs
                  />
                ))
              : null
            : null}
        </Tabs>
      </Box>
      {/* Contenedor de las tarjetas de tareas */}
      <Box
        sx={{
          width: "95%",
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
        }}
      >
        {/* Muestra todas las tareas de la clase */}
        {clases !== undefined
          ? clases.length !== 0
            ? clases.map((clase) => (
                // clave del tabpanel, indice y valor correspondiente a la clase que pertenece
                <TabPanel key={clase.id_clase} index={i++} value={tabValue}>
                  {/* Llama a la función para encontrar las tareas del TabPanel */}
                  {encontrarTareas(clase.clave_materia).map((tarea, index) => (
                    //Contenedor de tipo celda
                    <Grid container sx={{ display: "block" }} key={index}>
                      {/* Contenedor de tipo tarjeta */}
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                        }}
                      >
                        {/* Sector clickable de la tarjeta */}
                        <CardActionArea
                          /*Al hacer click*/ onClick={() => {
                            handleEditarAbierto(); //Abre el dialog de editar
                            setTareaActiva(tarea); //Activa esta tarea
                            setIdTarea(tarea.id_tarea); //Obtiene la id de la tarea
                            setTitulo(tarea.titulo); //Obtiene el título de la tarea
                            setDescripcion(tarea.descripcion); //Obtiene la descripción de la tarea
                            setEstado(tarea.estado); //Obtiene el estado de la tarea
                            setClaveMateria(tarea.clave_materia); //Obtiene la clave de la materia
                          }}
                        >
                          {/* Contenido de la tarjeta */}
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {tarea.titulo /*Título de la tarea*/}
                            </Typography>
                            <Typography>
                              {tarea.descripcion /*Descripción de la tarea*/}
                            </Typography>
                            <br />
                            {/* Divisor */}
                            <Divider light />
                            <br />
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {tarea.estado /*Estado de la tarea*/}
                            </Typography>
                            <br />
                            {/* Divisor */}
                            <Divider light />
                            <br />
                            <Typography
                              sx={{ fontSize: 13 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Tiempo de creación: {tarea.tiempo_creacion}
                              {/* Tiempo de creación */}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 13 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Tiempo de inicio:{" "}
                              {tarea.tiempo_inicio === ""
                                ? "No iniciada."
                                : tarea.tiempo_inicio}
                              {/* Tiempo de inicio de la tarea */}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 13 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Tiempo de finalización:{" "}
                              {tarea.tiempo_finalizacion === ""
                                ? "No finalizada."
                                : tarea.tiempo_finalizacion}
                              {/* Tiempo de finalización de la tarea */}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <br />
                    </Grid>
                  ))}
                </TabPanel>
              ))
            : null
          : null}
      </Box>
      <br />
      {/*Boton agregar*/}
      <Container sx={{ py: 1 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item sx={{ display: "flex", width: "90em" }}>
            {/* Inicio Card del boton + (agregar)*/}
            <Card
              sx={{
                width: "100%",
                borderRadius: "20px",
                maxWidth: 952,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Area dee acción de la tarjeta */}
              <CardActionArea
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "flex-start",
                }}
                // Al hacer click muestra el dialog para agregar tareas.
                onClick={handleAgregarAbierto}
              >
                {/* Contenido de la tarjeta */}
                <CardContent
                  sx={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  {/* Icono */}
                  <AddCircleOutlineIcon
                    sx={{ fontSize: 100, color: "#1976d2" }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/*Dialogo agregar*/}
      <Dialog
        open={dialogoAgregarAbierto}
        onClose={handleAgregarCerrado}
        fullWidth
      >
        <DialogTitle>Agregar tarea</DialogTitle>
        {/* Contenido del dialog */}
        <DialogContent>
          <Box m={1} sx={{ justifyContent: "space-between" }}>
            {/* Campo de texto para el título */}
            <DialogContentText>Título</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              size="small"
              type="text"
              fullWidth
              variant="outlined"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setTitulo(e.target.value);
              }}
            />
            {/* Campo de texto para la descripción */}
            <DialogContentText>Descripción</DialogContentText>
            <TextField
              margin="dense"
              size="small"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={6}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextSnippetIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            />
            <br />
            <br />
            {/* Select para la clase */}
            <FormControl fullWidth>
              <InputLabel>Clase</InputLabel>
              <Select
                value={claveMateria}
                label="Clase"
                onChange={(e) => {
                  setClaveMateria(e.target.value);
                  setTabValue(0);
                }}
              >
                {/* Si no hay clases agregadas, arroja un mensaje de error */}
                {clases !== undefined ? (
                  clases.length === 0 ? (
                    <MenuItem>
                      Aún no has agregado ninguna materia a tu horario.
                    </MenuItem>
                  ) : null
                ) : null}
                {clases !== undefined
                  ? clases.length !== 0
                    ? clases.map((clase) => (
                        <MenuItem
                          value={clase.clave_materia}
                          key={clase.id_clase}
                        >
                          {clase.clave_materia +
                            ": " +
                            getNombreMateria(clase.clave_materia)}
                        </MenuItem>
                      ))
                    : null
                  : null}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* Botones para cerrar y para añadir la tarea */}
          <Button onClick={handleAgregarCerrado}>Cancelar</Button>
          <Button
            onClick={() => {
              agregarTarea();
              handleAgregarCerrado();
            }}
            disabled={condicion}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      {/*VER O EDITAR TAREA*/}
      <Dialog
        fullScreen={true}
        open={dialogoEditarAbierto}
        onClose={handleEditarCerrado}
      >
        <DialogTitle>Ver o editar tarea</DialogTitle>
        <DialogContent>
          <Box m={1} sx={{ justifyContent: "space-between" }}>
            {/* Campo de texto para el título */}
            <DialogContentText>Título</DialogContentText>
            <TextField
              margin="dense"
              size="small"
              type="text"
              fullWidth
              variant="outlined"
              required
              defaultValue={tareaActiva.titulo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon
                      sx={{ color: "action.active", mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setTitulo(e.target.value);
              }}
            />
            {/* Campo de texto para la descripción */}
            <DialogContentText>Descripción</DialogContentText>
            <TextField
              margin="dense"
              size="small"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={6}
              required
              defaultValue={tareaActiva.descripcion}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextSnippetIcon
                      sx={{ color: "action.active", mr: 1, ml: 1.6, my: 0.5 }}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            />
            <br />
            <br />
            {/* Campo de texto para la clase */}
            <FormControl fullWidth>
              <InputLabel>Clase</InputLabel>
              <Select
                value={claveMateria}
                label="Clase"
                onChange={(e) => {
                  setClaveMateria(e.target.value);
                  setTabValue(0);
                }}
              >
                <MenuItem value={tareaActiva.clave_materia}>
                  {tareaActiva.clave_materia}
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            {/* Boton para iniciar una tarea */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                disabled={
                  tareaActiva.estado === "Iniciada" ||
                  tareaActiva.estado === "Finalizada"
                }
                startIcon={<TimerIcon />}
                // Al hacer click
                onClick={() => {
                  //Se cierra el dialog de editar y comienza la tarea
                  handleEditarCerrado();
                  setEstaAbiertoSnackbarComenzada(true);
                  empezarTarea();
                }}
              >
                Empezar
              </Button>
              {/* Boton para cerrar el dialog */}
              <Button
                variant="contained"
                endIcon={<TimerOffIcon />}
                disabled={
                  tareaActiva.estado === "No iniciada" ||
                  tareaActiva.estado === "Finalizada"
                }
                // Al hacer click
                onClick={() => {
                  // Se cierra e dialog de editar y se finaliza la tarea
                  handleEditarCerrado();
                  setEstaAbiertoSnackbarFinalizada(true);
                  finalizarTarea();
                }}
              >
                Finalizar
              </Button>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* Botón para cerrar el dialog */}
          <Button onClick={handleEditarCerrado}>Cancelar</Button>
          {/* Botón para eliminar una tarea */}
          <Button
            onClick={() => {
              // Al hacer click, se abre el dialog para eliminar la tarea
              handleEliminarAbierto();
            }}
          >
            Eliminar tarea
          </Button>
          {/* Botón para actualizar los cambioss */}
          <Button
            onClick={() => {
              // Al hacer click, se actualizan los datos y se cierra el dialog
              actualizarTarea(idTarea);
              handleEditarCerrado();
            }}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      {/*SNACKBAR TAREA COMENZADA*/}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        open={estaAbiertoSnackbarComenzada}
        onClose={() => {
          setEstaAbiertoSnackbarComenzada(false);
        }}
      >
        <Alert severity="info">¡Tarea comenzada!</Alert>
      </Snackbar>
      {/*SNACKBAR TAREA FINALIZADA*/}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        open={estaAbiertoSnackbarFinalizada}
        onClose={() => {
          setEstaAbiertoSnackbarFinalizada(false);
        }}
      >
        <Alert severity="success">¡Tarea finalizada!</Alert>
      </Snackbar>
      {/*CONFIRMAR ELIMINAR TAREA*/}
      <Dialog open={dialogoEliminarAbierto} onClose={handleEliminarCerrado}>
        {/* Título del dialog eliminar */}
        <DialogTitle>
          {"¿Estás segur@ que quieres eliminar la tarea?"}
        </DialogTitle>
        <DialogContent>
          {/* Mensaje de advertencia */}
          <DialogContentText>
            Esta acción es permanente y no se puede revertir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Botón para cerrar el dialog */}
          <Button
            onClick={() => {
              handleEliminarCerrado();
            }}
          >
            No
          </Button>
          {/* Botón para confirmar la eliminación de la tarea */}
          <Button
            onClick={() => {
              // Elimina la tarea según el id y cierra ambos dialog
              eliminarTarea(idTarea);
              handleEliminarCerrado();
              handleEditarCerrado();
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
