//imports utilizados por esta clase
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TitleIcon from "@mui/icons-material/Title";

import Axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//Funcion por default, solo accesible mediante inicio de sesion
export default function Notas() {
  Axios.defaults.withCredentials = true;
  const headers = {
    "Content-Type": "application/json",
  };

  //Estados para agregar notas con su titulo contenido, y abrir dialogos
  const [accionUsuario, setAccionUsuario] = useState(false);
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [dialogoAgregarAbierto, setDialogoAgregarAbierto] = useState(false);
  const [dialogoEditarAbierto, setDialogoEditarAbierto] = useState(false);
  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
  const [idNota, setIdNota] = useState(0);
  const [notaActiva, setNotaActiva] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3005/api/notas")
      .then((res) => {
        setNotas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setTitulo(""); //Establecer titulo contenido del formulario
      setContenido("");
    };
  }, [accionUsuario]);

  //Eventos que pueden ser provocados por el usuario
  const handleEditarAbierto = () => {
    setDialogoEditarAbierto(true);
  };

  const handleEditarCerrado = () => {
    setDialogoEditarAbierto(false);
  };

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
  ////////////////////////////////////////////
  //Enviar nota creada a la base de datos
  const enviarNota = () => {
    setAccionUsuario(!accionUsuario);
    Axios.post(
      "http://localhost:3005/api/notas",
      {
        titulo: titulo,
        contenido: contenido,
      },
      { headers }
    )
      .then((res) => {
        console.log("Nota creada.");
      })
      .catch((err) => {
        console.log(err);
      }); //Borrar campos para nueva nota
    setTitulo("");
    setContenido("");
  };
  //Edicion de notas, el funcionamiento es similar a la funcion anterior
  const editarNota = (id_nota) => {
    setAccionUsuario(!accionUsuario);
    Axios.post(
      "http://localhost:3005/api/notas/actualizar",
      {
        id_nota: id_nota,
        titulo: titulo,
        contenido: contenido,
      },
      { headers }
    )
      .then((res) => {
        console.log("Nota editada.");
      })
      .catch((err) => {
        console.log(err);
      });
    setTitulo("");
    setContenido("");
  };
  //Eliminacion de notas por id de la nota
  const eliminarNota = (id_nota) => {
    setAccionUsuario(!accionUsuario);
    Axios.delete(
      //Se conecta a la base de datos y se elimina el registro
      "http://localhost:3005/api/notas",
      {
        data: {
          id_nota: id_nota,
        },
      },
      { headers }
    )
      .then((res) => {
        console.log("Nota eliminada.");
      })
      .catch((err) => {
        console.log(err);
      });
    setTitulo("");
    setContenido("");
  };
  //Diseño del contenido
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <br />
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {" "}
            {/*Grid principal*/}
            {notas.length === 0 ? ( //Mostrar mensaje para cuando no hay notas
              <div>
                <br />
                <h4>Aún no tienes ninguna nota.</h4>
                <br />
                <Grid
                  item
                  sx={{
                    display: "flex",
                    width: "90em",
                  }}
                >
                  {/* Inicio Card del boton + (agregar)*/}
                  <Card
                    sx={{
                      //Propiedades del card
                      width: "100%",
                      borderRadius: "20px",
                      maxWidth: 952,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardActionArea
                      sx={{
                        //Propiedades dialogo
                        display: "flex",
                        height: "100%",
                        alignItems: "flex-start",
                      }}
                      onClick={handleAgregarAbierto}
                    >
                      <CardContent
                        sx={{
                          //Card  boton agregar
                          display: "flex",
                          height: "100%",
                          alignItems: "center",
                        }}
                      >
                        <AddCircleOutlineIcon //icono de +
                          sx={{ fontSize: 100, color: "#1976d2" }}
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </div>
            ) : (
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                {/*Grid para cuando existen notas */}
                <Card
                  sx={{
                    //Propiedades para generar la cuadricula y sus diseños
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    position: "relative",
                  }}
                >
                  <CardActionArea
                    sx={{
                      //Card action abierto
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
                      <AddCircleOutlineIcon
                        sx={{ fontSize: 100, color: "#1976d2" }}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )}
            {/*Diseño del card para las notas */}
            {notas.map((nota) => (
              <Grid item key={nota.id_nota} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <CardActionArea //mostrar datos al abrir la nota
                    onClick={() => {
                      handleEditarAbierto();
                      setNotaActiva(nota);
                      setIdNota(nota.id_nota);
                      setTitulo(nota.titulo);
                      setContenido(nota.contenido);
                    }}
                  >
                    {/*Card general para todas las notas en contenido*/}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {nota.titulo}
                      </Typography>
                      <Typography>{nota.contenido}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/*NUEVA NOTA*/}
        <Dialog
          fullWidth //Dialogo para agregar nota
          open={dialogoAgregarAbierto}
          onClose={handleAgregarCerrado}
        >
          <DialogTitle>Nueva nota</DialogTitle>
          <DialogContent>
            <Box m={1} sx={{ justifyContent: "space-between" }}>
              <DialogContentText>Título</DialogContentText>
              <TextField
                autoFocus //Propiedades
                margin="dense"
                size="small"
                id="titulo"
                type="text"
                fullWidth
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    //Formatos para los inputs para que el usuario ingrese contenido
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
              <DialogContentText>Contenido</DialogContentText>
              <TextField
                margin="dense"
                id="contenido"
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
                  setContenido(e.target.value);
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAgregarCerrado}>Cancelar</Button>
            <Button
              disabled={titulo === "" || contenido === ""}
              onClick={() => {
                enviarNota();
                handleAgregarCerrado();
              }}
            >
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
        {/*VER O EDITAR NOTA*/}
        <Dialog
          fullScreen={true}
          open={dialogoEditarAbierto}
          onClose={handleEditarCerrado}
        >
          <DialogTitle>Ver o editar nota</DialogTitle>
          <DialogContent>
            <Box m={1} sx={{ justifyContent: "space-between" }}>
              <DialogContentText>Título</DialogContentText>
              <TextField
                margin="dense"
                size="small"
                id="titulo"
                type="text"
                fullWidth
                variant="outlined"
                required
                defaultValue={notaActiva.titulo}
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
              <DialogContentText>Contenido</DialogContentText>
              <TextField
                margin="dense"
                id="contenido"
                size="small"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={15}
                required
                defaultValue={notaActiva.contenido}
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
                  setContenido(e.target.value);
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditarCerrado}>Cancelar</Button>
            <Button
              onClick={() => {
                handleEliminarAbierto();
              }}
            >
              Eliminar nota
            </Button>
            <Button
              onClick={() => {
                editarNota(idNota);
                handleEditarCerrado();
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        {/*CONFIRMAR ELIMINAR NOTA*/}
        <Dialog open={dialogoEliminarAbierto} onClose={handleEliminarCerrado}>
          <DialogTitle>
            {"¿Estás segur@ que quieres eliminar la nota?"}
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
                eliminarNota(idNota);
                handleEliminarCerrado();
                handleEditarCerrado();
              }}
              autoFocus
            >
              Sí
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </React.Fragment>
  );
}
