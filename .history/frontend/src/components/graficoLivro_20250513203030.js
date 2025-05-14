use client';
import { color } from 'echarts'; 
import styles from './graficoLivro.module.css'; 
import ReactECharts from 'echarts-for-react';
export default function GraficoLivro(props) {
    
    const dataFromProps = props.dados?.map((item) => ({
        value: item.quantidade, // Substitua 'quantidade' pela propriedade que representa os valores no gráfico
        name: item.nome_do_livro // Nome do livro como legenda
    })) || [];

    const option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Dados Reais',
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
                data: dataFromProps, // Aqui usamos os dados dinâmicos
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
            <h1>Gráfico por Título do Livro</h1>
            {dataFromProps.length > 0 ? (
                <div className={styles.scrollContainer}>
                    <ReactECharts option={option} />
                </div>
            ) : (
                <p>Nenhuma informação</p>
            )}
        </>
    );
}