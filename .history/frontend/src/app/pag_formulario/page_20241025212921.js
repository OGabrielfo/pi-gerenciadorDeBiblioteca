'use client';
import { useState } from 'react';
import Header from '../../components/header';
import styles from '../../app/pag_formulario/formulario.module.css';

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL_SUGESTOES = apiUrl+'/sugestoes/';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = formData.nomeCompleto && formData.sala && formData.nomeAutor && formData.tituloLivro;

        if (isFormValid) {
            try {
                const response = await fetch(API_URL_SUGESTOES, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setMessage('Sugestão enviada com sucesso!');
                    setFormData({
                        nomeCompleto: '',
                        sala: '',
                        periodo: '',
                        nomeAutor: '',
                        tituloLivro: '',
                        comentario: '',
                    });
                } else {
                    setMessage('Erro ao enviar sugestão. Verifique os campos obrigatórios.');
                }
            } catch (error) {
                console.error('Erro:', error);
                setMessage('Erro ao enviar sugestão. Tente novamente mais tarde.');
            }
        } else {
            setMessage('Erro ao enviar sugestão. Verifique os campos obrigatórios.');
        }

        setTimeout(() => setMessage(''), 3000); // Limpar mensagem após 3 segundos
    };

    return (
        <>
            <Header PublicNav={true}>Sugestões de Aquisição</Header>
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
                        <label className={styles.label}>Turma <span style={{color: 'red'}}>*</span></label>
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
                            value={formData.periodo} 
                            onChange={handleChange} 
                            placeholder="Digite o período" 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.campos}>
                        <label className={styles.label}>Nome do Autor <span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text" 
                            name="nomeAutor" 
                            value={formData.nomeAutor} 
                            onChange={handleChange} 
                            placeholder="Digite o nome do autor" 
                            required 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.campos}>
                        <label className={styles.label}>Título do Livro <span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text" 
                            name="tituloLivro" 
                            value={formData.tituloLivro} 
                            onChange={handleChange} 
                            placeholder="Digite o título do livro" 
                            required 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.campos}>
                        <label className={styles.label}>Comentário</label>
                        <textarea 
                            name="comentario" 
                            value={formData.comentario} 
                            onChange={handleChange} 
                            placeholder="Adicione um comentário" 
                            className={styles.textarea}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Enviar Sugestão</button>
                </form>
                {message && <div className="popup">{message}</div>}
            </div>
        </>
    );
};

export default SuggestionForm;
