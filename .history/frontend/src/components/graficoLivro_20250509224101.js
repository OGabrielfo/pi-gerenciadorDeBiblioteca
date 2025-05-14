'use client'; 
import { color } from 'echarts';
import styles from './graficoLivro.module.css'; 
import ReactECharts from 'echarts-for-react';
export default function GraficoLivro(props) { 
    const option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
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
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
        color: [
            '#223939', // Cor para o primeiro item
            '#335555', // Cor para o segundo item
            '#447171', // Cor para o terceiro item
            '#558D8D', // Cor para o quarto item
            '#FF8333'  // Cor para o quinto item
          ]
      };
    return ( 
    <> 
        <h1>Gráfico por Título do Livro</h1> 
            {props.dados && props.dados.length > 0 ? ( 
                <div className={styles.scrollContainer}> 
                {props.dados.map((item, index) => ( 
                    <div key={index} className={styles.item}> 
                    <p>ID do livro: {item.id_livro}</p> 
                    <p>Nome do livro: {item.nome_do_livro}</p> 
                    <ReactECharts option={(option)} />
                    </div> 
                    ))} 
                    </div> 
                    ) : ( 
                    <p>Nenhuma informação</p> 
            )}
         </> 
     );
  };