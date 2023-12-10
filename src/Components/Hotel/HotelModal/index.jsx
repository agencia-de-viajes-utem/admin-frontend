import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const HotelModal = ({ show, onHide, hotel, onSave, ciudades }) => {
    const [nombre, setNombre] = useState(hotel?.Nombre || '');
    const [descripcion, setDescripcion] = useState(hotel?.Descripcion || '');
    const [direccion, setDireccion] = useState(hotel?.Direccion || '');
    const [servicios, setServicios] = useState(hotel?.Servicios || []);
    const [email, setEmail] = useState(hotel?.Email || '');
    const [telefono, setTelefono] = useState(hotel?.Telefono || '');
    const [sitioWeb, setSitioWeb] = useState(hotel?.SitioWeb || '');
    const [imagenes, setImagenes] = useState(hotel?.Imagenes || []);
    const [ciudadID, setCiudadID] = useState(hotel?.CiudadID || '');

    useEffect(() => {
        if (hotel) {
            setNombre(hotel.Nombre);
            setDescripcion(hotel.Descripcion);
            setDireccion(hotel.Direccion);
            setServicios(hotel.Servicios);
            setEmail(hotel.Email);
            setTelefono(hotel.Telefono);
            setSitioWeb(hotel.SitioWeb);
            setImagenes(hotel.Imagenes);
            setCiudadID(hotel.CiudadID);
        } else {
            setNombre('');
            setDescripcion('');
            setDireccion('');
            setServicios([]);
            setEmail('');
            setTelefono('');
            setSitioWeb('');
            setImagenes([]);
            setCiudadID('');
        }
    }, [hotel]);

    const handleSave = () => {
        const hotelData = {
            ID: hotel?.ID,
            Nombre: nombre,
            Descripcion: descripcion,
            Direccion: direccion,
            Servicios: servicios,
            Email: email,
            Telefono: telefono,
            SitioWeb: sitioWeb,
            Imagenes: imagenes,
            CiudadID: parseInt(ciudadID, 10),
        };
        onSave(hotelData);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{hotel ? 'Editar Hotel' : 'Crear Hotel'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre del Hotel</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="descripcion">
                        <Form.Label>Descripción del Hotel</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="direccion">
                        <Form.Label>Dirección del Hotel</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Dirección"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="servicios">
                        <Form.Label>Servicios del Hotel</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Servicios (separados por comas)"
                            value={servicios.join(', ')}
                            onChange={(e) => setServicios(e.target.value.split(', '))}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email del Hotel</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="telefono">
                        <Form.Label>Teléfono del Hotel</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="sitioWeb">
                        <Form.Label>Sitio Web del Hotel</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Sitio Web"
                            value={sitioWeb}
                            onChange={(e) => setSitioWeb(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="imagenes">
                        <Form.Label>Imágenes del Hotel (URLs, separadas por comas)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Imágenes"
                            value={imagenes.join(', ')}
                            onChange={(e) => setImagenes(e.target.value.split(', '))}
                        />
                    </Form.Group>
                    <Form.Group controlId="ciudad">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control
                            as="select"
                            value={ciudadID}
                            onChange={(e) => setCiudadID(e.target.value)}
                        >
                            <option value="">Seleccionar Ciudad</option>
                            {ciudades.map((ciudad) => (
                                <option key={ciudad.ID} value={ciudad.ID}>
                                    {ciudad.Nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default HotelModal;
