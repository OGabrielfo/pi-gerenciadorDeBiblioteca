"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/authService";
import styles from "./teste.module.css";
import Image from "next/image";
import Logo from "../../assets/Logotipo.png";

import CategorySelect from "../../components/filtro";

const sampleData = [
  { name: "Book One", category: "Books" },
  { name: "Gadget Pro", category: "Electronics" },
  { name: "Notebook", category: "Books" },
];

const TestePage = () => {
  const [filteredData, setFilteredData] = useState(sampleData);

  const handleFilter = (category) => {
    const result = sampleData.filter((item) => {
      const matchCategory = category ? item.category === category : true;
      return matchCategory;
    });
    setFilteredData(result);
    console.log(result);
  };

  return (
    <div>
      <h1>teste</h1>
      <CategorySelect
        categories={["Books", "Electronics"]}
        onChange={handleFilter}
        text="Todos Genêros"
      />
    </div>
  );
};

export default TestePage;
