import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export function Tarea( {tarea, materia}) {
    const {id, contenido , titulo, tab, categoria, creacion, limite, recurso, notificacion} = tarea
    return (
        <Grid item sx={{display:"flex", position:"relative"}}>
            { tab === materia && (
                <Card sx={{ maxWidth: 300, display:"flex",
                 flexDirection:"column", justifyContent:"space-between", background:"cyan" }}>
                    <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color="#9a00ad">
                        {titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            { limite.getFullYear() + "-" + ('0' + (limite.getMonth() + 1)).slice(-2) + "-" + ('0' + limite.getDate()).slice(-2) + " - " + ('0' + limite.getHours()).slice(-2) + ":" + ('0' + limite.getMinutes()).slice(-2) + ":" + ('0' + limite.getSeconds()).slice(-2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" color="orange">
                            {categoria}
                        </Typography>
                        <Typography variant="string" align={"justify"} color="text.primary">
                            {contenido}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {recurso !== null && (
                                recurso
                            )}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                    <IconButton sx={{padding:16+"px", marginLeft:"auto"}}><EditIcon/></IconButton>
                </Card>
            )}
        </Grid>
    )
}