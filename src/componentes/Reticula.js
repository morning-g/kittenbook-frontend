import React, { Component } from "react";
import Container from "@mui/material/Container";
//import * as React from 'react';
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const cards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62,
];
/*export default function Reticula(props) {
  return (
    <div>
      <h1>Reticula</h1>
    </div>
  );
}*/
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

export default function Reticula() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box marginLeft="-65px" sx={{ width: "111.5%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Materias Cursadas" {...a11yProps(0)} />
            <Tab label="Materias en curso" {...a11yProps(1)} />
            <Tab label="Materias reprobadas" {...a11yProps(2)} />
            <Tab label="Reticula" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Card
            sx={{
              minWidth: 100,
              backgroundColor: "white",
              borderRadius: "20px",
              border: "solid .1px",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                marginLeft="25px"
              >
                Grupo 1, Clave: MPA1
              </Typography>
              <Typography
                variant="h5"
                component="div"
                display="inline-block"
                position="relative"
                marginLeft="25px"
              >
                Fundamentos de programación
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                marginLeft="25px"
              >
                Profesor: Juan Escutia
              </Typography>
              <Card
                sx={{
                  float: "right",
                  height: "100%",
                  marginTop: "-70px",
                  marginLeft: "10px",
                  marginRight: "70px",
                  width: "10%",
                  padding: "20px",
                  display: "inline-block",
                  position: "relative",
                  backgroundColor: "#67FF25",
                  border: "solid .1px",
                  borderColor: "divider",
                  flexDirection: "column",
                  borderRadius: "20px",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography align="center" fontWeight="bold" fontSize="18px">
                    100
                  </Typography>
                </CardContent>
              </Card>
              <Typography
                sx={{ mb: 1.0 }}
                color="text.secondary"
                marginLeft="25px"
              >
                Semestre: 1
              </Typography>
              <Typography variant="body2" marginLeft="25px">
                Oportunidad: 1
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card
            sx={{
              minWidth: 100,
              backgroundColor: "white",
              borderRadius: "20px",
              border: "solid .1px",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                marginLeft="25px"
              >
                Grupo 1, Clave: MPA1
              </Typography>
              <Typography
                variant="h5"
                component="div"
                display="inline-block"
                position="relative"
                marginLeft="25px"
              >
                Fundamentos de programación
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                marginLeft="25px"
              >
                Profesor: Juan Escutia
              </Typography>
              <Card
                sx={{
                  float: "right",
                  height: "100%",
                  marginTop: "-70px",
                  marginLeft: "10px",
                  marginRight: "70px",
                  width: "10%",
                  padding: "20px",
                  display: "inline-block",
                  position: "relative",
                  border: "solid .1px",
                  backgroundColor: "#5D86FA",
                  borderColor: "divider",
                  flexDirection: "column",
                  borderRadius: "20px",
                  border: "solid .1px",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography align="center" fontWeight="bold" fontSize="18px">
                    ?
                  </Typography>
                </CardContent>
              </Card>
              <Typography
                sx={{ mb: 1.0 }}
                color="text.secondary"
                marginLeft="25px"
              >
                Semestre: 1
              </Typography>
              <Typography variant="body2" marginLeft="25px">
                Oportunidad: 1
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Card
            sx={{
              minWidth: 100,
              backgroundColor: "white",
              borderRadius: "20px",
              border: "solid .1px",
              borderColor: "divider",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                marginLeft="25px"
              >
                Grupo 1, Clave: MPA1
              </Typography>
              <Typography
                variant="h5"
                component="div"
                display="inline-block"
                position="relative"
                marginLeft="25px"
              >
                Fundamentos de programación
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                marginLeft="25px"
              >
                Profesor: Juan Escutia
              </Typography>
              <Card
                sx={{
                  float: "right",
                  height: "100%",
                  marginTop: "-70px",
                  marginLeft: "10px",
                  marginRight: "70px",
                  width: "10%",
                  padding: "20px",
                  display: "inline-block",
                  position: "relative",
                  backgroundColor: "#FD674C",
                  flexDirection: "column",
                  borderRadius: "20px",
                  border: "solid .1px",
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography align="center" fontWeight="bold" fontSize="18px">
                    30
                  </Typography>
                </CardContent>
              </Card>
              <Typography
                sx={{ mb: 1.0 }}
                color="text.secondary"
                marginLeft="25px"
              >
                Semestre: 1
              </Typography>
              <Typography variant="body2" marginLeft="25px">
                Oportunidad: 1
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Container sx={{ py: 1 }} maxWidth="xl">
            <Typography
              padding="10px"
              marginTop="-2%"
              align="center"
              fontWeight="bold"
              fontSize="30px"
              fontFamily="-apple-system"
            >
              S E M E S T R E S
            </Typography>
            <Typography
              align="center"
              marginLeft="4.9%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              1
            </Typography>
            <Typography
              align="center"
              marginLeft="10%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              2
            </Typography>
            <Typography
              align="center"
              marginLeft="10.5%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              3
            </Typography>
            <Typography
              align="center"
              marginLeft="10.5%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              4
            </Typography>
            <Typography
              align="center"
              marginLeft="10.4%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              5
            </Typography>
            <Typography
              align="center"
              marginLeft="10.3%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              6
            </Typography>
            <Typography
              align="center"
              marginLeft="10.2%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              7
            </Typography>
            <Typography
              align="center"
              marginLeft="10.4%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              8
            </Typography>
            <Typography
              align="center"
              marginLeft="10.4%"
              display="inline-block"
              position="relative"
              fontWeight="bold"
            >
              9
            </Typography>
            <Typography display="inline-block" position="relative"></Typography>
            <Grid container spacing={1} columnSpacing={4.3}>
              {cards.map((card) => (
                <Grid
                  item
                  key={card}
                  xs={20}
                  sm={10}
                  md={1.3}
                  borderBottom="6"
                  borderColor="black"
                >
                  <Card
                    sx={{
                      height: "90%",
                      marginLeft: "-5px",
                      marginRight: "-25px",
                      display: "flex",
                      backgroundColor: "#F5F6F9",
                      border: "solid .1px",
                      borderColor: "divider",
                      borderRadius: "10px",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        align="center"
                        fontWeight="bold"
                        fontSize="18px"
                      >
                        Nombre Materia
                      </Typography>
                      <Typography
                        marginTop="20px"
                        display="inline-block"
                        fontSize="15px"
                      >
                        AB21S
                      </Typography>
                      <Typography
                        marginLeft="32%"
                        display="inline-block"
                        position="relative"
                      >
                        30
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </TabPanel>
      </Box>
    </Container>
  );
}
