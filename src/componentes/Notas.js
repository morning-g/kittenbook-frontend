import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {CardActionArea} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TitleIcon from '@mui/icons-material/Title';

import Axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Notas() {
    Axios.defaults.withCredentials = true;
    const headers = {
        'Content-Type': 'application/json'
    };

    const [notas, setNotas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [dialogoAgregarAbierto, setDialogoAgregarAbierto] = useState(false);
    const [dialogoEditarAbierto, setDialogoEditarAbierto] = useState(false);
    const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
    const [idNota, setIdNota] = useState(0);
    const [notaActiva, setNotaActiva] = useState({});

    useEffect(() => {
        Axios.get('http://localhost:3005/api/notas').then((res) => {
            console.log(res.data);
            setNotas(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [notas]);

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

    const enviarNota = () => {
        Axios.post('http://localhost:3005/api/notas', {
            titulo: titulo,
            contenido: contenido
        }, {headers}).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    const editarNota = (id_nota) => {
        Axios.post('http://localhost:3005/api/notas/actualizar', {
            id_nota: id_nota,
            titulo: titulo,
            contenido: contenido
        }, {headers}).then((res) => {

        }).catch((err) => {
            console.log(err);
        });
    };

    const eliminarNota = (id_nota) => {
        Axios.delete('http://localhost:3005/api/notas', { data: {
                id_nota: id_nota
            }
        }, {headers}).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <br/>
                <Container sx={{py: 1}} maxWidth="md">
                    <Grid container spacing={4}>
                        {notas.length === 0 ? <Grid item sx={{display: "flex", width: "90em"}}>
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
                        </Grid> : <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                position: "relative",
                            }}
                            >
                                <CardActionArea sx={{display: "flex", height: "100%", alignItems: "flex-start"}}
                                                onClick={handleAgregarAbierto}>
                                    <CardContent sx={{display: "flex", height: "100%", alignItems: "center"}}>
                                        <AddCircleOutlineIcon sx={{fontSize: 100, color: "#1976d2"}}/>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>}

                        {notas.map((nota) => (
                            <Grid item key={nota.id_nota} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                    }}
                                >
                                    <CardActionArea onClick={() => {
                                        handleEditarAbierto();
                                        setNotaActiva(nota);
                                        setIdNota(nota.id_nota);
                                        setTitulo(nota.titulo);
                                        setContenido(nota.contenido);
                                    }}>
                                        <CardContent sx={{flexGrow: 1}}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {nota.titulo}
                                            </Typography>
                                            <Typography>
                                                {nota.contenido}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                {/*NUEVA NOTA*/}
                <Dialog fullWidth open={dialogoAgregarAbierto} onClose={handleAgregarCerrado}>
                    <DialogTitle>Nueva nota</DialogTitle>
                    <DialogContent>
                        <Box m={1} sx={{justifyContent: "space-between"}}>
                            <DialogContentText>Título</DialogContentText>
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
                                            <TitleIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setTitulo(e.target.value)
                                }}
                            />
                            <DialogContentText>Contenido</DialogContentText>
                            <TextField
                                margin="dense"
                                id="contenido"
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
                                    setContenido(e.target.value)
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAgregarCerrado}>Cancelar</Button>
                        <Button disabled={titulo === "" || contenido === "" ? true : false}
                                onClick={() => {
                                    enviarNota();
                                    setDialogoAgregarAbierto(false)
                                }}>Agregar</Button>
                    </DialogActions>
                </Dialog>
                {/*VER O EDITAR NOTA*/}
                <Dialog fullScreen={true} open={dialogoEditarAbierto} onClose={handleEditarCerrado}>
                    <DialogTitle>Ver o editar nota</DialogTitle>
                    <DialogContent>
                        <Box m={1} sx={{justifyContent: "space-between"}}>
                            <DialogContentText>Título</DialogContentText>
                            <TextField
                                margin="dense"
                                size='small'
                                id="titulo"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                                defaultValue={notaActiva.titulo}
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
                            <DialogContentText>Contenido</DialogContentText>
                            <TextField
                                margin="dense"
                                id="contenido"
                                size='small'
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
                                            <TextSnippetIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => {
                                    setContenido(e.target.value)
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditarCerrado}>Cancelar</Button>
                        <Button onClick={() => {
                            handleEliminarAbierto();
                        }}>Eliminar nota</Button>
                        <Button onClick={() => {
                            editarNota(idNota);
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
                        {"¿Estás segur@ que quieres eliminar la nota?"}
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
                            eliminarNota(idNota);
                            handleEliminarCerrado();
                            handleEditarCerrado();
                        }} autoFocus>
                            Sí
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        </React.Fragment>
    );
}
