import React, {useContext, useState} from "react";
import {ReservarLivroContext} from "@/app/page";
import {ReservaContextoAluno} from "@/app/reservar/page";




const Modal = ({children, tipo}) => {
  const livroContext = useContext(ReservarLivroContext);
  const alunoContext = useContext(ReservaContextoAluno);

  let context;
  if (tipo == "pagina consulta"){
    context = livroContext;
  } else if (tipo == "pagina reserva aluno"){
    context = alunoContext;
  }

  const {modalState, setModalState} = context

  //var {modalState, setModalState} = useContext(ReservarLivroContexto);
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgb(255, 99, 71)'
  },
};

export default Modal;