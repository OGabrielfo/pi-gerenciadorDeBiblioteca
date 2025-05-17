'use client';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './graficoTurma.module.css';

export default function GraficoTurma(props) {
  if (!props.dados || props.dados.length === 0) {
    return <p>Nenhuma informação encontrada</p>;
  }

  const data = props.dados
  const contagemTurmas = {};

  data.forEach((item) => {
    const turma = item.sala;
    contagemTurmas[turma] = (contagemTurmas[turma] || 0) + 1;
  });

  // Converter para um formato adequado para o gráfico
  const nomesFormatados = {
    "6ºA": "6º Ano A",
    "7ºA": "7º Ano A",
    "8ºA": "8º Ano A",
    "9ºA": "9º Ano A",
  };

  const turmas = Object.keys(contagemTurmas).map((turma) => nomesFormatados[turma] || turma);
  const valores = Object.values(contagemTurmas);

  const cores = [
    '#223939', 
    '#335555', 
    '#447171', 
    '#558D8D', 
    '#66A9A9'
  ];

  const option = {
    title: {
      text: 'Empréstimos por Turma',
      subtext: 'Turmas que mais utilizam a biblioteca',
      left: 'center',
    },
    tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: turmas,
    },
    series: [
      {
        type: 'bar',
        data: valores.map((valor, index) => ({
          value: valor,
          itemStyle: { color: cores[index % cores.length] }, // Aplica uma cor diferente para cada barra
        })),

        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  };


  return (
    <div className={styles.scrollContainer}>
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
}