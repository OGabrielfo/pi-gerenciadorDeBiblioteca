'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from './emprestimos.module.css'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios'
import Modal from '@/components/modal'


const API_Alunos = 'http://localhost:8000/api/aluno/'
const API_Funcionarios = 'http://localhost:8000/api/professor_funcionario/'
const API_Livros = 'http://localhost:8000/api/livro/'
const API_Emprestimo = 'http://localhost:8000/api/emprestimo/'
const API_LivrosEmprestimo = 'http://localhost:8000/api/livro_emprestimo/'
const API_StatusEmprestimo = 'http://localhost:8000/api/status_emprestimo/'

export default function registrarEmprestimos() {
    const { authData } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [opSuccess, setSuccess] = useState(false)
    const [message, setMessage] = useState('');
    const router = useRouter();

    // Dados para cadastro do empréstimo
    const [idUsuario, setIdUsuario] = useState('')
    const [dataDevolucao, setDataDevolucao] = useState('')
    const [livros, setLivros] = useState([])
    const [situacao, setSituacao] = useState('')
    const [idSituacao, setIdSituacao] = useState('')
    
    // Controle de array dos livros para retorno visual correto
    const [livro, setLivro] = useState('')
    let livrosSelecionados = []

    // Dados para elementos select
    const [alunos, setAlunos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [acervoLivros, setAcervoLivros] = useState([])
    const [situacoes, setSituacoes] = useState([])

    // Controle de informações carregadas no formulário
    const [ tipoComp, setTipoComp ] = useState(false)

    // Reset das informações do formulário
    const limparFormulario = () => {
        setIdUsuario('')
        setDataDevolucao('')
        setLivros([])
        setSituacao('')
        setIdSituacao('')
        setLivro('')
        livrosSelecionados = []
    }


    // GET dos nomes e livros
    useEffect(() => {
        async function fetchDados() {
            try {
                const respLivros = await fetchWithAuth(API_Livros)
                const respAlunos = await fetchWithAuth(API_Alunos)
                const respFuncionarios = await fetchWithAuth(API_Funcionarios)
                const respStatusEmprestimo = await fetchWithAuth(API_StatusEmprestimo)
                const dataLivros = await respLivros.json()
                const dataAlunos = await respAlunos.json()
                const dataFuncionarios = await respFuncionarios.json()
                const dataStatusEmprestimo = await respStatusEmprestimo.json()
                setAcervoLivros(dataLivros)
                setAlunos(dataAlunos)
                setFuncionarios(dataFuncionarios)
                setSituacoes(dataStatusEmprestimo)
            } catch (error) {
                console.error('Erro: ', error)
            }
        }
        fetchDados()
    }, [])

    // Alteração de componentes de acordo com o tipo de usuário
        // Renderiza com os nomes de alunos
    function renderAlunos() {        
        return alunos.map((aluno) => 
            <option key={aluno.id_aluno} value={aluno.id_aluno}>{aluno.nome_do_aluno}</option>
        )
    }
        // Renderiza com os nomes de funcionários
    function renderFuncionarios() {        
        return funcionarios.map((funcionario) => 
            <option key={funcionario.id_professor_funcionario} value={funcionario.id_professor_funcionario}>{funcionario.nome_do_professor_funcionario}</option>
        )
    }

    // Função de cadastro de empréstimo
    const handleSubmit = async (event) => {
        event.preventDefault()
        let dados = {}
        if (tipoComp) {
            dados = {
                id_usuario_aluno: null,
                id_usuario_professor: idUsuario,
                data_devolucao: dataDevolucao,
                situacao_emprestimo: situacao,
            }
        } else {
            dados = {
                id_usuario_aluno: idUsuario,
                id_usuario_professor: null,
                data_devolucao: dataDevolucao,
                situacao_emprestimo: situacao,
            }
        }

        // Tentativa de envio para o backend de emprestimo de livros
        try {
            const responseEmprestimo = await fetchWithAuth(API_Emprestimo, {
                method: 'POST',
                data: dados, // Aqui você insere os dados que deseja enviar no corpo da requisição
                headers: {
                  'Content-Type': 'application/json', // Defina o tipo de conteúdo como JSON
                }
            });
            console.log(responseEmprestimo.data)

            const emprestimoData = await responseEmprestimo.json();
            const idEmprestimo = emprestimoData.id_emprestimo;

            for (let livro of livros) {
                let livroData = {
                    id_livro: livro,
                    id_emprestimo: idEmprestimo,
                    quantidade: 1,
                    id_status: idSituacao,
                }
                // Tentativa de envio para o backend
                try {
                    const responseLivro = await fetchWithAuth(API_LivrosEmprestimo, {
                        method: 'POST',
                        data: livroData, // Aqui você insere os dados que deseja enviar no corpo da requisição
                        headers: {
                          'Content-Type': 'application/json', // Defina o tipo de conteúdo como JSON
                        }
                    });
                    console.log(responseLivro.data)
                } catch (error) {
                    console.error(error)
                }
            }
            limparFormulario()
            router.push('/registrar/emprestimos/')
            setSuccess(true)
            setMessage('Cadastro realizado com sucesso!')
        } catch (error) {
            setSuccess(false)
            setMessage('Ocorreu um erro!')
            console.error(error)
        } finally {
            setIsOpen(true)
        }
    }

    // Função que seta os parâmetros de situação do empréstimo
    const handleSituacao = (event) => {
        const situacao = JSON.parse(event.target.value)
        setSituacao(situacao.status)
        setIdSituacao(situacao.id_status)
    };

    if (!authData) {
        return <p>Carregando...</p>;
      }

    return(
        <section className={styles.container}>
            <h2 className={styles.formTitle}>Empréstimo</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                    <div className={styles.checkboxWrapper14}>
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
                </div>
                <div id="nome">
                    <div className={styles.formItem}>
                        <label htmlFor="nome">Nome</label>
                        <select
                            required
                            name="nome"
                            id="nomeInput"
                            value={ idUsuario }
                            onChange={(e) => setIdUsuario(e.target.value)}
                        >
                            <option value="" disabled hidden>Selecione o nome</option>
                            {tipoComp ? renderFuncionarios() : renderAlunos()}
                        </select>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="livro">Livro</label>
                    <select
                        required
                        placeholder="Título do Livro"
                        name="livro"
                        value={ livro }
                        onChange={(e) => {setLivro(e.target.value), livrosSelecionados.push(...livros, e.target.value), setLivros(livrosSelecionados)}}
                    >
                        <option value="" disabled hidden>Selecione o livro</option>
                        {acervoLivros.map((livro) => 
                            <option key={livro.id_livro} value={livro.id_livro}>{livro.nome_do_livro}, disponível: {livro.saldo_exemplar}</option>
                        )}
                    </select>
                    <div className={styles.listaLivros}>
                        {livros.map((livroSelecionado) => acervoLivros.map((livro) => livro.id_livro == livroSelecionado ? <p key={livro.id_livro}>- {livro.nome_do_livro}</p> : ''))}
                    </div>
                </div>
                <div id="data">
                    <div className={styles.formItem}>
                        <label htmlFor="data">Data de devolução</label>
                        <input
                            required
                            name="data"
                            id="data"
                            type="date"
                            value={ dataDevolucao }
                            onChange={(e) => setDataDevolucao(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <label htmlFor="situacao">Situação do empréstimo</label>
                    <select
                        required
                        placeholder="Situação do empréstimo"
                        name={ situacao }
                        value={ idSituacao }
                        onChange={handleSituacao}
                    >
                        <option value="" disabled hidden>Selecione uma opção</option>
                        {situacoes.map((situacao) => 
                            <option key={situacao.id_status} value={JSON.stringify(situacao)}>{situacao.status}</option>
                        )}
                    </select>
                </div>
                <div className={styles.formItem}>
                    <button className={styles.button} type="submit">
                        Registrar
                    </button>
                </div>
            </form>
            <Modal isOpen={isOpen} message={message} onClose={() => setIsOpen(false)} status={opSuccess} />
        </section>
    )
}