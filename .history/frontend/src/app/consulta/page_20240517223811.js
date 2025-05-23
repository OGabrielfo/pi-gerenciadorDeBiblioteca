'use client'
import { useState, useEffect } from 'react';
import styles from './consulta.module.css';
import Header from '../../components/header';
import TabelaConsultar from '@/components/tabelaConsultar';

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL = apiUrl+'/livro/'

export default function Consulta() {
  const [nomeLivro, nome_do_livro] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [dados, setDados] = useState(null);

  useEffect(() => {
    // Fazer a chamada à API para obter os dados dos livros
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Atualizar o estado com os dados dos livros
        setDados(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados dos livros:', error);
      });
  }, []); // Executa apenas uma vez quando o componente é montado

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultados = dados.filter((livro) =>
      (nomeLivro === '' || livro.nome_do_livro.toUpperCase() === nomeLivro.toUpperCase()) &&
      (autor === '' || livro.autor.toUpperCase() === autor.toUpperCase()) &&
      (genero === '' || livro.tipo.toUpperCase() === genero.toUpperCase())
    );
    if (resultados.length === 0) {
      alert('Nenhum livro encontrado');
    } else {
      setDados(resultados);
    }
  };

  return (
    <div>
      <Header>Consulta </Header>   
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
}
