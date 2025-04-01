'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from './reservar.module.css'
import Header from '../../components/header'
import BtnReservar from '@/components/btnReservar';
import TabelaReservar from '@/components/tabelaReservar'
import Modal from '@/components/modalReserva2';
import React,{useState, useEffect, createContext} from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const API_URL_RESERVA = apiUrl+'/reserva_livro/'
const API_URL_LIVRO = apiUrl+'/livro/'

const API_Professor = apiUrl+'/professor_funcionario/'
const API_Aluno = apiUrl+'/aluno/'
const API_Emprestimo = apiUrl+'/emprestimo/'
const API_LivrosEmprestimo = apiUrl+'/livro_emprestimo/'
const API_StatusEmprestimo = apiUrl+'/status_emprestimo/'

export const ReservaContextoAluno = createContext();


const Alterar = () => { 
      const [registro, setRegistro] = useState([]);
      const [modalState, setModalState] = useState(false);
      const { authData } = useAuth();
      const [dadosApiAlunos, setDadosApiAlunos] = useState();
      const [dadosApiFunc, setDadosApiFunc] = useState();
      const [isUpdated, setIsUpdated] = useState(false);
      const [dadosApiReserva, setDadosApiReserva] = useState();
      const [dadosApiLivros, setDadosApiLivros] = useState();
      

      const fetchAllData = async (api) => { // Retorna todas as linhas da api
          try{
            const response = await fetchWithAuth(api);
            const data = await response.json();
            return data;
          } catch (error) {
            console.log(error)
          } finally {
          }
      } 
      useEffect(() => async () =>{ // Roda toda vez que entra na tela
        const data = await fetchAllData(API_URL_RESERVA);
        const dataLivros = await fetchAllData(API_URL_LIVRO);
        const dataAlunos = await fetchAllData(API_Aluno);
        const dataFunc = await fetchAllData(API_Professor);
        const dataEmprestimos = await fetchAllData(API_Emprestimo);
        const dataLivrosEmprestimos = await fetchAllData(API_LivrosEmprestimo);
        const status = await fetchAllData(API_StatusEmprestimo);
        setDadosApiReserva(data);
        setDadosApiLivros(dataLivros);
        setDadosApiAlunos(dataAlunos);
        setDadosApiFunc(dataFunc);
      }, []); 

      useEffect(() => { // Roda quando uma linha é deletada ou alterada
        if(isUpdated == true){
          (async () => {
            const data = await fetchAllData(API_URL_RESERVA);
            const dataLivros = await fetchAllData(API_URL_LIVRO);
            const dataAlunos = await fetchAllData(API_Aluno);
            const dataFunc = await fetchAllData(API_Professor);
            setDadosApiReserva(data);
            setDadosApiLivros(dataLivros);
            setDadosApiAlunos(dataAlunos);
            setDadosApiFunc(dataFunc);
            setIsUpdated(false);
          })();
        }
      }, [isUpdated]); 
      const deleteData = async (id) => { // Deleta uma linha de dados
        try{
            const url = `${API_URL_RESERVA}/${id}/`
            const response = await fetch (url, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });
            setIsUpdated(true);
            setModalState(false);
        } 
        catch (e) {
            console.log(e);
        }
    }

      const postDataAuth = async (url, dados) =>{ 
        try {
          const response = await fetchWithAuth(url, {
            method: 'POST',
            data: dados,
            headers: {
              'Content-Type': 'application/json',
            }});
          let data = await response.json();
          } catch (error) {
              console.error(error)
          }
      }
      const verificarPessoa = (telefone, email, dados, idCampo) => {
        for (const pessoa of dados){
          if (pessoa['email'] == email){
            return [true, pessoa[idCampo]];
          }
          if (pessoa['telefone'] == telefone){
            return [true, pessoa[idCampo]];
          }
        }
        return [false];
      }
      const handleCadastro = (reserva) => {
        let dado = {};
        if (reserva.aluno == true){
          const verifica = verificarPessoa(reserva.telefone, reserva.email, dadosApiAlunos, "id_aluno");
          console.log(verifica);
          if (verifica[0] == false){
            dado = {'nome_do_aluno': reserva.nome_aluno, 'sala': reserva.sala, 'telefone': reserva.telefone, 'email': reserva.email};
            console.log(postDataAuth(API_Aluno, dado));
            setIsUpdated(true);
            window.alert("Cadastro efetuado");
          } else{
            window.alert("Usuário já cadastrado");
          }
          
        } else{
          const verifica = verificarPessoa(reserva.telefone, reserva.email, dadosApiFunc, 'id_professor_funcionario');
          console.log(verifica);
          if (verifica[0] == false){
            dado = {'nome_do_professor_funcionario': reserva.nome_aluno, 'telefone': reserva.telefone, 'email': reserva.email, 'ocupacao': 'Funcionario'};
            postDataAuth(API_Professor, dado);
            setIsUpdated(true);
            window.alert("Cadastro efetuado");
          } else{
            window.alert("Usuário já cadastrado");
          }
        }
        //setModalState(false);
        }
        const handleReserva = async (registro) => {
          let dados = {};
          const date = new Date();
          let data_devolver = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          if (!registro.aluno) {
              const verifica = verificarPessoa(registro.telefone, registro.email, dadosApiFunc, 'id_professor_funcionario');
              const id = verifica[1];
              console.log(verifica);
              if (verifica[0] == false){
                window.alert("Precisa cadastrar o usuário");
                return;
              }
              dados = {
                  id_usuario_aluno: null,
                  id_usuario_professor: id,
                  data_devolucao: data_devolver,
                  situacao_emprestimo: "Aberto",
              }
          } else {
              const verifica = verificarPessoa(registro.telefone, registro.email, dadosApiAlunos, "id_aluno");
              const id = verifica[1];
              if (verifica[0] == false){
                window.alert("Precisa cadastrar o usuário");
                return;
              }
              dados = {
                  id_usuario_aluno: id,
                  id_usuario_professor: null,
                  data_devolucao: data_devolver,
                  situacao_emprestimo: "Aberto",
              }
          }
          console.log(dados)
          // Tentativa de envio para o backend de emprestimo de livros
          try {
              const responseEmprestimo = await fetchWithAuth(API_Emprestimo, {
                  method: 'POST',
                  data: dados,
                  headers: {
                    'Content-Type': 'application/json',
                  }
              });
  
              const emprestimoData = await responseEmprestimo.json();
              const idEmprestimo = emprestimoData.id_emprestimo;
                let livroData = {
                    id_livro: registro.livro,
                    id_emprestimo: idEmprestimo,
                    quantidade: 1,
                    id_status: 1,
                }
                // Tentativa de envio para o backend
                try {
                    const responseLivro = await fetchWithAuth(API_LivrosEmprestimo, {
                      method: 'POST',
                      data: livroData,
                      headers: {
                        'Content-Type': 'application/json',
                      }});
                      window.alert("Emprestimo efetuado");
                      deleteData(registro.id_reserva);
                } catch (error) {
                    console.error(error)
                }
              
          } catch (error) {
              console.error(error)
          }
         
        }
    if (!authData) {
      return <p>Carregando...</p>;
    }

    return(
        <>
            <Header>Reservar</Header>
            <div className={styles.mainDiv}>
              <div>
                <ReservaContextoAluno.Provider value={{modalState, setModalState}}>
                  <Modal tipo={"pagina reserva aluno"}>
                    <div className={styles.mainModal}>
                      <div className={styles.tituloModal}>Reservar Livro</div>
                      <div className={styles.textoModal + " " + styles.gridModal}>
                          <div className={styles.labelModal}>Nome: </div>
                          <div id="nome_aluno_modal" className={styles.textoApiModal}>{registro.nome_aluno}</div>
                          <div className={styles.labelModal}>Email: </div>
                          <div id="email_modal" className={styles.textoApiModal}>{registro.email}</div>
                          <div className={styles.labelModal}>Id do livro: </div>
                          <div id="livro_modal" className={styles.textoApiModal}>{registro.livro}</div>
                      </div>
                      <div className={styles.botoesMainModal}>
                        <button className={styles.btReserva + " " + styles.btGenerico} onClick={() => handleReserva(registro)}>Efetivar Reserva</button>
                        <button className={styles.btCadastrar + " " + styles.btGenerico} onClick={() => handleCadastro(registro)}>Cadastrar Pessoa</button>
                        <button className={styles.btDeletar + " " + styles.btGenerico} onClick={() => deleteData(registro.id_reserva)}>Deletar Reserva</button>
                      </div>
                      <div id="msgModal" className={styles.msgModal}></div>
                    </div>
                  </Modal>
                </ReservaContextoAluno.Provider>
              </div>
                <div className={styles.alterarDiv} id="mainLivro">
                  <div>
                    <ReservaContextoAluno.Provider value={{modalState, setModalState, registro, setRegistro}}>
                      <TabelaReservar dados={dadosApiReserva} dadosLivros={dadosApiLivros} tipo="aluno"/>
                    </ReservaContextoAluno.Provider>
                  </div>
                </div>
            </div>
        </>
    )
  }

export default Alterar;


