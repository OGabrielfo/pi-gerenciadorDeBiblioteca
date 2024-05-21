'use client'
import styles from './emprestimos.module.css'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

//TODO Criar componente de erro ou sucesso
//TODO Criar função de cadastro de empréstimos de livros

export default function registrarEmprestimos() {
    const router = useRouter();
    const [formData, setFormData] = useState({ nome: "", livro: "" , quantidade:"", devolucao:""});

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Empréstimo</h2>
            <form onSubmit={onFinish}>
                <div className={styles.formItem}>
                    //TODO Criar função de tipo de usuário no mesmo modelo do cadastro usuários
                    <label htmlFor="nome">Nome</label>
                    <select
                        required
                        name="nome"
                        placeholder="Nome Completo"
                        value={formData.nome}
                        onChange={(event) =>
                        setFormData({ ...formData, nome: event.target.value })}
                    >
                        <option value="" disabled hidden>Selecione o Usuário</option>
                        <optgroup label="Alunos">
                            {nichos.map((nicho) => (
                                <option key={nicho.id_nicho} value={nicho.id_nicho}>Nicho {nicho.numero_nicho}</option> //Função que preenche a tag select com as opções
                            ))} // TODO arrumar a função para os alunos
                        </optgroup>
                        <optgroup label="Funcionários">
                            {nichos.map((nicho) => (
                                <option key={nicho.id_nicho} value={nicho.id_nicho}>Nicho {nicho.numero_nicho}</option> //Função que preenche a tag select com as opções
                            ))} // TODO arrumar a função para os funcionários
                        </optgroup>
                    </select>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="livro">Livro</label>
                    <input
                        required
                        placeholder="Título do Livro"
                        name="livro"
                        value={formData.livro}
                        onChange={(event) =>
                        setFormData({ ...formData, livro: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="quantidade">Quantidade</label>
                    <input
                        required
                        placeholder="1"
                        type="number"
                        name="Quantidade"
                        value={formData.price}
                        onChange={(event) =>
                        setFormData({ ...formData, quantidade: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="devolucao">Data de Devolução</label>
                    <input
                        required
                        type="date"
                        name="devolucao"
                        value={formData.devolucao}
                        onChange={(event) =>
                        setFormData({ ...formData, devolucao: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <button disabled={isLoading} className={styles.button} type="submit">
                        Registrar
                    </button>
                </div>
            </form>
        </section>
    )
}