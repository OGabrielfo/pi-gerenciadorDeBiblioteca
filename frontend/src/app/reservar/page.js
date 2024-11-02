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

export const ReservaContextoAluno = createContext();


const alterar = () => { 
      const [registro, setRegistro] = useState([]);
      const [modalState, setModalState] = useState(false);
      const { authData } = useAuth();
      
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
        setDadosApiReserva(data);
        setDadosApiLivros(dataLivros);
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
                        <button className={styles.btReserva + " " + styles.btGenerico}>Efetivar Reserva</button>
                        <button className={styles.btCadastrar + " " + styles.btGenerico}>Cadastrar Aluno</button>
                        <button className={styles.btDeletar + " " + styles.btGenerico}>Deletar Reserva</button>
                      </div>
                      <div id="msgModal" className={styles.msgModal}></div>
                    </div>
                  </Modal>
                </ReservaContextoAluno.Provider>
              </div>
                <div className={styles.alterarTelas}>
                    <BtnReservar nome="Reservas Aluno" estado={true} idBotao="btnAluno"/>
                    <BtnReservar nome="Reservas Funcionario" estado={false} idBotao="btnFuncionario" />
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


