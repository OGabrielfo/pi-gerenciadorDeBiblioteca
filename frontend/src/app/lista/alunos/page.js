'use client'
import styles from './alunos.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const API_URL = 'http://127.0.0.1:8000/api/livro/'

export default function listaAlunos() {   
    const [loading, setLoading] = useState('')

    const fetchAllData = async () => {
        try {
            setLoading(true)

            const response = await fetch (API_URL)
            const data = await response.json()

            console.log(response.status, data)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

        useEffect(() => {
            fetchAllData()
        }, [])

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Alunos</h2>
        </section>
    )
}