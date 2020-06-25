import React from 'react';
import ReactDOM from 'react-dom';
import modalContext  from '../../../context/modalContext';
import './Modal.css';

const Modal = React.memo((props) => {
    const { modalContent, dismissModal } = React.useContext(modalContext);
    return ReactDOM.createPortal(
        <div className='Modal-container' onClick={dismissModal}>
            <div className="Modal" onClick={e => e.stopPropagation()}>
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
})

export default Modal;
