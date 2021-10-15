import React, { Component } from "react";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
          >
            <Tab label="Programacion" {...a11yProps(0)} />
            <Tab label="Calculo" {...a11yProps(1)} />
            <Tab label="Estadistica" {...a11yProps(2)} />
            <Tab label="Quimica" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <p>Lunes: 8am-9am</p>
          <p>Martes: 8am-9am</p>
          <p>Miercoles: 8am-9am</p>
          <p>Jueves: 8am-9am</p>
          <p>Viernes: 8am-9am</p>
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