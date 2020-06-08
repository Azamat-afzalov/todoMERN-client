import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import modalContext  from '../../../context/modalContext';
import './Modal.css';
import useModal from "../../../hooks/useModal";

const Modal = (props) => {
    const { modal, toggleModal , modalContent, handleModal, dismissModal } = React.useContext(modalContext);

    // const {modal , handleModal,modalContent} = useModal();
    console.log(modal , modalContent);
    return ReactDOM.createPortal(
        <div className='Modal-container' onClick={dismissModal}>
            <div className="Modal" onClick={e => e.stopPropagation()}>
                {/*<Button onClick={handleModal}>&times;</Button>*/}
                {/*{modalContent.map(error => (<p key={error.message}>*/}
                {/*    {error.status === 401 ? "Please register to create todos" : error.message}*/}
                {/*</p>))*/}
                {/*}*/}
                <div className="Modal-header">
                    {props.title}
                </div>
                <div className="Modal-content">
                    {modalContent && modalContent.map(error => (
                        <p key={error.message}>{error.message}</p>
                    ))}
                </div>
                <div className='Modal-actions'>
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;
