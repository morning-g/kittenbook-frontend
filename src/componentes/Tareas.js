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
    const [reticula, setReticula] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [historialPartido, setHistorialPartido] = useState([]);
    const [tareasPartidas, setTareasPartidas] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [clases, setClases] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [dialogoAgregarAbierto, setDialogoAgregarAbierto] = useState(false);
    const [dialogoEditarAbierto, setDialogoEditarAbierto] = useState(false);
    const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("No iniciada");
    const [tiempoCreacion, setTiempoCreacion] = useState("");
    const [tiempoInicio, setTiempoInicio] = useState("");
    const [tiempoFinalizacion, setTiempoFinalizacion] = useState("");
    const [claveMateria, setClaveMateria] = useState("");
    let condicion = titulo === "" || descripcion === "" || claveMateria === "";
    let indexValue = 0;

    useEffect(() => {
        Axios.get('http://localhost:3005/api/materias').then((res) => {
            console.log("Materias");
            console.log(res.data);
            setMaterias(res.data);
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/historial').then((res) => {
            console.log("Reticula");
            console.log(res.data);
            setReticula(res.data);
            setHistorialPartido(partirReticula(res.data));
            console.log(partirReticula(res.data));
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/horario').then((res) => {
            console.log("Horario")
            console.log(res.data);
            setClases(res.data);
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/tareas').then((res) => {
            console.log("Tareas");
            console.log(res.data);
            setTareas(res.data);
            setTareasPartidas(partirTareas(res.data));
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

    const partirReticula = (reticula) => {
        let aprobadasReticula = [];
        let encursoReticula = [];
        let porcursarReticula = [];
        reticula.forEach((materiaReticula) => {
            if (materiaReticula.estado === "Aprobada") {
                aprobadasReticula.push(materiaReticula);
            } else if (materiaReticula.estado === "En curso") {
                encursoReticula.push(materiaReticula);
            } else if (materiaReticula.estado === "Por cursar") {
                porcursarReticula.push(materiaReticula);
            }
        });
        return [aprobadasReticula, encursoReticula, porcursarReticula];
    };

    const partirTareas = (horario) => {
        let lunesHorario = [];
        let martesHorario = [];
        let miercolesHorario = [];
        let juevesHorario = [];
        let viernesHorario = [];
        horario.forEach((clase) => {
            if (clase.lunes === 1) {
                lunesHorario.push(clase);
            }
            if (clase.martes === 1) {
                martesHorario.push(clase);
            }
            if (clase.miercoles === 1) {
                miercolesHorario.push(clase);
            }
            if (clase.jueves === 1) {
                juevesHorario.push(clase);
            }
            if (clase.viernes === 1) {
                viernesHorario.push(clase);
            }
        });
        return [lunesHorario, martesHorario, miercolesHorario, juevesHorario, viernesHorario];
    };

    const limpiar = () => {
        setTitulo("");
        setDescripcion("");
        setEstado("No iniciada");
        setTiempoCreacion("");
        setTiempoInicio("");
        setTiempoFinalizacion("");
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
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const actualizarTarea = () => {

    };

    const eliminarTarea = () => {

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

    // Arreglo de objetos tabs
    // const [tabs, setTabs] = useState([
    //     {titulo: "Calculo", value: 0},
    //     {titulo: "Ecuaciones", value: 1},
    //     {titulo: "Gestión de Proyectos de Software", value: 2},
    //     {titulo: "Inteligencia Artificial", value: 3},
    //     {titulo: "Lenguajes y Automatas II", value: 4},
    // ]);

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
                             label={getNombreMateria(clase.clave_materia)} {...a11yProps(clase.id_clase)}/>
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
                    <TabPanel key={clase.id_clase} index={clase.id_clase} value={tabValue}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                }}
                            >
                                <CardActionArea onClick={() => {
                                    handleEditarAbierto();
                                    // setNotaActiva(nota);
                                    // setIdNota(nota.id_nota);
                                    // setTitulo(nota.titulo);
                                    // setContenido(nota.contenido);
                                }}>
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {/*{nota.titulo}*/}
                                        </Typography>
                                        <Typography>
                                            {/*{nota.contenido}*/}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        {/*<Grid container sx={{justifyContent: "space-between", columnGap: 1, rowGap: 1}}>*/}
                        {/*    <ListadoTareas tareas={tareas} materia={tab.titulo}/>*/}
                        {/*</Grid>*/}
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
                            <InputLabel id="demo-simple-select-label">Clase</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                            // defaultValue={notaActiva.contenido}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    </InputAdornment>
                                ),
                            }}
                            // onChange={(e) => {
                            //     setContenido(e.target.tabValue)
                            // }}
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
                                        <TextSnippetIcon sx={{color: 'action.active', mr: 1, ml: 1.6, my: 0.5}}/>
                                    </InputAdornment>
                                ),
                            }}
                            // onChange={(e) => {
                            //     setContenido(e.target.tabValue)
                            // }}
                        />
                        <br/>
                        <br/>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Clase</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Clase"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" startIcon={<TimerIcon/>}>
                                Empezar
                            </Button>
                            <Button variant="contained" endIcon={<TimerOffIcon/>}>
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
                        // editarNota(idNota);
                        handleEditarCerrado();
                    }}>Aceptar</Button>
                </DialogActions>
            </Dialog>
            {/*CONFIRMAR ELIMINAR NOTA*/}
            <Dialog
                open={dialogoEliminarAbierto}
                onClose={handleEliminarCerrado}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Estás segur@ que quieres eliminar la tarea?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta acción es permanente y no se puede revertir.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleEliminarCerrado()
                    }}>No</Button>
                    <Button onClick={() => {
                        // eliminarNota(idNota);
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
