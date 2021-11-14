import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import MateriasEstilo from "./MateriasEstilo";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
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

export default function Reticula() {
  return (
    <Box sx={{ width: "100%" }}>
      <ListaTabs />
    </Box>
  );
}

function ListaTabs() {
  // Arreglo de objetos tabs
  const [tabs] = useState([
    { titulo: "Materias aprobadas", value: 0 },
    { titulo: "Materias en curso", value: 1 },
    { titulo: "Materias reprobadas", value: 2 },
    { titulo: "Reticula", value: 3 },
  ]);

  const [tareas, setTareas] = useState([
    {
      id: 0,
      titulo: "Fundamentos de programación",
      grupo: "1",
      clave: "A15",
      docente: "Profesor: Juan Perez",
      semestre: "2",
      oportunidad: "1",
      calificacion: "100",
      tab: "Materias aprobadas",
    },
  ]);

  // Refs para datos de materia
  const tabTituloRef = useRef();
  const materiaTituloRef = useRef();
  const materiaGrupoRef = useRef();
  const materiaClaveRef = useRef();
  const materiaDocenteRef = useRef();
  const materiaSemestreRef = useRef();
  const materiaOportunidadRef = useRef();
  const materiaCalificacionRef = useRef();
  const tareaContenidoRef = useRef();
  const tareaCategoriaRef = useRef();

  const handleMateriaClose = () => {
    setTareasOpen(false);
  };

  const agregarMateria = () => {
    const titulo = materiaTituloRef.current.value;
    const contenido = tareaContenidoRef.current.value;
    const categoria = tareaCategoriaRef.current.value;
    if (titulo === "") {
      handleError();
      handlehelperText();
      return;
    }

    setTareas((prevTareas) => {
      return [
        ...prevTareas,
        { id: prevTareas.length, titulo, contenido, tab: value, categoria },
      ];
    });
    handleMateriaClose();
  };

  // Estado de error en input del dialog
  const [error, setError] = useState(false);
  const handleError = () => {
    setError(true);
  };

  //Texto de error en input del dialog
  const [helpertext, setHelperText] = useState("");
  const handlehelperText = () => {
    setHelperText("LLene los datos correctamente");
  };

  const [openTareas, setTareasOpen] = useState(false);
  const handleTareasClickOpen = () => {
    setTareasOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          aria-label="scrollable auto tabs example"
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab value={tab.value} label={tab.titulo} />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
        }}
      >
        {tabs.map((tab) => (
          <TabPanel index={tab.value} value={value}>
            <Grid
              container
              sx={{ justifyContent: "space-between", columnGap: 1, rowGap: 1 }}
            >
              <MateriasEstilo tareas={tareas} materia={tab.titulo} />
              <Grid item sx={{ display: "flex", minWidth: "80em" }}>
                {/* Inicio Card del boton + (agregar)*/}
                <Card
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    maxWidth: 952,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardActionArea
                    sx={{
                      display: "flex",
                      height: "100%",
                      alignItems: "flex-start",
                    }}
                    onClick={handleTareasClickOpen}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <AddCircleOutlineIcon
                        sx={{ fontSize: 100, color: "#1976d2" }}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
                {/*Fin Card del boton + (agregar)*/}
              </Grid>
            </Grid>
          </TabPanel>
        ))}
      </Box>

      <Dialog
        open={openTareas}
        onClose={handleMateriaClose}
        maxWidth="false"
        fullWidth
      >
        <DialogTitle>Agregar materia aprobada</DialogTitle>
        <DialogContent>
          <DialogContentText>Inserta el nombre de la materia</DialogContentText>
          <TextField
            inputRef={tabTituloRef}
            autoFocus
            margin="dense"
            id="titulo"
            label="Fundamentos de programacion"
            type="text"
            fullWidth
            helperText={helpertext}
            variant="standard"
            error={error}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <DialogContentText>
              Inserta el grupo de la materia
            </DialogContentText>
            <TextField
              inputRef={tabTituloRef}
              autoFocus
              margin="dense"
              id="grupo"
              label="1"
              type="number"
              fullWidth
              helperText={helpertext}
              variant="standard"
              error={error}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <DialogContentText>
              Inserta la clave de la materia
            </DialogContentText>
            <TextField
              inputRef={tabTituloRef}
              autoFocus
              margin="dense"
              id="grupo"
              label="A15"
              type="text"
              fullWidth
              helperText={helpertext}
              variant="standard"
              error={error}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <DialogContentText>Inserta el nombre del docente</DialogContentText>
            <TextField
              inputRef={tabTituloRef}
              autoFocus
              margin="dense"
              id="docente"
              label="Juan perez"
              type="text"
              fullWidth
              helperText={helpertext}
              variant="standard"
              error={error}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <DialogContentText>
              Inserta el semestre al que pertenece la materia
            </DialogContentText>
            <TextField
              inputRef={tabTituloRef}
              autoFocus
              margin="dense"
              id="semestre"
              label="1"
              type="number"
              fullWidth
              helperText={helpertext}
              variant="standard"
              error={error}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <DialogContentText>
              Inserta la oportunidad en la que aprobaste la materia
            </DialogContentText>
            <TextField
              inputRef={tabTituloRef}
              autoFocus
              margin="dense"
              id="oportunidad"
              label="2"
              type="number"
              fullWidth
              helperText={helpertext}
              variant="standard"
              error={error}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <DialogContentText>Inserta tu calificación</DialogContentText>
            <TextField
              inputRef={tabTituloRef}
              autoFocus
              margin="dense"
              id="calificacion"
              label="75"
              type="number"
              fullWidth
              helperText={helpertext}
              variant="standard"
              error={error}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMateriaClose}>Cancelar</Button>
          <Button onClick={agregarMateria}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
