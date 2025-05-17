'use client'; 
import { color } from 'echarts';
import styles from './graficoGenero.module.css'; 
import ReactECharts from 'echarts-for-react';

export default function GraficoGenero(props) { 
    const contagem = {};

    if (!props.dados || props.dados.length === 0) return [];

    const data = props.dados

    data.forEach(item => {
        const chave = item['tipo'];
        if (chave) {
            contagem[chave] = (contagem[chave] || 0) + 1;
        }
    });

    
    const resultadoOrdenado = Object.entries(contagem)
        .sort((a, b) => b[1] - a[1])
        .map(([tipo, quantidade]) => ({ tipo, quantidade }));

    const option = {
        title: {
          text: 'Empréstimos por Gênero Literário',
          subtext: '5 gêneros literários mais procurados',
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
      name: 'Quantidade',
      type: 'pie',
      radius: '60%',
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },

      emphasis: {
        label: {
          show: true,
          position: 'center',
          fontSize: 40,
          fontWeight: 'bold'
        }
      },

            data: [
              { value: resultadoOrdenado[0].quantidade, name: resultadoOrdenado[0].tipo },
              { value: resultadoOrdenado[1].quantidade, name: resultadoOrdenado[1].tipo },
              { value: resultadoOrdenado[2].quantidade, name: resultadoOrdenado[2].tipo  },
              { value: resultadoOrdenado[3].quantidade, name: resultadoOrdenado[3].tipo  },
              { value: resultadoOrdenado[4].quantidade, name: resultadoOrdenado[4].tipo  }
            ],
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