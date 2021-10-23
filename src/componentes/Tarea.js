import React from 'react'

export function Tarea( {tarea}) {
    const {id, titulo, categoria, creacion, limite, recurso, notificacion} = tarea
    return (
        <div>
            {titulo}
        </div>
    )
}