import React, { useState, useEffect } from "react";
import { Form, Card, Button, Modal } from "react-bootstrap";
import Select from "react-select";

import Cookies from "js-cookie";

import { ObtenerHabitacionesHotel } from "../../../api/index";

import SeleccionarHabitacionByHotel from "../../Paquete/SeleccionarHabitacionBy";

// Genera un nombre de archivo personalizado basado en los requisitos mencionados
const generateCustomFileName = (file) => {
    const extension = file.name.split(".").pop();
    const date = new Date().toISOString().slice(0, 19).replace(/[^0-9]/g, "");
    const randomString = Math.random().toString(36).substring(2, 8);

    return `imagen_${randomString}_${date}.${extension}`;
};

const AirportSelect = ({ aeropuertos, value, onChange }) => {
    const options = aeropuertos.map((aeropuerto) => ({
        value: aeropuerto.ID,
        label: aeropuerto.Nombre + ', ' + aeropuerto.Ciudad.Nombre + ', ' + aeropuerto.Ciudad.Pais.Nombre,
    }));

    return (
        <Select
            name="IDAeropuerto"
            value={options.find((option) => option.value === value) || ""}
            onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : "")}
            options={options}
            placeholder="Seleccionar Aeropuerto"
            isClearable
        />
    );
};

const AerolineaSelect = ({ aerolineas, value, onChange }) => {
    const options = aerolineas.map((aerolinea) => ({
        value: aerolinea.ID,
        label: aerolinea.Nombre,
    }));

    return (
        <Select
            name="IDAerolinea"
            value={options.find((option) => option.value === value) || ""}
            onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : "")}
            options={options}
            placeholder="Seleccionar Aerolínea"
            isClearable
        />
    );
};

const HotelSelect = ({ hoteles, value, onChange }) => {
    const options = hoteles.map((hotel) => ({
        value: hotel.ID,
        label: hotel.Nombre + ', ' + hotel.Ciudad.Nombre + ', ' + hotel.Ciudad.Pais.Nombre,
    }));

    return (
        <Select
            name="HotelSelect"
            value={options.find((option) => option.value === value) || ""}
            onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : "")}
            options={options}
            placeholder="Seleccionar Hotel"
            isClearable
        />
    );
};

const HabitacionesSelect = ({ habitaciones, value, onChange }) => {
    // Crear opciones a partir de los IDs de las habitaciones
    const options = habitaciones.map((habitacion) => ({
        value: habitacion.ID,  // Asegúrate de que este campo coincIDa con la estructura de tus datos
        label: `Habitación ${habitacion.ID}`
    }));

    // Transformar value (array de IDs) en un array de objetos opción
    const selectedOptions = options.filter(option => value.includes(option.value));

    return (
        <Select
            name="HabitacionesSelect"
            value={selectedOptions}
            onChange={(selectedOptions) =>
                onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])
            }
            options={options}
            placeholder="Seleccionar Habitaciones"
            isClearable
            isMulti // Habilitar selección múltiple
        />
    );
};




