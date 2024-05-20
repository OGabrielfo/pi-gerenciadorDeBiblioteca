'use client'
import styles from './emprestimos.module.css'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function RegistrarEmprestimos() {
    const router = useRouter();
    const [formData, setFormData] = useState({ nome: "", livro: "" , quantidade:"", devolucao:""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função que será chamada ao clicar no botão de envio
    const onFinish = (event) => {
        event.preventDefault();
        setIsLoading(true);
        createMenu(formData) //TODO arrumar função e testar sistema
            .then(() => {
            // Redireciona para a página que indica o sucesso
            router.replace("/?action=registro");
            })
            .catch(() => {
            setError("Ocorreu um erro");
            setIsLoading(false);
            });
        };
    
        // Limpa o effect para recarregar
        useEffect(() => {
        return () => setIsLoading(false);
        }, []);

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Empréstimo</h2>
            <form onSubmit={onFinish}>
                <div className={styles.formItem}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        required
                        name="nome"
                        placeholder="Nome Completo"
                        value={formData.nome}
                        onChange={(event) =>
                        setFormData({ ...formData, nome: event.target.value })
                        }
                    />
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
                {error && <p className="error-message">{error}</p>}
                <div className={styles.formItem}>
                    <button disabled={isLoading} className={styles.button} type="submit">
                        Registrar
                    </button>
                </div>
            </form>
        </section>
    )
}