'use client'
import { useAuth } from '@/utils/useAuth';
import { fetchWithAuth } from '@/utils/authService';
import styles from '../../app/alterar/alterar.module.css'
import Header from '../../components/header'
import BtnReservar from '@/components/btnReservar'
import TabelaReservar from '@/components/tabelaReservar'
import React,{useState, useEffect, createContext} from 'react'

const API_URL = 'http://127.0.0.1:8000/api/livro/'

export const AlterarLivroContext = createContext();

const dados = [
  {id: 1, nome_do_aluno: "Lucas Silva 1", sala: "9b", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 2, nome_do_aluno: "Lucas Silva 2", sala: "9a", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 3, nome_do_aluno: "Lucas Silva 3", sala: "9c", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 4, nome_do_aluno: "Lucas Silva 4", sala: "9e", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 5, nome_do_aluno: "Lucas Silva 5", sala: "9f", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
  {id: 6, nome_do_aluno: "Lucas Silva 6", sala: "9d", telefone: "12991243443", livro: "Nome livro 1", autor: "Nome autor 1"},
];

const alterar = () => { 
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
                <div className={styles.alterarTelas}>
                    <BtnReservar nome="Reservas Aluno" estado={true} idBotao="btnAluno"/>
                    <BtnReservar nome="Reservas Funcionario" estado={false} idBotao="btnFuncionario" />
                </div>
            </div>
            <div className={styles.alterarDiv} id="mainLivro">
              <div>
                <TabelaReservar dados={dados} tipo="aluno"/>
              </div>
            </div>
        </>
    )
}

export default alterar;


