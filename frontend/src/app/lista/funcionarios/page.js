'use client'
import styles from './funcionarios.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function listaFuncionarios() {
    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Funcionários</h2>
        </section>
    )
}