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
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";
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
import TitleIcon from "@mui/icons-material/Title";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
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
    const [value, setValue] = React.useState(0);
    const [dialogoAgregarAbierto, setDialogoAgregarAbierto] = useState(false);
    const [dialogoEditarAbierto, setDialogoEditarAbierto] = useState(false);
    const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
    const [clases, setClases] = useState([]);
    const [idClase, setIdClase] = useState(0);
    const [claveMateria, setClaveMateria] = useState("");
    const [grupo, setGrupo] = useState("");
    const [aula, setAula] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaTermino, setHoraTermino] = useState("");
    const [lunes, setLunes] = useState(true);
    const [martes, setMartes] = useState(true);
    const [miercoles, setMiercoles] = useState(true);
    const [jueves, setJueves] = useState(true);
    const [viernes, setViernes] = useState(true);

    // useEffect(() => {
    //     Axios.get('http://localhost:3005/api/horario').then((res) => {
    //         console.log(res.data);
    //         // setNotas(res.data);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }, []);

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
            // titulo: titulo,
            // contenido: contenido
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
            // id_nota: id_nota,
            // titulo: titulo,
            // contenido: contenido
        }, {headers}).then((res) => {

        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const eliminarClase = () => {
        setAccionUsuario(!accionUsuario);
        Axios.delete('http://localhost:3005/api/horario', {
            data: {
                // id_nota: id_nota
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
                    <Card sx={{minWidth: 100}}>
                        <CardContent>
                            <Typography
                                sx={{fontSize: 14}}
                                color="text.secondary"
                                gutterBottom
                            >
                                Grupo 1, Clave: MPA1
                            </Typography>
                            <Typography variant="h5" component="div">
                                Fundamentos de programación
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Profesor: Juan Escutia
                            </Typography>
                            <Typography variant="body2">Horario: 8am a 9am</Typography>
                        </CardContent>
                        <CardActions>
                            <Link to="/notas">
                                <Button size="small">Apuntes de la materia</Button>
                            </Link>
                        </CardActions>
                    </Card>
                    <Divider variant="inset" component=""/>
                    <Card sx={{minWidth: 100}}>
                        <CardActionArea onClick={handleEditarAbierto}>
                            <CardContent>
                                <Typography
                                    sx={{fontSize: 14}}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Grupo 1, Clave: MPA1
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Estadística
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    Profesor: Juan Escutia
                                </Typography>
                                <Typography variant="body2">Horario: 8am a 9am</Typography>
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
                                    // value={age}
                                    label="Clave de la materia"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <DialogContentText>Grupo</DialogContentText>
                            <TextField
                                autoFocus
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
                            <DialogContentText>Docente</DialogContentText>
                            <TextField
                                autoFocus
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
                            <DialogContentText>Aula</DialogContentText>
                            <TextField
                                autoFocus
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
                        <Button onClick={handleAgregarCerrado}>Cancelar</Button>
                        <Button
                            // disabled={titulo === "" || contenido === "" ? true : false}
                            onClick={() => {
                                agregarClase();
                                setDialogoAgregarAbierto(false)
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
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <DialogContentText>Grupo</DialogContentText>
                            <TextField
                                autoFocus
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
                            <DialogContentText>Docente</DialogContentText>
                            <TextField
                                autoFocus
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
                            <DialogContentText>Aula</DialogContentText>
                            <TextField
                                autoFocus
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
                        }}>Eliminar nota</Button>
                        <Button
                            // disabled={titulo === "" || contenido === "" ? true : false}
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
