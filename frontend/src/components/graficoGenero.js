'use client';
import styles from './graficoGenero.module.css';

export default function GraficoGenero(props) {
    return (
        <>
            <h1>Gráfico por Gênero do Livro</h1>
            {props.dados && props.dados.length > 0 ? (
                <div className={styles.scrollContainer}>
                    {props.dados.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <p>ID do livro: {item.id_livro}</p>
                            <p>Autor: {item.tipo}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhuma informação</p>
            )}
        </>
    );
};