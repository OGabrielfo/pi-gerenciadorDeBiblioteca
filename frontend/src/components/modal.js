import styles from './modal.module.css'
import { useState } from 'react';

// Componente Modal
const Modal = ({ isOpen, message, onClose, status }) => {
  if (!isOpen) return null;

  return (
    <div className={status ? styles.containerSuccess : styles.containerError}>
      <h2>{message}</h2>
      <button className={styles.button} onClick={onClose}>OK</button>
    </div>
  );
};

export default Modal;