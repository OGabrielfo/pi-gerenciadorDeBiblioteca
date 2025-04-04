'use client'
import { fetchWithAuth } from '@/utils/authService';
import { useEffect, useState } from "react"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import styles from "./tabelaLista.module.css"
import router from 'next/router'

let $, mask

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_Emprestimo = apiUrl+'/emprestimo/'
const API_Alunos = apiUrl+'/aluno/'
const API_Professor = apiUrl+'/professor_funcionario/'

export default function TabelaConsultar(props) {
    // Função GET que retorna o que foi solicitado
    const [emprestimo, setEmprestimo] = useState([])
    const [alunos, setAlunos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    // Captura de dados dos empréstimos, alunos e funcionários
    useEffect(() => {
        async function fetchDados() {
            try {
                const respEmprestimos = await fetchWithAuth(API_Emprestimo)
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

    //Deletar Cadastros
    const deleteData = async (id) => { // Deleta uma linha de dados
        try{
            const url = `${API_Emprestimo}${id}/`
            const response = await fetchWithAuth (url, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });
            //setIsUpdated(true);
            window.alert("Os dados foram deletadas");
            setEmprestimo(emprestimo.filter(item => item.id_emprestimo !== id))
        } 
        catch (e) {
            window.alert("Nao foram deletados");
            console.log(e);
        }
    }

    // Renderização das linhas da tabela Alunos
    function renderAlunos() {
        return emprestimo.map((usuario) => (
            usuario.id_usuario_aluno != null ?
            <tr key={usuario.id_usuario_aluno} className={styles.linha}>
                <td id={ usuario.id_emprestimo } className={styles.dado}>
                    { usuario.id_emprestimo }
                </td>
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
                    <button onClick={() => deleteData(usuario.id_emprestimo)} className={styles.icones} ><FontAwesomeIcon icon={faTrashCan}/></button>
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
            <tr key={ usuario.id_emprestimo } className={styles.linha}>
                <td id={ usuario.id_emprestimo } className={styles.dado}>
                { usuario.id_emprestimo }
                </td>                
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
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteData(usuario.id_emprestimo)} className={styles.icones} />
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
                            <th className={styles.dadoHeader}>Código</th>
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
