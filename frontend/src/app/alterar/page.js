'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from '../../app/alterar/alterar.module.css'
import Header from '../../components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'
import TabelaAlterar from '@/components/tabelaAlterar'
import React,{useState, useEffect, createContext, useCallback} from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL = apiUrl+'/livro/'
export const AlterarLivroContext = createContext();

export default function Alterar() { 
    const { authData } = useAuth();

    const [isUpdated, setIsUpdated] = useState(false);
    const [dadosApi, setDadosApi] = useState();
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const fetchAllData = async () => { // Retorna todas as linhas da api
      try{
        const response = await fetchWithAuth(API_URL);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error)
      } finally {
      }
    } 

    const procurar = useCallback((campoPesquisa1, campoPesquisa2, filtro1, filtro2, listaTotal) => { // É efetuado quando o botao "procurar x" é selecionado ou quando uma linha é alterada/deletada.
      let valor1 = campoPesquisa1.value.toLowerCase();
      let valor2 = campoPesquisa2.value.toLowerCase();
      let listaTemporaria;
      if(valor1.trim() !== ""){
          console.log("1 feita");
          listaTemporaria = listaTotal.filter((elemento) => comparar(elemento, filtro1, valor1));
          listaTotal = [...listaTemporaria];
      }
      if(valor2.trim() != ""){
          console.log("2 feita");
          listaTemporaria = listaTotal.filter((elemento) => comparar(elemento, filtro2, valor2));
      }
      setLivrosPesquisa(listaTemporaria);
      resetarCampos()
      campoPesquisa1.value = "";
      campoPesquisa2.value = "";
  }, []);

    useEffect(() => async () =>{ // Roda toda vez que entra na tela
      const data = await fetchAllData();
        setDadosApi(data);
    }, []); 

    useEffect(() => { // Roda quando uma linha é deletada ou alterada
      const fetchData = async () => {
        if(isUpdated){
          const data = await fetchAllData();
          procurar(document.getElementById("campoTitulo"),document.getElementById("campoAutor"), "nome_do_livro", "autor", data);
          setDadosApi(data);
          setIsUpdated(false)
          }
        };

        fetchData();
    }, [isUpdated, procurar]);

    const [livrosPesquisa, setLivrosPesquisa] = useState();
    
    function comparar(elemento, filtro, valor){
        return elemento[filtro].toLowerCase().includes(valor);
    } // Compara um campo de pesquisa com o respectivo campo da linha (Vai ficar dentro de um map)

    function resetarCampos(){ // Resta os campos de um livro
        document.getElementById("inputTitulo").placeholder = "Digite o título do livro";
        document.getElementById("inputAutor").placeholder = "Digite o autor do livro";
        document.getElementById("inputGenero").placeholder = "Digite o gênero do livro";
        document.getElementById("inputNicho").placeholder = "Digite o nicho";
        document.getElementById("inputExemplaresTotais").placeholder = "Digite os exemplares totais";
        document.getElementById("inputExemplaresSaldo").placeholder = "Digite o saldo de exemplares";


        document.getElementById("inputTitulo").value = "";
        document.getElementById("inputAutor").value = "";
        document.getElementById("inputGenero").value = "";
        document.getElementById("inputNicho").value = "";
        document.getElementById("inputExemplaresTotais").value = "";
        document.getElementById("inputExemplaresSaldo").value = "";
        document.getElementById("codigoSelecionado").textContent = "";
    }

    if (!authData) {
      return <p>Carregando...</p>;
    }

    return(
        <>
            <Header>Alterar</Header>
            <div className={styles.mainDiv}>
                <div className={styles.alterarTelas}>
                    <BtnAlterar nome="Alterar Livro" estado={true} idBotao="btnLivro"/>
                    <BtnAlterar nome="Alterar Aluno" estado={false} idBotao="btnAluno" />
                    <BtnAlterar nome="Alterar Funcionario" estado={false} idBotao="btnFuncionario"/>
                </div>
                <div className={styles.alterarDiv} id="mainLivro">
                    <div className={styles.pesquisar}>
                        <CampoPesquisar idInput="campoTitulo" campoNome="Título" ph="Digite o título do livro"/>
                        <CampoPesquisar idInput="campoAutor" campoNome="Autor" ph="Digite o autor do livro"/>
                        <button className={styles.btnProcurar} onClick={() => procurar(document.getElementById("campoTitulo"),document.getElementById("campoAutor"), "nome_do_livro", "autor", dadosApi)}>Procurar Livro</button>
                    </div>
                    <AlterarLivroContext.Provider value={{isUpdated, setIsUpdated}}>
                      <TabelaAlterar dados={livrosPesquisa} tipo="livro"/>
                      </AlterarLivroContext.Provider>
                    <div className={styles.divRegistroSelecionado}>Registro selecionado: <span id="codigoSelecionado"></span></div>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputTitulo" nome="Título" ph="Digite o título do livro"/>
                        <CampoDados idInput="inputAutor" nome="Autor" ph="Digite o autor do livro"/>
                        <CampoDados idInput="inputGenero" nome="Gênero" ph="Digite o gênero do livro"/>
                        <CampoDados idInput="inputNicho" nome="Nicho" ph="Digite o nicho"/>
                        <CampoDados idInput="inputExemplaresTotais" nome="Exemplares Totais" ph="Digite os exemplares totais"/>
                        <CampoDados idInput="inputExemplaresSaldo" nome="Saldo de Exemplares" ph="Digite o saldo de exemplares"/>
                    </div>
                    <AlterarLivroContext.Provider value={{isUpdated, setIsUpdated}}>
                      <BtnEfetuarAlteracao tipo="livro"/>
                    </AlterarLivroContext.Provider>
                </div>
            </div>
        </>
    )
}


