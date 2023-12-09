import { useState, useEffect } from 'react';

export function useHabitacionEditor(habitacionDetalle, modoEdicion) {
    const [editedHabitacionDetalle, setEditedHabitacionDetalle] = useState(habitacionDetalle || {});

    useEffect(() => {
        // Asegúrate de que editedHabitacionDetalle siempre esté actualizado con habitacionDetalle
        setEditedHabitacionDetalle(habitacionDetalle || {});
    }, [habitacionDetalle]);

    const handleInputChange = (campo, valor) => {
        if (modoEdicion) {
            setEditedHabitacionDetalle({
                ...editedHabitacionDetalle,
                [campo]: valor,
            });
        }
    };

    return { editedHabitacionDetalle, handleInputChange };
}
