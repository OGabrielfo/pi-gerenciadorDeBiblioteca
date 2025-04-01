'use client'
import { useState, useEffect, createContext} from 'react';
import styles from '@/app/consulta/consulta.module.css';
import Header from '@/components/header';
import TabelaConsultar from '@/components/tabelaConsultar';
import Modal from '@/components/modalReserva2';
import { fetchWithAuth } from '@/utils/authService';


const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL_ACERVO = apiUrl+'/livro/';
const API_URL_RESERVA = apiUrl+'/reserva_livro/';

export const ReservarLivroContext = createContext();

export default function Home() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [dados, setDados] = useState(null);
  const [dadosAPI, setDadosAPI] = useState(null);
  const [registro, setRegistro] = useState([]);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL_ACERVO);
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
    console.log(alunoInput);
    if(!funcionarioInput.checked  && !alunoInput.checked){
      window.alert("Selecione se é aluno ou funcionario");
    } else if(nomeInput.value == ""){
      window.alert("Preencha o Nome");
    } else if(emailInput.value == ""){
      window.alert("Preencha o Email");
    } else {
      let lista = {};
      let fullDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      let registroReserva = {};
      registroReserva = {livro: registro.id_livro, nome_aluno: nomeInput.value, email: emailInput.value, telefone: telefoneInput.value, sala: salaInput.value, aluno: alunoInput.checked, data_reserva: fullDate};
      postData(API_URL_RESERVA, registroReserva);
      console.log(registroReserva);
    }
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
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      //console.log("Success:", data); // Log successful data if needed
      window.alert("Reserva efetuada");
    } catch (error) {
      window.alert("Já existe uma reserva desse livro ou faltou preencher todos os campos.");
      console.error(error); // Now this will log for both network errors and HTTP errors
    }
  }

  return (
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
        <ReservarLivroContext.Provider value={{modalState, setModalState, registro, setRegistro}}>
          <TabelaConsultar dados={dados} publico={true} privado={false}/> 
        </ReservarLivroContext.Provider>
        </div>
        <ReservarLivroContext.Provider value={{modalState, setModalState}}>
          <Modal tipo={"pagina consulta"}>
          <div className={styles.mainModal}>
                  <div className={styles.tituloModal}>Reservar Livro</div>
                  <div className={styles.textoModal}>
                      <div className={styles.gridInput}>
                          <div className={styles.inputLabels}>Livro: </div>
                          <div id="modalTitulo" className={styles.nomeLivroModal}>{registro.nome_do_livro}</div>
                          <div className={styles.inputLabels}>Nome*:</div>
                          <input id="pessoaInput" className={styles.inputModal}></input>
                          <div className={styles.inputLabels}>Email*:</div>
                          <input id="emailInput" className={styles.inputModal}></input>
                          <div className={styles.inputLabels}>Telefone*:</div>
                          <input id="telefoneInput" className={styles.inputModal}></input>
                          <div className={styles.inputLabels}>Sala*/Funçao*:</div>
                          <input id="salaInput" className={styles.inputModal}></input>
                      </div>
                      <fieldset id="tipo" className={styles.radioModal}> 
                        <input type="radio" value="aluno" id='aluno' name='tipo' className={styles.radioModalItem}></input>
                        <label for="aluno">Aluno</label>
                        <input type="radio" value="funcionario" id='funcionario' name='tipo' className={styles.radioModalItem}></input>
                        <label for="funcionario">Funcionario</label>
                      </fieldset>
                      <div className={styles.botoesMainModal}>
                        <button className={styles.btReserva + " " + styles.btGenerico} onClick={handleReservaClick}>Efetivar Reserva</button>
                      </div>
                  </div>
                  </div>
                  <div id="msgModal" className={styles.msgModal}></div>
          </Modal>
        </ReservarLivroContext.Provider>
      </div>

  );
};
