import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import DateMomentUtils from "@date-io/moment";
import { DateTimePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import ListadoTareas from "./ListadoTareas";
import { OutlinedInput, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{width:"100%"}}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

export default function Tareas() {
  return (
    <Box sx={{ width: "100%" }}>
      <ListaTabs />
    </Box>
  );
}

function ListaTabs() {
  // Arreglo de objetos tabs
  const [tabs, setTabs] = useState([
    { titulo: "Calculo", value: 0 },
    { titulo: "Ecuaciones", value: 1 },
    { titulo: "Gestión de Proyectos de Software", value: 2 },
    { titulo: "Inteligencia Artificial", value: 3 },
    { titulo: "Lenguajes y Automatas II", value: 4 },
  ]);

  const [tareas, setTareas] = useState([
    {
      id: 0,
      titulo: "Tarea de cálculo",
      contenido: "Realizar los ejercicios de derivación indicados en clase.",
      tab: "Calculo",
      categoria: "Individual",
      actual: new Date(),
      limite: new Date(2021, 10, 7, 23, 59),
      recurso: null,
      notificacion: false,
    },
    {
      id: 1,
      titulo: "Proyecto Algoritmos Genéticos",
      contenido:
        "Realizar proyecto de algoritmos Genéticos, buscando un programa que realice busquedas optimizadas.",
      tab: "Inteligencia Artificial",
      categoria: "En equipo",
      actual: new Date(),
      limite: new Date(2021, 10, 7, 23, 55),
      recurso: null,
      notificacion: false,
    },
    {
      id: 2,
      titulo: "Sprint 7",
      contenido:
        "Realizar el septimo sprint del proyecto y los avances de la app.",
      tab: "Gestión de Proyectos de Software",
      categoria: "En equipo",
      actual: new Date(),
      limite: new Date(2021, 10, 5, 23, 55),
      recurso: null,
      notificacion: false,
    },
    {
      id: 3,
      titulo: "Investigación sobre integrales definidas",
      contenido:
        "Investigar las integrales definidas y realizar un ensayo, incluyendo antecedentes y aportes de personajes importantes.",
      tab: "Calculo",
      categoria: "Individual",
      actual: new Date(),
      limite: new Date(2021, 10, 6, 23, 55),
      recurso: null,
      notificacion: false,
    },
  ]);

  // Time picker
const [timePick, setTime] = React.useState(new Date('2021-12-25T23:11:54'));

const handleTimeChange = (newValue) => {
  setTime(newValue);
};
/*********************/

  // Ref al input del Dialog para insertar categoría
  const tabTituloRef = useRef();
  
  // Ref al input del Dialog para insertar tarea
  const tareaTituloRef = useRef ();
  const tareaContenidoRef = useRef ();
  const tareaCategoriaRef = useRef ();
  const tareaLimiteRef = useRef ();
  const tareaNotificacionRef = useRef ();

  const handleTareaClose = () => {
    setTareasOpen(false);
  }

  const handleAddTarea = () => {
    const titulo       = tareaTituloRef.current.value;
    const contenido    = tareaContenidoRef.current.value;
    const categoria    = tareaCategoriaRef.current.value;
    const limite       = tareaLimiteRef.current.value;
    const notificacion = tareaNotificacionRef.current.value; 
    if ( titulo === "" ) {
      handleError();
      handlehelperText();
      return;
    }

    setTareas ((prevTareas) => { 
      return [ ...prevTareas, { id: prevTareas.length, titulo,
         contenido, tab : value, categoria, limite, recurso : null ,notificacion}]
    })
    handleTareaClose();
  }

  // Añadir una nueva categoría (Tab)
  const handleAddTab = () => {
    const titulo = tabTituloRef.current.value;
    const value = tabTituloRef.current.value;
    if (titulo === "") {
      handleError();
      handlehelperText();
      return;
    }

    setTabs((prevTabs) => {
      return [...prevTabs, { titulo, value: prevTabs.length }];
    });
    handleClose();
  };

  // Estado de error en input del dialog
  const [error, setError] = useState(false);
  const handleError = () => {
    setError(true);
  };

  //Texto de error en input del dialog
  const [helpertext, setHelperText] = useState("");
  const handlehelperText = () => {
    setHelperText("Ingrese un título para su categoría");
  };

  //abrirDialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [openTareas, setTareasOpen] = useState(false);
  const handleTareasClickOpen = () => {
    setTareasOpen(true);
  };

  //Cambiar estado para cerrar Dialog
  const handleClose = () => {
    setOpen(false);
    setError(false);
    setHelperText("");
  };

  const [category, setCategoriaSelectValue] = useState('')

  const CategoriaChange = (event) => {
    setCategoriaSelectValue (event.target.value);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [notificaciones, setNotificacionesSelectValue] = useState(false)

  const NotificacionesChange = (event) => {
    setNotificacionesSelectValue (event.target.value);
  }

  const [value, setValue] = React.useState(0);
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
          value={value}
          onChange={handleChange}
          textColor="secondary"
          aria-label="scrollable auto tabs example"
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab value={tab.value} label={tab.titulo} />
          ))}
        </Tabs>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          size="small"
          color="primary"
          endIcon={<Add />}
          sx={{ minWidth: "110px" }}
        >
          Agregar
        </Button>
      </Box>
      <Box sx={{
          width: "95%",
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
        }}>
        {tabs.map((tab) => (
          <TabPanel index={tab.value} value={value}>
            <h2>{tab.titulo}</h2>
            <Grid container sx={{ justifyContent:"space-between", columnGap:1, rowGap:1}}>
              <ListadoTareas tareas={tareas} materia={tab.titulo} />
              <Grid item sx={{ display: "flex", minWidth:"300px"}}>
                <Card
                  sx={{
                      width: "100%",
                      maxWidth: 300,
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                  }}
                  >
                  <CardActionArea 
                  sx={{ display: "flex", height: "100%", alignItems: "flex-start" }}
                  onClick={handleTareasClickOpen} >
                      <CardContent sx={{ display: "flex", height: "100%", alignItems: "center" }}>
                      <AddCircleOutlineIcon sx={{fontSize: 100, color:"#1976d2"}}/>
                      </CardContent>
                  </CardActionArea>
                  </Card>
              </Grid>
            </Grid>
          </TabPanel>
        ))}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            inserta un título para la nueva categoría.
          </DialogContentText>
          <TextField
            inputRef={tabTituloRef}
            autoFocus
            margin="dense"
            id="titulo"
            label="Titulo"
            type="text"
            fullWidth
            helperText={helpertext}
            variant="standard"
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddTab}>Agregar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openTareas} onClose={handleTareaClose} maxWidth="false" fullWidth>
        <DialogTitle>Agregar tarea</DialogTitle>
        <DialogContent>
          <DialogContentText>
            inserta un título para tu tarea.
          </DialogContentText>
          <TextField
            inputRef={tabTituloRef}
            autoFocus
            margin="dense"
            id="titulo"
            label="Titulo"
            type="text"
            fullWidth
            helperText={helpertext}
            variant="standard"
            error={error}
          />
          <Box sx={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", margin:"5px 0"}}>
            <div>
              <DialogContentText>
                inserta una categoria.
              </DialogContentText>
              <FormControl sx={{ m: 1, minWidth: "150px" }}>
                  <Select
                    native
                    value={category}
                    onChange = {CategoriaChange}
                    input={<OutlinedInput inputRef={tareaCategoriaRef} label="Category" id="demo-dialog-native" />}
                    sx={{padding:"10px"}}
                    >
                    <option value={"idividual"}>Individual</option>
                    <option value={"En equipo"}>En equipo</option>
                  </Select>
              </FormControl>
            </div>
            <div>
              <DialogContentText>
                Notificaciones
              </DialogContentText>
              <FormControl sx={{ m: 1, minWidth: "150px" }}>
                  <Select
                    native
                    value={notificaciones}
                    onChange = {NotificacionesChange}
                    input={<OutlinedInput inputRef={tareaNotificacionRef} label="notificaciones"/>}
                    sx={{padding:"10px"}}
                    >
                    <option value={true}>Activadas</option>
                    <option value={false}>Desactivadas</option>
                  </Select>
              </FormControl>
            </div>
          </Box>
          <FormControl fullWidth sx={{m:1}}>
            <DialogContentText>
              Contenido de la tarea
            </DialogContentText>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              inputRef={tareaContenidoRef}
            />
          </FormControl>
          <Box sx={{float:"right", marginTop:"5px"}}>
            <DialogContentText>
              Fecha y hora límite
            </DialogContentText>
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
              <DateTimePicker
              format="MM/DD/yyyy --- h:mm"
              value={timePick}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField inputRef={tareaLimiteRef} />}
              ></DateTimePicker>
            </MuiPickersUtilsProvider>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleTareaClose}>Cancelar</Button>
          <Button onClick={handleAddTarea}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
