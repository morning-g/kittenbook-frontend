import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Input, TextField } from "@mui/material";
import Button from "@restart/ui/esm/Button";
import React, { Component, useState, Fragment, useRef} from "react";
import { Container } from "react-bootstrap";
import {v4 as uuidv4} from "uuid";
import { ListadoTareas } from "./ListadodeTareas";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
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

export default function Tarea() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Calculo diferencial" {...a11yProps(0)} />
            <Tab label="Programacion" {...a11yProps(1)} />
            <Tab label="Adminstracion de redes" {...a11yProps(2)} />
            <Tab label="GPS" {...a11yProps(3)} />
          </Tabs>
        </Box>
      <TabPanel value={value} index={0} >
        <ListaTareas/>
      </TabPanel>

      <TabPanel value={value} index={1}>
          
        </TabPanel>
        <TabPanel value={value} index={2}>
          No definido
        </TabPanel>
        <TabPanel value={value} index={3}>
          No definido
        </TabPanel>
      </Box>
    </Container>
  );
}

function ListaTareas(props) {
  const [tareas, setTareas] = useState ([{ id: '01', titulo: "Crear Tarea",
  categoria: "Ecuaciones", creacion: "22-10-2021: 14:31",
  limite: "22-10-2021: 23:59", recurso : null, notificacion: true}])

  const tareatituloRef = useRef();

  const handleTareaAdd = () => {
    const titulo = tareatituloRef.current.value;
    if ( titulo == '' ) return;
    
    setTareas ( (prevTarea) => {
        return [...prevTarea, {id: uuidv4(), titulo, categoria:null,
           creacion:null, limite:null, recurso:null, notificacion:false }]
    })
  }

  return (
    <Fragment>
      <Container style={{display: "flex", flexDirection: "column", width:250+"px"}}>
        <ListadoTareas tareas={tareas} />
        <TextField variant="filled" ref={tareatituloRef} placeholder="Título de la tarea"/>
        <Input type="datetime-local"/>
        <Button onClick={handleTareaAdd}>+</Button>
        <Button>-</Button>
      </Container>
    </Fragment>
    );
}