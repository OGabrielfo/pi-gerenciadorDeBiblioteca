'use client'; 
import { color } from 'echarts';
import styles from './graficoLivro.module.css'; 
import ReactECharts from 'echarts-for-react';
export default function GraficoLivro(props) { 
    const contagem = {};

    if (!props.dados || props.dados.length === 0) return <p>Nenhuma informação disponível</p>;

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

    const topLivros = resultadoOrdenado.slice(0, 5);

    const option = {
        title: {
          text: 'Empréstimos por Título do Livro',
          subtext: 'Livros mais emprestados',
          left: 'center',
          textStyle: {
            fontSize: 20,
            fontFamily: "sans-serif",
            color: "#2e4a4d",
          },
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
            radius: '60%',
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: topLivros.map((item) => ({
                value: item.quantidade,
                name: item.nome,
            })),
            label: {
              formatter: "{b} - {d}%",
            },
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
     {props.dados && props.dados.length > 0 ? ( 
      <div className={styles.scrollContainer}>
        <ReactECharts option={option} style={{ height: "400px" }} />
      </div>
    ) : (
      <p>Nenhuma informação disponível</p>
    )}
  </>
);
  };