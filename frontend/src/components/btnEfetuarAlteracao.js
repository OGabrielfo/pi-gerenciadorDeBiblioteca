'use client'
import styles from "./btnEfetuarAlteracao.module.css";
import React, {useState, useContext} from "react";
import {AlterarLivroContext} from '../app/alterar/page';
import {AlterarAlunoContext} from "@/app/alterar/aluno/page";
import {AlterarFuncionarioContext} from "@/app/alterar/funcionario/page";

export default function BtnEfetuarAlteracao(props) {
    //const {isUpdated, setIsUpdated} = useContext(AlterarLivroContext);
    const livroContext = useContext(AlterarLivroContext);
    const alunoContext = useContext(AlterarAlunoContext);
    const funcionarioContext = useContext(AlterarFuncionarioContext);

    let context;
    if (props.tipo == "livro"){
        context = livroContext;
    } else if (props.tipo == "aluno") {
        context = alunoContext;
    } else{
        context = funcionarioContext;
    }
    const {isUpdated, setIsUpdated} = context;
    
    function handleClickLivro(){
        let registro = {};
        let index = 0;
        let codigo = document.getElementById("codigoSelecionado");
        let inputTitulo = document.getElementById("inputTitulo");
        let inputAutor = document.getElementById("inputAutor");
        let inputGenero = document.getElementById("inputGenero");
        let inputNicho = document.getElementById("inputNicho");
        let inputExemplaresTotais = document.getElementById("inputExemplaresTotais");

        let titulo = inputTitulo.value;
        let autor = inputAutor.value;
        let genero = inputGenero.value;
        let nicho = inputNicho.value;
        let exemplares = inputExemplaresTotais.value;
        let saldoExemplares = inputExemplaresSaldo.value;

        if (titulo == ""){
            console.log("Titulo vazio");
            titulo = inputTitulo.placeholder;
            index++;
        }
        if (autor == ""){
            console.log("autor vazio");
            autor = inputAutor.placeholder;
            index++;
        }
        if (genero == ""){
            console.log("genero vazio");
            genero = inputGenero.placeholder;
            index++;
        }
        if (nicho == ""){
            console.log("Titulo vazio");
            nicho = inputNicho.placeholder;
            index++;
        }
        if (exemplares == ""){
            console.log("exemplares vazio");
            exemplares = inputExemplaresTotais.placeholder;
            index++;
        }
        if (saldoExemplares == ""){
            console.log("saldo exemplares vazio");
            saldoExemplares = inputExemplaresSaldo.placeholder;
            index++;
        }

        registro = {
            "id_livro": codigo.textContent,
            "nome_do_livro": titulo,
            "autor": autor,
            "tipo": genero,
            "quantidade_exemplar": exemplares,
            "saldo_exemplar": saldoExemplares,
            "id_nicho": nicho,
        };

        inputTitulo.value = "";
        inputAutor.value = "";
        inputGenero.value = "";
        inputNicho.value = "";
        inputExemplaresTotais.value = "";

        if (index == 6){
            return false;
        }
        return registro;
    }

    function handleClickAluno(){
        let registro = {};
        let index = 0;
        let codigo = document.getElementById("codigoSelecionado");
        let inputNome = document.getElementById("inputNome");
        let inputSala = document.getElementById("inputSala");
        let inputTelefone = document.getElementById("inputTelefone");
        let inputEmail = document.getElementById("inputEmail");

        let nome = inputNome.value;
        let sala = inputSala.value;
        let telefone = inputTelefone.value;
        let email = inputEmail.value;

        if(nome == ""){
            console.log("nome vazio");
            nome = inputNome.placeholder;
            index++;
        }
        if(sala == ""){
            console.log("sala vazio");
            sala = inputSala.placeholder;
            index++;
        }
        if(telefone == ""){
            console.log("telefone vazio");
            telefone = inputTelefone.placeholder;
            index++;
        }
        if(email == ""){
            console.log("email vazio");
            email = inputEmail.placeholder;
            index++;
        }

        registro = {
            "id_aluno": codigo.textContent,
            "nome_do_aluno": nome,
            "sala": sala,
            "telefone": telefone,
            "email": email,

        };

        inputNome.value = "";
        inputSala.value = "";
        inputTelefone.value = "";
        inputEmail.value = "";

        if (index == 4){
            return {};
        }
        return registro;
    }

    function handleClickFuncionario(){
        let registro = {};
        let index = 0;
        let codigo = document.getElementById("codigoSelecionado");
        let inputNome = document.getElementById("inputNome");
        let inputOcupacao = document.getElementById("inputOcupacao");
        let inputTelefone = document.getElementById("inputTelefone");
        let inputEmail = document.getElementById("inputEmail");

        let nome = inputNome.value;
        let ocupacao = inputOcupacao.value;
        let telefone = inputTelefone.value;
        let email = inputEmail.value;

        if(nome == ""){
            console.log("nome vazio");
            nome = inputNome.placeholder;
            index++;
        }
        if(ocupacao == ""){
            console.log("ocupação vazio");
            ocupacao = inputOcupacao.placeholder;
            index++;
        }
        if(telefone == ""){
            console.log("telefone vazio");
            telefone = inputTelefone.placeholder;
            index++;
        }
        if(email == ""){
            console.log("email vazio");
            email = inputEmail.placeholder;
            index++;
        }

        registro = {
            "id_professor_funcionario": codigo.textContent,
            "nome_do_professor_funcionario": nome,
            "ocupacao": ocupacao,
            "telefone": telefone,
            "email": email,

        };

        inputNome.value = "";
        inputOcupacao.value = "";
        inputTelefone.value = "";
        inputEmail.value = "";

        if (index == 4){
            return false;
        }
        
        return registro;
    }

    function resetarCampos(dado){ // Resta os campos quando o dado de um livro é alterado
        if(props.tipo == "livro"){
            document.getElementById("inputTitulo").placeholder = dado.nome_do_livro;
            document.getElementById("inputAutor").placeholder = dado.autor;
            document.getElementById("inputGenero").placeholder = dado.tipo;
            document.getElementById("inputNicho").placeholder = dado.id_nicho;
            document.getElementById("inputExemplaresTotais").placeholder = dado.quantidade_exemplar;
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
        else {
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

    const putData = async (url, data) =>{ // função utilizada para alterar uma linha
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json' 
            },
            body: JSON.stringify(data)
        })

        const resData = await response.json(); 
  
        return resData; 
    }

    function handleClick(tipo){
        let registro = {};
        
        if(tipo == "livro"){
            registro = handleClickLivro();
        }
        else if(tipo == "aluno"){
            registro = handleClickAluno();
        }
        else {
            registro = handleClickFuncionario();
        }

        if (registro != false){    
            const id = document.getElementById("codigoSelecionado").textContent;
            const url = `http://127.0.0.1:8000/api/${props.tipo}/${id}/`
            console.log(url);
            putData(url, registro).then(data => console.log(data)).catch(err => console.log(err));
            console.log(isUpdated);
            setIsUpdated(true);
            console.log(isUpdated);
            resetarCampos(registro);
            window.alert("Alteração efetuada com sucesso");
        }
        else{
            window.alert("Alteração nao foi efetuada");
        }
    }
    return (
        <button className={styles.btnEfetuarAlteracao} onClick={() => handleClick(props.tipo)}>Efetuar Alteração</button>
    );
}