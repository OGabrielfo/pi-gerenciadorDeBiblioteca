'use client';
import { useState } from 'react';

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
        
        setTimeout(() => setMessage