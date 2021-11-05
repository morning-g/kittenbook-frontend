import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box'

export function Tarea( {tarea, materia}) {
    const {id, contenido , titulo, tab, categoria, creacion, limite, recurso, notificacion} = tarea
    return (
        <div>
            { tab === materia && (
                <Card sx={{ maxWidth: 345, background:"#bff4ff" }}>
                    <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            { limite.getFullYear() + "-" + ('0' + (limite.getMonth() + 1)).slice(-2) + "-" + ('0' + limite.getDate()).slice(-2) + " - " + ('0' + limite.getHours()).slice(-2) + ":" + ('0' + limite.getMinutes()).slice(-2) + ":" + ('0' + limite.getSeconds()).slice(-2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
                </Card>
            )}
        </div>
    )
}