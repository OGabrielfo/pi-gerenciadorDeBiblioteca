'use client'

import styles from "./btnAlterar.module.css";
import React, {useState} from "react";
import Link from "next/link";


export default function btnAlterar(props){
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
/*
export default function btnAlterar(props){
    const [color, setColor] = useState()
    const [divVisivel, setDivVisivel] = useState(props.estado);
    const [alterado, setAlterado] = useState(false);
    const handleClickAlterar = () => {
        if(!divVisivel){
            setDivVisivel(true)
        }
    }


    useEffect(() => {
        if(divVisivel){
            if(!alterado){
                setColor("hsl(180, 26%, 40%)");
            }
        }else{
            setColor("hsl(180, 26%, 20%)");
        }
        if (color == "hsl(180, 26%, 20%)"){
            console.log("teste");
        }
    }, [divVisivel])
    return(
        <button className={styles.botao} onClick={handleClickAlterar} style={{"--color": color}}>
            {props.nome}
        </button>
    )
}
*/