"use client";
import styles from "./graficoAutor.module.css";
import ReactECharts from "echarts-for-react";

export default function GraficoAutor(props) {
  const contagem = {};

  if (!props.dados || props.dados.length === 0) return <p>Nenhuma informação disponível</p>;

  props.dados.forEach(item => {
    const autor = item.autor;
    if (autor) {
      contagem[autor] = (contagem[autor] || 0) + 1;
    }
  });

  const resultadoOrdenado = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([autor, quantidade]) => ({ autor, quantidade }));

  const topAutores = resultadoOrdenado.slice(0, 5);

  const option = {
    title: {
      text: "Empréstimos por Autor",
      subtext: "Autores mais lidos",
      left: "center",
      textStyle: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "#2e4a4d",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Quantidade",
        type: "pie",
        radius: "60%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            position: "center",
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        data: topAutores.map((item) => ({
          value: item.quantidade,
          name: item.autor,
        })),
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
    color: ["#223939", "#335555", "#447171", "#558D8D", "#66A9A9"],
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
}