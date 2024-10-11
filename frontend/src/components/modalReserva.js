import React from "react";
import ReactDOM from "react-dom";
import styles from "./modalReserva.module.css";
//https://devrecipes.net/modal-component-with-next-js/
const Modal = ({ onClose, children, title }) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className={styles.modaloverlay}>
            {/* Wrap the whole Modal inside the newly created StyledModalWrapper
            and use the ref */}
            <div className={styles.modalwrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalheader}>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className={styles.modalbody}>{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
};

export default Modal