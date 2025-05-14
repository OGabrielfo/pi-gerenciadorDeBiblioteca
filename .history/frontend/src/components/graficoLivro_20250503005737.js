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