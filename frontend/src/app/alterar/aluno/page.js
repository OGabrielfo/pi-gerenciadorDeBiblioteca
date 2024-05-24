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
import React, {useState, createContext, useEffect} from 'react';
import lista from '@/app/lista/page'

const API_URL = 'http://127.0.0.1:8000/api/aluno/'

export const AlterarAlunoContext = createContext();

export default function alterar() {
    const { authData } = useAuth();

    const [alunosPesquisa, setAlunosPesquisa] = useState();
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

    useEffect(() => async () => {
        const data = await fetchAllData();
        setDadosApi(data);
    }, []);

    useEffect(() => { // Roda quando uma linha é deletada ou alterada
        if(isUpdated == true){
          (async () => {
            const data = await fetchAllData();
            procurar(document.getElementById("campoNomeAluno"),document.getElementById("campoSala"), "nome_do_aluno", "sala", data);
            setDadosApi(data);
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
        setAlunosPesquisa(listaTemporaria);
        resetarCampos();
        campoPesquisa1.value = "";
        campoPesquisa2.value = "";
    }

    function resetarCampos(){ // Resta os campos
        document.getElementById("inputNome").placeholder = "Digite o nome do aluno";
        document.getElementById("inputSala").placeholder = "Digite a sala";
        document.getElementById("inputTelefone").placeholder = "Digite o telefone";
        document.getElementById("inputEmail").placeholder = "Digite o email";

        document.getElementById("inputNome").value = "";
        document.getElementById("inputSala").value = "";
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
                    <BtnAlterar nome="Alterar Livro" estado={false} idBotao="btnLivro" />
                    <BtnAlterar nome="Alterar Aluno" estado={true} idBotao="btnAluno" />
                    <BtnAlterar nome="Alterar Funcionario" estado={false} idBotao="btnFuncionario"/>
                </div>
                <div className={styles.alterarDiv}>
                    <div className={styles.pesquisar}>
                        <CampoPesquisar idInput="campoNomeAluno" campoNome="Nome" ph="Digite o nome do aluno"/>
                        <CampoPesquisar idInput="campoSala" campoNome="Sala" ph="Digite a sala"/>
                        <button className={styles.btnProcurar} onClick={() => procurar(document.getElementById("campoNomeAluno"),document.getElementById("campoSala"), "nome_do_aluno", "sala", dadosApi)}>Procurar Aluno</button>
                    </div>
                    <AlterarAlunoContext.Provider value={{isUpdated, setIsUpdated}}>
                        <TabelaAlterar dados={alunosPesquisa} tipo="aluno" id="mainAluno"/>
                    </AlterarAlunoContext.Provider>
                    <div className={styles.divRegistroSelecionado}>Registro selecionado: <span id="codigoSelecionado"></span></div>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputNome" nome="Nome" ph="Digite o nome do aluno"/>
                        <CampoDados idInput="inputSala" nome="Sala" ph="Digite a sala"/>
                        <CampoDados idInput="inputTelefone" nome="Telefone" ph="Digite o telefone"/>
                        <CampoDados idInput="inputEmail" nome="Email" ph="Digite o email"/>
                    </div>
                    <AlterarAlunoContext.Provider value={{isUpdated, setIsUpdated}}>
                        <BtnEfetuarAlteracao tipo="aluno"/>
                    </AlterarAlunoContext.Provider>
                </div>
            </div>
        </>
        
    )
}
