'use client'
import Image from "next/image";
import styles from "./tabelaConsultar.module.css";
import React, {useContext, useState} from "react";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import {ReservarLivroContext} from "@/app/page";
import {ReservarLivroContextPrivado} from "@/app/consulta/page";
//export default function TabelaConsultar(props) {
export default function TabelaConsultar(props) {
    const livroPrivadoContext = useContext(ReservarLivroContextPrivado);
    const livroContext = useContext(ReservarLivroContext);

    let context;
    if(props.privado == true){
        context = livroPrivadoContext;
    }
    else{
        context = livroContext;
    }

    const {modalState, setModalState} = context;
    const {registro, setRegistro} = context;

    const handleReservar = (i) => {
        setModalState(true);
        setRegistro(props.dados[i]);
        console.log(registro);
    };
    function renderLines(dados){
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
                                    { props.publico ? <td id="reservar" className={styles.reserva}><FontAwesomeIcon className={styles.icones} icon={faCalendarCheck} /></td> : null}
                                  </tr>)
            }
            return(linhasVazias);
        }
        else{
            let linhasComDados = [];
            linhasComDados = dados.map((dado, index) => (
                <tr key={dado["id_livro"]} className={styles.linha}>
                    <td id="codigo" className={styles.dado}>
                        {dado["id_livro"]} 
                    </td>
                    <td id="titulo" className={styles.dado}>
                        {dado["nome_do_livro"]}
                    </td>
                    <td id="autor" className={styles.dado}>
                        {dado["autor"]} 
                    </td>
                    <td id="genero" className={styles.dado}>
                        {dado["tipo"]} 
                    </td>
                    <td id="nicho" className={styles.dado}>
                        {dado["id_nicho"]}
                    </td>      
                    <td id="disponiveis" className={styles.dado}>
                        {dado["quantidade_exemplar"]} 
                    </td>
                    { props.publico ? <td id="reservar" className={styles.reserva}><FontAwesomeIcon onClick={() => handleReservar(index)} className={styles.icones} icon={faCalendarCheck}/></td> : null} 
                    
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
                            { props.publico ? <th className={styles.dadoHeader + " " + styles.reserva}>Reservar</th> : null}
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLines(props.dados)}
                    </tbody>
                </table>
            </div>
    );
    
} //TODO Necessário ajustar o botão que realiza a função de reserva
