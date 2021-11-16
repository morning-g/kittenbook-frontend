import Axios from "axios";
import React, { useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [estatus, setEstatus] = useState(0);
    let [estatusCheckbox, setEstatusCheckbox] = useState(false);
    let esValido = nombre === "" || apellido === "" || usuario === "" || password === "";

    Axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };
        const data = new FormData(event.currentTarget);
        Axios.post("http://localhost:3005/api/usuarios/registro", {
            username: data.get("username"),
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            password: data.get("password")
        }, {headers}).then(function (response) {
            setEstatus(response.status);
        }).catch(function (error) {
            console.log(error);
            setEstatus(error.response.status);
        });
    };

    const enviarRegistro = () => {
    };

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                    onChange={(e) => {
                                        setNombre(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellido"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={(e) => {
                                        setApellido(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Nombre de usuario"
                                    name="username"
                                    autoComplete="username"
                                    onChange={(e) => {
                                        setUsuario(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <br/>
                            </Grid>
                            <Grid item xs={12}>
                                {estatus === 401 ? <Alert severity="warning">
                                    <AlertTitle>Alerta</AlertTitle>
                                    El nombre de usuario dado ya existe.
                                </Alert> : null}
                                {estatus !== 0 && estatus !== 401 && estatus !== 200 && estatus !== 402 ?
                                    <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        Ocurrió un error al procesar la solicitud.
                                    </Alert> : null}
                                {estatus === 200 ? <Alert severity="success">
                                    <AlertTitle>Éxito</AlertTitle>
                                    Usuario registrado con éxito.
                                </Alert> : null}
                                {estatus === 402 ? <Alert severity="warning">
                                    <AlertTitle>Éxito</AlertTitle>
                                    Por favor llene todos los campos requeridos.
                                </Alert> : null}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" onChange={(e) => {
                                            setEstatusCheckbox(e.target.checked)
                                        }}/>
                                    }
                                    label="Confirmo que he leído y acepto los términos y condiciones y la política de privacidad."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={esValido || estatusCheckbox === false ? true : false}
                            onClick={enviarRegistro}
                        >
                            Crear cuenta
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Acceder
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}
