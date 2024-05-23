'use client'
import styles from './funcionarios.module.css'
import TabelaConsulta from '@/components/tabelaLista'


export default function listaFuncionarios() {
    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Funcionários</h2>
            <TabelaConsulta tipoUsuario="funcionário" />
        </section>
    )
}