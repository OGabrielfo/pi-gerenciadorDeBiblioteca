import styles from "./campoDados.module.css";

export default function CampoDados(props) {
    return (
        <div className={styles.divCampo}>
            <label htmlFor={props.idInput} className={styles.labelCampo}>{props.nome}</label>
            <br></br>
            <input type="text" id={props.idInput} placeholder={props.ph} className={styles.inputCampo}/>
        </div>
    );
}