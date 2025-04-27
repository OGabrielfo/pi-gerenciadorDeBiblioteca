'use client';
import styles from './graficoTurma.module.css';

export default function GraficoTurma(props) {
    return (
        <>
            <h1>Gráfico por Turma</h1>
            {props.dados && props.dados.length > 0 ? (
                <div className={styles.scrollContainer}>
                    {props.dados.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <p>Nome: {item.nome_do_aluno}</p>
                            <p>Turma: {item.sala}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhuma informação</p>
            )}
        </>
    );
};