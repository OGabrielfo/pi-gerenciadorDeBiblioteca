"use client";
import styles from "./graficoAutor.module.css";
import ReactECharts from "echarts-for-react";

export default function GraficoAutor(props) {
  const authors = {};

  if (!props.dados || props.dados.length === 0) return [];

  const data = props.dados

  data.forEach(item => {
    const autor = item.autor;
    authors[autor] = (authors[autor] || 0) + 1;
  });

  const entries = Object.entries(authors);
  entries.sort((a, b) => b[1] - a[1]);

  const topEntries = entries.slice(0, 5);

  const topAuthors = topEntries.map(([name, value]) => ({ name, value }));

  entries.forEach((item) => {
    topAuthors.push({ name: item[0], value: item[1] });
  });

  const option = {
    title: {
      text: "Empréstimos por Autor",
      subtext: 'Autores mais lidos',
      left: "center",
      textStyle: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#2e4a4d",
      },
    },

    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },

    legend: {
      orient: 'vertical',
      left: 'left'
    },

    color: ['#223939', '#335555', '#447171', '#558D8D', '#66A9A9'],

    series: [
      {
        type: "pie",
        radius: "60%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        data: [
          { value: topAuthors[0].value, name: topAuthors[0].name },
          { value: topAuthors[1].value, name: topAuthors[1].name },
          { value: topAuthors[2].value, name: topAuthors[2].name  },
          { value: topAuthors[3].value, name: topAuthors[3].name  },
          { value: topAuthors[4].value, name: topAuthors[4].name  }
        ],
        label: {
          formatter: "{b} - {d}%",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className={styles.scrollContainer}>
      <ReactECharts option={option} style={{ height: "400px" }} />
      {!(props.dados && props.dados.length > 0) && <p>Nenhuma informação encontrada</p>}
    </div>
  );
}
