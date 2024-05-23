import styles from './modal.module.css'
import { useState } from 'react';

// Componente Modal
const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <h2>{message}</h2>
      <button onClick={onClose}>OK</button>
    </div>
  );
};

export default Modal;