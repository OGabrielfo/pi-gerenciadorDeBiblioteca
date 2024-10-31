'use client'
import { useState, useEffect, createContext} from 'react';
import styles from '@/app/consulta/consulta.module.css';
import Header from '@/components/header';
import TabelaConsultar from '@/components/tabelaConsultar';
import Modal from '@/components/modalReserva2'
import { fetchWithAuth } from '@/utils/authService';

const API_URL = 'http://127.0.0.1:8000/api/livro/';
const API_URL_RESERVA = 'http://127.0.0.1:8000/api/reserva_livro/';

export const ReservarLivroContexto = createContext();

export default function Home() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [dados, setDados] = useState(null);
  const [dadosAPI, setDadosAPI] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [registro, setRegistro] = useState([]);
  const [reserva, setReserva] = useState([]);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setDadosAPI(data); // Atualizar o estado com os dados
      } catch (error) {
        console.error('Erro ao buscar dados dos livros:', error);
      }
    };
    fetchData();
    
  }, []);

  /*useEffect(() => {
    if (dadosAPI) {
      console.log('dadosAPI atualizado:', dadosAPI);
    }
  }, [dadosAPI]); */

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultados = dadosAPI.filter((livro) =>
      (nomeLivro === '' || livro.nome_do_livro.toUpperCase().includes(nomeLivro.toUpperCase())) &&
      (autor === '' || livro.autor.toUpperCase().includes(autor.toUpperCase())) &&
      (genero === '' || livro.tipo.toUpperCase().includes(genero.toUpperCase()))
    );
    
    if (resultados.length === 0) {
      alert('Nenhum livro encontrado');
    } else {
      setDados(resultados);
    }
  };
  const handleReservaClick = () => {
    const nomeInput = document.getElementById("pessoaInput");
    const emailInput = document.getElementById("emailInput");
    const telefoneInput = document.getElementById("telefoneInput");
    const salaInput = document.getElementById("salaInput");
    const funcionarioInput = document.getElementById("funcionario");
    const alunoInput = document.getElementById("aluno");
    const date = new Date();
    let lista = {};
    let fullDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    let registroReserva = {};
    registroReserva = {livro: registro.id_livro, nome_aluno: nomeInput.value, sala: salaInput.value, data_reserva: fullDate};
    postData(API_URL_RESERVA, registroReserva);
    console.log(registroReserva);
  }

  const postData = async (url, dados) =>{ 
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados), // Corrected from `data` to `body`
      });
      const data = await response.json();
      console.log(data);
      } catch (error) {
          console.error(error)
      }
  }

  return (
    <>
    <div>
        <Header PublicNav={true}>Consulta</Header>
        <div className={styles.container}>
          <div className={styles.title}>
            <label className={styles.label}>Título</label>
            <input className={styles.input} type="text" placeholder="Digite o título do livro" value={nomeLivro} onChange={(e) => setNomeLivro(e.target.value)} />
          </div>
          <div className={styles.aut}>
            <label className={styles.label}>Autor</label>
            <input className={styles.input} type="text" placeholder="Digite o autor do livro" value={autor} onChange={(e) => setAutor(e.target.value)} />
          </div>
          <div className={styles.gen}>
            <label className={styles.label}>Gênero</label>
            <input className={styles.input} type="text" placeholder="Digite o gênero do livro" value={genero} onChange={(e) => setGenero(e.target.value)} />
          </div>
          <div className={styles.botao}>
            <br/>
            <button className={styles.button} onClick={handleSubmit}>Consultar</button>
          </div>
        </div>
        <div className={styles.tabela}>
        <ReservarLivroContexto.Provider value={{modalState, setModalState, registro, setRegistro}}>
          <TabelaConsultar dados={dados} publico={true} privado={false}/> 
        </ReservarLivroContexto.Provider>
        </div>
        <ReservarLivroContexto.Provider value={{modalState, setModalState}}>
          <Modal>
          <div className={styles.mainModal}>
                  <div className={styles.tituloModal}>Reservar Livro</div>
                  <div className={styles.textoModal}>
                    <span>Nome do livro: </span>
                    <span id="modalTitulo">{registro.nome_do_livro}</span>
                      <div className={styles.gridInput}>
                          <div>
                            <span className={styles.spanInput}>Nome*:</span>
                            <input id="pessoaInput" className={styles.inputModal}></input>
                          </div>
                          <div>
                            <span className={styles.spanInput}>Email*:</span>
                            <input id="emailInput" className={styles.inputModal}></input>
                          </div>
                          <div>
                            <span className={styles.spanInput}>Telefone:</span>
                            <input id="telefoneInput" className={styles.inputModal}></input>
                          </div>
                          <div>
                            <span className={styles.spanInput}>Sala:</span>
                            <input id="salaInput" className={styles.inputModal}></input>
                          </div>
                      </div>
                      <fieldset id="tipo" className={styles.radioModal}> 
                        <input type="radio" value="aluno" id='aluno' name='tipo' className={styles.radioModalX}></input>
                        <label for="aluno">Aluno</label>
                        <input type="radio" value="funcionario" id='funcionario' name='tipo' className={styles.radioModalX}></input>
                        <label for="funcionario">Funcionario</label>
                      </fieldset>
                      <div className={styles.botoesMainModal}>
                        <button className={styles.btReserva + " " + styles.btGenerico} onClick={handleReservaClick}>Efetivar Reserva</button>
                      </div>
                  </div>
                  </div>
                  <div id="msgModal" className={styles.msgModal}></div>
          </Modal>
        </ReservarLivroContexto.Provider>
      </div>
  
    </>

  );
};
