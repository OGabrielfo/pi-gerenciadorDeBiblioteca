"use client"
import { event } from "jquery";
import styles from "./campoDados.module.css";
import React,{useState} from "react";

export default function CampoDados(props) {
    const onChangeValue = (event) => {
        if (props.nome == "Telefone"){
            const input = event.target;
            input.value = phoneMask(input.value)
        }
    }
    function phoneMask (phone) {
        const noMask = phone.replace(/\D/g, "");
        const { length } = noMask;
        if (length <= 11) {
            return noMask
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
        }
        return phone;
    }
    return (
        <div className={styles.divCampo}>
            <label htmlFor={props.idInput} className={styles.labelCampo}>{props.nome}</label>
            <br></br>
            <input type="text" id={props.idInput} placeholder={props.ph} className={styles.inputCampo} onChange={(event) => onChangeValue(event)}/>
        </div>
    );
}