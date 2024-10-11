'use client'
import Image from "next/image";
import TrashIMG from "/public/trash.png"
import styles from "./tabelaReservar.module.css";
//import { AlterarAlunoContext } from "@/app/alterar/aluno/page";
//import { AlterarFuncionarioContext } from "@/app/alterar/funcionario/page";
import React, {useContext, useState} from "react";

export default function TabelaAlterar(props) {
    /*
    if (props.tipo == "aluno"){
        var {isUpdated, setIsUpdated} = useContext(AlterarAlunoContext);
    } else{
        var {isUpdated, setIsUpdated} = useContext(AlterarFuncionarioContext);
    }

    const deleteData = async (id) => { // Deleta uma linha de dados
        try{
            const url = `http://127.0.0.1:8000/api/${props.tipo}/${id}/`
            const response = await fetch (url, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });
            setIsUpdated(true);
            window.alert("Os dados foram deletadas");
        } 
        catch (e) {
            window.alert("Nao foram deletados");
            console.log(e);
        }
        
    }
    */

    function renderLinesAluno(dados, campo1, campo2, campo3, campo4, campo5, campo6, campo7){ // Cria as linhas das tabelas
        if(dados == null || dados.length == 0){ // Cria x numero de linhas vazias (default da tabela)
            let linhasVazias = [];
            for(let i = 0; i < 3; i++){
                linhasVazias.push(<tr key={i} className={styles.linha}>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado + " " + styles.terceira}>‎</td>
                                    <td className={styles.colunaExcluir}>‎</td>
                                  </tr>)
            }
            return(linhasVazias);
        }
        else{ // Cria as linhas com dados
            let linhasComDados = [];
            linhasComDados = dados.map((dado, index) => (
                <tr key={dado[campo1]} className={styles.linha}>
                    <td id={campo1} className={styles.dado + " " + styles.primeira}>
                        {dado[campo1]}
                    </td>
                    <td id={campo2} className={styles.dado}>
                        {dado[campo2]}</td>
                    <td id={campo3} className={styles.dado}>
                        {dado[campo3]}
                    </td>
                    <td id={campo4} className={styles.dado}>
                        {dado[campo4]}
                    </td>
                    <td id={campo5} className={styles.dado}>
                        {dado[campo5]}
                    </td>
                    <td id={campo6} className={styles.dado}>
                        {dado[campo6]}
                    </td>
                    <td id={campo7} className={styles.dado + " " + styles.terceira}>
                        {dado[campo7]}
                    </td>
                    <td className={styles.colunaExcluir}>
                        <Image src={TrashIMG} alt="excluir" className={styles.trashIMG} onClick={() => deleteData(dado[campo1])}></Image>
                    </td>
                    
                </tr>
            ))
            return(linhasComDados);
        }
    }

    function renderLinesFuncionario(dados, campo1, campo2, campo3, campo4, campo5, campo6){ // Cria as linhas das tabelas
        if(dados == null || dados.length == 0){ // Cria x numero de linhas vazias (default da tabela)
            let linhasVazias = [];
            for(let i = 0; i < 3; i++){
                linhasVazias.push(<tr key={i} className={styles.linha}>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado + " " + styles.terceira}>‎</td>
                                    <td className={styles.colunaExcluir}>‎</td>
                                  </tr>)
            }
            return(linhasVazias);
        }
        else{ // Cria as linhas com dados
            let linhasComDados = [];
            linhasComDados = dados.map((dado, index) => (
                <tr key={dado[campo1]} className={styles.linha}>
                    <td id={campo1} className={styles.dado + " " + styles.primeira}>
                        {dado[campo1]}
                    </td>
                    <td id={campo2} className={styles.dado}>
                        {dado[campo2]}</td>
                    <td id={campo3} className={styles.dado}>
                        {dado[campo3]}
                    </td>
                    <td id={campo4} className={styles.dado}>
                        {dado[campo4]}
                    </td>
                    <td id={campo4} className={styles.dado}>
                        {dado[campo4]}
                    </td>
                    <td id={campo5} className={styles.dado}>
                        {dado[campo5]}
                    </td>
                    <td id={campo6} className={styles.dado + " " + styles.terceira}>
                        {dado[campo6]}
                    </td>
                    <td className={styles.colunaExcluir}>
                        <Image src={TrashIMG} alt="excluir" className={styles.trashIMG} onClick={() => deleteData(dado[campo1])}></Image>
                    </td>
                </tr>
            ))
            return(linhasComDados);
        }
    }   
    if (props.tipo == "aluno"){
        return (
            <div className={styles.mainDiv}> 
                <table className={styles.tabela}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.dadoHeader + " " + styles.primeira}>Id</th>
                            <th className={styles.dadoHeader}>Nome do Aluno</th>
                            <th className={styles.dadoHeader + " " + styles.sala}>Sala</th>
                            <th className={styles.dadoHeader}>Email</th>
                            <th className={styles.dadoHeader + " " + styles.telefone}>Telefone</th>
                            <th className={styles.dadoHeader}>Livro</th>
                            <th className={styles.dadoHeader + " " + styles.terceira}>Autor</th>
                            <th className={styles.colunaExcluir}>‎</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLinesAluno(props.dados, "id", "nome_do_aluno", "sala", "email", "telefone", "livro", "autor")}
                    </tbody>
                </table>
            </div>
        );
    }
    else{
        return (
            <div className={styles.mainDiv}>
                <table className={styles.tabela}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.dadoHeader + " " + styles.primeira}>Id</th>
                            <th className={styles.dadoHeader}>Nome do funcionario</th>
                            <th className={styles.dadoHeader}>Telefone</th>
                            <th className={styles.dadoHeader}>Email</th>
                            <th className={styles.dadoHeader}>Livro</th>
                            <th className={styles.dadoHeader + " " + styles.terceira}>Autor</th>
                            <th className={styles.colunaExcluir}>‎</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLinesFuncionario(props.dados, "id", "nome_do_funcionario", "email","telefone", "livro", "autor")}
                    </tbody>
                </table>
            </div>
        );
    }
    
}