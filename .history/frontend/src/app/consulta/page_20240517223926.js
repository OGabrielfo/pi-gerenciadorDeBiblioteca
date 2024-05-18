'use client'

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
