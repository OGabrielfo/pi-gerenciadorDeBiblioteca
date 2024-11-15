'use client'

import styles from "./btnAlterar.module.css";
import React, {useState} from "react";
import Link from "next/link";


export default function BtnAlterar(props){
    let color;
    let onde;
    if (props.estado == true){
        color = "hsl(180, 26%, 40%)";
    }
    else {
        color = "hsl(180, 26%, 20%)";
    }

    if(props.nome == "Alterar Livro"){
        onde = "/alterar";
    }
    else if (props.nome == "Alterar Aluno"){
        onde = "/alterar/aluno";
    }
    else{
        onde = "/alterar/funcionario";
    }
    
    return(
        <Link href={onde}>
            <button className={styles.botao} style={{"--color": color}} id={props.idBotao}>
                {props.nome}
            </button>
        </Link>
    )
}