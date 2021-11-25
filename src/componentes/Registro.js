//imports  de la seccion
import Axios from "axios";
import React, { useState } from "react";
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import InputAdornment from "@mui/material/InputAdornment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

//Funcion por default en la seccion
export default function Registro() {
  //Estados para los datos necesarios en el registro
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [estatus, setEstatus] = useState(0);
  let [estatusCheckbox, setEstatusCheckbox] = useState(false);
  //Validaciones para evitar nombres cortos de uno o dos caracteres y crear contraseñas con caracteres seguros
  let esInvalidoNombre = nombre.length < 3 || nombre.length > 253;
  let esInvalidoApellido = apellido.length < 3 || apellido.length > 253;
  let esInvalidoUsuario = usuario.length < 6 || usuario.length > 253;
  let esInvalidoPassword = password.length < 6 || password.length > 253;

  Axios.defaults.withCredentials = true;
  //Creacion  para obtener datos del forumlario
  const handleSubmit = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const data = new FormData(event.currentTarget);
    Axios.post(
      "http://localhost:3005/api/usuarios/registro",
      {
        username: data.get("username"),
        firstName: data.get("firstName"), //Llamamos a la api y enviamos sus datos hacia la base de datos
        lastName: data.get("lastName"),
        password: data.get("password"),
      },
      { headers }
    )
      .then(function (response) {
        setEstatus(response.status);
      })
      .catch(function (error) {
        console.log(error);
        setEstatus(error.response.status);
      });
  };
  //Funcion para confirmar registro
  const enviarRegistro = () => {};

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {/*imagen de candado  */}
        <Box
          sx={{
            //Centramos la imagen y texto
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
            {/*Colocar icono */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          {/*Campos del formulario */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField //Nombres
                  autoComplete="fname"
                  name="firstName"
                  required
                  error={nombre.length < 3 || nombre.length > 253}
                  helperText="El nombre debe tener por lo menos 3 caracteres."
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField //Campo apellidos
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  error={apellido.length < 3 || apellido.length > 253}
                  helperText="El apellido debe tener por lo menos 3 caracteres."
                  autoComplete="lname"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setApellido(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField //nombre de usuario obligatorio
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="username" //Validacion para que sea de 6 caracteres o mas
                  error={usuario.length < 6 || usuario.length > 253}
                  helperText="El nombre de usuario debe tener por lo menos 6 caracteres."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setUsuario(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField //contraseña, igualmente es obligatoria
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  error={password.length < 6 || password.length > 253}
                  helperText="La contraseña debe tener por lo menos 6 caracteres."
                  autoComplete="new-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
              </Grid>
              <Grid item xs={12}>
                {" "}
                {/*Control de errores */}
                {estatus === 401 ? (
                  <Alert severity="warning">
                    <AlertTitle>Alerta</AlertTitle>
                    El nombre de usuario dado ya existe.
                  </Alert>
                ) : null}
                {estatus !== 0 &&
                estatus !== 401 &&
                estatus !== 200 &&
                estatus !== 402 ? (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Ocurrió un error al procesar la solicitud.
                  </Alert>
                ) : null}
                {/*el registro fue realizado con exito */}
                {estatus === 200 ? (
                  <Alert severity="success">
                    <AlertTitle>Éxito</AlertTitle>
                    Usuario registrado con éxito.
                  </Alert>
                ) : null}
                {/*Formulario con campos vacios */}
                {estatus === 402 ? (
                  <Alert severity="warning">
                    <AlertTitle>Éxito</AlertTitle>
                    Por favor llene todos los campos requeridos.
                  </Alert>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel //Checbox confirmacion contrato
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      onChange={(e) => {
                        setEstatusCheckbox(e.target.checked);
                      }}
                    />
                  }
                  label="Confirmo que he leído y acepto los términos y condiciones y la política de privacidad."
                />
              </Grid>
            </Grid>
            <Button //Boton para confirmar el registro
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                esInvalidoNombre ||
                esInvalidoApellido ||
                esInvalidoUsuario ||
                esInvalidoPassword ||
                estatusCheckbox === false
              }
              onClick={enviarRegistro}
            >
              Crear cuenta
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {" "}
                {/*Boton para acceder al inicio de sesion */}
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
