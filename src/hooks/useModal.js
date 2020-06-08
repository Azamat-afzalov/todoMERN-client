import React from 'react';

export default function() {
    const [modal, setModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(null);

    // console.log(modal, modalContent);

    const handleModal = (content) => {
        console.log(content);
        setModal(true);
        setModalContent(content);
    };

    const dismissModal = () => {
        setModal(false);
        setModalContent(null);
    }

    return { modal, toggleModal : setModal , modalContent, handleModal, dismissModal };
}