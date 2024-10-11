'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from './reservar.module.css'
import Header from '../../components/header'
import BtnReservar from '@/components/btnReservar'
import Modal from '@/components/modalReserva'
import TabelaReservar from '@/components/tabelaReservar'
import React,{useState, useEffect, createContext} from 'react'

const API_URL = 'http://127.0.0.1:8000/api/livro/'

export const AlterarLivroContext = createContext();

const dados = [
  {id: 1, nome_do_aluno: "Lucas Silva 1", sala: "9b", email: "email_pessoa1@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 2, nome_do_aluno: "Lucas Silva 2", sala: "9a", email: "email_pessoa2@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 3, nome_do_aluno: "Lucas Silva 3", sala: "9c", email: "email_pessoa3@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 5, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 6, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 7, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 8, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 9, nome_do_aluno: "Lucas Silva 5", sala: "9f", email: "email_pessoa5@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 10, nome_do_aluno: "Lucas Silva 6", sala: "9d", email: "email_pessoa6@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 12, nome_do_aluno: "Lucas Silva 2", sala: "9a", email: "email_pessoa2@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 13, nome_do_aluno: "Lucas Silva 3", sala: "9c", email: "email_pessoa3@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 14, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 15, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 16, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 17, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 18, nome_do_aluno: "Lucas Silva 5", sala: "9f", email: "email_pessoa5@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 19, nome_do_aluno: "Lucas Silva 6", sala: "9d", email: "email_pessoa6@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 20, nome_do_aluno: "Lucas Silva 2", sala: "9a", email: "email_pessoa2@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 21, nome_do_aluno: "Lucas Silva 3", sala: "9c", email: "email_pessoa3@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 22, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 23, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 24, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 25, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 26, nome_do_aluno: "Lucas Silva 5", sala: "9f", email: "email_pessoa5@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 27, nome_do_aluno: "Lucas Silva 6", sala: "9d", email: "email_pessoa6@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 28, nome_do_aluno: "Lucas Silva 2", sala: "9a", email: "email_pessoa2@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 29, nome_do_aluno: "Lucas Silva 3", sala: "9c", email: "email_pessoa3@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 30, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 31, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 32, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 33, nome_do_aluno: "Lucas Silva 4", sala: "9e", email: "email_pessoa4@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 34, nome_do_aluno: "Lucas Silva 5", sala: "9f", email: "email_pessoa5@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 35, nome_do_aluno: "Lucas Silva 6", sala: "9d", email: "email_pessoa6@gmail.com", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
];

const alterar = () => { 
    const [showModal, setShowModal] = useState(false);
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
                <button onClick={() => setShowModal(true)}>Open Modal</button>
                  {showModal &&
                      <Modal onClose={() => setShowModal(false)}>
                          Hello from the modal!
                      </Modal>
                  }
              </div>
                <div className={styles.alterarTelas}>
                    <BtnReservar nome="Reservas Aluno" estado={true} idBotao="btnAluno"/>
                    <BtnReservar nome="Reservas Funcionario" estado={false} idBotao="btnFuncionario" />
                </div>
                <div className={styles.alterarDiv} id="mainLivro">
                  <div>
                    <TabelaReservar dados={dados} tipo="aluno"/>
                  </div>
                </div>
            </div>
            <div id="modal-root"></div>
        </>
    )
}

export default alterar;


