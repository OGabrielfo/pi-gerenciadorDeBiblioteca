'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from './reservar.module.css'
import Header from '../../components/header'
import BtnReservar from '@/components/btnReservar'
import TabelaReservar from '@/components/tabelaReservar'
import Modal from '@/components/modalReserva2';
import React,{useState, useEffect, createContext} from 'react'

const API_URL_RESERVA = 'http://127.0.0.1:8000/api/reserva_livro/'
const API_URL_LIVRO = 'http://127.0.0.1:8000/api/livro/'

const API_Professor = 'http://127.0.0.1:8000/api/professor_funcionario/'
const API_Aluno = 'http://127.0.0.1:8000/api/aluno/'
const API_Emprestimo = 'http://localhost:8000/api/emprestimo/'
const API_LivrosEmprestimo = 'http://localhost:8000/api/livro_emprestimo/'
const API_StatusEmprestimo = 'http://localhost:8000/api/status_emprestimo/'

export const ReservaContextoAluno = createContext();


const alterar = () => { 
      const [registro, setRegistro] = useState([]);
      const [modalState, setModalState] = useState(false);
      const { authData } = useAuth();
      
      const [isUpdated, setIsUpdated] = useState(false);
      const [dadosApiReserva, setDadosApiReserva] = useState();
      const [dadosApiLivros, setDadosApiLivros] = useState();
      const [dadosApiAlunos, setDadosApiAlunos] = useState();
      const [dadosApiFunc, setDadosApiFunc] = useState();

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
            const url = `http://127.0.0.1:8000/api/reserva_livro/${id}/`
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
            },
            //body: JSON.stringify(dados), // Corrected from `data` to `body`
          });
          const data = await response.json();
          return data;
          } catch (error) {
              console.error(error)
          }
      }
      const postData = async (url, dados) =>{ 
        try {
          const response = await fetchWithAuth(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados), // Corrected from `data` to `body`
          });
          const data = await response.json();
          } catch (error) {
              window.alert("Pessoa cadastrada já cadastrada");
              console.error(error);
          }
      }
      const verificarPessoa = (telefone, email, dados, idCampo) => {
        
        for (const pessoa of dados){
          console.log(telefone, pessoa['telefone'], pessoa['email'], email);
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
            postDataAuth(API_Aluno, dado);
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
          date.setDate(date.getDate() + 14);
          let data_devolver = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
          if (!registro.aluno) {
              dados = {
                  id_usuario_aluno: null,
                  id_usuario_professor: registro['id_usuario_professor'],
                  data_devolucao: data_devolver,
                  situacao_emprestimo: 1,
              }
          } else {
              dados = {
                  id_usuario_aluno: registro[id_usuario_aluno],
                  id_usuario_professor: null,
                  data_devolucao: data_devolver,
                  situacao_emprestimo: 1,
              }
          }
          console.log(dados)
          // Tentativa de envio para o backend de emprestimo de livros
          try {
              const responseEmprestimo = await postDataAuth(API_Emprestimo, dados);
              //console.log(responseEmprestimo)
  
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
                    const responseLivro = await postDataAuth(API_LivrosEmprestimo, livroData);
                    console.log(responseLivro.data)
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
                      <div className={styles.textoModal}>
                        <div>
                          <span>Nome: </span>
                          <span id="modalPessoa">{registro.nome_aluno}</span>
                        </div>
                        <div>
                          <span>Email: </span>
                          <span id="modalEmail">{registro.email}</span>
                        </div>
                        <div>
                          <span>Id do livro: </span>
                          <span id="modalLivro">{registro.livro}</span>
                        </div>
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

export default alterar;


