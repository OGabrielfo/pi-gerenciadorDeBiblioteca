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
                    <div id="graficoPizza" style="width: 600px; height: 400px;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script>
    // Inicializar o gráfico
    var myChart = echarts.init(document.getElementById('graficoPizza'));

    // Configuração dos dados
    var option = {
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
                data: [
                    { value: 120, name: 'Livro A' },
                    { value: 80, name: 'Livro B' },
                    { value: 150, name: 'Livro C' },
                    { value: 100, name: 'Livro D' }
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
    };

    // Aplicar a configuração ao gráfico
    myChart.setOption(option);
</script>
                </div>
            ) : (
                <p>Nenhuma informação</p>
            )}
        </>
    );
};