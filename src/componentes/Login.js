import Axios from "axios";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {useState} from "react";
import {Redirect} from "react-router-dom";

const theme = createTheme();

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [estatus, setEstatus] = useState(0);
    const [ingresado, setIngresado] = useState(false);
    let esValido = usuario === "" || password === "";

    Axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };
        const data = new FormData(event.currentTarget);
        Axios.post("http://localhost:3005/api/usuarios/login", {
            username: data.get("username"),
            password: data.get("password")
        }, {headers}).then(function (response) {
            console.log(response);
            setEstatus(response.status);
        }).catch(function (error) {
            console.log(error);
            setEstatus(error.response.status);
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: "100vh"}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://www.elsiglodetorreon.com.mx/m/i/2019/10/1235546.jpeg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar sesión
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{mt: 1}}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Nombre de usuario"
                                name="username"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => {
                                    setUsuario(e.target.value);
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            {estatus === 401 ? <Alert severity="warning">
                                <AlertTitle>Alerta</AlertTitle>
                                El nombre de usuario dado no existe.
                            </Alert> : null}
                            {estatus === 402 ? <Alert severity="warning">
                                <AlertTitle>Alerta</AlertTitle>
                                El nombre de usuario y/o la contraseña no son correctos.
                            </Alert> : null}
                            {estatus === 200 ? <Alert severity="success">
                                <AlertTitle>Éxito</AlertTitle>
                                Ingresando...
                            </Alert> : null}
                            {estatus !== 0 && estatus !== 401 && estatus !== 402 && estatus !== 200 ? <Alert severity="warning">
                                <AlertTitle>Error</AlertTitle>
                                Ocurrió un error al procesar la solicitud.
                                </Alert> : null}
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Recuérdame"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={esValido ? true : false}
                                sx={{mt: 3, mb: 2}}
                                // onClick={() => { setTimeout(setIngresado(true), 3000) }}
                            >
                                Iniciar sesión
                            </Button>
                            {/*{ingresado ? <Redirect to="/"/> : null}*/}
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/olvidopassword" variant="body2">
                                        Olvidé la contraseña
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/registro" variant="body2">
                                        {"¿No tienes una cuenta?"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
