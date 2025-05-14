"use client";
import styles from "./graficoAutor.module.css";
import ReactECharts from "echarts-for-react";

export default function GraficoAutor({ data }) {
  const authors = {};

  data.forEach((item) => {
    const author = item.author;
    authors[author] = (authors[author] || 0) + 1;
  }, {});

  const entries = Object.entries(authors);
  entries.sort((a, b) => b[1] - a[1]).slice(0, 5);

  const topAuthors = [];

  entries.forEach((item) => {
    topAuthors.push({ name: item[0], value: item[1] });
  });

  console.log(topAuthors);

  const option = {
    title: {
      text: "Empréstimos por Autor",
      left: "center",
      top: 10,
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

    color: ["#a8e6cf", "#81c784", "#66bb6a", "#388e3c", "#2e7d32"],

    series: [
      {
        type: "pie",
        radius: "60%",
        data: topAuthors,
        label: {
          formatter: "{b} {d}%",
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
    <div styles>
      {data && data.length > 0 ? (
        <ReactECharts option={option} style={{ height: "400px" }} />
      ) : (
        <>
          <h1>Empréstimos por Autor</h1>
          <p>Nenhuma informação</p>
        </>
      )}
    </div>
  );
}
