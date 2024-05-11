'use client'
import styles from "./btnEfetuarAlteracao.module.css";

export default function BtnEfetuarAlteracao(props) {
    function handleClickLivro(registro){
        let index = 0;
        let codigo = document.getElementById("codigoSelecionado");
        let inputTitulo = document.getElementById("inputTitulo");
        let inputAutor = document.getElementById("inputAutor");
        let inputAnoPublicacao = document.getElementById("inputAnoPublicacao");
        let inputGenero = document.getElementById("inputGenero");
        let inputNicho = document.getElementById("inputNicho");
        let inputExemplaresTotais = document.getElementById("inputExemplaresTotais");
        let inputIsbn = document.getElementById("inputIsbn");

        let titulo = inputTitulo.value;
        let autor = inputAutor.value;
        let ano = inputAnoPublicacao.value;
        let genero = inputGenero.value;
        let nicho = inputNicho.value;
        let exemplares = inputExemplaresTotais.value;
        let isbn = inputIsbn.value;

        switch(""){
            case titulo:
                console.log("Titulo vazio");
                titulo = inputTitulo.placeholder;
                index++;
            case autor:
                console.log("autor vazio");
                autor = inputAutor.placeholder;
                index++;
            case ano:
                console.log("ano vazio");
                ano = inputAnoPublicacao.placeholder;
                index++;
            case genero:
                console.log("genero vazio");
                genero = inputGenero.placeholder;
                index++;
            case nicho:
                console.log("Titulo vazio");
                nicho = inputNicho.placeholder;
                index++;
            case exemplares:
                console.log("exemplares vazio");
                exemplares = inputExemplaresTotais.placeholder;
                index++;
            case isbn:
                console.log("isbn vazio");
                isbn = inputIsbn.placeholder;
                index++;
        }

        registro = {
            "codigo": codigo.textContent,
            "titulo": titulo,
            "autor": autor,
            "ano": ano,
            "genero": genero,
            "nicho": nicho,
            "exemplaresTotais": exemplares,
            "ISBN": isbn
        };

        inputTitulo.value = "";
        inputAutor.value = "";
        inputAnoPublicacao.value = "";
        inputGenero.value = "";
        inputNicho.value = "";
        inputExemplaresTotais.value = "";
        inputIsbn.value = "";

        if (index == 7){
            return {};
        }
        
        return registro;
    }

    function handleClickAluno(registro){
        let index = 0;
        let codigo = document.getElementById("codigoSelecionado");
        let inputNome = document.getElementById("inputNome");
        let inputSala = document.getElementById("inputSala");

        let nome = inputNome.value;
        let sala = inputSala.value;

        switch(""){
            case nome:
                console.log("nome vazio");
                nome = inputNome.placeholder;
                index++;
            case sala:
                console.log("sala vazio");
                sala = inputSala.placeholder;
                index++;
        }

        registro = {
            "codigo": codigo.textContent,
            "nome": nome,
            "sala": sala,
        };

        inputNome.value = "";
        inputSala.value = "";

        if (index == 2){
            return {};
        }
        
        return registro;
    }

    function handleClickAluno(registro){
        let index = 0;
        let codigo = document.getElementById("codigoSelecionado");
        let inputNome = document.getElementById("inputNome");
        let inputSala = document.getElementById("inputSala");

        let nome = inputNome.value;
        let sala = inputSala.value;

        switch(""){
            case nome:
                console.log("nome vazio");
                nome = inputNome.placeholder;
                index++;
            case sala:
                console.log("sala vazio");
                sala = inputSala.placeholder;
                index++;
        }

        registro = {
            "codigo": codigo.textContent,
            "nome": nome,
            "sala": sala,
        };

        inputNome.value = "";
        inputSala.value = "";

        if (index == 2){
            return {};
        }
        
        return registro;
    }

    function handleClick(tipo){
        if(document.getElementById("codigoSelecionado").textContent != ""){
            let registro = {};
            if(tipo == "livro"){
                registro = handleClickLivro(registro);
            }
            else if(tipo == "aluno"){
                registro = handleClickAluno(registro);
            }
            else {
                registro = handleClickFuncionario(registro);
            }
            console.log(registro);
        }
        console.log("Nada");
        }
    return (
        <button className={styles.btnEfetuarAlteracao} onClick={() => handleClick(props.tipo)}>Efetuar Alteração</button>
    );
}