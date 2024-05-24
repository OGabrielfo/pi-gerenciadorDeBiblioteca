'use client';
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import { useState, useEffect } from 'react';
import styles from './consulta.module.css';
import Header from '../../components/header';
import TabelaConsultar from '@/components/tabelaConsultar';

const API_URL = 'http://127.0.0.1:8000/api/livro/';

const Consulta = () => {
  const { authData } = useAuth();

  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [dados, setDados] = useState(null); 
  const [dadosAPI, setDadosAPI] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithAuth(API_URL);
        const data = await response.json();
        setDadosAPI(data); // Atualizar o estado com os dados
      } catch (error) {
        console.error('Erro ao buscar dados dos livros:', error);
      }
    };

    if (authData) {
      fetchData();
    }
  }, [authData]);

  useEffect(() => {
    if (dadosAPI) {
      console.log('dadosAPI atualizado:', dadosAPI);
    }
  }, [dadosAPI]); // TODO Remover função ao finalizar

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultados = dadosAPI.filter((livro) =>
      (nomeLivro === '' || livro.nome_do_livro.toUpperCase().includes(nomeLivro.toUpperCase())) &&
      (autor === '' || livro.autor.toUpperCase().includes(autor.toUpperCase())) &&
      (genero === '' || livro.tipo.toUpperCase().includes(genero.toUpperCase()))
    );
    
    if (resultados.length === 0) {
      alert('Nenhum livro encontrado');
    } else {
      setDados(resultados);
    }
  };

  if (!authData) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header>Consulta</Header>   
      <div className={styles.container}>
        <div className={styles.title}>
          <label className={styles.label}>Título</label>
          <input className={styles.input} type="text" placeholder="Digite o título do livro" value={nomeLivro} onChange={(e) => setNomeLivro(e.target.value)} />
        </div>
        <div className={styles.aut}>
          <label className={styles.label}>Autor</label>
          <input className={styles.input} type="text" placeholder="Digite o autor do livro" value={autor} onChange={(e) => setAutor(e.target.value)} />
        </div>
        <div className={styles.gen}>
          <label className={styles.label}>Gênero</label>
          <input className={styles.input} type="text" placeholder="Digite o gênero do livro" value={genero} onChange={(e) => setGenero(e.target.value)} />
        </div>
        <div className={styles.botao}>
          <br/>
          <button className={styles.button} onClick={handleSubmit}>Consultar</button>
        </div>
      </div>
      <div className={styles.tabela}>
        <TabelaConsultar dados={dados}/> 
      </div>
    </div>
  );
};

export default Consulta;