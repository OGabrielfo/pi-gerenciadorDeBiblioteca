"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/authService";
import styles from "./teste.module.css";
import Image from "next/image";
import Logo from "../../assets/Logotipo.png";

import CategorySelect from "../../components/filtro";
import MetricCard from "../../components/cardMes";

const sampleData = [
  { name: "Book One", category: "Books", type: "Fiction", date: "2025-02-05" },
  {
    name: "Gadget Pro",
    category: "Electronics",
    type: "Device",
    date: "2025-02-12",
  },
  {
    name: "Notebook",
    category: "Books",
    type: "Stationery",
    date: "2025-02-18",
  },
  {
    name: "Wireless Mouse",
    category: "Electronics",
    type: "Accessory",
    date: "2025-02-25",
  },
  {
    name: "Pen Set",
    category: "Stationery",
    type: "Writing",
    date: "2025-03-03",
  },
];

const TestePage = () => {
  const [filters, setFilters] = useState({ category: "" });
  const [filteredData, setFilteredData] = useState(sampleData);

  const handleFilter = (category, type) => {
    const newFilters = filters;
    newFilters[type] = category;

    const result = sampleData.filter((item) => {
      let matchCategory = true;

      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key] == "" || newFilters[key] == item[key]) {
          matchCategory = true && matchCategory;
        } else {
          matchCategory = false && matchCategory;
        }
      });
      return matchCategory;
    });

    // const result = filteredData.filter((item) => {
    //   const matchCategory = category ? item.category === category : true;
    //   return matchCategory;
    // });
    setFilteredData(result);
    console.log(result);
  };

  return (
    <div>
      <h1>teste</h1>
      <CategorySelect
        categories={[...new Set(sampleData.map((item) => item.category))]}
        onChange={handleFilter}
        text="Todas categorias"
        type="category"
      />
      <CategorySelect
        categories={[...new Set(sampleData.map((item) => item.type))]}
        onChange={handleFilter}
        text="Todos os tipos"
        type="type"
      />
      <div>
        <h2>Graficos</h2>
        <div>
          <MetricCard value={filteredData} label="Empréstimos do Mês" />
        </div>
      </div>
    </div>
  );
};

export default TestePage;
