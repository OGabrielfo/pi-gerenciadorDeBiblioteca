'use client';
import { useEffect, useRef } from 'react';
import styles from './graficoLivro.module.css';
import * as echarts from 'echarts';

export default function GraficoLivro(props) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (props.dados && props.dados.length > 0) {
            const chartInstance = echarts.init(chartRef.current);

            // Transformar os dados para o formato correto
            const dadosLivro = props.dados.map(item => ({
                name: item.nome_do_livro,
                value: item.quantidade_alugado // Certifique-se de que essa propriedade existe nos dados
            }));

            const option = {
                title: {
                    text: 'Livros Mais Alugados',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Quantidade de Aluguel',
                        type: 'pie',
                        radius: '50%',
                        data: dadosFormatados,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            chartInstance.setOption(option);
        }
    }, [props.dados]);

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

            {/* Div para renderizar o gráfico */}
            <div ref={chartRef} className={styles.graficoContainer}></div>
        </>
    );
};
