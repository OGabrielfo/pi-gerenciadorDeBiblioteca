'use client'
import styles from '../../alterar/alterar.module.css'
import Header from '@/components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'
import TabelaAlterar from '@/components/tabelaAlterar'
import React, {useState, createContext, useEffect} from 'react';

const API_URL = 'http://127.0.0.1:8000/api/professor_funcionario/'
export const AlterarFuncionarioContext = createContext();


export default function alterar() {
    
    const [funcionariosPesquisa, setfuncionariosPesquisa] = useState();
    const [isUpdated, setIsUpdated] = useState(false);
    const [dadosApi, setDadosApi] = useState();
    const [dadosFiltrados, setDadosFiltrados] = useState([]);

    const fetchAllData = async () => {
        try{
            const response = await fetch(API_URL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => async () => {
        const data = await fetchAllData();
        setDadosApi(data);
    }, []);

    useEffect(() => { // Roda quando uma linha é deletada ou alterada
        if(isUpdated == true){
          (async () => {
            const data = await fetchAllData();
            procurar(document.getElementById("campoNomeFuncionario"),document.getElementById("campoFuncao"), "nome_do_professor_funcionario", "ocupacao", data);
            setIsUpdated(false)
          })();
        }
      }, [isUpdated]); 
    
    function comparar(elemento, filtro, valor){
        return elemento[filtro].toLowerCase().includes(valor);
    }

    const procurar = (campoPesquisa1, campoPesquisa2, filtro1, filtro2, listaTotal) => {
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
