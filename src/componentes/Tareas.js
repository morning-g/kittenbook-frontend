import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import {Select} from "@mui/material";
import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TitleIcon from '@mui/icons-material/Title';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TimerIcon from '@mui/icons-material/Timer';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Axios from "axios";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{width: "100%"}}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Tareas() {
    return (
        <Box sx={{width: "100%"}}>
            <ListaTabs/>
        </Box>
    );
}

function ListaTabs() {
    Axios.defaults.withCredentials = true;
    const headers = {
        'Content-Type': 'application/json'
    };

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
    const [estaAbiertoSnackbarComenzada, setEstaAbiertoSnackbarComenzada] = useState(false);
    const [estaAbiertoSnackbarFinalizada, setEstaAbiertoSnackbarFinalizada] = useState(false);
    let condicion = titulo === "" || descripcion === "" || claveMateria === "";
    let i = 0;
    let j = 0;

    useEffect(() => {
        Axios.get('http://localhost:3005/api/materias').then((res) => {
            setMaterias(res.data);
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/horario').then((res) => {
            setClases(res.data);
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/tareas').then((res) => {
            setTareas(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [accionUsuario]);

    const getNombreMateria = (clave_materia) => {
        let result;
        materias.forEach((materia) => {
            if (materia.clave_materia === clave_materia) {
                result = materia.nombre_materia;
            }
        });
        return result;
    };

    const encontrarTareas = (clave_materia) => {
        let tareasMateria = [];
        tareas.forEach((tarea) => {
            if (tarea.clave_materia === clave_materia) {
                tareasMateria.push(tarea);
            }
        });
        return tareasMateria;
    };

    const limpiar = () => {
        setTitulo("");
        setDescripcion("");
        setEstado("No iniciada");
        setClaveMateria("");
    };

    const agregarTarea = () => {
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/tareas', {
            clave_materia: claveMateria,
            titulo: titulo,
            descripcion: descripcion,
            estado: estado
        }, {headers}).then((res) => {
            console.log("Tarea creada.");
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const empezarTarea = () => {
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/tareas/empezar', {
            id_tarea: idTarea
        }, {headers}).then((res) => {
            console.log("Tarea comenzada.");
        }).catch((err) => {
            console.log(err);
        });
    };

    const finalizarTarea = () => {
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/tareas/finalizar', {
            id_tarea: idTarea
        }, {headers}).then((res) => {
            console.log("Tarea finalizada.");
        }).catch((err) => {
            console.log(err);
        });
    };

    const actualizarTarea = () => {
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/tareas/actualizar', {
            id_tarea: idTarea,
            titulo: titulo,
            descripcion: descripcion
        }, {headers}).then((res) => {
            console.log("Tarea editada.")
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const eliminarTarea = () => {
        setAccionUsuario(!accionUsuario);
        Axios.delete('http://localhost:3005/api/tareas', {
            data: {
                id_tarea: idTarea
            }
        }, {headers}).then((res) => {
            console.log("Tarea eliminada.")
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

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

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div>
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
                    value={tabValue}
                    onChange={handleChange}
                    variant="scrollable"
                >
                    {clases !== undefined ? clases.length !== 0 ? clases.map((clase) => (
                        <Tab key={clase.id_clase}
                             label={getNombreMateria(clase.clave_materia)} {...a11yProps(j++)}/>
                    )) : null : null}
                </Tabs>
            </Box>
            <Box sx={{
                width: "95%",
                maxWidth: 1000,
                margin: "0 auto",
                display: "flex",
            }}>
                {clases !== undefined ? clases.length !== 0 ? clases.map((clase) => (
                    <TabPanel key={clase.id_clase} index={i++} value={tabValue}>
                        {encontrarTareas(clase.clave_materia).map((tarea, index) => (
                            <Grid container sx={{display: "block"}} key={index}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                    }}
                                >
                                    <CardActionArea onClick={() => {
                                        handleEditarAbierto();
                                        setTareaActiva(tarea);
                                        setIdTarea(tarea.id_tarea);
                                        setTitulo(tarea.titulo);
                                        setDescripcion(tarea.descripcion);
                                        setEstado(tarea.estado);
                                        setClaveMateria(tarea.clave_materia);
                                    }}>
                                        <CardContent sx={{flexGrow: 1}}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {tarea.titulo}
                                            </Typography>
                                            <Typography>
                                                {tarea.descripcion}
                                            </Typography>
                                            <br/>
                                            <Divider light/>
                                            <br/>
                                            <Typography sx={{fontSize: 14}}
                                                        color="text.secondary"
                                                        gutterBottom>
                                                {tarea.estado}
                                            </Typography>
                                            <br/>
                                            <Divider light/>
                                            <br/>
                                            <Typography sx={{fontSize: 13}}
                                                        color="text.secondary"
                                                        gutterBottom>
                                                Tiempo de creación: {tarea.tiempo_creacion}
                                            </Typography>
                                            <Typography sx={{fontSize: 13}}
                                                        color="text.secondary"
                                                        gutterBottom>
                                                Tiempo de
                                                inicio: {tarea.tiempo_inicio === "" ? "No iniciada." : tarea.tiempo_inicio}
                                            </Typography>
                                            <Typography sx={{fontSize: 13}}
                                                        color="text.secondary"
                                                        gutterBottom>
                                                Tiempo de
                                                finalización: {tarea.tiempo_finalizacion === "" ? "No finalizada." : tarea.tiempo_finalizacion}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                                <br/>
                            </Grid>
                        ))}
                    </TabPanel>
                )) : null : null}
            </Box>
            <br/>
            {/*Boton agregar*/}
            <Container sx={{py: 1}} maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item sx={{display: "flex", width: "90em"}}>
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
                                    <AddCircleOutlineIcon
                                        sx={{fontSize: 100, color: "#1976d2"}}
                                    />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            {/*Dialogo agregar*/}
            <Dialog open={dialogoAgregarAbierto} onClose={handleAgregarCerrado} fullWidth>
                <DialogTitle>Agregar tarea</DialogTitle>
                <DialogContent>
                    <Box m={1} sx={{justifyContent: "space-between"}}>
                        <DialogContentText>Título</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            size='small'
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => {
                                setTitulo(e.target.value)
                            }}
                        />
                        <DialogContentText>Descripción</DialogContentText>
                        <TextField
                            margin="dense"
                            size='small'
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={6}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TextSnippetIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => {
                                setDescripcion(e.target.value)
                            }}
                        />
                        <br/>
                        <br/>
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
                                {clases !== undefined ? clases.length === 0 ?
                                    <MenuItem>Aún no has agregado ninguna materia a tu
                                        horario.</MenuItem> : null : null}
                                {clases !== undefined ? clases.length !== 0 ? clases.map((clase) => (
                                    <MenuItem
                                        value={clase.clave_materia}
                                        key={clase.id_clase}>{clase.clave_materia + ": " + getNombreMateria(clase.clave_materia)}</MenuItem>)) : null : null}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAgregarCerrado}>Cancelar</Button>
                    <Button onClick={() => {
                        agregarTarea();
                        handleAgregarCerrado();
                    }} disabled={condicion}>Agregar</Button>
                </DialogActions>
            </Dialog>
            {/*VER O EDITAR TAREA*/}
            <Dialog fullScreen={true} open={dialogoEditarAbierto} onClose={handleEditarCerrado}>
                <DialogTitle>Ver o editar tarea</DialogTitle>
                <DialogContent>
                    <Box m={1} sx={{justifyContent: "space-between"}}>
                        <DialogContentText>Título</DialogContentText>
                        <TextField
                            margin="dense"
                            size='small'
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            defaultValue={tareaActiva.titulo}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => {
                                setTitulo(e.target.value)
                            }}
                        />
                        <DialogContentText>Descripción</DialogContentText>
                        <TextField
                            margin="dense"
                            size='small'
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
                                        <TextSnippetIcon sx={{color: 'action.active', mr: 1, ml: 1.6, my: 0.5}}/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => {
                                setDescripcion(e.target.value)
                            }}
                        />
                        <br/>
                        <br/>
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
                                <MenuItem value={tareaActiva.clave_materia}>{tareaActiva.clave_materia}</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined"
                                    disabled={tareaActiva.estado === "Iniciada" || tareaActiva.estado === "Finalizada"}
                                    startIcon={<TimerIcon/>}
                                    onClick={() => {
                                        handleEditarCerrado();
                                        setEstaAbiertoSnackbarComenzada(true);
                                        empezarTarea();
                                    }}>
                                Empezar
                            </Button>
                            <Button variant="contained" endIcon={<TimerOffIcon/>}
                                    disabled={tareaActiva.estado === "No iniciada" || tareaActiva.estado === "Finalizada"}
                                    onClick={() => {
                                        handleEditarCerrado();
                                        setEstaAbiertoSnackbarFinalizada(true);
                                        finalizarTarea();
                                    }}>
                                Finalizar
                            </Button>
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditarCerrado}>Cancelar</Button>
                    <Button onClick={() => {
                        handleEliminarAbierto();
                    }}>Eliminar tarea</Button>
                    <Button onClick={() => {
                        actualizarTarea(idTarea);
                        handleEditarCerrado();
                    }}>Aceptar</Button>
                </DialogActions>
            </Dialog>
            {/*SNACKBAR TAREA COMENZADA*/}
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
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
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                autoHideDuration={5000}
                open={estaAbiertoSnackbarFinalizada}
                onClose={() => {
                    setEstaAbiertoSnackbarFinalizada(false);
                }}
            >
                <Alert severity="success">¡Tarea finalizada!</Alert>
            </Snackbar>
            {/*CONFIRMAR ELIMINAR TAREA*/}
            <Dialog
                open={dialogoEliminarAbierto}
                onClose={handleEliminarCerrado}
            >
                <DialogTitle>
                    {"¿Estás segur@ que quieres eliminar la tarea?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Esta acción es permanente y no se puede revertir.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleEliminarCerrado()
                    }}>No</Button>
                    <Button onClick={() => {
                        eliminarTarea(idTarea);
                        handleEliminarCerrado();
                        handleEditarCerrado();
                    }} autoFocus>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
