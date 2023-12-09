import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './CargarImagenesModal.css';

const CargarImagenesModal = ({ show, handleClose, onUpload }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const handleImagesChange = (event) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            const newSelectedImages = filesArray.map(file => URL.createObjectURL(file));
            const newImageFiles = filesArray;

            setSelectedImages([...selectedImages, ...newSelectedImages]);
            setImageFiles([...imageFiles, ...newImageFiles]);
        }
    };

    const handleUploadClick = () => {
        if (imageFiles.length > 0) {
            const fileNames = imageFiles.map((file, index) => {
                const extension = file.type.split('/')[1]; // Obtener la extensión del archivo
                return `package_photo_${index}.${extension}`; // Generar el nombre del archivo
            });
            if (onUpload) onUpload(imageFiles, fileNames);
            handleClose(); // Cerrar el modal después de la carga
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Subir Imágenes del Paquete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex gap-4 flex-wrap">
                    <div className="mb-3">
                        <h5>Imágenes Seleccionadas:</h5>
                        <div className="image-preview-container">
                            {selectedImages.length > 0 ?
                                selectedImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Previsualización ${index}`} className="image-preview" />
                                )) :
                                <p>No hay imágenes seleccionadas.</p>
                            }
                        </div>
                        <input type="file" multiple accept="image/jpeg, image/png" onChange={handleImagesChange} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleUploadClick}>
                    Subir Imágenes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CargarImagenesModal;
