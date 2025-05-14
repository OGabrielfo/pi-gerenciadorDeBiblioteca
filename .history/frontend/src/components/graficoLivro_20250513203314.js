'use client';
import { color } from 'echarts';
import styles from './graficoLivro.module.css';
import ReactECharts from 'echarts-for-react';

export default function GraficoLivro(props) { 
    // Ordena os dados com base na quantidade de vezes que o livro foi alugado
    // Depois, pega apenas os 5 primeiros
    const dataFromProps = props.dados
        ?.sort((a, b) => b.quantidade - a.quantidade) // Ordena de forma decrescente (mais alugado primeiro)
        .slice(0, 5) // Mantém apenas os cinco primeiros
        .map((item) => ({
            value: item.quantidade, // Número de vezes que foi alugado
            name: item.nome_do_livro // Nome do livro
        })) || [];

    const option = {
        title: {
            text: 'Top 5 Livros Mais Alugados',
            subtext: 'Baseado nos dados do sistema',
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
                name: 'Livros',
                type: 'pie',
                radius: '50%',
                data: dataFromProps, // Usa apenas os 5 livros mais alugados
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        color: [
            '#223939', '#335555', '#447171', '#558D8D', '#66A9A9'
        ]
    };

    return (
        <>
            <h1>Top 5 Livros Mais Alugados</h1>
            {dataFromProps.length > 0 ? (
                <div className={styles.scrollContainer}>
                    <ReactECharts option={option} />
                </div>
            ) : (
                <p>Nenhuma informação disponível</p>
            )}
        </>
    );
}