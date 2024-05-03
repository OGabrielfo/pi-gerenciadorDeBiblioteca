'use client'
import Image from "next/image";
import TrashIMG from "/public/trash.png"
import styles from "./linhaTabelaUsuario.module.css"

export default function LinhaTabelaUsuario(props) {
    let color;

    if (props.index % 2 == 0){
        color = "#447474";
    }
    else{
        color = "#335757";
    }

    if(props.codigo == "Código") {
        return (
            <div className={styles.divLinha + " " + styles.firstLine} id={props.codigo} style={{'--color' : '#335757'}}>
                <div></div>
                <div className={styles.item + " " + styles.codigo}>{props.codigo}</div>
                <div className={styles.item + " " + styles.nome}>{props.nome}</div>
                <div className={styles.item + " " + styles.sala}>{props.sala}</div>
                <div className={styles.item}>{props.telefone}</div>
            </div>
        );
    }
    else if(props.codigo == "default") {
        if (props.index == 2){
            return (
                <div className={styles.divLinha + " " + styles.lastLine} id={props.codigo} style={{'--color' : color}}>
                    <div></div>
                    <div className={styles.item + " " + styles.codigo}>‎</div>
                    <div className={styles.item + " " + styles.nome}>‎</div>
                    <div className={styles.item + " " + styles.sala}>‎</div>
                    <div className={styles.item}></div>
                    <div></div>
                </div>
            );
        }
        return (
            <div className={styles.divLinha} id={props.codigo} style={{'--color' : color}}>
                <div></div>
                <div className={styles.item + " " + styles.codigo}>‎ </div>
                <div className={styles.item + " " + styles.nome}>‎ </div>
                <div className={styles.item + " " + styles.sala}>‎</div>
                <div className={styles.item}> </div>
                <div></div>
            </div>
        );
    }
    else if(props.index == (props.lenght - 1)) {
        return (
            <div className={styles.divLinha + " " + styles.lastLine} id={props.codigo} style={{'--color' : color}}>
                <input type="radio" name="livros" value={props.index}></input>
                <div className={styles.item + " " + styles.codigo}>{props.codigo}</div>
                <div className={styles.item + " " + styles.nome}>{props.nome}</div>
                <div className={styles.item + " " + styles.sala}>{props.sala}</div>
                <div className={styles.item}>{props.telefone}</div>
                <Image src={TrashIMG} alt="excluir" className={styles.trashIMG}></Image>
            </div>
        );
    }
    return (
        <div className={styles.divLinha} id={props.codigo} style={{'--color' : color}}>
            <input type="radio" name="usuarios" value={props.index}></input>
            <div className={styles.item + " " + styles.codigo}>{props.codigo}</div>
            <div className={styles.item + " " + styles.nome}>{props.nome}</div>
            <div className={styles.item + " " + styles.sala}>{props.sala}</div>
            <div className={styles.item}>{props.telefone}</div>
            <Image src={TrashIMG} alt="excluir" className={styles.trashIMG}></Image>
        </div>
    );
}