'use client'
import { useAuth } from '@/utils/useAuth';
import styles from './alunos.module.css'
import TabelaConsulta from '@/components/tabelaLista'

export default function listaAlunos() {   
    const { authData } = useAuth();
    if (!authData) {
        return <p>Carregando...</p>;
    }
    
    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Alunos</h2>
            <TabelaConsulta tipoUsuario="aluno" />
        </section>
    )
}