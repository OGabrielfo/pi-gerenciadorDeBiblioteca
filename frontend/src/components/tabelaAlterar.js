'use client'
import Image from "next/image";
import TrashIMG from "/public/trash.png"
import styles from "./tabelaAlterar.module.css";
export default function TabelaAlterar(props) {

    const handleRadioClick = (event) => {
        let dado = props.dados[event.target.id]
        if(props.tipo == "livro"){
            document.getElementById("inputTitulo").placeholder = dado.titulo;
            document.getElementById("inputAutor").placeholder = dado.autor;
            document.getElementById("inputGenero").placeholder = dado.genero;
            document.getElementById("inputNicho").placeholder = dado.nicho;
            document.getElementById("inputExemplaresTotais").placeholder = dado.exemplaresTotais;

            document.getElementById("inputTitulo").value = "";
            document.getElementById("inputAutor").value = "";
            document.getElementById("inputGenero").value = "";
            document.getElementById("inputNicho").value = "";
            document.getElementById("inputExemplaresTotais").value = "";
        }
        else if (props.tipo == "aluno"){
            document.getElementById("inputNome").placeholder = dado.nome;
            document.getElementById("inputSala").placeholder = dado.sala;
            document.getElementById("inputTelefone").placeholder = dado.telefone;
            document.getElementById("inputEmail").placeholder = dado.email;

            document.getElementById("inputNome").value = "";
            document.getElementById("inputSala").value = "";
            document.getElementById("inputTelefone").value = "";
            document.getElementById("inputEmail").value = "";
        }
        else{
            document.getElementById("inputNome").placeholder = dado.nome;
            document.getElementById("inputOcupacao").placeholder = dado.funcao;
            document.getElementById("inputTelefone").placeholder = dado.telefone;
            document.getElementById("inputEmail").placeholder = dado.email;

            document.getElementById("inputNome").value = "";
            document.getElementById("inputOcupacao").value = "";
            document.getElementById("inputTelefone").value = "";
            document.getElementById("inputEmail").value = "";
        }
        document.getElementById("codigoSelecionado").textContent = dado.codigo;
    }
    
    const handleRadioClickUsuario = (event) => {
        let dado = props.dados[event.target.id];
    }

    function renderLines(dados, tipo, campo1, campo2, campo3){
        if(dados == null || dados.length == 0){
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
        else{
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
                        <Image src={TrashIMG} alt="excluir" className={styles.trashIMG}></Image>
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
                        {renderLines(props.dados, props.tipo, "codigo", "nome", "sala")}
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
                        {renderLines(props.dados, props.tipo, "codigo", "titulo", "autor")}
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
                        {renderLines(props.dados, props.tipo, "codigo", "nome", "funcao")}
                    </tbody>
                </table>
            </div>
        );
    }
    
}