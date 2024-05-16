'use client'
import styles from './alunos.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function listaAlunos() {
    fetch('http://localhost:8000/api/test').then(response => response.json()).then(data => console.log(data));

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Alunos</h2>
        </section>
    )
}