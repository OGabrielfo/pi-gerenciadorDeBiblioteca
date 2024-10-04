'use client'
import Image from "next/image";
import TrashIMG from "/public/trash.png"
import styles from "./tabelaAlterar.module.css";
import { AlterarLivroContext } from "@/app/alterar/page";
import { AlterarAlunoContext } from "@/app/alterar/aluno/page";
import { AlterarFuncionarioContext } from "@/app/alterar/funcionario/page";
import { fetchWithAuth } from '@/utils/authService';
import React, {useContext, useState} from "react";

export default function TabelaAlterar(props) {

    if (props.tipo == "livro"){
        var {isUpdated, setIsUpdated} = useContext(AlterarLivroContext);
    } else if (props.tipo == "aluno") {
        var {isUpdated, setIsUpdated} = useContext(AlterarAlunoContext);
    } else{
        var {isUpdated, setIsUpdated} = useContext(AlterarFuncionarioContext);
    }

    const deleteData = async (id) => { // Deleta uma linha de dados
        try{
            const url = `http://127.0.0.1:8000/api/${props.tipo}/${id}/`
            const response = await fetchWithAuth (url, {
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

    const handleRadioClick = (event) => { // Altera os "campos de dados" de acordo com a linha que o radio button estava
        let dado = props.dados[event.target.id]
        if(props.tipo == "livro"){
            document.getElementById("inputTitulo").placeholder = dado.nome_do_livro;
            document.getElementById("inputAutor").placeholder = dado.autor;
            document.getElementById("inputGenero").placeholder = dado.tipo;
            document.getElementById("inputNicho").placeholder = dado.id_nicho;
            document.getElementById("inputExemplaresTotais").placeholder = dado.quantidade_exemplar;
            document.getElementById("inputExemplaresSaldo").placeholder = dado.quantidade_exemplar;
            document.getElementById("inputExemplaresSaldo").placeholder = dado.saldo_exemplar;
            document.getElementById("inputTitulo").value = "";
            document.getElementById("inputAutor").value = "";
            document.getElementById("inputGenero").value = "";
            document.getElementById("inputNicho").value = "";
            document.getElementById("inputExemplaresTotais").value = "";
            document.getElementById("inputExemplaresSaldo").value = "";
            document.getElementById("codigoSelecionado").textContent = dado.id_livro;
        }
        else if (props.tipo == "aluno"){
            document.getElementById("inputNome").placeholder = dado.nome_do_aluno;
            document.getElementById("inputSala").placeholder = dado.sala;
            document.getElementById("inputTelefone").placeholder = dado.telefone;
            document.getElementById("inputEmail").placeholder = dado.email;
            document.getElementById("codigoSelecionado").textContent = dado.id_aluno;

            document.getElementById("inputNome").value = "";
            document.getElementById("inputSala").value = "";
            document.getElementById("inputTelefone").value = "";
            document.getElementById("inputEmail").value = "";
        }
        else{
            document.getElementById("inputNome").placeholder = dado.nome_do_professor_funcionario;
            document.getElementById("inputOcupacao").placeholder = dado.ocupacao;
            document.getElementById("inputTelefone").placeholder = dado.telefone;
            document.getElementById("inputEmail").placeholder = dado.email;
            document.getElementById("codigoSelecionado").textContent = dado.id_professor_funcionario;

            document.getElementById("inputNome").value = "";
            document.getElementById("inputOcupacao").value = "";
            document.getElementById("inputTelefone").value = "";
            document.getElementById("inputEmail").value = "";
        }
    }   

    function renderLines(dados, tipo, campo1, campo2, campo3){ // Cria as linhas das tabelas
        if(dados == null || dados.length == 0){ // Cria x numero de linhas vazias (default da tabela)
            let linhasVazias = [];
            for(let i = 0; i < 3; i++){
                linhasVazias.push(<tr key={i} className={styles.linha}>
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
                        <input type="radio" name={tipo} id={index} className={styles.radio} onClick={handleRadioClick}/>
                        {dado[campo1]}
                    </td>
                    <td id={campo2} className={styles.dado}>
                        {dado[campo2]}</td>
                    <td id={campo3} className={styles.dado + " " + styles.terceira}>
                        {dado[campo3]}
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
                            <th className={styles.dadoHeader + " " + styles.primeira}>Código</th>
                            <th className={styles.dadoHeader}>Nome</th>
                            <th className={styles.dadoHeader + " " + styles.terceira}>Sala</th>
                            <th className={styles.colunaExcluir}>‎</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLines(props.dados, props.tipo, "id_aluno", "nome_do_aluno", "sala")}
                    </tbody>
                </table>
            </div>
        );
    }
    else if (props.tipo == "livro"){
        return (
            <div className={styles.mainDiv}>
                <table className={styles.tabela}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.dadoHeader + " " + styles.primeira}>Código</th>
                            <th className={styles.dadoHeader}>Título</th>
                            <th className={styles.dadoHeader + " " + styles.terceira}>Autor</th>
                            <th className={styles.colunaExcluir}>‎</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLines(props.dados, props.tipo, "id_livro", "nome_do_livro", "autor")}
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
                            <th className={styles.dadoHeader + " " + styles.primeira}>Código</th>
                            <th className={styles.dadoHeader}>Nome</th>
                            <th className={styles.dadoHeader + " " + styles.terceira}>Função</th>
                            <th className={styles.colunaExcluir}>‎</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLines(props.dados, props.tipo, "id_professor_funcionario", "nome_do_professor_funcionario", "ocupacao")}
                    </tbody>
                </table>
            </div>
        );
    }
    
}