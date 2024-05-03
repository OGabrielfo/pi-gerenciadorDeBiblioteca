import styles from "./btnAlterar.module.css";

export default function btnAlterar(props){
    return(
        <button className={styles.botao}>
            {props.nome}
        </button>
    )
}