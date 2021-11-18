import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
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
import Slider from '@mui/material/Slider';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReticulaSistemasEspTICs from "../ReticulaSistemasEspTICs.png";
import ReticulaSistemasEspTecnologiasWeb from "../ReticulaSistemasEspTecnologiasWeb.png";
import ReticulaElectronicaEspMecatronica from "../ReticulaElectronicaEspMecatronica.png";
import ReticulaElectronicaEspSistemasEnergeticos from "../ReticulaElectronicaEspSistemasEnergeticos.png";
import ReticulaElectricaEspSistemasElectricos from "../ReticulaElectricaEspSistemasElectricos.png";
import ReticulaGestionEmpresarial from "../ReticulaGestionEmpresarial.png";
import ReticulaQuimicaEspGestionAmbiental from "../ReticulaQuimicaEspGestionAmbiental.png"
import ReticulaMecanicaEspDisenoMecanico from "../ReticulaMecanicaEspDisenoMecanico.png"
import ReticulaMecanicaEspTermica from "../ReticulaMecanicaEspTermica.png"

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

export default function Reticula(props) {
    return (
        <Box sx={{width: "100%"}}>
            <ListaTabs/>
        </Box>
    );
}

function ListaTabs(props) {
    Axios.defaults.withCredentials = true;
    const headers = {
        'Content-Type': 'application/json'
    };

    const [accionUsuario, setAccionUsuario] = useState(false);
    const [reticula, setReticula] = useState([]);
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
    let condicion;
    if (presionoAprobada) {
        condicion = claveMateria === "" || estadoMateria === "" || semestreMateria === 0 || periodoMateria === "" || anoMateria === 0;
    } else {
        condicion = claveMateria === "" || estadoMateria === "";
    }

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
    }, [accionUsuario]);

    const limpiar = () => {
        setClaveMateria("");
        setEstadoMateria("");
        setSemestreMateria(0);
        setCalificacionMateria(0);
        setPeriodo("");
        setAnoMateria(0);
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
        })
        return [aprobadasReticula, encursoReticula, porcursarReticula];
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

    const getCreditos = (materiasAprobadas) => {
        let suma = 0;
        materiasAprobadas.forEach((materia) => {
            suma += getCreditosMateria(materia.clave_materia);
        });
        return suma;
    };

    const getPromedio = (materiasAprobadas) => {
        let suma = 0;
        let i;
        for (i = 0; i < materiasAprobadas.length; i++) {
            suma += materiasAprobadas[i]["calificacion"];
        }
        return suma / i;
    };

    const agregarMateria = () => {
        // getMaterias();
        setAccionUsuario(!accionUsuario);
        Axios.post('http://localhost:3005/api/historial', {
            clave_materia: claveMateria,
            estado: estadoMateria,
            semestre_cursada: semestreMateria,
            calificacion: calificacionMateria,
            periodo_cursada: periodoMateria + " " + anoMateria
        }, {headers}).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    const eliminarMateria = (idCurso) => {
        setAccionUsuario(!accionUsuario);
        Axios.delete('http://localhost:3005/api/historial', {
            data: {
                id_curso: idCurso
            }
        }, {headers}).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
        limpiar();
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Box
                sx={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                {/*TABS*/}
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="primary"
                    variant="scrollable"
                >
                    <Tab label="Materias aprobadas" {...a11yProps(0)}/>
                    <Tab label="Materias en curso" {...a11yProps(1)}/>
                    <Tab label="Materias por cursar" {...a11yProps(2)}/>
                    <Tab label="Retículas por carrera" {...a11yProps(3)}/>

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
                    <Grid
                        container
                        sx={{justifyContent: "space-between", columnGap: 1, rowGap: 1}}
                    >
                        {historialPartido[0] !== undefined ? historialPartido[0].length !== 0 ? historialPartido[0].map((materiaReticula) => (
                                <React.Fragment>
                                    <Grid container sx={{display: "block"}}>
                                        <Grid item sx={{display: "block", position: "relative"}}>
                                            <Card
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    position: "relative",
                                                    borderRadius: "20px",
                                                }}
                                            >
                                                <CardActionArea
                                                    sx={{
                                                        display: "flex",
                                                        height: "100%",
                                                        "&:hover": {
                                                            "background-color": "rgba(255, 0, 0, 0.2)",
                                                            "transform": "scale3d(1.05, 1.05, 1)"
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        setIdCurso(materiaReticula.id_curso);
                                                        handleEliminarAbierto();
                                                    }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{fontSize: 14}}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            {"Clave: " + materiaReticula.clave_materia}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h5"
                                                        >
                                                            {getNombreMateria(materiaReticula.clave_materia)}
                                                        </Typography>
                                                        <Typography
                                                            color="text.secondary">{"Cursada: " + materiaReticula.periodo_cursada}</Typography>
                                                        <Typography
                                                            color="text.secondary">{"Semestre " + materiaReticula.semestre_cursada}</Typography>
                                                    </CardContent>
                                                    {/*Formato para la calificacion */}
                                                    <CardContent>
                                                        <Typography
                                                            sx={{
                                                                float: "right",
                                                                height: "100%",
                                                                marginTop: "-20px",
                                                                marginLeft: "300px",
                                                                marginRight: "20px",
                                                                width: "20%",
                                                                padding: "20px",
                                                                display: "inline-block",
                                                                position: "relative",
                                                                border: "solid .1px",
                                                                borderColor: "divider",
                                                                flexDirection: "column",
                                                                borderRadius: "20px",
                                                            }}
                                                            align="center"
                                                        >{materiaReticula.calificacion}</Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid></Grid></React.Fragment>)) :
                            <h4>Aún no tienes materias aprobadas agregadas.</h4> : null}
                    </Grid>
                </TabPanel>
                <TabPanel index={1} value={tabValue}>
                    <Grid
                        container
                        sx={{justifyContent: "space-between", columnGap: 1, rowGap: 1}}
                    >
                        {historialPartido[1] !== undefined ? historialPartido[1].length !== 0 ? historialPartido[1].map((materiaReticula) => (
                                <React.Fragment>
                                    <Grid container sx={{display: "block"}}>
                                        <Grid item sx={{display: "block", position: "relative"}}>
                                            <Card
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    position: "relative",
                                                    borderRadius: "20px",
                                                }}
                                            >
                                                <CardActionArea sx={{
                                                    display: "flex",
                                                    height: "100%",
                                                    "&:hover": {
                                                        "background-color": "rgba(255, 0, 0, 0.2)",
                                                        "transform": "scale3d(1.05, 1.05, 1)"
                                                    }
                                                }} onClick={() => {
                                                    setIdCurso(materiaReticula.id_curso);
                                                    handleEliminarAbierto();
                                                }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{fontSize: 14}}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            {"Clave: " + materiaReticula.clave_materia}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h5"
                                                        >
                                                            {getNombreMateria(materiaReticula.clave_materia)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid></Grid></React.Fragment>)) :
                            <h4>Aún no tienes materias en curso agregadas.</h4> : null}
                    </Grid>
                </TabPanel>
                <TabPanel index={2} value={tabValue}>
                    <Grid
                        container
                        sx={{justifyContent: "space-between", columnGap: 1, rowGap: 1}}
                    >
                        {historialPartido[2] !== undefined ? historialPartido[2].length !== 0 ? historialPartido[2].map((materiaReticula) => (
                                <React.Fragment>
                                    <Grid container sx={{display: "block"}}>
                                        <Grid item sx={{display: "block", position: "relative"}}>
                                            <Card
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    position: "relative",
                                                    borderRadius: "20px",
                                                }}
                                            >
                                                <CardActionArea sx={{
                                                    display: "flex",
                                                    height: "100%",
                                                    "&:hover": {
                                                        "background-color": "rgba(255, 0, 0, 0.2)",
                                                        "transform": "scale3d(1.05, 1.05, 1)"
                                                    }
                                                }} onClick={() => {
                                                    setIdCurso(materiaReticula.id_curso);
                                                    handleEliminarAbierto();
                                                }}>
                                                    <CardContent>
                                                        <Typography
                                                            sx={{fontSize: 14}}
                                                            color="text.secondary"
                                                            gutterBottom
                                                        >
                                                            {"Clave: " + materiaReticula.clave_materia}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h5"
                                                        >
                                                            {getNombreMateria(materiaReticula.clave_materia)}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid></Grid></React.Fragment>)) :
                            <h4>Aún no tienes materias por cursar agregadas.</h4> : null}
                    </Grid>
                </TabPanel>
                <TabPanel index={3} value={tabValue}>
                    <Grid
                        container
                        sx={{justifyContent: "space-between", columnGap: 1, rowGap: 1}}
                    >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Sistemas (especialidad tecnologías de la información y la comunicación)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Sistemas"} src={ReticulaSistemasEspTICs} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Sistemas (especialidad en tecnologías web y móvil)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Sistemas"} src={ReticulaSistemasEspTecnologiasWeb} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Electrónica (especialidad mecatrónica y control automático)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Electronica"} src={ReticulaElectronicaEspMecatronica} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Electrónica (especialidad sistemas energéticos e industriales)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Electronica"} src={ReticulaElectronicaEspSistemasEnergeticos} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Eléctrica (especialidad sistemas eléctricos)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Electrica"} src={ReticulaElectricaEspSistemasElectricos} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Gestión Empresarial (especialidad innovación para el desarrollo empresarial)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Gestion Empresarial"} src={ReticulaGestionEmpresarial} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Química (especialidad gestión ambiental)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Química"} src={ReticulaQuimicaEspGestionAmbiental} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Mecánica (especialidad térmica)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Mecánica"} src={ReticulaMecanicaEspTermica} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Ing. Mecánica (especialidad diseño mecánico)</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img alt={"Reticula Mecánica"} src={ReticulaMecanicaEspDisenoMecanico} width={"100%"}/>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </TabPanel>
            </Box>
            <br/>
            {historialPartido[0] !== undefined ?
                historialPartido[0].length !== 0 ?
                    <h5 style={{textAlign: "center"}}>{"Promedio: " + getPromedio(historialPartido[0])}</h5> :
                    <h5 style={{textAlign: "center"}}>Promedio: n/a</h5>
                : null}
            {historialPartido[0] !== undefined ?
                historialPartido[0].length !== 0 ?
                    <h5 style={{textAlign: "center"}}>{"Créditos completados: " + getCreditos(historialPartido[0])}</h5> :
                    <h5 style={{textAlign: "center"}}>Créditos completados: n/a</h5>
                : null}
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
            {/* Dialogo agregar materia*/}
            <Dialog
                open={dialogoAgregarAbierto}
                onClose={handleAgregarCerrado}
                maxWidth="false"
                fullWidth
            >
                <DialogTitle>Agregar materia a tu historial académico</DialogTitle>
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
                                    setClaveMateria(e.target.value);
                                }}
                            >
                                {materias.map((materiaReticula) => (
                                    <MenuItem
                                        value={materiaReticula.clave_materia}>{materiaReticula.clave_materia + ": " + materiaReticula.nombre_materia} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Estado de la materia</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={estadoMateria}
                                label="Estado de la materia"
                                onChange={(e) => {
                                    setEstadoMateria(e.target.value)
                                }}
                            >
                                <MenuItem value={"Aprobada"} onClick={() => {
                                    setPresionoAprobada(true)
                                }}>Aprobada</MenuItem>
                                <MenuItem value={"En curso"} onClick={() => {
                                    setPresionoAprobada(false)
                                }}>En curso</MenuItem>
                                <MenuItem value={"Por cursar"} onClick={() => {
                                    setPresionoAprobada(false)
                                }}>Por cursar</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        {presionoAprobada ?
                            <div>
                                <br/>
                                <DialogContentText>Semestre (en número arábigo)</DialogContentText>
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
                                                <CalendarTodayIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setSemestreMateria(parseInt(e.target.value))
                                    }}
                                />
                                <br/>
                                <br/>
                                <DialogContentText>Calificación</DialogContentText>
                                <Slider
                                    aria-label="Calificación"
                                    defaultValue={70}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={70}
                                    max={100}
                                    onChange={(e) => {
                                        setCalificacionMateria(e.target.value)
                                    }}
                                />
                                <br/>
                                <br/>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Periodo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={periodoMateria}
                                        label="Clave de la materia"
                                        onChange={(e) => {
                                            setPeriodo(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={"Enero-junio"}>Enero-junio</MenuItem>
                                        <MenuItem value={"Agosto-diciembre"}>Agosto-diciembre</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <br/>
                                <DialogContentText>Año (en número arábigo)</DialogContentText>
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
                                                <DateRangeIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => {
                                        setAnoMateria(parseInt(e.target.value))
                                    }}
                                />
                                <br/>
                            </div> : null
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleAgregarCerrado();
                        setTabValue(0);
                        setPresionoAprobada(false);
                    }}>Cancelar</Button>
                    <Button
                        disabled={condicion}
                        onClick={() => {
                            agregarMateria();
                            setPresionoAprobada(false);
                            handleAgregarCerrado();
                        }}>Agregar</Button>
                </DialogActions>
            </Dialog>
            {/*Dialogo eliminar*/}
            <Dialog
                open={dialogoEliminarAbierto}
                onClose={handleEliminarCerrado}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"¿Estás segur@ que quieres eliminar el curso?"}
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
                        eliminarMateria(idCurso);
                        handleEliminarCerrado();
                    }} autoFocus>
                        Sí
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
