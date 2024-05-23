'use client'
import styles from './alunos.module.css'
import TabelaConsulta from '@/components/tabelaLista'

export default function listaAlunos() {   
    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Alunos</h2>
            <TabelaConsulta tipoUsuario="aluno" />
        </section>
    )
}