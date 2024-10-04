'use client'
import { useState, useEffect } from 'react';
import styles from '@/app/consulta/consulta.module.css';
import Header from '@/components/header';
import TabelaConsultar from '@/components/tabelaConsultar';

const API_URL = 'http://127.0.0.1:8000/api/livro/';

export default function Home() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [dados, setDados] = useState(null);
  const [dadosAPI, setDadosAPI] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setDadosAPI(data); // Atualizar o estado com os dados
      } catch (error) {
        console.error('Erro ao buscar dados dos livros:', error);
      }
    };
    fetchData();
    
  }, []);

  /*useEffect(() => {
    if (dadosAPI) {
      console.log('dadosAPI atualizado:', dadosAPI);
    }
  }, [dadosAPI]); */

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

  return (
    <div>
      <Header PublicNav={true}>Consulta</Header>
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
