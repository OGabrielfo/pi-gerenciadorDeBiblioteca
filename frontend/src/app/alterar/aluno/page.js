'use client'
import styles from './aluno.module.css'
import Header from '@/components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'
import TabelaAlterar from '@/components/tabelaAlterar'
import React, {useState} from 'react';


export default function alterar() {
    let usuarios = [
        { "codigo": 1, "nome": "Ana Souza Oliveira", "sala": "8a" },
        { "codigo": 2, "nome": "Beatriz Santos Ferreira", "sala": "7b" },
        { "codigo": 3, "nome": "Carlos Pereira Mendes", "sala": "6c" },
        { "codigo": 4, "nome": "Daniela Silva Costa", "sala": "5d" },
        { "codigo": 5, "nome": "Eduardo Martins Rodrigues", "sala": "4e" },
        { "codigo": 6, "nome": "Felipe Gomes Silva", "sala": "3f" },
        { "codigo": 7, "nome": "Gabriela Souza Oliveira", "sala": "2g" },
        { "codigo": 8, "nome": "Henrique Pereira Mendes", "sala": "1h" },
        { "codigo": 9, "nome": "Isabella Santos Ferreira", "sala": "8a" },
        { "codigo": 10, "nome": "João Silva Costa", "sala": "7b" },
        { "codigo": 11, "nome": "Kevin Martins Rodrigues", "sala": "6c" },
        { "codigo": 12, "nome": "Laura Gomes Silva", "sala": "5d" },
        { "codigo": 13, "nome": "Mateus Souza Oliveira", "sala": "4e" },
        { "codigo": 14, "nome": "Nicole Pereira Mendes", "sala": "3f" },
        { "codigo": 15, "nome": "Olivia Santos Ferreira", "sala": "2g" },
        { "codigo": 16, "nome": "Pedro Silva Costa", "sala": "1h" },
        { "codigo": 17, "nome": "Rafaela Martins Rodrigues", "sala": "8a" },
        { "codigo": 18, "nome": "Sophia Gomes Silva", "sala": "7b" },
        { "codigo": 19, "nome": "Thomas Souza Oliveira", "sala": "6c" },
        { "codigo": 20, "nome": "Valentina Pereira Mendes", "sala": "5d" }
    ];

    const [alunosPesquisa, setalunosPesquisa] = useState();
    
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
        setalunosPesquisa(listaTemporaria);
        campoPesquisa1.value = "";
        campoPesquisa2.value = "";
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
                <div className={styles.alterarAluno}>
                    <div className={styles.pesquisar}>
                        <CampoPesquisar idInput="campoNomeAluno" campoNome="Nome" ph="Digite o nome do aluno"/>
                        <CampoPesquisar idInput="campoSala" campoNome="Sala" ph="Digite a sala"/>
                        <button className={styles.btnProcurar} onClick={() => handleClickProcurar(document.getElementById("campoNomeAluno"),document.getElementById("campoSala"), "nome", "sala", usuarios)}>Procurar Aluno</button>
                    </div>
                    <TabelaAlterar dados={alunosPesquisa} tipo="aluno" id="mainAluno"/>
                    <div className={styles.divRegistroSelecionado}>Registro selecionado: <span id="codigoSelecionado"></span></div>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputNome" nome="Nome" ph="Digite o nome do aluno"/>
                        <CampoDados idInput="inputSala" nome="Sala" ph="Digite a sala"/>
                    </div>
                    <BtnEfetuarAlteracao tipo="aluno"/>
                </div>
            </div>
        </>
        
    )
}
