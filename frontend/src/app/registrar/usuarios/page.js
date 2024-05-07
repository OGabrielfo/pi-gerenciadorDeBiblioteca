'use client'
import styles from './usuarios.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function registrarUsuarios() {
    const router = useRouter();
    const [formData, setFormData] = useState({ nome: "", tipoUsuario: "" , turma:"", ocupacao:"", telefone:"", email:""});
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


        // Alteração de visual com base no usuário escolhido
        function tipoUsuarioSelec(){
            const tipoUsuarioComp = document.getElementById("tipoUsuario")
            const turmaComp = document.getElementById("turma")
            const turmaInput = document.getElementById("turmaInput")
            const ocupacaoComp = document.getElementById("ocupacao")
            const ocupacaoInput = document.getElementById("ocupacaoInput")
            
            ocupacaoComp?.setAttribute("hidden", true)
            turmaComp?.setAttribute("hidden", true)

            if(tipoUsuarioComp?.checked){ // Ativa preenchimento de funcionário
                turmaComp?.setAttribute("hidden", true)
                turmaInput?.removeAttribute("required")
                ocupacaoComp?.removeAttribute("hidden")
                ocupacaoInput?.setAttribute("required", true)
            } else { // Ativa preenchimento de aluno
                turmaComp?.removeAttribute("hidden")
                turmaInput?.setAttribute("required", true)
                ocupacaoComp?.setAttribute("hidden", true)
                ocupacaoInput?.removeAttribute("required")
            }
        }

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Usuários</h2>
            <form onSubmit={onFinish}>
                <div className={styles.formItem}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        required
                        name="nome"
                        value={formData.nome}
                        onChange={(event) =>
                        setFormData({ ...formData, nome: event.target.value })
                        }
                    />
                </div>
                <div  className={styles.checkboxWrapper14}>
                    <label htmlFor="tipoUsuario">Tipo de Usuário</label>
                    <input
                        className={styles.switch}
                        type="checkbox"
                        id="tipoUsuario"
                        name="tipoUsuario"
                        value={formData.tipoUsuario}
                        onChange={(event) =>
                            setFormData({ ...formData, tipoUsuario: event.target.value })
                            }
                        onClick={ tipoUsuarioSelec() }
                    />
                    <p className={styles.aluno}>Aluno</p>
                    <p className={styles.funcionario}>Funcionário</p>
                </div>
                <div id="turma">
                    <div className={styles.formItem}>
                        <label htmlFor="turma">Turma</label>
                        <input
                            required
                            name="turma"
                            id="turmaInput"
                            value={formData.turma}
                            onChange={(event) =>
                            setFormData({ ...formData, turma: event.target.value })
                            }
                        />
                    </div>
                </div>
                <div id="ocupacao" hidden>
                    <div className={styles.formItem}>
                        <label htmlFor="ocupacao">Ocupação</label>
                        <input
                            
                            id="ocupacaoInput"
                            name="ocupacao"
                            value={formData.ocupacao}
                            onChange={(event) =>
                            setFormData({ ...formData, ocupacao: event.target.value })
                            }
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="telefone">Telefone</label> {/* Fazer Input Mask */}
                    <input
                        name="telefone"
                        value={formData.telefone}
                        onChange={(event) =>
                        setFormData({ ...formData, telefone: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
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