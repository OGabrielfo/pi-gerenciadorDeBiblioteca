import React, {useContext, useState} from "react";
import {ReservarLivroContexto} from "@/app/page";
const Modal = ({children}) => {
  let {modalState, setModalState} = useContext(ReservarLivroContexto);
  if (!modalState) return null;
  
  return (
    <div style={styles.overlay} id="overlay">
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={() => setModalState(false)}>Fechar</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

export default Modal;