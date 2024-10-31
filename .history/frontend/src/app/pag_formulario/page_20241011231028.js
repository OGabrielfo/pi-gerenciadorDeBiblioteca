'use client';
import { useState } from 'react';
import Header from '../../components/header';
import styles from '../../app/pag_formulario/formulario.module.css';

const SuggestionForm = () => {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        sala: '',
        periodo: '',
        nomeAutor: '',
        tituloLivro: '',
        comentario: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = formData.nomeCompleto && formData.sala && formData.nomeAutor && formData.tituloLivro;

        if (isFormValid) {
            console.log('Form data submitted:', formData);
            setMessage('Sugestão enviada com sucesso!');
        } else {
            setMessage('Erro ao enviar sugestão. Verifique os campos obrigatórios.');
        }
        
        setTimeout(() => setMessage(''), 3000); // Limpar mensagem após 3 segundos
    };

    return (
        <>
            <Header PublicNav={true}>Sugestão</Header>
            <div className={styles.containerFormulario}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.campos}>
                        <label className={styles.label}>Nome Completo <span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text" 
                            name="nomeCompleto" 
                            value={formData.nomeCompleto} 
                            onChange={handleChange} 
                            placeholder="Digite seu nome completo" 
                            required 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.campos}>
                        <label className={styles.label}>Sala <span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text" 
                            name="sala" 
                            value={formData.sala} 
                            onChange={handleChange} 
                            placeholder="Digite sua sala" 
                            required 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.campos}>
                        <label className={styles.label}>Período</label>
                        <input 
                            type="text" 
                            name="periodo" 
