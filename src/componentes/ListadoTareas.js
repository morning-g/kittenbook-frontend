import React from 'react'
import { Tarea } from './Tarea';

export default function ListadoTareas({tareas, materia}) {
    return (
        <a>
            {tareas.map((tarea) => (
                <Tarea tarea = {tarea} materia = {materia}/>
            ))}
        </a>
    );
}
