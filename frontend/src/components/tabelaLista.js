'use client'
import { fetchWithAuth } from '@/utils/authService';
import { useEffect, useState } from "react"
import styles from "./tabelaLista.module.css"

let $, mask

const API_URL = 'http://127.0.0.1:8000/api/emprestimo/'
const API_Alunos = 'http://127.0.0.1:8000/api/aluno/'
const API_Professor = 'http://127.0.0.1:8000/api/professor_funcionario/'

export default function TabelaConsultar(props) {
    // Função GET que retorna o que foi solicitado
    const [emprestimo, setEmprestimo] = useState([])
    const [alunos, setAlunos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    // Captura de dados dos empréstimos, alunos e funcionários
    useEffect(() => {
        async function fetchDados() {
            try {
                const respEmprestimos = await fetchWithAuth(API_URL)
                const respAlunos = await fetchWithAuth(API_Alunos)
                const respFuncionarios = await fetchWithAuth(API_Professor)
                const dataEmprestimos = await respEmprestimos.json()
                const dataAlunos = await respAlunos.json()
                const dataFuncionarios = await respFuncionarios.json()
                setEmprestimo(dataEmprestimos)
                setAlunos(dataAlunos)
                setFuncionarios(dataFuncionarios)
            } catch (error) {
                console.error('Erro: ', error)
            }
        }
        fetchDados()
    }, [])

    // Renderização das linhas da tabela Alunos
    function renderAlunos() {
        return emprestimo.map((usuario) => (
            usuario.id_usuario_aluno != null ?
            <tr key={usuario.id_usuario_aluno} className={styles.linha}>
                <td id="Nome" className={styles.dado}>
                    { alunos.map((aluno) => 
                        usuario.id_usuario_aluno === aluno.id_aluno ? aluno.nome_do_aluno : null
                    )}
                </td>
                <td id="Data" className={styles.dado}>
                    {usuario.data_devolucao} 
                </td>
                <td id="Situacao" className={styles.dado}>
                    {usuario.situacao_emprestimo}
                </td>
                <td id="Telefone" className={styles.dado}>
                    { alunos.map((aluno) => 
                        usuario.id_usuario_aluno === aluno.id_aluno ? aluno.telefone : null
                    )}
                </td>
                <td id="Deletar" className={styles.dado}>
                    Lixinho {/* TODO Adicionar função de deletar */}
                </td>
            </tr>
            :
            null
        ))
    }

    // Renderização das linhas da tabela Funcionários
    function renderFuncionarios() {
        return emprestimo.map((usuario) => (
            usuario.id_usuario_professor != null ?
            <tr key={usuario.id_usuario_professor} className={styles.linha}>
                <td id="Nome" className={styles.dado}>
                    { funcionarios.map((funcionario) => 
                        usuario.id_usuario_professor === funcionario.id_professor_funcionario ? funcionario.nome_do_professor_funcionario : null
                    )}
                </td>
                <td id="Data" className={styles.dado}>
                    {usuario.data_devolucao} 
                </td>
                <td id="Situacao" className={styles.dado}>
                    {usuario.situacao_emprestimo}
                </td>
                <td id="Telefone" className={styles.dado}>
                    { funcionarios.map((funcionario) => 
                        usuario.id_usuario_professor === funcionario.id_professor_funcionario ? funcionario.telefone : null
                    )}
                </td>
                <td id="Deletar" className={styles.dado}>
                    Lixinho {/* TODO Adicionar função de deletar */}
                </td>
            </tr> 
            :
            null
        ))
    }

    // Máscara jquery para o telefone
    if (typeof window !== 'undefined') {
        $ = require('jquery');
        mask = require('jquery-mask-plugin');
        $('#Telefone').mask('(00) 00000-0000')
    }
    
    return (
            <div className={styles.mainDiv}>
                <table className={styles.tabela}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.dadoHeader}>Nome</th>
                            <th className={styles.dadoHeader}>Data de devolução</th>
                            <th className={styles.dadoHeader}>Situação</th>
                            <th className={styles.dadoHeader}>Telefone</th>
                            <th className={styles.dadoHeader}>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.tipoUsuario === "aluno" ? renderAlunos() : renderFuncionarios() }
                    </tbody>
                </table>
            </div>
    );
}
