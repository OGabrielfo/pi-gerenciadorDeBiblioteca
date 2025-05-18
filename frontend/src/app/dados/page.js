'use client';
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import { useEffect, useState } from 'react';

import styles from './dados.module.css';

import Header from '../../components/header';
import GraficoAutor from '@/components/graficoAutor';
import GraficoGenero from '@/components/graficoGenero';
import GraficoLivro from '@/components/graficoLivro';
import GraficoTurma from '@/components/graficoTurma';

import CategorySelect from "../../components/filtro";
import MetricCard from "../../components/cardMes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL_ALUNO = apiUrl+'/aluno/';
const API_URL_EMPRESTIMO = apiUrl+'/emprestimo/';
const API_URL_LIVROEMPRESTIMO = apiUrl+'/livro_emprestimo/';
const API_URL_LIVRO = apiUrl+'/livro/';

/*

EXEMPLO DE RESPOSTA DA API:

- Exemplo da API emprestimo
0: {
  data_devolucao: "2025-04-25"
  data_emprestimo: "2025-04-23"
  id_emprestimo: 26
  id_usuario_aluno: 6
  id_usuario_professor: null
  situacao_emprestimo: "Concluido"
}

-----------------------------------------------

ENDPOINTS DA API:

- Aluno: 'id_aluno', 'nome_do_aluno', 'sala', 'telefone', 'email'
- Empréstimo: 'id_emprestimo', 'id_usuario_aluno', 'id_usuario_professor', 'data_emprestimo', 'data_devolucao', 'situacao_emprestimo'
- Livro Empréstimo: 'id', 'id_livro', 'id_emprestimo', 'quantidade', 'id_status'
- Livro: 'id_livro', 'nome_do_livro', 'autor', 'tipo', 'quantidade_exemplar', 'saldo_exemplar', 'id_nicho', 'observacao_livro'

-----------------------------------------------

OBS. 1: Necessário apenas adicionar a lógica de filtragem dos dados e retornar os dados corretos, pode até mesmo criar um novo objeto apenas com as informações necessárias
OBS. 2: Para criar este novo objeto vai ser necessário pegar o id do aluno e do empréstimo, no caso do aluno puxar a turma para salvar o objeto em um array e no caso do empréstimo usar o id do empréstimo para consultar os livros no livro_emprestimo e daí consultar o id do livro na api dos livros para aí sim salvar o nome, gênero e autor no array, podem ser informações salvas em arrays separados mesmo, o importante é enviar isso para os componentes.

*/



