'use client'
import styles from './livros.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'


export default function RegistrarLivros() {
    const router = useRouter();
    const [formData, setFormData] = useState({ nome: "", autor: "" , tipo:"", quantidade:"", nicho:""});
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
            <h2 className={styles.formTitle}>Livros</h2>
            <form onSubmit={onFinish}>
                <div className={styles.formItem}>
                    <label htmlFor="nome">Título</label>
                    <input
                        required
                        placeholder="Título do Livro"
                        name="nome"
                        value={formData.nome}
                        onChange={(event) =>
                        setFormData({ ...formData, nome: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="autor">Autor</label>
                    <input
                        required
                        name="autor"
                        placeholder="Nome do Autor(a)"
                        value={formData.autor}
                        onChange={(event) =>
                        setFormData({ ...formData, autor: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="tipo">Tipo</label>
                    <input
                        required
                        name="tipo"
                        placeholder="Gênero do livro"
                        value={formData.price}
                        onChange={(event) =>
                        setFormData({ ...formData, tipo: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="quantidade">Quantidade</label>
                    <input
                        required
                        placeholder="3"
                        type="number"
                        name="Quantidade"
                        value={formData.price}
                        onChange={(event) =>
                        setFormData({ ...formData, quantidade: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="nicho">Nicho</label>
                    <input
                        required
                        placeholder="Identificador do Nicho"
                        type="number"
                        name="nicho"
                        value={formData.nicho}
                        onChange={(event) =>
                        setFormData({ ...formData, nicho: event.target.value })
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