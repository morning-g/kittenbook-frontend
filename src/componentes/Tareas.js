// // <<<<<<< HEAD
// // import { Input, TextField } from "@mui/material";
// // import Button from "@restart/ui/esm/Button";
// // import React, { Component, useState, Fragment, useRef} from "react";
// // import { Container } from "react-bootstrap";
// // import {v4 as uuidv4} from "uuid";
// // import { ListadoTareas } from "./ListadoTareas";

// // export function Tareas(props) {
// //   const [tareas, setTareas] = useState ([{ id: '01', titulo: "Ecuaciones diferenciales",
// //   categoria: "Ecuaciones", creacion: "22-10-2021: 14:31",
// //   limite: "22-10-2021: 23:59", recurso : null, notificacion: true}])

// //   const tareatituloRef = useRef();

// //   const handleTareaAdd = () => {
// //     const titulo = tareatituloRef.current.value;
// //     if ( titulo == '' ) return;
    
// //     setTareas ( (prevTarea) => {
// //         return [...prevTarea, {id: uuidv4(), titulo, categoria:null,
// //            creacion:null, limite:null, recurso:null, notificacion:false }]
// //     })
// //   }

// //   return (
// //     <Fragment>
// //       <Container style={{display: "flex", flexDirection: "column", width:250+"px"}}>
// //         <ListadoTareas tareas={tareas} />
// //         <TextField variant="filled" ref={tareatituloRef} placeholder="Título de la tarea"/>
// //         <Input type="datetime-local"/>
// //         <Button onClick={handleTareaAdd}>+</Button>
// //         <Button>-</Button>
// //       </Container>
// //     </Fragment>
// //     );
// // }
// import React, { Component, createElement, useState } from "react";
// import {ListaTabs} from './ListaTabs'
// import IconButton from '@mui/material/IconButton'
// import { DeleteOutlined, PlusOne, PlusOneOutlined } from "@mui/icons-material";
// import { Box } from "@mui/system";
// import Button from "@mui/material/Button";

// export default function ColorTabs() {
//   const [tabs, setTabs] = useState ([{titulo:"Calculo", value:"cinco"}])

//   return (
//     <>
//       <ListaTabs tabs = {tabs}/>
//     </>
//     // <Box sx={{ width: '100%', maxWidth: 800, margin: "0 auto", justifyContent:"center"}}>
//     //   {/* <Tabs
//     //     value={value}
//     //     onChange={handleChange}
//     //     textColor="secondary"
//     //     indicatorColor="secondary"
//     //     aria-label="scrollable auto tabs example"
//     //     variant = "scrollable"
//     //     centered
//     //   >
//     //     <ListaTabs tabs={tabs}/>
//     //     <Tab value="dos" label="Programacion "/>
//     //     <Tab value="tres" label="Calculo"/>
//     //     <Tab value="cuatro" label="Estadistica"/>
//     //     <Button variant="text" size="medium" color="primary"
//     //      endIcon={<PlusOneOutlined sx={{marginTop: "-4px"}}/>}>Agregar</Button>
//     //   </Tabs> */}
//     //   <ListaTabs tabs={tabs}/>
//     //   <Button variant="text" size="medium" color="primary"
//     //      endIcon={<PlusOneOutlined sx={{marginTop: "-4px"}}/>}>Agregar</Button>
//     // </Box>
//   );
// }

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
import Slide from '@mui/material/Slide'


export default function Tareas() {
  // Arreglo de objetos tabs
  const [tabs, setTabs] = useState ([{titulo:"Calculo", value:1},
   {titulo:"Ecuaciones", value:2},
   {titulo:"Gestión de Proyectos de Software", value:3},
   {titulo:"Inteligencia Artificial", value:4},
   {titulo:"Lenguajes y Automatas II", value:5}
  ]);

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
      return [...prevTabs, {titulo, value:prevTabs.size}]
    })

    tabTituloRef.current.value = null;
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

  return (
    <Box sx={{ width: '95%', maxWidth: 1000, margin: "0 auto", justifyContent:"center", display:"flex"}}>
      <ListaTabs tabs={tabs}/>
        <Button onClick={handleClickOpen} variant="outlined" size="small" color="primary"
         endIcon={<Add/>} sx={{minWidth:"110px"}}>
           Agregar
        </Button>
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
    </Box>
  )
}

function ListaTabs({tabs}) {
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };
  const [value, setValue] = React.useState(1);
  return (
      <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      aria-label="scrollable auto tabs example"
      variant = "scrollable">
      {/* <Tab label="cinco" value="cinco"/> */}
      {tabs.map((tab) => (
          <Tab value={tab.value} label={tab.titulo}/>
      ))}
      </Tabs>
  )
}


