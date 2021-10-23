import React from 'react'
import { Tarea } from './Tarea';

export function ListadoTareas({tareas}) {
    return (
        <a>
            {tareas.map((tarea) => (
                <Tarea tarea = {tarea}/>
            ))}
        </a>
    );
}