import React from "react";
import styles from './imageModal.module.css';
import Modal from 'react-modal'

function ImageModal({isOpen, setIsOpen, imgUrl}) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={()=> setIsOpen(false)}
        >
            <div>
                <img src={imgUrl} alt='옵션사진' />
            </div>
        </Modal>
    )
}

export default ImageModal;