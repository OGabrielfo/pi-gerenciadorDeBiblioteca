"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/authService";
import styles from "./teste.module.css";
import Image from "next/image";
import Logo from "../../assets/Logotipo.png";

import CategorySelect from "../../components/filtro";
import MetricCard from "../../components/cardMes";
import GraficoAutor from "../../components/graficoAutor";

const sampleData = [
  {
    student: "João Silva",
    class: "3A",
    loanId: "E123",
    author: "Machado de Assis",
    bookTitle: "Dom Casmurro",
    genre: "Romance",
    date: "2025-05-01",
  },
  {
    student: "Maria Oliveira",
    class: "2B",
    loanId: "E124",
    author: "Clarice Lispector",
    bookTitle: "A Hora da Estrela",
    genre: "Fiction",
    date: "2025-05-03",
  },
  {
    student: "Carlos Mendes",
    class: "1C",
    loanId: "E125",
    author: "J.K. Rowling",
    bookTitle: "Harry Potter e a Pedra Filosofal",
    genre: "Fantasy",
    date: "2025-05-05",
  },
  {
    student: "Ana Paula",
    class: "3B",
    loanId: "E126",
    author: "Machado de Assis",
    bookTitle: "Dom Casmurro",
    genre: "Romance",
    date: "2025-05-06",
  },
  {
    student: "Lucas Almeida",
    class: "2A",
    loanId: "E127",
    author: "George Orwell",
    bookTitle: "1984",
    genre: "Dystopia",
    date: "2025-05-06",
  },
  {
    student: "Beatriz Souza",
    class: "1B",
    loanId: "E128",
    author: "J.K. Rowling",
    bookTitle: "Harry Potter e a Pedra Filosofal",
    genre: "Fantasy",
    date: "2025-05-07",
  },
  {
    student: "Pedro Henrique",
    class: "3A",
    loanId: "E129",
    author: "George Orwell",
    bookTitle: "1984",
    genre: "Dystopia",
    date: "2025-05-08",
  },
  {
    student: "Fernanda Lima",
    class: "2C",
    loanId: "E130",
    author: "Clarice Lispector",
    bookTitle: "A Hora da Estrela",
    genre: "Fiction",
    date: "2025-05-09",
  },
  {
    student: "Rafael Torres",
    class: "1A",
    loanId: "E131",
    author: "Machado de Assis",
    bookTitle: "Dom Casmurro",
    genre: "Romance",
    date: "2025-05-10",
  },
  {
    student: "Juliana Costa",
    class: "2B",
    loanId: "E132",
    author: "J.K. Rowling",
    bookTitle: "Harry Potter e a Pedra Filosofal",
    genre: "Fantasy",
    date: "2025-05-11",
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
          <GraficoAutor data={sampleData} />
        </div>
      </div>
    </div>
  );
};

export default TestePage;
