'use client'; 
import styles from './graficoLivro.module.css'; 
import * as echarts from 'echarts'; 
export default function GraficoLivro(props) { 
    return ( 
    <> 
        <h1>Gráfico por Título do Livro</h1> 
            {props.dados && props.dados.length > 0 ? ( 
                <div className={styles.scrollContainer}> 
                {props.dados.map((item, index) => ( 
                    <div key={index} className={styles.item}> 
                    <p>ID do livro: {item.id_livro}</p> 
                    <p>Nome do livro: {item.nome_do_livro}</p> 
                    </div> 
                    ))} 
                    </div> 
                    ) : ( 
                    <p>Nenhuma informação</p> 
                )}
                </> 
                );