import styles from './registrar.module.css'
import { redirect } from 'next/navigation'

export default function registrar() {
    redirect('/registrar/emprestimos', 'replace')
    return(
            <h2 className={styles.titulo}>Selecione uma das opções acima para prosseguir.</h2>
    )
}