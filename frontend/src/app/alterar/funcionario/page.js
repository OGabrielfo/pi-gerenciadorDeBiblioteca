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
        { "codigo": 1, "nome": "Ana Souza Oliveira", "funcao": "Diretora" , "telefone": "12993643534", "email": "usuario1@gmail.com"},
        { "codigo": 2, "nome": "Beatriz Santos Ferreira", "funcao": "Coordenadora Pedagógica" , "telefone": "12993643534", "email": "usuario4@gmail.com"},
        { "codigo": 3, "nome": "Carlos Pereira Mendes", "funcao": "Professor de História" , "telefone": "12993643534", "email": "usuario5@gmail.com"},
        { "codigo": 4, "nome": "Daniela Silva Costa", "funcao": "Professora de Português" , "telefone": "12993643534", "email": "usuario6@gmail.com"},
        { "codigo": 5, "nome": "Eduardo Martins Rodrigues", "funcao": "Professor de Educação Física" , "telefone": "12993643534", "email": "usuario7@gmail.com"},
        { "codigo": 6, "nome": "Felipe Gomes Silva", "funcao": "Professor de Ciências" , "telefone": "12993643534", "email": "usuario8@gmail.com"},
        { "codigo": 7, "nome": "Gabriela Souza Oliveira", "funcao": "Psicóloga Escolar" , "telefone": "12993643534", "email": "usuario9@gmail.com"},
        { "codigo": 8, "nome": "Henrique Pereira Mendes", "funcao": "Bibliotecário" , "telefone": "12993643534", "email": "usuario10@gmail.com"},
        { "codigo": 9, "nome": "Isabella Santos Ferreira", "funcao": "Secretária Escolar" , "telefone": "12993643534", "email": "usuario11@gmail.com"},
        { "codigo": 10, "nome": "João Silva Costa", "funcao": "Assistente de Diretoria" , "telefone": "12993643534", "email": "usuario12@gmail.com"},
        { "codigo": 11, "nome": "Kevin Martins Rodrigues", "funcao": "Monitor" , "telefone": "12993643534", "email": "usuario13@gmail.com"},
        { "codigo": 12, "nome": "Laura Gomes Silva", "funcao": "Zelador" , "telefone": "12993643534", "email": "usuario14@gmail.com"},
        { "codigo": 13, "nome": "Mateus Souza Oliveira", "funcao": "Cozinheiro" , "telefone": "12993643534", "email": "usuario15@gmail.com"},
        { "codigo": 14, "nome": "Nicole Pereira Mendes", "funcao": "Limpador" , "telefone": "12993643534", "email": "usuario16@gmail.com"},
        { "codigo": 15, "nome": "Olivia Santos Ferreira", "funcao": "Professor de Matemática" , "telefone": "12993643534", "email": "usuario15@gmail.com"},
        { "codigo": 16, "nome": "Pedro Silva Costa", "funcao": "Professor de Inglês" , "telefone": "12993643534", "email": "usuario16@gmail.com"},
        { "codigo": 17, "nome": "Rafaela Martins Rodrigues", "funcao": "Professora de Artes" , "telefone": "12993643534", "email": "usuario17@gmail.com"},
        { "codigo": 18, "nome": "Sophia Gomes Silva", "funcao": "Professora de Música" , "telefone": "12993643534", "email": "usuario18@gmail.com"},
        { "codigo": 19, "nome": "Thomas Souza Oliveira", "funcao": "Professor de Geografia" , "telefone": "12993643534", "email": "usuario19@gmail.com"},
        { "codigo": 20, "nome": "Valentina Pereira Mendes", "funcao": "Professora de Filosofia" , "telefone": "12993643534", "email": "usuario20@gmail.com"}
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
                    <div className={styles.divRegistroSelecionado}>Registro selecionado: <span id="codigoSelecionado"></span></div>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputNome" nome="Nome" ph="Digite o nome"/>
                        <CampoDados idInput="inputOcupacao" nome="Ocupação" ph="Digite a ocupação"/>
                        <CampoDados idInput="inputTelefone" nome="Telefone" ph="Digite o telefone"/>
                        <CampoDados idInput="inputEmail" nome="Telefone" ph="Digite o email"/>
                    </div>
                    <BtnEfetuarAlteracao tipo="funcionario"/>
                </div>
            </div>
        </>
    )
}
