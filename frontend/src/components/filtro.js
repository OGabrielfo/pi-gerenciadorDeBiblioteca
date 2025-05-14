"use client";
import React from "react";
import styles from "./filtro.module.css";

const CategorySelect = ({ categories = [], onChange, text, type }) => {
  return (
    <div className={styles["select-wrapper"]}>
      <select
        className={styles["custom-select"]}
        onChange={(e) => onChange(e.target.value, type)}
      >
        <option value="">{text}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