const PaqueteForm = ({
    initialValues,
    onSubmit,
    hoteles,
    aeropuertos,
    isEdit = false,
    aerolineas,
}) => {
    const [values, setValues] = useState(initialValues || {});
    const [habitacionIDs, setHabitacionIDs] = useState([]);

    const [imageFiles, setImageFiles] = useState([]); // Array de archivos de imagen

    const [selectedImages, setSelectedImages] = useState([]); // Array de imágenes previsualizadas

    const images = selectedImages.map((selectedImage, index) => ({
        name: generateCustomFileName(imageFiles[index]),
        file: imageFiles[index],
        preview: selectedImage,
    }));

    const [habitaciones, setHabitaciones] = useState([]);

    const token = Cookies.get("token");

    const [hayHabitaciones, setHayHabitaciones] = useState(false);

    const [habitacionesSeleccionadas, setHabitacionesSeleccionadas] = useState([]);

    const [showModalHabitaciones, setShowModalHabitaciones] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleOpenConfirmModal = () => setShowConfirmModal(true);

    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const handleConfirmClearSelection = () => {
        setHabitacionesSeleccionadas([]);
        setHabitacionIDs([]);
        setShowConfirmModal(false);
    };

    const handleClickHabitaciones = (habitaciones) => {
        setHabitacionesSeleccionadas(habitaciones);
        setHabitacionIDs(habitaciones.map(h => h.ID));
        setShowModalHabitaciones(false);
    };



    useEffect(() => {
        setValues(initialValues || {});
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleAirportChange = (name, value) => {
        setValues({ ...values, [name]: value });
    };

    const handleHabitacionIDsChange = (event) => {
        // Depuración: Verificar el evento y los options seleccionados
        console.log("Evento onChange:", event);
        const selectedOptions = event.target.selectedOptions;
        console.log("Options seleccionados:", selectedOptions);

        // Mapear a los valores y actualizar el estado
        const selectedIDs = Array.from(selectedOptions).map(option => parseInt(option.value));
        console.log("IDs seleccionados:", selectedIDs);

        setValues(prevValues => {
            const newValues = { ...prevValues, HabitacionIDs: selectedIDs };
            console.log("Nuevos valores de estado:", newValues); // Depuración del nuevo estado
            return newValues;
        });
    };



    const handleImageChange = (event) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);

            // Filtrar imágenes duplicadas
            const newFilesArray = filesArray.filter(file =>
                !imageFiles.some(existingFile => existingFile.name === file.name)
            );
            const newSelectedImages = newFilesArray.map(file => URL.createObjectURL(file));

            setSelectedImages([...selectedImages, ...newSelectedImages]);
            setImageFiles([...imageFiles, ...newFilesArray]);
        }
    };

    const handleHotel = (name, value) => {
        setValues({ ...values, [name]: value });
        setHayHabitaciones(false);
        ObtenerHabitacionesHotel(token, value).then(setHabitaciones).catch(console.error);
    };

    useEffect(() => {
        if (habitaciones != null) {
            setHayHabitaciones(true);
        }
    }, [habitaciones]);



    const handleRemoveImage = (index) => {
        // Remove the image at the specified index
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construir un array de FormData con las imágenes y otros datos
        const formDataArray = images.map((image) => {
            const formData = new FormData();
            formData.append("file", image.file, image.name); // Utiliza el nombre personalizado
            return formData;
        });

        // Ejecutar la función onSubmit con los datos
        onSubmit({
            ...values,
            HabitacionIDs: habitacionIDs,
            ImagesFormData: formDataArray, // Envía el array de FormData
        });
    };

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">
                    {isEdit ? "Editar Paquete" : "Nuevo Paquete"}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            name="Nombre"
                            value={values.Nombre || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Descripción"
                            name="Descripcion"
                            value={values.Descripcion || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPrecioNormal">
                        <Form.Label>Precio Normal</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Precio Normal"
                            name="PrecioNormal"
                            value={values.PrecioNormal || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicImagenes">
                        <Form.Label>Imágenes</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <div className="image-preview-container">
                            {images.length > 0 ? images.map((image, index) => (
                                <div key={index} className="image-preview-wrapper card">
                                    <img src={image.preview} alt={`Previsualización ${index}`} className="image-preview card-img-top" />
                                    <button type="button" className="btn btn-danger image-remove-button" onClick={() => handleRemoveImage(index)}>
                                        Eliminar
                                    </button>
                                </div>
                            )) : <p>No hay imágenes seleccionadas.</p>}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicIDAeropuertoOrigen">
                        <Form.Label>Aeropuerto Origen</Form.Label>
                        <AirportSelect
                            aeropuertos={aeropuertos}
                            value={values.IDAeropuertoOrigen || ""}
                            onChange={(value) => handleAirportChange("IDAeropuertoOrigen", value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicIDAeropuertoDestino">
                        <Form.Label>Aeropuerto Destino</Form.Label>
                        <AirportSelect
                            aeropuertos={aeropuertos}
                            value={values.IDAeropuertoDestino || ""}
                            onChange={(value) => handleAirportChange("IDAeropuertoDestino", value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Habitaciones</Form.Label>
                        <Form.Control
                            type="text"
                            value={habitacionesSeleccionadas.map(h => `${h.ID} - ${h.Nombre}`).join(', ')}
                            readOnly // Hacer que el campo de texto sea solo lectura
                            className="mb-3"
                        />
                        <div className="d-flex">
                            <Button
                                className='flex-grow-1 me-2'
                                variant="outline-primary"
                                onClick={() => setShowModalHabitaciones(true)}>
                                Seleccionar Hotel
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={handleOpenConfirmModal}>
                                Limpiar Selección
                            </Button>
                        </div>
                    </Form.Group>
                    {/* Modal de Confirmación */}
                    <Modal
                        show={showConfirmModal}
                        onHide={handleCloseConfirmModal}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar Acción</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Está seguro que desea limpiar la selección? Este es un paso que no se puede deshacer y eliminará la relación de su paquete y las habitaciones enlazadas.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirmModal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleConfirmClearSelection}>
                                Confirmar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <SeleccionarHabitacionByHotel
                        show={showModalHabitaciones}
                        handleClose={() => setShowModalHabitaciones(false)}
                        onUpload={handleClickHabitaciones}
                        hoteles={hoteles}
                        fullscreen={true}
                    />


                    <Form.Group controlId="formBasicIDAerolinea">
                        <Form.Label>Aerolínea</Form.Label>
                        <AerolineaSelect
                            aerolineas={aerolineas}
                            value={values.IDAerolinea || ""}
                            onChange={(value) => handleAirportChange("IDAerolinea", value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-2 w-25">
                        {isEdit ? "Editar" : "Crear"}
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    );
};

export default PaqueteForm;