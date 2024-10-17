'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from './reservar.module.css'
import Header from '../../components/header'
import BtnReservar from '@/components/btnReservar'
import TabelaReservar from '@/components/tabelaReservar'
import Modal from '@/components/modalReserva'
import React,{useState, useEffect, createContext} from 'react'

const API_URL = 'http://127.0.0.1:8000/api/livro/'

export const ReservaAlunoContexto = createContext();

const dados = [
  {id: 1, pessoa: "Lucas Silva 1", sala: "9b", email: "email_pessoa1@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 2, pessoa: "Lucas Silva 2", sala: "9a", email: "email_pessoa2@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 3, pessoa: "Lucas Silva 3", sala: "9c", email: "email_pessoa3@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 5, pessoa: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 6, pessoa: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 7, pessoa: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 8, pessoa: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 9, pessoa: "Lucas Silva 5", sala: "9f", email: "email_pessoa5@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 10, pessoa: "Lucas Silva 6", sala: "9d", email: "email_pessoa6@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},

];

const alterar = () => { 
    const [showModal, setShowModal] = useState(false);
    const [registro, setRegistro] = useState([]);
      /* Codigo funcional alterar
      const { authData } = useAuth();

      if (!authData) {
        return <p>Carregando...</p>;
      }
      
      const [isUpdated, setIsUpdated] = useState(false);
      const [dadosApi, setDadosApi] = useState();
      const [dadosFiltrados, setDadosFiltrados] = useState([]);
      const fetchAllData = async () => { // Retorna todas as linhas da api
          try{
            const response = await fetchWithAuth(API_URL);
            const data = await response.json();
            return data;
          } catch (error) {
            console.log(error)
          } finally {
          }
      } 
      useEffect(() => async () =>{ // Roda toda vez que entra na tela
        const data = await fetchAllData();
          setDadosApi(data);
      }, []); 

      useEffect(() => { // Roda quando uma linha é deletada ou alterada
        if(isUpdated == true){
          (async () => {
            const data = await fetchAllData();
            procurar(document.getElementById("campoTitulo"),document.getElementById("campoAutor"), "nome_do_livro", "autor", data);
            setDadosApi(data);
            setIsUpdated(false)
          })();
        }
      }, [isUpdated]); 
      const [livrosPesquisa, setLivrosPesquisa] = useState();
      */
    
    
    function comparar(elemento, filtro, valor){
        return elemento[filtro].toLowerCase().includes(valor);
    } // Compara um campo de pesquisa com o respectivo campo da linha (Vai ficar dentro de um map)

    return(
        <>
            <Header>Reservar</Header>
            <div className={styles.mainDiv}>
              <div>
                  {showModal &&
                      <Modal onClose={() => setShowModal(false)}>
                          <div className={styles.mainModal}>
                            <div className={styles.tituloModal}>Reservar Livro</div>
                            <div className={styles.textoModal}>
                              <div>
                                <span>Nome da pessoa: </span>
                                <span id="modalPessoa">{registro.pessoa}</span>
                              </div>
                              <div>
                                <span>Email: </span>
                                <span id="modalEmail">{registro.email}</span>
                              </div>
                              <div>
                                <span>Nome do livro: </span>
                                <span id="modalLivro">{registro.livro}</span>
                              </div>
                            </div>
                            <div className={styles.botoesMainModal}>
                              <button className={styles.btReserva + " " + styles.btGenerico}>Efetivar Reserva</button>
                              <button className={styles.btCadastrar + " " + styles.btGenerico}>Cadastrar Aluno</button>
                              <button className={styles.btDeletar + " " + styles.btGenerico}>Deletar Reserva</button>
                            </div>
                            <div id="msgModal" className={styles.msgModal}></div>
                          </div>
                      </Modal>
                  }
              </div>
                <div className={styles.alterarTelas}>
                    <BtnReservar nome="Reservas Aluno" estado={true} idBotao="btnAluno"/>
                    <BtnReservar nome="Reservas Funcionario" estado={false} idBotao="btnFuncionario" />
                </div>
                <div className={styles.alterarDiv} id="mainLivro">
                  <div>
                    <ReservaAlunoContexto.Provider value={{showModal, setShowModal, registro, setRegistro}}>
                      <TabelaReservar dados={dados} tipo="aluno"/>
                    </ReservaAlunoContexto.Provider>
                  </div>
                </div>
            </div>
            <div id="modal-root"></div>
        </>
    )
  }

export default alterar;


