// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './Pages/AdminPage';
import PaisPage from './Pages/PaisPage';
import CiudadPage from './Pages/CiudadPage';
import AeropuertoPage from './Pages/AeropuertoPage';
import AerolineaPage from './Pages/AerolineaPage';
import HotelPage from './Pages/HotelPage';
import TipoHabitacionPage from './Pages/TipoHabitacionPage';
import HabitacionPage from './Pages/HabitacionPage';
import HabitacionDetallePage from './Pages/HabitacionPage/HabitacionDetallePage';
import HabitacionCrearPage from './Pages/HabitacionPage/HabitacionCrearPage';
import PaquetePage from './Pages/PaquetePage';
import CrearPaquetePage from './Pages/PaquetePage/CrearPaquetePage';
import EditarPaquetePage from './Pages/PaquetePage/EditarPaquetePage';

import FechaPaquetePage from './Pages/FechaPaquetePage';


import UserProfilePage from './Pages/UserProfilePage';
import withAuth from './Components/withAuth'; // Importa el componente de envoltura

const loginURL = import.meta.env.VITE_FRONT_USUARIOS;

const AuthenticatedAdminPage = withAuth(AdminPage, loginURL);
const AuthenticatedPaisPage = withAuth(PaisPage, loginURL);
const AuthenticatedCiudadPage = withAuth(CiudadPage, loginURL);
const AuthenticatedAeropuertoPage = withAuth(AeropuertoPage, loginURL);
const AuthenticatedAerolineaPage = withAuth(AerolineaPage, loginURL);
const AuthenticatedHotelPage = withAuth(HotelPage, loginURL);
const AuthenticatedTipoHabitacionPage = withAuth(TipoHabitacionPage, loginURL);
const AuthenticatedHabitacionPage = withAuth(HabitacionPage, loginURL);
const AuthenticatedHabitacionDetallePage = withAuth(HabitacionDetallePage, loginURL);
const AuthenticatedHabitacionCrearPage = withAuth(HabitacionCrearPage, loginURL);
const AuthenticatedPaquetePage = withAuth(PaquetePage, loginURL);
const AuthenticatedCrearPaquetePage = withAuth(CrearPaquetePage, loginURL);
const AuthenticatedEditarPaquetePage = withAuth(EditarPaquetePage, loginURL);

const AuthenticatedFechaPaquetePage = withAuth(FechaPaquetePage, loginURL)
//const AuthenticatedPaqueteDetallePage = withAuth(PaqueteDetallePage, loginURL);



const AuthenticatedUserProfilePage = withAuth(UserProfilePage, loginURL);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedAdminPage />} />
        <Route path="/paises" element={<AuthenticatedPaisPage />} />
        <Route path="/ciudades" element={<AuthenticatedCiudadPage />} />
        <Route path="/aeropuertos" element={<AuthenticatedAeropuertoPage />} />
        <Route path="/aerolineas" element={<AuthenticatedAerolineaPage />} />
        <Route path="/hoteles" element={<AuthenticatedHotelPage />} />
        <Route path="/tipos_habitacion" element={<AuthenticatedTipoHabitacionPage />} />
        <Route path="/habitaciones" element={<AuthenticatedHabitacionPage />} />
        <Route path="/habitaciones/:id" element={<AuthenticatedHabitacionDetallePage />} />
        <Route path="/habitaciones/hotel/:id" element={<AuthenticatedHabitacionCrearPage />} />
        <Route path="/paquetes" element={<AuthenticatedPaquetePage />} />
        <Route path="/paquetes/crear" element={<AuthenticatedCrearPaquetePage />} />
        <Route path="/paquetes/:paqueteId" element={<AuthenticatedEditarPaquetePage />} />
        <Route path="/fechas_paquete" element={<AuthenticatedFechaPaquetePage />} />



        <Route path="/profile" element={<AuthenticatedUserProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
