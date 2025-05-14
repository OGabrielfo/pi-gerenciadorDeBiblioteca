'use client'; 
import { color } from 'echarts';
import styles from './graficoLivro.module.css'; 
import ReactECharts from 'echarts-for-react';
export default function GraficoLivro(props) { 
    const contagem = {};

    if (!props.dados || props.dados.length === 0) return [];

    const data = props.dados

    // Percorrer os elementos e contar
    data.forEach(item => {
        const chave = item['nome_do_livro'];
        if (chave) {
            contagem[chave] = (contagem[chave] || 0) + 1;
        }
    });

    // Transformar em array e ordenar em ordem decrescente
    const resultadoOrdenado = Object.entries(contagem)
        .sort((a, b) => b[1] - a[1])
        .map(([nome, quantidade]) => ({ nome, quantidade }));

        console.log(resultadoOrdenado)

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
              { value: resultadoOrdenado[0].quantidade, name: resultadoOrdenado[0].nome },
              { value: resultadoOrdenado[1].quantidade, name: resultadoOrdenado[1].nome },
              { value: resultadoOrdenado[2].quantidade, name: resultadoOrdenado[2].nome },
              { value: resultadoOrdenado[3].quantidade, name: resultadoOrdenado[3].nome },
              { value: resultadoOrdenado[4].quantidade, name: resultadoOrdenado[4].nome }
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
            '#223939', 
            '#335555', 
            '#447171', 
            '#558D8D', 
            '#66A9A9'  
          ]
      };
      return ( 
  <> 
    <h1>Gráfico por Título do Livro</h1> 
     {props.dados && props.dados.length > 0 ? ( 
      <div className={styles.scrollContainer}>
        <ReactECharts option={option} />
      </div>
    ) : (
      <p>Nenhuma informação disponível</p>
    )}
  </>
);
  };