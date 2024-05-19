'use client'
import styles from './livros.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import axios from 'axios'

var API_URL = 'http://127.0.0.1:8000/api/livro/'

function registrarLivros() {     
        const [nome, setNome] = useState('')
        const [autor, setAutor] = useState('')
        const [tipo, setTipo] = useState('')
        const [quantidade, setQuantidade] = useState('')
        const [nicho, setNicho] = useState('')
        const [observacao, setObservacao] = useState('')
        const router = useRouter()

        const handleSubmit = async (event) => { 
            event.preventDefault()

            const dados = {
                nome_do_livro: nome,
                autor: autor,
                tipo: tipo,
                quantidade_exemplar: quantidade,
                saldo_exemplar: quantidade,
                id_nicho: nicho,
                observacao_livro: observacao
            }

            try {
                const response = await axios.post (API_URL, dados)
                console.log(response.data)
                router.push('/registrar/livros')
            } catch (error) {
                console.error(error)
            }
        }

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Livros</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                    <label htmlFor="nome_livro">Título</label>
                    <input
                        required
                        placeholder="Título do Livro"
                        name="nome_livro"
                        value={ nome }
                        onChange={ (e) => setNome(e.target.value) }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="autor">Autor</label>
                    <input
                        required
                        name="autor"
                        placeholder="Nome do Autor(a)"
                        value={ autor }
                        onChange={(e) => setAutor(e.target.value)}
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="tipo">Tipo</label>
                    <input
                        required
                        name="tipo"
                        placeholder="Gênero do livro"
                        value={ tipo }
                        onChange={(e) => setTipo(e.target.value)}
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="quantidade_exemplar">Quantidade</label>
                    <input
                        required
                        placeholder="3"
                        type="number"
                        name="Quantidade"
                        value={ quantidade }
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="id_nicho">Nicho</label>
                    <input
                        required
                        placeholder="Identificador do Nicho"
                        type="number"
                        name="id_nicho"
                        value={ nicho }
                        onChange={(e) => setNicho(e.target.value)}
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="id_nicho">Observação</label>
                    <textarea
                        placeholder="Escreva aqui observações sobre o estado dos livros."
                        type="textarea"
                        rows="5"
                        name="observacao"
                        value={ observacao }
                        onChange={(e) => setObservacao(e.target.value)}
                    />
                </div>
                <div className={styles.formItem}>
                    <button className={styles.button} type="submit">
                        Registrar
                    </button>
                </div>
            </form>
        </section>
    )
}

export default registrarLivros;