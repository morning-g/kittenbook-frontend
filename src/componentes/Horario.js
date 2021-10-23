import React, { Component } from "react";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
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

export default function Horario() {
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
            <Tab label="Lunes" {...a11yProps(0)} />
            <Tab label="Martes" {...a11yProps(1)} />
            <Tab label="Miercoles" {...a11yProps(2)} />
            <Tab label="Jueves" {...a11yProps(3)} />
            <Tab label="Viernes" {...a11yProps(4)} />
            <Tab label="Sabado" {...a11yProps(5)} />
          </Tabs>
        </Box>
       
        <TabPanel value={value} index={0} >
        <Card sx={{ minWidth: 100}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Grupo 1, Clave: MPA1
            </Typography>
          <Typography variant="h5" component="div">
            Fundamentos de programación
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Profesor: Juan Escutia
          </Typography>
          <Typography variant="body2">
            Horario: 8am a 9am
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/notas">
             <Button size="small">Apuntes de la materia</Button>
          </Link>
        </CardActions>
      </Card>
      <Divider variant="inset" component=""/>
      <Card sx={{ minWidth: 100}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Grupo 1, Clave: MPA1
            </Typography>
          <Typography variant="h5" component="div">
            Estadística
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Profesor: Juan Escutia
          </Typography>
          <Typography variant="body2">
            Horario: 8am a 9am
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/notas">
            <Button size="small">Apuntes de la materia</Button>
          </Link>
        </CardActions>
      </Card>
      </TabPanel>

      <TabPanel value={value} index={1}>
          No definido
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

