// src/api/fechasPaquete.js

export const ObtenerFechasPaquete = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/fecha_paquete/get`, requestOptions);

        if (response.ok) {
            const fechasPaquete = await response.json();
            return fechasPaquete;
        } else {
            console.error('Error al obtener las fechasPaquete');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const crearFechaPaquete = async (token, fechaPaqueteData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fechaPaqueteData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/fecha_paquete/create`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al crear la fechaPaquete');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarFechaPaquete = async (token, fechaPaqueteData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fechaPaqueteData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/fecha_paquete/update`, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al actualizar la fechaPaquete');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const eliminarFechaPaquete = async (token, fechaPaqueteId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/fecha_paquete/delete?id=${fechaPaqueteId}`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al eliminar la fechaPaquete');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar la fechaPaquete');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
};
