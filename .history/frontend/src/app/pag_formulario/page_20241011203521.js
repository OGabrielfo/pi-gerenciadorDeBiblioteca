'use client';
import { useState } from 'react';
import styles from "./publicNavbar.module.css"


const SuggestionForm = () => {
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        sala: '',
        periodo: '',
        nomeAutor: '',
        tituloLivro: '',
        comentario: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
        console.log('Form data submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome Completo (Obrigatório)</label>
                <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
            </div>
            <div>
                <label>Sala (Obrigatório)</label>
                <input type="text" name="sala" value={formData.sala} onChange={handleChange} required />
            </div>
            <div>
                <label>Período</label>
                <input type="text" name="periodo" value={formData.periodo} onChange={handleChange} />
            </div>
            <div>
                <label>Nome do Autor (Obrigatório)</label>
                <input type="text" name="nomeAutor" value={formData.nomeAutor} onChange={handleChange} required />
            </div>
            <div>
                <label>Título do Livro (Obrigatório)</label>
                <input type="text" name="tituloLivro" value={formData.tituloLivro} onChange={handleChange} required />
            </div>
            <div>
                <label>Comentário</label>
                <textarea name="comentario" value={formData.comentario} onChange={handleChange} />
            </div>
            <button type="submit">Enviar Sugestão</button>
        </form>
    );
};

export default SuggestionForm;