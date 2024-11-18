'use client'

import styles from "./btnReservar.module.css";
import React, {useState} from "react";
import Link from "next/link";


export default function BtnReservar(props){
    let color;
    let onde;
    if (props.estado == true){
        color = "hsl(180, 26%, 40%)";
    }
    else {
        color = "hsl(180, 26%, 20%)";
    }

    if(props.nome == "Reservar Aluno"){
        onde = "/reservar";
    }
    else{
        onde = "/reservar/funcionario";
    }
    
    return(
        <Link href={onde}>
            <button className={styles.botao} style={{"--color": color}} id={props.idBotao}>
                {props.nome}
            </button>
        </Link>
    )
}