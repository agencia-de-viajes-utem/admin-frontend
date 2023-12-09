import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ObtenerInfoPerfil } from '../api';
import { Spinner } from 'react-bootstrap';

const verifyRole = async (token) => {
    try {
        const userData = await ObtenerInfoPerfil(token);
        return userData.Rol === 'admin';
    } catch (error) {
        console.error('Error al obtener información del perfil:', error);
        return false;
    }
};

const withAuth = (WrappedComponent, loginURL) => {
    return props => {
        const [isAuthorized, setIsAuthorized] = useState(null);
        const token = Cookies.get('token');

        useEffect(() => {
            if (token) {
                verifyRole(token).then(isAdmin => {
                    setIsAuthorized(isAdmin);
                });
            } else {
                setIsAuthorized(false);
            }
        }, [token]);

        if (isAuthorized === null) {
            // Esperando la verificación, muestra el Spinner
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <Spinner animation="border" role="status">

                    </Spinner>
                </div>
            );
        }

        if (!isAuthorized) {
            window.location.href = loginURL;
            return null;
        }

        // Autorizado
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
