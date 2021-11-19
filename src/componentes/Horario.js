import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";
import {CardActionArea} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
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

export default function Horario() {
    Axios.defaults.withCredentials = true;
    const headers = {
        'Content-Type': 'application/json'
    };

    const [accionUsuario, setAccionUsuario] = useState(false);
    const [materias, setMaterias] = useState([]);
    const [historialPartido, setHistorialPartido] = useState([]);
    const [horarioPartido, setHorarioPartido] = useState([]);
    const [value, setValue] = useState(0);
    const [dialogoAgregarAbierto, setDialogoAgregarAbierto] = useState(false);
    const [dialogoEditarAbierto, setDialogoEditarAbierto] = useState(false);
    const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
    const [clases, setClases] = useState([]);
    const [idClase, setIdClase] = useState(0);
    const [claveMateria, setClaveMateria] = useState("");
    const [grupo, setGrupo] = useState("");
    const [docente, setDocente] = useState("");
    const [aula, setAula] = useState("");
    const [horaInicio, setHoraInicio] = useState(12);
    const [horaTermino, setHoraTermino] = useState(12);
    const [lunes, setLunes] = useState(true);
    const [martes, setMartes] = useState(true);
    const [miercoles, setMiercoles] = useState(true);
    const [jueves, setJueves] = useState(true);
    const [viernes, setViernes] = useState(true);
    const [claseActiva, setClaseActiva] = useState({});
    const [errorHorario, setErrorHorario] = useState(false);
    let condicion = claveMateria === "" || grupo === "" || docente === "" || aula === "";

    useEffect(() => {
        Axios.get('http://localhost:3005/api/materias').then((res) => {
            setMaterias(res.data);
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/historial').then((res) => {
            setHistorialPartido(partirReticula(res.data));
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/horario').then((res) => {
            setClases(res.data);
            setHorarioPartido(partirHorario(res.data));
        }).catch((err) => {
            console.log(err);
        });
    }, [accionUsuario]);

    const getCarreraMateria = (clave_materia) => {
        let result;
        materias.forEach((materia) => {
            if (materia.clave_materia === clave_materia) {
                result = materia.carrera_materia;
            }
        });
        return result;
    };

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

    const partirHorario = (horario) => {
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
        setValue(newValue);
    };

    const limpiar = () => {
        setClaveMateria("");
        setGrupo("");
        setAula("");
        setHoraInicio("");
        setHoraTermino("");
        setLunes(true);
        setMartes(true);
        setMiercoles(true);
        setJueves(true);
        setViernes(true);
    };

    const agregarClase = () => {
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/horario', {
            clave_materia: claveMateria,
            grupo: grupo,
            docente: docente,
            aula: aula,
            hora_inicio: horaInicio,
            hora_termino: horaTermino,
            lunes: lunes,
            martes: martes,
            miercoles: miercoles,
            jueves: jueves,
            viernes: viernes
        }, {headers}).then((res) => {
            console.log("Clase creada.");
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const editarClase = () => {
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/horario/actualizar', {
            id_clase: idClase,
            clave_materia: claveMateria,
            grupo: grupo,
            docente: docente,
            aula: aula,
            hora_inicio: horaInicio,
            hora_termino: horaTermino,
            lunes: lunes,
            martes: martes,
            miercoles: miercoles,
            jueves: jueves,
            viernes: viernes
        }, {headers}).then((res) => {
            console.log("Clase editada.");
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const eliminarClase = () => {
        setAccionUsuario(!accionUsuario);
        Axios.delete('http://localhost:3005/api/horario', {
            data: {
                id_clase: idClase
            }
        }, {headers}).then((res) => {
            console.log("Clase eliminada.");
        }).catch((err) => {
            console.log(err);
            setErrorHorario(true);
        });
        limpiar();
    };

    return (
        <Container>
            <Box sx={{width: "100%"}}>
                {errorHorario ? <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Ocurrió un error al intentar eliminar la clase — <strong>No puedes eliminar una clase de tu horario
                    si tienes tareas de esa misma clase. Elimina primero las tareas pertinentes y vuelve a
                    intentarlo.</strong>
                </Alert> : null}
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                    >
                        <Tab label="Lunes" {...a11yProps(0)} />
                        <Tab label="Martes" {...a11yProps(1)} />
                        <Tab label="Miércoles" {...a11yProps(2)} />
                        <Tab label="Jueves" {...a11yProps(3)} />
                        <Tab label="Viernes" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {clases.length === 0 ? <div><br/><h4>No hay ninguna clase en lunes. ¡Hurrah!</h4><br/></div> : null}
                    {horarioPartido[0] !== undefined ? (horarioPartido[0].length !== 0 ? horarioPartido[0].map((clase) => (
                        <div key={clase.id_clase}><Card sx={{minWidth: 100}}>
                            <CardActionArea onClick={() => {
                                handleEditarAbierto();
                                setClaseActiva(clase);
                                setIdClase(clase.id_clase);
                                setClaveMateria(clase.clave_materia);
                                setGrupo(clase.grupo);
                                setDocente(clase.docente);
                                setAula(clase.aula);
                                setHoraInicio(clase.hora_inicio);
                                setHoraTermino(clase.hora_termino);
                                setLunes(clase.lunes === 1);
                                setMartes(clase.martes === 1);
                                setMiercoles(clase.miercoles === 1);
                                setJueves(clase.jueves === 1);
                                setViernes(clase.viernes === 1);
                            }}>
                                <CardContent>
                                    <Typography
                                        sx={{fontSize: 14}}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Grupo: {clase.grupo}, Clave: {clase.clave_materia},
                                        Aula: {clase.aula} Carrera: {getCarreraMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {getNombreMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        Docente: {clase.docente}
                                    </Typography>
                                    <Typography
                                        variant="body2">Horario:
                                        de {clase.hora_inicio.toString() + ":00"} a {clase.hora_termino.toString() + ":00"}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card><br/></div>)) : null) : null}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {clases.length === 0 ?
                        <div><br/><h4>No hay ninguna clase en martes. ¡Hurrah!</h4><br/></div> : null}
                    {horarioPartido[1] !== undefined ? (horarioPartido[1].length !== 0 ? horarioPartido[1].map((clase) => (
                        <div key={clase.id_clase}><Card sx={{minWidth: 100}}>
                            <CardActionArea onClick={() => {
                                handleEditarAbierto();
                                setClaseActiva(clase);
                                setIdClase(clase.id_clase);
                                setClaveMateria(clase.clave_materia);
                                setGrupo(clase.grupo);
                                setDocente(clase.docente);
                                setAula(clase.aula);
                                setHoraInicio(clase.hora_inicio);
                                setHoraTermino(clase.hora_termino);
                                setLunes(clase.lunes === 1);
                                setMartes(clase.martes === 1);
                                setMiercoles(clase.miercoles === 1);
                                setJueves(clase.jueves === 1);
                                setViernes(clase.viernes === 1);
                            }}>
                                <CardContent>
                                    <Typography
                                        sx={{fontSize: 14}}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Grupo: {clase.grupo}, Clave: {clase.clave_materia},
                                        Aula: {clase.aula} Carrera: {getCarreraMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {getNombreMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        Docente: {clase.docente}
                                    </Typography>
                                    <Typography
                                        variant="body2">Horario:
                                        de {clase.hora_inicio.toString() + ":00"} a {clase.hora_termino.toString() + ":00"}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card><br/></div>)) : null) : null}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {clases.length === 0 ?
                        <div><br/><h4>No hay ninguna clase en miércoles. ¡Hurrah!</h4><br/></div> : null}
                    {horarioPartido[2] !== undefined ? (horarioPartido[2].length !== 0 ? horarioPartido[2].map((clase) => (
                        <div key={clase.id_clase}><Card sx={{minWidth: 100}}>
                            <CardActionArea onClick={() => {
                                handleEditarAbierto();
                                setClaseActiva(clase);
                                setIdClase(clase.id_clase);
                                setClaveMateria(clase.clave_materia);
                                setGrupo(clase.grupo);
                                setDocente(clase.docente);
                                setAula(clase.aula);
                                setHoraInicio(clase.hora_inicio);
                                setHoraTermino(clase.hora_termino);
                                setLunes(clase.lunes === 1);
                                setMartes(clase.martes === 1);
                                setMiercoles(clase.miercoles === 1);
                                setJueves(clase.jueves === 1);
                                setViernes(clase.viernes === 1);
                            }}>
                                <CardContent>
                                    <Typography
                                        sx={{fontSize: 14}}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Grupo: {clase.grupo}, Clave: {clase.clave_materia},
                                        Aula: {clase.aula} Carrera: {getCarreraMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {getNombreMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        Docente: {clase.docente}
                                    </Typography>
                                    <Typography
                                        variant="body2">Horario:
                                        de {clase.hora_inicio.toString() + ":00"} a {clase.hora_termino.toString() + ":00"}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card><br/></div>)) : null) : null}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {clases.length === 0 ?
                        <div><br/><h4>No hay ninguna clase en jueves. ¡Hurrah!</h4><br/></div> : null}
                    {horarioPartido[3] !== undefined ? (horarioPartido[3].length !== 0 ? horarioPartido[3].map((clase) => (
                        <div key={clase.id_clase}><Card sx={{minWidth: 100}}>
                            <CardActionArea onClick={() => {
                                handleEditarAbierto();
                                setClaseActiva(clase);
                                setIdClase(clase.id_clase);
                                setClaveMateria(clase.clave_materia);
                                setGrupo(clase.grupo);
                                setDocente(clase.docente);
                                setAula(clase.aula);
                                setHoraInicio(clase.hora_inicio);
                                setHoraTermino(clase.hora_termino);
                                setLunes(clase.lunes === 1);
                                setMartes(clase.martes === 1);
                                setMiercoles(clase.miercoles === 1);
                                setJueves(clase.jueves === 1);
                                setViernes(clase.viernes === 1);
                            }}>
                                <CardContent>
                                    <Typography
                                        sx={{fontSize: 14}}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Grupo: {clase.grupo}, Clave: {clase.clave_materia},
                                        Aula: {clase.aula} Carrera: {getCarreraMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {getNombreMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        Docente: {clase.docente}
                                    </Typography>
                                    <Typography
                                        variant="body2">Horario:
                                        de {clase.hora_inicio.toString() + ":00"} a {clase.hora_termino.toString() + ":00"}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card><br/></div>)) : null) : null}
                </TabPanel>
                <TabPanel value={value} index={4}>
                    {clases.length === 0 ?
                        <div><br/><h4>No hay ninguna clase en viernes. ¡Hurrah!</h4><br/></div> : null}
                    {horarioPartido[4] !== undefined ? (horarioPartido[4].length !== 0 ? horarioPartido[4].map((clase) => (
                        <div key={clase.id_clase}><Card sx={{minWidth: 100}}>
                            <CardActionArea onClick={() => {
                                handleEditarAbierto();
                                setClaseActiva(clase);
                                setIdClase(clase.id_clase);
                                setClaveMateria(clase.clave_materia);
                                setGrupo(clase.grupo);
                                setDocente(clase.docente);
                                setAula(clase.aula);
                                setHoraInicio(clase.hora_inicio);
                                setHoraTermino(clase.hora_termino);
                                setLunes(clase.lunes === 1);
                                setMartes(clase.martes === 1);
                                setMiercoles(clase.miercoles === 1);
                                setJueves(clase.jueves === 1);
                                setViernes(clase.viernes === 1);
                            }}>
                                <CardContent>
                                    <Typography
                                        sx={{fontSize: 14}}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Grupo: {clase.grupo}, Clave: {clase.clave_materia},
                                        Aula: {clase.aula} Carrera: {getCarreraMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {getNombreMateria(clase.clave_materia)}
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        Docente: {clase.docente}
                                    </Typography>
                                    <Typography
                                        variant="body2">Horario:
                                        de {clase.hora_inicio.toString() + ":00"} a {clase.hora_termino.toString() + ":00"}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card><br/></div>)) : null) : null}
                </TabPanel>
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
                <Dialog fullWidth open={dialogoAgregarAbierto} onClose={handleAgregarCerrado}>
                    <DialogTitle>Nueva clase</DialogTitle>
                    <DialogContent>
                        <Box m={1} sx={{justifyContent: "space-between"}}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="demo-simple-select-label">Clave de la materia</InputLabel>
                                <Select
                                    value={claveMateria}
                                    label="Clave de la materia"
                                    onChange={(e) => {
                                        setClaveMateria(e.target.value);
                                        setValue(0);
                                    }}
                                >
                                    {historialPartido[1] !== undefined ? historialPartido[1].length === 0 ?
                                        <MenuItem>Aún no estás cursando ninguna
                                            materia.</MenuItem> : null : null}
                                    {historialPartido[1] !== undefined ? historialPartido[1].map((materia) => (
                                        <MenuItem
                                            value={materia.clave_materia}
                                            key={materia.id_curso}>{materia.clave_materia + ": " + getNombreMateria(materia.clave_materia)}</MenuItem>)) : null}
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                            <DialogContentText>Grupo</DialogContentText>
                            <TextField
                                margin="dense"
                                size='small'
                                id="titulo"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GroupIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setGrupo(e.target.value)
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Docente</DialogContentText>
                            <TextField
                                margin="dense"
                                size='small'
                                id="titulo"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setDocente(e.target.value);
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Aula</DialogContentText>
                            <TextField
                                margin="dense"
                                size='small'
                                id="titulo"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RoomIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setAula(e.target.value)
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Hora de inicio</DialogContentText>
                            <Slider
                                defaultValue={12}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={23}
                                onChange={(e) => {
                                    setHoraInicio(e.target.value);
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Hora de término</DialogContentText>
                            <Slider
                                defaultValue={12}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={23}
                                onChange={(e) => {
                                    setHoraTermino(e.target.value);
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Días</DialogContentText>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                                    setLunes(!lunes);
                                }}/>} label="Lunes"/>
                                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                                    setMartes(!martes);
                                }}/>} label="Martes"/>
                                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                                    setMiercoles(!miercoles);
                                }}/>} label="Miércoles"/>
                                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                                    setJueves(!jueves);
                                }}/>} label="Jueves"/>
                                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                                    setViernes(!viernes);
                                }}/>} label="Viernes"/>
                            </FormGroup>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAgregarCerrado}>Cancelar</Button>
                        <Button
                            disabled={condicion}
                            onClick={() => {
                                agregarClase();
                                setDialogoAgregarAbierto(false);
                            }}>Agregar</Button>
                    </DialogActions>
                </Dialog>
                {/*Dialogo editar*/}
                <Dialog fullWidth open={dialogoEditarAbierto} onClose={handleEditarCerrado}>
                    <DialogTitle>Editar clase</DialogTitle>
                    <DialogContent>
                        <Box m={1} sx={{justifyContent: "space-between"}}>
                            <FormControl fullWidth>
                                <InputLabel>Clave de la materia</InputLabel>
                                <Select
                                    value={claveMateria}
                                    label="Clave de la materia"
                                    onChange={(e) => {
                                        setClaveMateria(e.target.value);
                                        setValue(0);
                                    }}
                                >
                                    <MenuItem value={claseActiva.clave_materia}>{claseActiva.clave_materia}</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <br/>
                            <DialogContentText>Grupo</DialogContentText>
                            <TextField
                                margin="dense"
                                size='small'
                                type="text"
                                defaultValue={claseActiva.grupo}
                                fullWidth
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GroupIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setGrupo(e.target.value)
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Docente</DialogContentText>
                            <TextField
                                margin="dense"
                                size='small'
                                type="text"
                                defaultValue={claseActiva.docente}
                                fullWidth
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setDocente(e.target.value)
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Aula</DialogContentText>
                            <TextField
                                margin="dense"
                                size='small'
                                type="text"
                                defaultValue={claseActiva.aula}
                                fullWidth
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RoomIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setAula(e.target.value)
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Hora de inicio</DialogContentText>
                            <Slider
                                defaultValue={claseActiva.hora_inicio !== undefined ? parseInt(claseActiva.hora_inicio) : 0}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={23}
                                onChange={(e) => {
                                    setHoraInicio(e.target.value);
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Hora de término</DialogContentText>
                            <Slider
                                defaultValue={claseActiva.hora_termino !== undefined ? parseInt(claseActiva.hora_termino) : 0}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={23}
                                onChange={(e) => {
                                    setHoraTermino(e.target.value);
                                }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Días</DialogContentText>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={claseActiva.lunes === 1} onChange={(e) => {
                                        setLunes(!lunes);
                                    }}/>} label="Lunes"/>
                                <FormControlLabel
                                    control={<Checkbox checked={claseActiva.martes === 1} onChange={(e) => {
                                        setMartes(!martes);
                                    }}/>} label="Martes"/>
                                <FormControlLabel
                                    control={<Checkbox checked={claseActiva.miercoles === 1} onChange={(e) => {
                                        setMiercoles(!miercoles);
                                    }}/>}
                                    label="Miércoles"/>
                                <FormControlLabel
                                    control={<Checkbox checked={claseActiva.jueves === 1} onChange={(e) => {
                                        setJueves(!jueves);
                                    }}/>} label="Jueves"/>
                                <FormControlLabel
                                    control={<Checkbox checked={claseActiva.viernes === 1} onChange={(e) => {
                                        setViernes(!viernes);
                                    }}/>} label="Viernes"/>
                            </FormGroup>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleEditarCerrado();
                        }}>Cancelar</Button>
                        <Button onClick={() => {
                            handleEliminarAbierto();
                        }}>Eliminar clase</Button>
                        <Button
                            disabled={condicion}
                            onClick={() => {
                                editarClase();
                                handleEditarCerrado();
                            }}>Aceptar</Button>
                    </DialogActions>
                </Dialog>
                {/*Confirmar eliminar*/}
                <Dialog
                    open={dialogoEliminarAbierto}
                    onClose={handleEliminarCerrado}
                >
                    <DialogTitle>
                        {"¿Estás segur@ que quieres eliminar la clase?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Esta acción es permanente y no se puede revertir.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleEliminarCerrado();
                        }}>No</Button>
                        <Button onClick={() => {
                            eliminarClase();
                            handleEliminarCerrado();
                            handleEditarCerrado();
                        }} autoFocus>
                            Sí
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}
