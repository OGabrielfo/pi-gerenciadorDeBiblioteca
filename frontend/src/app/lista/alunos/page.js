'use client'
import styles from './alunos.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const API_URL = 'http://127.0.0.1:8000/api/livro/'
//TODO Finalizar página

export default function listaAlunos() {   
    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Alunos</h2>
        </section>
    )
}