export default function  Dados() {
  const { authData } = useAuth();

  

  const [dadosApiAluno, setDadosApiAluno] = useState(null);
  const [dadosApiEmprestimo, setDadosApiEmprestimo] = useState(null);
  const [dadosApiLivroEmprestimo, setDadosApiLivroEmprestimo] = useState(null);
  const [dadosApiLivro, setDadosApiLivro] = useState(null);
  const [dadosAluno, setDadosAluno] = useState(null);
  const [dadosEmprestimo, setDadosEmprestimo] = useState(null);
  const [dadosLivroEmprestimo, setDadosLivroEmprestimo] = useState(null);
  const [dadosLivro, setDadosLivro] = useState(null);

  const [tipoGrafico, setTipoGrafico] = useState("autor");

  // GET dos dados necessários
  const fetchAllData = async (api) => {
    try{
      const response = await fetchWithAuth(api);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const dataApiAluno = await fetchAllData(API_URL_ALUNO);
      const dataApiEmprestimo = await fetchAllData(API_URL_EMPRESTIMO);
      const dataApiLivroEmprestimo = await fetchAllData(API_URL_LIVROEMPRESTIMO);
      const dataApiLivro = await fetchAllData(API_URL_LIVRO);

      setDadosApiAluno(dataApiAluno);
      setDadosApiEmprestimo(dataApiEmprestimo);
      setDadosApiLivroEmprestimo(dataApiLivroEmprestimo);
      setDadosApiLivro(dataApiLivro);

      // Set provisório dos dados, vai ser substituído pelos dados filtrados
      setDadosAluno(dataApiAluno);
      setDadosEmprestimo(dataApiEmprestimo);
      setDadosLivroEmprestimo(dataApiLivroEmprestimo);
      setDadosLivro(dataApiLivro);
    };

    fetchData();
  }, []);

  //TODO Criar lógica de filtros aqui (Imagino que apenas o de aluno e de livro serão necessários no final, mas criei todos já)
    // Obs. 01: Necessário encontrar os livros filtrando quais são os que estão com o id de empréstimo na api dos livros, para conseguir retornar as informações necessárias para os gráficos
    // Obs. 02: Os elementos setDados já estão criados para ter os dados dos filtros inseridos

    const [emprestimosCompletos, setEmprestimosCompletos] = useState([]);
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState(emprestimosCompletos);

    useEffect(() => {
      if (emprestimosCompletos.length > 0) {
        setFilteredData(emprestimosCompletos);
      }
    }, [emprestimosCompletos]);

    useEffect(() => {
    if (!dadosApiLivroEmprestimo || dadosApiLivroEmprestimo.length === 0) return;
    
    const emprestimos = dadosApiLivroEmprestimo.map((le) => {
      const emprestimo = dadosApiEmprestimo.find(
        (e) => e.id_emprestimo === le.id_emprestimo
      );
      const aluno = dadosApiAluno.find((a) => a.id_aluno === emprestimo?.id_usuario_aluno);
      const livro = dadosApiLivro.find((l) => l.id_livro === le.id_livro);

      return {
        ...le,
        ...emprestimo,
        ...aluno,
        ...livro,
      };
    });

  setEmprestimosCompletos(emprestimos);
}, [dadosApiLivroEmprestimo, dadosApiEmprestimo, dadosApiAluno, dadosApiLivro]);
    
    /* 
    useEffect(() => {
      const fetchData = async () => {
        setDadosAluno(dadosApiAluno); // Substituir a variável da função pela variável com o resultado do filtro
        setDadosEmprestimo(dadosApiEmprestimo); // Substituir a variável da função pela variável com o resultado do filtro
        setDadosLivroEmprestimo(dadosApiLivroEmprestimo); // Substituir a variável da função pela variável com o resultado do filtro
        setDadosLivro(dadosApiLivro); // Substituir a variável da função pela variável com o resultado do filtro
      };
    
      fetchData();
    }, []);
    */

    const handleChange = (e) => {
      setTipoGrafico(e.target.value);
    }

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

  // Proteção de Rota
  if (!authData) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header>Consulta</Header>
      <div className={styles.container}>
        <fieldset className={styles.filtroContainer} name="grafico" onChange={handleChange}>
          <legend className={styles.filtroLegenda}>Tipo de gráfico</legend>
          <div>
            <input type="radio" id="autor" value="autor" name="grafico" defaultChecked />
            <label htmlFor="autor">Autor</label>
          </div>
          <div>
            <input type="radio" id="genero" value="genero" name="grafico" />
            <label htmlFor="genero">Gênero</label>
          </div>
          <div>
            <input type="radio" id="titulo" value="titulo" name="grafico" />
            <label htmlFor="titulo">Título</label>
          </div>
          <div>
            <input type="radio" id="turma" value="turma" name="grafico" />
            <label htmlFor="turma">Turma</label>
          </div>
        </fieldset>
        <fieldset className={styles.filtroContainer} name="filtro" >
          <legend className={styles.filtroLegenda}>Filtrar</legend>
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
        </fieldset>
        
        <MetricCard value={filteredData} label="Empréstimos do Mês: " />

        {tipoGrafico === 'autor' && <GraficoAutor dados={filteredData} />}
        {tipoGrafico === 'genero' && <GraficoGenero dados={filteredData} />}
        {tipoGrafico === 'titulo' && <GraficoLivro dados={filteredData} />}
        {tipoGrafico === 'turma' && <GraficoTurma dados={filteredData} />}
        
      </div>
    </>
  );
};