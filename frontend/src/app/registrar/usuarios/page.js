'use client'
import styles from './usuarios.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import $ from 'jquery'
import 'jquery-mask-plugin'
import axios from 'axios'

//TODO Corrigir função de cadastro de usuários

var API_URL = ''

const registrarUsuarios = () => {
    const router = useRouter();
    // useStates dos campos necessários
    const [tipo, setTipo] = useState('')
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [turma, setTurma] = useState('')
    const [cargo, setCargo] = useState('')

    const [visTel, setVisTel] = useState('')

    //useState de controle de formulário
    const [ tipoComp, setTipoComp ] = useState(false)

    // Função que será chamada ao clicar no botão de envio
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Função de envio dos dados para o backend
        if(tipoComp) { // Ativa form funcionário para envio
            API_URL = 'http://127.0.0.1:8000/api/professor_funcionario/'
            
            var dados = {
                tipo_professor_funcionario: tipo,
                nome_do_professor_funcionario: nome,
                cpf: 12312312312,
                telefone: telefone,
                email: email,
                ativo: true
            }
        } else { // Ativa form aluno para envio
            API_URL = 'http://127.0.0.1:8000/api/aluno/'
            
            var dados = {
                tipo_aluno: tipo,
                nome_do_aluno: nome,
                ra: 12345,
                telefone: telefone,
                email: email,
                ativo: true
            }
        }

        // Tentativa de envio para o backend
        try {
            const response = await axios.post(API_URL, dados)
            console.log(response.data)
            router.push('/registrar/usuarios') // redireciona o usuário após o cadastro com sucesso
        } catch (error) {
            console.error(error)
        }
    };

    // Alteração de componentes de acordo com o tipo de usuário
    useEffect(() => {        
        const turmaComp = document.getElementById("turma")
        const turmaInput = document.getElementById("turmaInput")
        const ocupacaoComp = document.getElementById("ocupacao")
        const ocupacaoInput = document.getElementById("ocupacaoInput")
        ocupacaoComp.setAttribute("hidden", true)
        turmaComp.setAttribute("hidden", true)

        if(tipoComp){ // Ativa preenchimento de funcionário
            setTipo("Professor")
            turmaComp.setAttribute("hidden", true)
            turmaInput.removeAttribute("required")
            ocupacaoComp.removeAttribute("hidden")
            ocupacaoInput.setAttribute("required", true)
        } else { // Ativa preenchimento de aluno
            setTipo("aluno")
            turmaComp.removeAttribute("hidden")
            turmaInput.setAttribute("required", true)
            ocupacaoComp.setAttribute("hidden", true)
            ocupacaoInput.removeAttribute("required")
        }
        
    }, [tipoComp])
        
    // Máscara do input Telefone
    $('#tel').mask('(00) 00000-0000')
    

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Usuários</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                    <label htmlFor="nome_do_aluno">Nome</label>
                    <input
                        required
                        name="nome_do_aluno"
                        placeholder="Nome Completo"
                        value={ nome }
                        onChange={(e) => setNome(e.target.value)}
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
                            onChange={(e) => setTipoComp(e.target.checked)}
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
                            value={ turma }
                            onChange={(e) => setTurma(e.target.value)
                            }
                        />
                    </div>
                </div>
                <div id="ocupacao" hidden>
                    <div className={styles.formItem}>
                        <label htmlFor="ocupacao">Cargo</label>
                        <input
                            placeholder="Professor de História"
                            id="ocupacaoInput"
                            name="ocupacao"
                            value={ cargo }
                            onChange={(e) => setCargo(e.target.value)}
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
                        value={ visTel }
                        onChange={(e) => {setTelefone($('#tel').cleanVal()), setVisTel(e.target.value)}}
                    />
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        required
                        placeholder="seuemail@email.com"
                        type="email"
                        name="email"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)
                        }
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

export default registrarUsuarios;