'use client'
import styles from '../../alterar/alterar.module.css'
import Header from '@/components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'
import TabelaAlterar from '@/components/tabelaAlterar'
import React,{useState} from 'react';


export default function alterar() {
    
    let usuarios = [
        { "codigo": 1, "nome": "Ana Souza Oliveira", "funcao": "Diretora" },
        { "codigo": 2, "nome": "Beatriz Santos Ferreira", "funcao": "Coordenadora Pedagógica" },
        { "codigo": 3, "nome": "Carlos Pereira Mendes", "funcao": "Professor de História" },
        { "codigo": 4, "nome": "Daniela Silva Costa", "funcao": "Professora de Português" },
        { "codigo": 5, "nome": "Eduardo Martins Rodrigues", "funcao": "Professor de Educação Física" },
        { "codigo": 6, "nome": "Felipe Gomes Silva", "funcao": "Professor de Ciências" },
        { "codigo": 7, "nome": "Gabriela Souza Oliveira", "funcao": "Psicóloga Escolar" },
        { "codigo": 8, "nome": "Henrique Pereira Mendes", "funcao": "Bibliotecário" },
        { "codigo": 9, "nome": "Isabella Santos Ferreira", "funcao": "Secretária Escolar" },
        { "codigo": 10, "nome": "João Silva Costa", "funcao": "Assistente de Diretoria" },
        { "codigo": 11, "nome": "Kevin Martins Rodrigues", "funcao": "Monitor" },
        { "codigo": 12, "nome": "Laura Gomes Silva", "funcao": "Zelador" },
        { "codigo": 13, "nome": "Mateus Souza Oliveira", "funcao": "Cozinheiro" },
        { "codigo": 14, "nome": "Nicole Pereira Mendes", "funcao": "Limpador" },
        { "codigo": 15, "nome": "Olivia Santos Ferreira", "funcao": "Professor de Matemática" },
        { "codigo": 16, "nome": "Pedro Silva Costa", "funcao": "Professor de Inglês" },
        { "codigo": 17, "nome": "Rafaela Martins Rodrigues", "funcao": "Professora de Artes" },
        { "codigo": 18, "nome": "Sophia Gomes Silva", "funcao": "Professora de Música" },
        { "codigo": 19, "nome": "Thomas Souza Oliveira", "funcao": "Professor de Geografia" },
        { "codigo": 20, "nome": "Valentina Pereira Mendes", "funcao": "Professora de Filosofia" }
    ]
    
    const [funcionariosPesquisa, setfuncionariosPesquisa] = useState();
    
    function comparar(elemento, filtro, valor){
        return elemento[filtro].toLowerCase().includes(valor);
    }

    const handleClickProcurar = (campoPesquisa1, campoPesquisa2, filtro1, filtro2, listaTotal) => {
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
        campoPesquisa1.value = "";
        campoPesquisa2.value = "";
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
                        <button className={styles.btnProcurar} onClick={() => handleClickProcurar(document.getElementById("campoNomeFuncionario"),document.getElementById("campoFuncao"), "nome", "funcao", usuarios)}>Procurar Funcionario</button>
                    </div>
                    <TabelaAlterar dados={funcionariosPesquisa} tipo="funcionario"/>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputNomeFuncionario" nome="Nome" ph="Digite o nome do funcionário"/>
                        <CampoDados idInput="inputFuncao" nome="Função" ph="Digite a função do funcionário"/>
                        <CampoDados idInput="inputTelefone" nome="Telefone" ph="Digite o telefone do funcionário"/>
                    </div>
                    <BtnEfetuarAlteracao tipo="funcionario"/>
                </div>
            </div>
        </>
    )
}
