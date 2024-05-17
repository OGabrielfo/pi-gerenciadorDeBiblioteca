'use client'
import styles from "./btnEfetuarAlteracao.module.css";

export default function BtnEfetuarAlteracao(props) {
    function handleClickLivro(registro){
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

        switch(""){
            case titulo:
                console.log("Titulo vazio");
                titulo = inputTitulo.placeholder;
                index++;
            case autor:
                console.log("autor vazio");
                autor = inputAutor.placeholder;
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
        }

        registro = {
            "codigo": codigo.textContent,
            "titulo": titulo,
            "autor": autor,
            "genero": genero,
            "nicho": nicho,
            "exemplaresTotais": exemplares,
        };

        inputTitulo.value = "";
        inputAutor.value = "";
        inputGenero.value = "";
        inputNicho.value = "";
        inputExemplaresTotais.value = "";

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
        let inputTelefone = document.getElementById("inputNome");
        let inputEmail = document.getElementById("inputEmail");

        let nome = inputNome.value;
        let sala = inputSala.value;
        let telefone = inputTelefone.value;
        let email = inputEmail.value;

        switch(""){
            case nome:
                console.log("nome vazio");
                nome = inputNome.placeholder;
                index++;
            case sala:
                console.log("sala vazio");
                sala = inputSala.placeholder;
                index++;
            case telefone:
                console.log("telefone vazio");
                telefone = inputTelefone.placeholder;
                index++;
            case email:
                console.log("email vazio");
                email = inputEmail.placeholder;
                index++;

        }

        registro = {
            "codigo": codigo.textContent,
            "nome": nome,
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

    function handleClickFuncionario(registro){
        let index = 0;
        let codigo = document.getElementById("codigoSelecionado");
        let inputNome = document.getElementById("inputNome");
        let inputOcupacao = document.getElementById("inputOcupacao");
        let inputTelefone = document.getElementById("inputNome");
        let inputEmail = document.getElementById("inputEmail");

        let nome = inputNome.value;
        let ocupacao = inputOcupacao.value;
        let telefone = inputTelefone.value;
        let email = inputEmail.value;

        switch(""){
            case nome:
                console.log("nome vazio");
                nome = inputNome.placeholder;
                index++;
            case ocupacao:
                console.log("ocupação vazio");
                ocupacao = inputOcupacao.placeholder;
                index++;
            case telefone:
                console.log("telefone vazio");
                telefone = inputTelefone.placeholder;
                index++;
            case email:
                console.log("email vazio");
                email = inputEmail.placeholder;
                index++;

        }

        registro = {
            "codigo": codigo.textContent,
            "nome": nome,
            "ocupacao": ocupacao,
            "telefone": telefone,
            "email": email,

        };

        inputNome.value = "";
        inputOcupacao.value = "";
        inputTelefone.value = "";
        inputEmail.value = "";

        if (index == 4){
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