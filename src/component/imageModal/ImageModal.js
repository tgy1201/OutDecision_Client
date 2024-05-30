import React from "react";
import styles from './imageModal.module.css';
import ReactDom from 'react-dom'
import Modal from 'react-modal'
import { VscChromeClose } from "react-icons/vsc";

function ImageModal({isOpen, setIsOpen, imgUrl}) {
    return ReactDom.createPortal(
        <Modal
            isOpen={isOpen}
            onRequestClose={()=> setIsOpen(false)}
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
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
                  padding: '5px',
                  width: 'fit-content',
                  height: 'fit-content',
                  maxWidth: '80vw',
                  maxHeight: '80vh',
                }
              }}
        >
            <div className={styles.image_wrap}>
                <img src={imgUrl} alt='옵션사진' />
                <button onClick={()=>setIsOpen(false)}><VscChromeClose style={{fontSize: '1.3rem', color: '#626262'}}/></button>
            </div>
        </Modal>
    , document.getElementById("root"));
}

export default ImageModal;