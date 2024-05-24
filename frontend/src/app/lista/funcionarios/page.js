'use client'
import { useAuth } from '@/utils/useAuth';
import styles from './funcionarios.module.css'
import TabelaConsulta from '@/components/tabelaLista'


export default function listaFuncionarios() {
    const { authData } = useAuth();
    if (!authData) {
        return <p>Carregando...</p>;
    }
    
    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Funcionários</h2>
            <TabelaConsulta tipoUsuario="funcionário" />
        </section>
    )
}