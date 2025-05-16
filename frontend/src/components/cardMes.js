import React from "react";
import styles from "./cardMes.module.css";

const MetricCard = ({ value, label }) => {
  const date = new Date();
  let total = 0;
  value.forEach((item) => {
    const itemDate = new Date(item["data_emprestimo"]);
    console.log(itemDate);
    if (itemDate.getMonth() == date.getMonth()) {
      total++;
    }
  });
  return (
    <div className={styles["metric-card"]}>
      <div className={styles["metric-value"]}>{total}</div>
      <div className={styles["metric-label"]}>{label}</div>
    </div>
  );
};

export default MetricCard;
