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
        menuPortalTarget={document.body} /* Garante que o menu seja renderizado corretamente */
        styles={{
          menu: (provided) => ({
            ...provided,
            maxHeight: "300px", /* Ajusta a altura do menu */
            overflowY: "auto", /* Permite rolagem vertical */
          }),
        }}
      />
    </div>
  );
};

export default CategorySelect;
