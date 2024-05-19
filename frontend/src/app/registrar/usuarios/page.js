'use client'
import styles from './usuarios.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import $ from 'jquery'
import 'jquery-mask-plugin'

var API_URL = 'http://127.0.0.1:8000/api/aluno/'

async function createData(data) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Failed to create data");
    }
  
    return res.json();
  }

const registrarUsuarios = () => {
    const router = useRouter();
    const [formDataAluno, setFormDataAluno] = useState({ tipo_aluno: "aluno", nome_do_aluno: "", ra:"1234", telefone:"", email:"", ativo:"true"});
    const [formDataFuncionario, setFormDataFuncionario] = useState({ nome: "", tipoUsuario: "" , turma:"", ocupacao:"", telefone:"", email:""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const tipoUsuarioComp = document.getElementById("tipoUsuario")
    var form
    var setForm
    if(tipoUsuarioComp?.checked){ // Ativa form funcionário
        form = formDataFuncionario
        setForm = setFormDataFuncionario
        API_URL = 'http://127.0.0.1:8000/api/professor_funcionario/'
    } else { // Ativa form aluno
        form = formDataAluno
        setForm = setFormDataAluno
        API_URL = 'http://127.0.0.1:8000/api/aluno/'
    }

    // Função que será chamada ao clicar no botão de envio
    const onFinish = (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        createData(form) 
        .then(() => {
            // Redireciona para a página que indica o sucesso
            router.replace("/?action=registrar");
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
        
        // Máscara do input Telefone
        $(() => {
            $('#tel').mask('(00) 00000-0000');
          });

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Usuários</h2>
            <form onSubmit={onFinish}>
                <div className={styles.formItem}>
                    <label htmlFor="nome_do_aluno">Nome</label>
                    <input
                        required
                        name="nome_do_aluno"
                        placeholder="Nome Completo"
                        value={form.nome_do_aluno}
                        onChange={(event) =>
                        setForm({ ...form, nome_do_aluno: event.target.value })
                        }
                    />
                </div>
                <div  className={styles.checkboxWrapper14}>
                    <label htmlFor="tipoUsuario">Tipo de Usuário</label>
                    <div>
                        <input
                            className={styles.switch}
                            type="checkbox"
                            id="tipoUsuario"
                            name="tipoUsuario"
                            value={form.tipoUsuario}
                            onChange={tipoUsuarioSelec()}
                        />
                        <p className={styles.aluno}>Aluno</p>
                        <p className={styles.funcionario}>Funcionário</p>
                    </div>
                </div>
                <div id="turma">
                    <div className={styles.formItem}>
                        <label htmlFor="turma">Turma</label>
                        <input
                            required
                            name="turma"
                            placeholder="3º A"
                            id="turmaInput"
                            value={form.turma}
                            onChange={(event) =>
                            setForm({ ...form, turma: event.target.value })
                            }
                        />
                    </div>
                </div>
                <div id="ocupacao" hidden>
                    <div className={styles.formItem}>
                        <label htmlFor="ocupacao">Ocupação</label>
                        <input
                            placeholder="Professor de História"
                            id="ocupacaoInput"
                            name="ocupacao"
                            value={form.ocupacao}
                            onChange={(event) =>
                            setForm({ ...form, ocupacao: event.target.value })
                            }
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="telefone">Telefone</label>
                    <input
                        required
                        name="telefone"
                        id="tel"
                        placeholder= "(00) 00000-0000"
                        value={form.telefone}
                        onChange={(event) =>
                        setForm({ ...form, telefone: event.target.value })
                        }
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        required
                        placeholder="seuemail@email.com"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
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

export default registrarUsuarios;