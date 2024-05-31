import React from "react";
import ReactDom from 'react-dom'
import styles from './titleModal.module.css'
import Modal from 'react-modal'

function TitleModal({isOpen, setIsOpen, children}) {
    return ReactDom.createPortal(
        <Modal
            isOpen={isOpen}
            onRequestClose={()=> setIsOpen(false)}
            ariaHideApp={false}
            className={styles.modal}
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  zIndex: 10,
                },
                content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '10px',
                  width: '350px',
                  height: 'fit-content',
                  maxHeight: '85vh',
                }
              }}
        >
            {children}
        </Modal>
    , document.getElementById("root"));
}

export default TitleModal;