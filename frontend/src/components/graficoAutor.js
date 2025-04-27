'use client';
import styles from './graficoAutor.module.css';

export default function GraficoAutor(props) {
    return (
        <>
            <h1>Gráfico por Autor</h1>
            {props.dados && props.dados.length > 0 ? (
                <div className={styles.scrollContainer}>
                    {props.dados.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <p>ID do livro: {item.id_livro}</p>
                            <p>Autor: {item.autor}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhuma informação</p>
            )}
        </>
    );
};