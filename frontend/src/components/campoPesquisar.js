import styles from "./campoPesquisar.module.css"

export default function campoPesquisar(props) {
    return (
        <div className={styles.divCampo}>
            <label htmlFor={props.idInput} className={styles.labelCampo}>{props.campoNome}</label>
            <br></br>
            <input type="text" placeholder={props.ph} id={props.idInput} className={styles.inputCampo}/>
        </div>
    );
}

