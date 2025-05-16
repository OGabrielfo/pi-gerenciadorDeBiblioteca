"use client";
import styles from "./filtro.module.css";
import React from "react";
import Select from "react-select";

const CategorySelect = ({ categories = [], onChange, text, type }) => {
  const options = categories.map((cat) => ({ value: cat, label: cat }));

  const handleChange = (selectedOptions) => {
    const values = selectedOptions.map((opt) => opt.value);
    onChange(values, type);
  };

  return (
    <div className={styles.selectWrapper}>
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        placeholder={text}
        className={styles.selectContainer}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CategorySelect;
