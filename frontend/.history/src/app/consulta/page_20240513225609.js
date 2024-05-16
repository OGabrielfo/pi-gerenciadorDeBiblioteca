'use client'
import { useState } from 'react';
import styles from './consulta.module.css'
import Header from '../../components/header'
import TabelaConsultar from '@/components/tabelaConsultar'

export default function consulta() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [dados, setDados] = useState(null);

  const livros = [
    { codigo: '1', titulo: 'LIVRO1', autor: 'AUTOR1', genero: 'GENERO1', nicho: 'Nicho1', disponiveis: 10 },
    { codigo: '2', titulo: 'LIVRO2', autor: 'AUTOR2', genero: 'GENERO1', nicho: 'Nicho3', disponiveis: 100 },
    // Adicione mais livros aqui para teste
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultados = livros.filter(livro => 
      (nomeLivro === '' || livro.titulo.toUpperCase() === nomeLivro.toUpperCase()) &&
      (autor === '' || livro.autor.toUpperCase() === autor.toUpperCase()) &&
      (genero === '' || livro.genero.toUpperCase() === genero.toUpperCase())
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
