'use client'
import styles from './alunos.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function listaAlunos() {
    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Alunos</h2>
        </section>
    )
}