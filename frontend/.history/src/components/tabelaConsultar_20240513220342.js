'use client'
import Image from "next/image";
import styles from "./tabelaConsultar.module.css";


export default function TabelaConsultar(props) {
    function renderLines(dados, codigo, titulo, autor, genero, nicho, disponiveis){
        if(dados == null){
            let linhasVazias = [];
            for(let i = 0; i < 3; i++){
                linhasVazias.push(<tr key={i} className={styles.linha}>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado + " " + styles.terceira}>‎</td>
                                  </tr>)
            }
            return(linhasVazias);
        }
        else{
            let linhasComDados = [];
            linhasComDados = dados.map((dado, index) => (
                <tr key={dado[campo1]} className={styles.linha}>
                    <td id={campo1} className={styles.dado}>
                        {dado["codigo"]} 
                    </td>
                    <td id={campo2} className={styles.dado}>
                        {dado["titulo"]}</td>
                    <td id={campo3} className={styles.dado}>
                        {dado["autor"]} 
                    </td>
                    <td id={campo3} className={styles.dado}>
                        {dado["genero"]} 
                    </td>
                    <td id={campo3} className={styles.dado}>
                        {dado["nicho"]}
                    </td>      
                    <td id={campo3} className={styles.dado}>
                        {dado["disponiveis"]} 
                    </td>
                </tr>
            ))
            return(linhasComDados);
        }
    }
    return (
            <div className={styles.mainDiv}>
                <table className={styles.tabela}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.dadoHeader + " " + styles.primeira}>Código</th>
                            <th className={styles.dadoHeader}>Título</th>
                            <th className={styles.dadoHeader}>Autor</th>
                            <th className={styles.dadoHeader}>Gênero</th>
                            <th className={styles.dadoHeader}>Nicho</th>
                            <th className={styles.dadoHeader + " " + styles.terceira}>Disponíveis</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLines(props.dados)}
                    </tbody>
                </table>
            </div>
    );
    
}