import styles from './lista.module.css'
import { redirect } from 'next/navigation'

export default function Lista(){
    redirect('/lista/alunos', 'replace')
    return(
        <h2 className={styles.titulo}>Selecione uma das opções acima para prosseguir.</h2>
    )
}