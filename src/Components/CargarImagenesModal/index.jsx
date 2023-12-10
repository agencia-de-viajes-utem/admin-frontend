import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './CargarImagenesModal.css';

const CargarImagenesModal = ({ show, handleClose, onSelect }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const handleImagesChange = (event) => {
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

    const handleRemoveImage = (index) => {
        const updatedSelectedImages = [...selectedImages];
        updatedSelectedImages.splice(index, 1);

        const updatedImageFiles = [...imageFiles];
        updatedImageFiles.splice(index, 1);

        setSelectedImages(updatedSelectedImages);
        setImageFiles(updatedImageFiles);
    };

    const generateUniqueFileName = (originalName, extension) => {
        const uniqueSuffix = Date.now() + Math.random().toString(36).substring(7);
        return `${originalName}_${uniqueSuffix}.${extension}`;
    };

    const handleConfirmSelection = () => {
        if (onSelect) {
            onSelect(imageFiles);
        }
        handleClose();
        // Limpiar estados
        setSelectedImages([]);
        setImageFiles([]);
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
                            {selectedImages.length > 0 ? selectedImages.map((image, index) => (
                                <div key={index} className="image-preview-wrapper">
                                    <img src={image} alt={`Previsualización ${index}`} className="image-preview" />
                                    <button type="button" className="image-remove-button" onClick={() => handleRemoveImage(index)}>
                                        X
                                    </button>
                                </div>
                            )) : <p>No hay imágenes seleccionadas.</p>}
                        </div>
                        <input type="file" multiple accept="image/jpeg, image/png" onChange={handleImagesChange} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleConfirmSelection}>
                    Confirmar Selección
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CargarImagenesModal;
