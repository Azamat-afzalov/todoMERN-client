import React from 'react';

export default function() {
    const [modal, setModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(null);
    const handleModal = (content) => {

        console.log('HANDLE MODAL' , content);
        console.log(modal)
        setModalContent(content);
        setModal(true);
    };
    console.log('MODAL',modal);
    const dismissModal = () => {
        console.log('DISMISS MODAL');
        setModal(false);
        setModalContent(null);
    }

    return { modal, modalContent, handleModal, dismissModal };
}