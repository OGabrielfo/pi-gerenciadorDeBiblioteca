'use client'
import styles from './usuarios.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import axios from 'axios'

let $, mask

var API_URL = ''

const registrarUsuarios = () => {
    const router = useRouter();
    
    // useStates dos campos necessários
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [sala, setSala] = useState('')
    const [ocupacao, setOcupacao] = useState('')

    const [visTel, setVisTel] = useState('') // useState para controle de alterações do formulário

    // useState de controle de formulário
    const [ tipoComp, setTipoComp ] = useState(false)

    // Reset das informações do formulário
    const limparFormulario = () => {
        setNome('')
        setTelefone('')
        setEmail('')
        setSala('')
        setOcupacao('')
        setVisTel('')
    }
    
    // Função que será chamada ao clicar no botão de envio
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Função de envio dos dados para o backend
        if(tipoComp) { // Ativa form funcionário para envio
            API_URL = 'http://127.0.0.1:8000/api/professor_funcionario/'
            
            var dados = {
                nome_do_professor_funcionario: nome,
                ocupacao: ocupacao,
                telefone: telefone,
                email: email,
            }
        } else { // Ativa form aluno para envio
            API_URL = 'http://127.0.0.1:8000/api/aluno/'
            
            var dados = {
                nome_do_aluno: nome,
                sala: sala,
                telefone: telefone,
                email: email,
            }
        }

        // Tentativa de envio para o backend
        try {
            const response = await axios.post(API_URL, dados)
            console.log(response.data)
            limparFormulario()
            router.push('/registrar/usuarios') // redireciona o usuário após o cadastro com sucesso
        } catch (error) {
            console.error(error)
        }
    };

    // Alteração de componentes de acordo com o tipo de usuário
    
    useEffect(() => {        
        if (typeof window !== 'undefined') {
            const turmaComp = document.getElementById("turma")
            const turmaInput = document.getElementById("turmaInput")
            const ocupacaoComp = document.getElementById("ocupacao")
            const ocupacaoInput = document.getElementById("ocupacaoInput")
            ocupacaoComp.setAttribute("hidden", true)
            turmaComp.setAttribute("hidden", true)

            if(tipoComp){ // Ativa preenchimento de funcionário
                turmaComp.setAttribute("hidden", true)
                turmaInput.removeAttribute("required")
                ocupacaoComp.removeAttribute("hidden")
                ocupacaoInput.setAttribute("required", true)
            } else { // Ativa preenchimento de aluno
                turmaComp.removeAttribute("hidden")
                turmaInput.setAttribute("required", true)
                ocupacaoComp.setAttribute("hidden", true)
                ocupacaoInput.removeAttribute("required")
            }
        }
    }, [tipoComp])
        
    // Máscara do input Telefone
    if (typeof window !== 'undefined') {
        $ = require('jquery');
        mask = require('jquery-mask-plugin');
        useEffect(() => {
            if ($) {
                $('#tel').mask('(00) 00000-0000')
            }
        }, []);
    }
    

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Usuários</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        required
                        name="nome"
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
                            name="sala"
                            placeholder="3º A"
                            id="turmaInput"
                            value={ sala }
                            onChange={(e) => setSala(e.target.value)
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
                            value={ ocupacao }
                            onChange={(e) => setOcupacao(e.target.value)}
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