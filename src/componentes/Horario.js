import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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
                    <Typography>{children}</Typography>
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
    const [reticula, setReticula] = useState([]);
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
    const [horaInicio, setHoraInicio] = useState(0);
    const [horaTermino, setHoraTermino] = useState(0);
    const [lunes, setLunes] = useState(true);
    const [martes, setMartes] = useState(true);
    const [miercoles, setMiercoles] = useState(true);
    const [jueves, setJueves] = useState(true);
    const [viernes, setViernes] = useState(true);
    const [claseActiva, setClaseActiva] = useState({});
    let condicion = claveMateria === "" || grupo === "" || docente === "" || aula === "";

    useEffect(() => {
        Axios.get('http://localhost:3005/api/materias').then((res) => {
            console.log(res.data);
            setMaterias(res.data);
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/historial').then((res) => {
            console.log(res.data);
            setReticula(res.data);
            setHistorialPartido(partirReticula(res.data));
            console.log(partirReticula(res.data));
        }).catch((err) => {
            console.log(err);
        });
        Axios.get('http://localhost:3005/api/horario').then((res) => {
            console.log(res.data);
            setClases(res.data);
            setHorarioPartido(partirHorario(res.data));
        }).catch((err) => {
            console.log(err);
        });
    }, [accionUsuario]);

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
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const editarClase = () => {
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/horario/actualizar', {
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
            console.log(res.data);
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
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    return (
        <Container>
            <Box sx={{width: "100%"}}>
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
                    {horarioPartido[0] !== undefined ? (horarioPartido[0].length !== 0 ? horarioPartido[0].map((clase) => (
                        <Card sx={{minWidth: 100}}>
                            <CardActionArea onClick={handleEditarAbierto}>
                                <CardContent>
                                    <Typography
                                        sx={{fontSize: 14}}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Grupo {clase.grupo}, Clave: {clase.clave_materia}, Aula {clase.aula}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        Nombre materia
                                    </Typography>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        Docente: {clase.docente}
                                    </Typography>
                                    <Typography variant="body2">Horario: {clase.hora_inicio} a {clase.hora_termino}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>)) : null) : null}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Card sx={{minWidth: 100}}>
                        <CardActionArea onClick={handleEditarAbierto}>
                            <CardContent>
                                <Typography
                                    sx={{fontSize: 14}}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Grupo X, Clave: XXX-XXXX, Aula XXX
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Nombre materia
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Docente
                                </Typography>
                                <Typography variant="body2">Horario: X a X</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Card sx={{minWidth: 100}}>
                        <CardActionArea onClick={handleEditarAbierto}>
                            <CardContent>
                                <Typography
                                    sx={{fontSize: 14}}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Grupo X, Clave: XXX-XXXX, Aula XXX
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Nombre materia
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Docente
                                </Typography>
                                <Typography variant="body2">Horario: X a X</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Card sx={{minWidth: 100}}>
                        <CardActionArea onClick={handleEditarAbierto}>
                            <CardContent>
                                <Typography
                                    sx={{fontSize: 14}}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Grupo X, Clave: XXX-XXXX, Aula XXX
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Nombre materia
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Docente
                                </Typography>
                                <Typography variant="body2">Horario: X a X</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Card sx={{minWidth: 100}}>
                        <CardActionArea onClick={handleEditarAbierto}>
                            <CardContent>
                                <Typography
                                    sx={{fontSize: 14}}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Grupo X, Clave: XXX-XXXX, Aula XXX
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Nombre materia
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Docente
                                </Typography>
                                <Typography variant="body2">Horario: X a X</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Clave de la materia</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={claveMateria}
                                    label="Clave de la materia"
                                    onChange={(e) => {
                                        // handleChange();
                                        setClaveMateria(e.target.value);
                                        setValue(0);
                                    }}
                                >
                                    {historialPartido[1] !== undefined ? historialPartido[1].map((materia) => (<MenuItem
                                        value={materia.clave_materia}>{materia.clave_materia}</MenuItem>)) : null}
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
                                aria-label="Temperature"
                                defaultValue={12}
                                // getAriaValueText={valuetext}
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
                                aria-label="Temperature"
                                defaultValue={12}
                                // getAriaValueText={valuetext}
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
                                <InputLabel id="demo-simple-select-label">Clave de la materia</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Clave de la materia"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                                // onChange={(e) => {
                                //     setTitulo(e.target.value)
                                // }}
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
                                // onChange={(e) => {
                                //     setTitulo(e.target.value)
                                // }}
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
                                // onChange={(e) => {
                                //     setTitulo(e.target.value)
                                // }}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Hora de inicio</DialogContentText>
                            <Slider
                                aria-label="Temperature"
                                defaultValue={30}
                                // getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={23}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Hora de término</DialogContentText>
                            <Slider
                                aria-label="Temperature"
                                defaultValue={30}
                                // getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={23}
                            />
                            <br/>
                            <br/>
                            <DialogContentText>Días</DialogContentText>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Lunes"/>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Martes"/>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Miércoles"/>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Jueves"/>
                                <FormControlLabel control={<Checkbox defaultChecked/>} label="Viernes"/>
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
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"¿Estás segur@ que quieres eliminar la clase?"}
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
                {/*<TabPanel value={value} index={1}>*/}
                {/*  No definido*/}
                {/*</TabPanel>*/}
            </Box>
        </Container>
    );
}
