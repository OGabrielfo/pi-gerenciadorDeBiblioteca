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
        
        setTimeout(() => setMessage(''), 3000); // Limpar mensagem após 3 segundos
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome Completo <span style={{color: 'red'}}>*</span></label>
                    <input 
                        type="text" 
                        name="nomeCompleto" 
                        value={formData.nomeCompleto} 
                        onChange={handleChange} 
                        placeholder="Digite seu nome completo" 
                        required 
                    />
                </div>
                <div>
                    <label>Sala <span style={{color: 'red'}}>*</span></label>
                    <input 
                        type="text" 
                        name="sala" 
                        value={formData.sala} 
                        onChange={handleChange} 
                        placeholder="Digite sua sala" 
                        required 
                    />
                </div>
                <div>
                    <label>Período</label>
                    <input 
                        type="text" 
                        name="periodo" 
                        value={formData.periodo} 
                        onChange={handleChange} 
                        placeholder="Digite o período" 
                    />
                </div>
                <div>
                    <label>Nome do Autor <span style={{color: 'red'}}>*</span></label>
                    <input 
                        type="text" 
                        name="nomeAutor" 
                        value={formData.nomeAutor} 
                        onChange={handleChange} 
                        placeholder="Digite o nome do autor" 
                        required 
                    />
                </div>
                <div>
                    <label>Título do Livro <span style={{color: 'red'}}>*</span></label>
                    <input 
                        type="text" 
                        name="tituloLivro" 
                        value={formData.tituloLivro} 
                        onChange={handleChange} 
                        placeholder="Digite o título do livro" 
                        required 
                    />
                </div>
                <div>
                    <label>Comentário</label>
                    <textarea 
                        name="comentario" 
                        value={formData.comentario} 
                        onChange={handleChange} 
                        placeholder="Adicione um comentário" 
                    />
                </div>
                <button type="submit">Enviar Sugestão</button>
            </form>
            {message && <div className="popup">{message}</div>}
        </div>
    );
};

export default SuggestionForm;
