import styles from "./btnEfetuarPesquisa.module.css"
export default function BtnEfetuarPesquisa(props) {
    return (
        <button className={styles.btnProcurar}>{props.nome}</button>
    );
}