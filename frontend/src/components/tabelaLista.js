'use client'
import { fetchWithAuth } from '@/utils/authService';
import { useEffect, useState } from "react"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from "./tabelaLista.module.css"
import router from 'next/router'

let $, mask

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_Emprestimo = apiUrl+'/emprestimo/'
const API_LivroEmprestimo = apiUrl+'/livro_emprestimo/'
const API_StatusEmprestimo = apiUrl+'/status_emprestimo/'
const API_Alunos = apiUrl+'/aluno/'
const API_Professor = apiUrl+'/professor_funcionario/'

export default function TabelaConsultar(props) {
    // Função GET que retorna o que foi solicitado
    const [emprestimo, setEmprestimo] = useState([])
    const [livroEmprest, setLivroEmprest] = useState([])
    const [statusEmprestimo, setStatusEmprestimo] = useState([])
    const [alunos, setAlunos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    // Para retornar filtro corretamente
    const [filtrar, setFiltrar] = useState(false);

    // Captura de dados dos empréstimos, alunos e funcionários
    async function fetchDados() {
        try {
            const respEmprestimos = await fetchWithAuth(API_Emprestimo)
            const respLivroEmprest = await fetchWithAuth(API_LivroEmprestimo)
            const respStatusEmprestimo = await fetchWithAuth(API_StatusEmprestimo)
            const respAlunos = await fetchWithAuth(API_Alunos)
            const respFuncionarios = await fetchWithAuth(API_Professor)
            const dataEmprestimosCompleto = await respEmprestimos.json()
            const dataEmprestimos = filtrar ? dataEmprestimosCompleto.filter(item => item.situacao_emprestimo != "Concluido") : dataEmprestimosCompleto;
            const dataLivroEmprest = await respLivroEmprest.json()
            const dataStatusEmprestimo = await respStatusEmprestimo.json()
            const dataAlunos = await respAlunos.json()
            const dataFuncionarios = await respFuncionarios.json()
            setEmprestimo(dataEmprestimos)
            setLivroEmprest(dataLivroEmprest)
            setStatusEmprestimo(dataStatusEmprestimo)
            setAlunos(dataAlunos)
            setFuncionarios(dataFuncionarios)
            console.log(filtrar)
        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    useEffect(() => {
        fetchDados()
    }, [filtrar])

    const handleFiltroChange = (e) => {
        setFiltrar(e.target.checked);
        fetchDados();
    };
    
    //Alterar Cadastros
    const setConclude = async (id) => {
        const item = emprestimo.find( item => item.id_emprestimo === id)
        if(!item) {
            alert("Item não encontrado!")
            return
        }

        const updateData = {
            situacao_emprestimo: "Concluido",
        }

        const updateDataLivro = {
            id_status : "Concluido",
        }

        try{
            const url = `${API_Emprestimo}${id}/`;

            const response = await fetchWithAuth (url, {
                method: "PATCH",
                data: updateData,
                headers: {
                    'Content-type': 'application/json'
                },
            });

            //TODO fazer atualização do estado dos livros de cada empréstimo também

            if (response.ok) {
                window.alert("O empréstimo foi concluído.");
                console.log(response)
                setEmprestimo(emprestimo.map(item =>
                    item.id_emprestimo === id ? { ...item, situacao_emprestimo: 'Concluido' } : item
                ));
                fetchDados()
            } else {
                window.alert("Erro ao concluir o empréstimo.");
            }    
        } 
        catch (e) {
            window.alert("Alteração não realizada, tente novamente");
            console.log(e);
        }
    }

    // Renderização das linhas da tabela Alunos
    function renderAlunos() {
        return emprestimo.map((usuario) => (
            usuario.id_usuario_aluno != null ?
            <tr key={`${usuario.id_usuario_aluno}-${usuario.id_emprestimo}`} className={styles.linha}>
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
                <td id="Concluir" className={styles.dado}>
                    <button onClick={() => setConclude(usuario.id_emprestimo)} className={styles.icones} ><FontAwesomeIcon icon={faCheck}/></button>
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
                <td id="Concluir" className={styles.dado}>
                    <button onClick={() => setConclude(usuario.id_emprestimo)} className={styles.icones} ><FontAwesomeIcon icon={faCheck}/></button>
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
                <div className={styles.checkboxWrapper14}>
                    <input 
                        className={styles.switch}
                        type="checkbox"
                        id="filtro"
                        name="filtro"
                        onChange={handleFiltroChange}
                    />
                    <p className={styles.tudo}><b>Mostrar:</b> Tudo</p>
                    <p className={styles.aberto}><b>Mostrar:</b> Em Aberto</p>
                </div>
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
