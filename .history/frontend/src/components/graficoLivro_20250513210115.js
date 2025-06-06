'use client'; 
import { color } from 'echarts';
import styles from './graficoLivro.module.css'; 
import ReactECharts from 'echarts-for-react';
export default function GraficoLivro(props) { 
    const dataFromProps = props.dados?.slice(0, 5).map((item) => ({
        value: item., 
        name: item.nome_do_livro 
    })) || []; 
    console.log("Dados mapeados para o gráfico:", dataFromProps);
    const option = {
        title: {
          text: 'Gráfico por Título do Livro',
          subtext: '5 livros mais emprestados',
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
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              ...dataFromProps,
            ],
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
            '#223939', // Cor para o primeiro item
            '#335555', // Cor para o segundo item
            '#447171', // Cor para o terceiro item
            '#558D8D', // Cor para o quarto item
            '#66A9A9'  // Cor para o quinto item
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
      <p>Nenhuma informação disponível</p>
    )}
  </>
);
  };