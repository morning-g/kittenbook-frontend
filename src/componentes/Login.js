//<Resumen>
//Clase Login en la cual haremos el inicio de sesion a nuestra cuenta creada en la clase registro
//Contiene una funciones para las asignacion de las imagenes que se muestran el interfaz
//</Resumen>
//<para> En esta clase se encuentra la comprobacion de los datos que se obtuvieron del registro
//para poder ingresar a la sesion, en caso contrario se mandaran mensaje de erorres dependiendo el fallo obtenido
//<Autor>Omegaware</Autor>
//<Fecha de creacion> 11 de octubre de 2021 </Fecha de creacion>

//************************Imports********************************
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BadgeIcon from "@mui/icons-material/Badge";
//*****************************************************************

//Funcion principal en la cual se analizan los datos de incio y
//se verifica si son correctos.
export default function Login(props) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  let esValido = usuario === "" || password === "";

  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/*Asignación de la imagen que se muestra en el interfaz junto con el tamaño de esta*/}
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={props.login}
              sx={{ mt: 1 }}
            >
              {/*Creación del campo de texto donde se ingresa el nombre de usuario*/}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
                name="username"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  //Comprueba si la contraseña es correcta
                  setUsuario(e.target.value);
                }}
              />
              {/*Creacion del campo de texto donde se ingresa la contraseña*/}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  //Comprueba si la contraseña es correcta
                  setPassword(e.target.value);
                }}
              />
              {/*Si la contraseña o usuario son incorrectos, entonces manda a pantalla un mensaje de error*/}
              {/*Esté mensaje se genera cuando el usuario no pudo ser encontrado*/}
              {props.estatus === 401 ? (
                <Alert severity="warning">
                  <AlertTitle>Alerta</AlertTitle>
                  El nombre de usuario dado no existe.
                </Alert>
              ) : null}
              {/*Esté mensaje se genera cuando el usuario y la contraseña no coinciden*/}
              {props.estatus === 402 ? (
                <Alert severity="warning">
                  <AlertTitle>Alerta</AlertTitle>
                  El nombre de usuario y/o la contraseña no son correctos.
                </Alert>
              ) : null}
              {/*Esté mensaje se genera cuando el usuario y la contraseña son correctos*/}
              {props.estatus === 200 ? (
                <Alert severity="success">
                  <AlertTitle>Éxito</AlertTitle>
                  Ingresando...
                </Alert>
              ) : null}
              {/*Si el error no es ninguno de los anteriores, entonces se imprime a pantalla un mensaje*/}
              {/*en el cuál no se pudo hacer el proceso de solicitud*/}
              {props.estatus !== 0 &&
              props.estatus !== 401 &&
              props.estatus !== 402 &&
              props.estatus !== 200 ? (
                <Alert severity="warning">
                  <AlertTitle>Error</AlertTitle>
                  Ocurrió un error al procesar la solicitud.
                </Alert>
              ) : null}
              {/*Se crea el recuardo el cuál guarda los datos para futuros inicios de sesión*/}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={esValido ? true : false}
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
                {/*Creac+on de los botónes olvide la contraseña y ¿no tienes una cuenta?*/}
              </Button>
              {/*{ingresado ? <Redirect to="/"/> : null}*/}
              <Grid container>
                <Grid item xs>
                  {/*Al darle clic al botón nos dirigira a la clase olvide la contraseña*/}
                  <Link href="/olvidopassword" variant="body2">
                    Olvidé la contraseña
                  </Link>
                </Grid>
                <Grid item>
                  {/*Al darle clic al botón nos dirigira a la clase de regsitro*/}
                  <Link href="/registro" variant="body2">
                    {"¿No tienes una cuenta?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
