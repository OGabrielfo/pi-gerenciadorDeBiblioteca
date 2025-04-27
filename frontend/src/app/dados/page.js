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

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL_ALUNO = apiUrl+'/aluno/';
const API_URL_EMPRESTIMO = apiUrl+'/emprestimo/';
const API_URL_LIVROEMPRESTIMO = apiUrl+'/livro_emprestimo/';
const API_URL_LIVRO = apiUrl+'/livro/';

//TODO Criar componentes e adicionar na página
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

      // Set provisório dos dados, vai se substituído pelos dados filtrados
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

  // Proteção de Rota
  if (!authData) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header>Consulta</Header>
      <div className={styles.container}>
        <GraficoAutor dados={dadosLivro} />
        <GraficoGenero dados={dadosLivro} />
        <GraficoLivro dados={dadosLivro} />
        <GraficoTurma dados={dadosAluno} />
      </div>
    </>
  );
};