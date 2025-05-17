"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/authService";
import styles from "./teste.module.css";
import Image from "next/image";
import Logo from "../../assets/Logotipo.png";

import CategorySelect from "../../components/filtro";
import MetricCard from "../../components/cardMes";
import GraficoAutor from "../../components/graficoAutor";

const alunos = [
  {
    id_aluno: 1,
    nome_do_aluno: "João Silva",
    sala: "101A",
    telefone: "(11) 91234-5678",
    email: "joao.silva@example.com",
  },
  {
    id_aluno: 2,
    nome_do_aluno: "Maria Oliveira",
    sala: "101A",
    telefone: "(11) 98765-4321",
    email: "maria.oliveira@example.com",
  },
  {
    id_aluno: 3,
    nome_do_aluno: "Carlos Souza",
    sala: "102B",
    telefone: "(21) 99876-5432",
    email: "carlos.souza@example.com",
  },
];

const livros = [
  {
    id_livro: 1,
    nome_do_livro: "Dom Casmurro",
    autor: "Machado de Assis",
    tipo: "Romance",
    quantidade_exemplar: 5,
    saldo_exemplar: 3,
    id_nicho: 101,
    observacao_livro: "Capa levemente danificada",
  },
  {
    id_livro: 2,
    nome_do_livro: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    tipo: "Fábula",
    quantidade_exemplar: 8,
    saldo_exemplar: 6,
    id_nicho: 102,
    observacao_livro: "Edição bilíngue",
  },
  {
    id_livro: 3,
    nome_do_livro: "1984",
    autor: "George Orwell",
    tipo: "Ficção científica",
    quantidade_exemplar: 10,
    saldo_exemplar: 10,
    id_nicho: 103,
    observacao_livro: "",
  },
];

const emprestimos = [
  {
    id_emprestimo: 101,
    id_usuario_aluno: 1, // João Silva
    id_usuario_professor: null,
    data_emprestimo: "2025-05-01",
    data_devolucao: "2025-05-10",
    situacao_emprestimo: "Ativo",
  },
  {
    id_emprestimo: 102,
    id_usuario_aluno: 2, // Maria Oliveira
    id_usuario_professor: null,
    data_emprestimo: "2025-04-20",
    data_devolucao: "2025-04-27",
    situacao_emprestimo: "Devolvido",
  },
  {
    id_emprestimo: 103,
    id_usuario_aluno: 3, // Carlos Souza
    id_usuario_professor: null,
    data_emprestimo: "2025-04-28",
    data_devolucao: "2025-05-05",
    situacao_emprestimo: "Atrasado",
  },
];

const livroEmprestimos = [
  {
    id: 1,
    id_livro: 1, // Dom Casmurro
    id_emprestimo: 101,
    quantidade: 1,
    id_status: 1, // Ativo
  },
  {
    id: 2,
    id_livro: 2, // O Pequeno Príncipe
    id_emprestimo: 102,
    quantidade: 2,
    id_status: 2, // Devolvido
  },
  {
    id: 3,
    id_livro: 3, // 1984
    id_emprestimo: 103,
    quantidade: 1,
    id_status: 3, // Atrasado
  },
];

const emprestimosCompletos = livroEmprestimos.map((le) => {
  const emprestimo = emprestimos.find(
    (e) => e.id_emprestimo === le.id_emprestimo
  );
  const aluno = alunos.find((a) => a.id_aluno === emprestimo.id_usuario_aluno);
  const livro = livros.find((l) => l.id_livro === le.id_livro);

  return {
    ...le,
    ...emprestimo,
    ...aluno,
    ...livro,
  };
});

const TestePage = () => {
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(emprestimosCompletos);
  const handleFilter = (categories, type) => {
    const newFilters = { ...filters };

    newFilters[type] = categories;
    setFilters(newFilters);
  };

  useEffect(() => {
    // Só filtra se filters não estiver vazio
    if (Object.keys(filters).length !== 0) {
      const result = emprestimosCompletos.filter((item) => {
        let matchCategory = true;

        Object.keys(filters).forEach((key) => {
          const filterValues = filters[key];

          if (!filterValues || filterValues.length === 0) {
            matchCategory = matchCategory && true;
          } else {
            if (filterValues.includes(item[key])) {
              matchCategory = matchCategory && true;
            } else {
              matchCategory = false && matchCategory;
            }
          }
        });

        return matchCategory;
      });

      setFilteredData(result);
    }
  }, [filters]);

  return (
    <div>
      <h1>teste</h1>
      <CategorySelect
        categories={[...new Set(emprestimosCompletos.map((item) => item.tipo))]}
        onChange={handleFilter}
        text="Todas categorias"
        type="tipo"
      />
      <CategorySelect
        categories={[...new Set(emprestimosCompletos.map((item) => item.sala))]}
        onChange={handleFilter}
        text="Todas as salas"
        type="sala"
      />
      <div>
        <h2>Graficos</h2>
        <div>
          <MetricCard value={filteredData} label="Empréstimos do Mês" />
          <GraficoAutor data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default TestePage;
