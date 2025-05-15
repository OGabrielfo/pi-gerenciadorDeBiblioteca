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
    <div style={{ minWidth: "200px" }}>
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        placeholder={text}
      />
    </div>
  );
};

export default CategorySelect;
