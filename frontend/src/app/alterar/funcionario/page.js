'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from '../../alterar/alterar.module.css'
import Header from '@/components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'
import TabelaAlterar from '@/components/tabelaAlterar'
import React, {useState, createContext, useEffect, useCallback} from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL = apiUrl+'/professor_funcionario/'
export const AlterarFuncionarioContext = createContext();

export default function Alterar() {
    const { authData } = useAuth();

    const [funcionariosPesquisa, setfuncionariosPesquisa] = useState();
    const [isUpdated, setIsUpdated] = useState(false);
    const [dadosApi, setDadosApi] = useState();
    const [dadosFiltrados, setDadosFiltrados] = useState([]);

    const fetchAllData = async () => {
        try{
            const response = await fetchWithAuth(API_URL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const procurar = useCallback((campoPesquisa1, campoPesquisa2, filtro1, filtro2, listaTotal) => {
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
        setfuncionariosPesquisa(listaTemporaria);
        resetarCampos();
        campoPesquisa1.value = "";
        campoPesquisa2.value = "";
    }, []);

    useEffect(() => async () => {
        const data = await fetchAllData();
        setDadosApi(data);
    }, []);

    useEffect(() => { // Roda quando uma linha é deletada ou alterada
        const fetchData = async () => {
            if (isUpdated) {
            const data = await fetchAllData();
            procurar(document.getElementById("campoNomeFuncionario"),document.getElementById("campoFuncao"), "nome_do_professor_funcionario", "ocupacao", data);
            setDadosApi(data);
            setIsUpdated(false)
          }
        };

        fetchData();
      }, [isUpdated, procurar]);

    /*useEffect(() => { // Roda quando uma linha é deletada ou alterada
        if(isUpdated == true){
          (async () => {
            const data = await fetchAllData();
            procurar(document.getElementById("campoNomeFuncionario"),document.getElementById("campoFuncao"), "nome_do_professor_funcionario", "ocupacao", data);
            setDadosApi(data);
            setIsUpdated(false)
          })();
        }
      }, [isUpdated]); */
    
    function comparar(elemento, filtro, valor){
        return elemento[filtro].toLowerCase().includes(valor);
    }

    function resetarCampos(){ // Resta os campos
        document.getElementById("inputNome").placeholder = "Digite o nome do aluno";
        document.getElementById("inputOcupacao").placeholder = "Digite a ocupação";
        document.getElementById("inputTelefone").placeholder = "Digite o telefone";
        document.getElementById("inputEmail").placeholder = "Digite o email";

        document.getElementById("inputNome").value = "";
        document.getElementById("inputOcupacao").value = "";
        document.getElementById("inputTelefone").value = "";
        document.getElementById("inputEmail").value = "";
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
                    <BtnAlterar nome="Alterar Livro" estado={false} idBotao="btnLivro"/>
                    <BtnAlterar nome="Alterar Aluno" estado={false} idBotao="btnAluno" />
                    <BtnAlterar nome="Alterar Funcionario" estado={true} idBotao="btnFuncionario"/>
                </div>
                <div className={styles.alterarDiv} id="mainFuncionario">
                    <div className={styles.pesquisar}>
                        <CampoPesquisar idInput="campoNomeFuncionario" campoNome="Nome" ph="Digite o nome do funcionário"/>
                        <CampoPesquisar idInput="campoFuncao" campoNome="Função" ph="Digite a função do funcionário"/>
                        <button className={styles.btnProcurar} onClick={() => procurar(document.getElementById("campoNomeFuncionario"),document.getElementById("campoFuncao"), "nome_do_professor_funcionario", "ocupacao", dadosApi)}>Procurar Funcionario</button>
                    </div>
                    <AlterarFuncionarioContext.Provider value={{isUpdated, setIsUpdated}}>
                        <TabelaAlterar dados={funcionariosPesquisa} tipo="professor_funcionario"/>
                    </AlterarFuncionarioContext.Provider>
                    <div className={styles.divRegistroSelecionado}>Registro selecionado: <span id="codigoSelecionado"></span></div>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputNome" nome="Nome" ph="Digite o nome"/>
                        <CampoDados idInput="inputOcupacao" nome="Ocupação" ph="Digite a ocupação"/>
                        <CampoDados idInput="inputTelefone" nome="Telefone" ph="Digite o telefone"/>
                        <CampoDados idInput="inputEmail" nome="Email" ph="Digite o email"/>
                    </div>
                    <AlterarFuncionarioContext.Provider value={{isUpdated, setIsUpdated}}>
                        <BtnEfetuarAlteracao tipo="professor_funcionario"/>
                    </AlterarFuncionarioContext.Provider>
                </div>
            </div>
        </>
    )
}
