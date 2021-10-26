import React from 'react'
import { Tarea } from './Tarea';

export function ListadoTareas({tareas}) {
    const {id, titulo, categoria, creacion, limite, recurso, notificacion} = tarea
    return (
        <a>
            {tareas.map((tarea) => (
                <Tarea tarea = {tarea}/>
            ))}
        </a>
    );
}
