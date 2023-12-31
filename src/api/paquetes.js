// src/api/paquetes.js

export const ObtenerPaquetes = async (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/paquete/get`, requestOptions);

        if (response.ok) {
            const paquetes = await response.json();
            return paquetes;
        } else {
            console.error('Error al obtener los paquetes');
        }
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
};

export const ObtenerPaquetePorID = async (token, paqueteId) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/paquete/get/${paqueteId}`, requestOptions);

        if (!response.ok) {
            throw new Error('Error al obtener el paquete');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
        throw error;  // Lanza el error para ser manejado por el componente
    }
};




export const crearPaquete = async (token, paqueteData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paqueteData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/paquete/create`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al crear el paquete');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};

export const actualizarPaquete = async (token, paqueteData) => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paqueteData),
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/paquete/update`, requestOptions);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al actualizar el paquete');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
};

export const SubirImagenPaquete = async (token, formData) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_USUARIOS_BACKEND}/imagenes/paquetes`, requestOptions);

        if (!response.ok) {
            console.error('Error al subir la imagen');
        }
        const uploadResult = await response.json();

        return uploadResult;
    }
    catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
};



export const eliminarPaquete = async (token, paqueteId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/paquete/delete?id=${paqueteId}`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al eliminar el paquete');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar el paquete');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
};


export const eliminarRelacionesPaquete = async (token, paqueteId) => {
    console.log(paqueteId);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_ADMIN_BACKEND}/paquete/delete-relations?id=${paqueteId}`, requestOptions);

        if (response.ok) {
            return response.json();
        } else {
            console.error('Error al eliminar las relaciones paquetes_habitaciones');
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error desconocido al eliminar las relaciones paquetes_habitaciones');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
};

