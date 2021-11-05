import Box from '@mui/material/Box'
import React, { useRef, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import Add from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import ListadoTareas from './ListadoTareas'

function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div
    role = "tabpanel"
    hidden = {value !== index }
    id = {`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    { ...other}
    >
      {value === index && (
        <Box sx={{p:3}}>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Tareas() {
  return (
    <Box sx={{width:'100%'}}>
      <ListaTabs/>      
    </Box>
  )
}

function ListaTabs() {
  // Arreglo de objetos tabs
  const [tabs, setTabs] = useState ([{titulo:"Calculo", value:0},
   {titulo:"Ecuaciones", value:1},
   {titulo:"Gestión de Proyectos de Software", value:2},
   {titulo:"Inteligencia Artificial", value:3},
   {titulo:"Lenguajes y Automatas II", value:4}
  ]);

  const [tareas, setTareas] = useState ([
  {id: 0, titulo:"Tarea de cálculo", contenido: "Realizar los ejercicios de derivación indicados en clase.",
  tab: "Calculo",categoria:"Individual", creacion: new Date(), limite: new Date(2021,10,7, 23,59), recurso: null, notificacion: false},
  {id: 1, titulo:"Proyecto Algoritmos Genéticos", contenido: "Realizar proyecto de algoritmos Genéticos, buscando un programa que realice busquedas optimizadas.",
  tab: "Inteligencia Artificial",categoria:"En equipo", creacion: new Date(), limite: new Date(2021,10,7, 23,55), recurso: null, notificacion: false}])

  // Ref al input del Dialog para insertar categoría
  const tabTituloRef = useRef();

  // Añadir una nueva categoría (Tab)
  const handleAddTab = () => {
    const titulo = tabTituloRef.current.value;
    const value = tabTituloRef.current.value;
    if(titulo === '')
    {
      handleError();
      handlehelperText();
      return
    }

    setTabs ((prevTabs) => {
      return [...prevTabs, {titulo, value:prevTabs.length}]
    })
    handleClose();
  }

  // Estado de error en input del dialog
  const [error, setError] = useState(false);
  const handleError = () => {
    setError(true);
  }

  //Texto de error en input del dialog
  const [helpertext, setHelperText] = useState("")
  const handlehelperText = () => {
    setHelperText("Ingrese un título para su categoría");
  }

  //abrirDialog    
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Cambiar estado para cerrar Dialog
  const handleClose = () => {
    setOpen(false);
    setError(false);
    setHelperText("");
  };
  
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Box sx={{ width: '95%', maxWidth: 1000, margin: "0 auto", justifyContent:"center", display:"flex"}}>
          <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          aria-label="scrollable auto tabs example"
          variant = "scrollable">
          {tabs.map((tab) => (
              <Tab value={tab.value} label={tab.titulo}/>
          ))}
          </Tabs>
          <Button onClick={handleClickOpen} variant="outlined" size="small" color="primary"
          endIcon={<Add/>} sx={{minWidth:"110px"}}>
            Agregar
          </Button>
      </Box>
      <div>
        {tabs.map((tab) => (
          <TabPanel index={tab.value} value={value}>
            <h2>{tab.titulo}</h2>
            <ListadoTareas tareas={tareas} materia={tab.titulo}/>
          </TabPanel>
        ))}
      </div>
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
                error = {error}
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddTab}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}