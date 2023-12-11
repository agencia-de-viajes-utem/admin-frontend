import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import Select from "react-select";

import Cookies from "js-cookie";

import { ObtenerHabitacionesHotel } from "../../../api/index";

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
    console.log(hoteles);
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
    console.log(habitaciones);
    const options = habitaciones.map((habitacion) => ({
        value: habitacion.ID,
        label: habitacion.ID,
    }));

    return (
        <Select
            name="HabitacionesSelect"
            value={options.find((option) => option.value === value) || ""}
            onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : "")}
            options={options}
            placeholder="Seleccionar Habitaciones"
            isClearable
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

    const handleHabitacionIDsChange = (habitacionIDs) => {
        setHabitacionIDs(habitacionIDs);
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
                    <Form.Group controlId="formBasicIDHotel">
                        <Form.Label> Hoteles </Form.Label>
                        <HotelSelect
                            hoteles={hoteles}
                            value={values.IDHotel || ""}
                            onChange={(value) => handleHotel("IDHotel", value)}
                        />
                    </Form.Group>

                    {hayHabitaciones && (
                        <Form.Group controlId="formBasicHabitaciones">
                            <Form.Label>Habitaciones</Form.Label>
                            <HabitacionesSelect
                                habitaciones={habitaciones}
                                value={values.HabitacionIDs || ""}
                                onChange={handleHabitacionIDsChange}
                            />
                        </Form.Group>
                    )}

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