'use client'
import styles from '../../app/alterar/alterar.module.css'
import Header from '../../components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'
import TabelaAlterar from '@/components/tabelaAlterar'
import React,{useState, useEffect} from 'react'

const API_URL = 'http://127.0.0.1:8000/api/livro/'

export default function alterar() {

    const [loading, setLoading] = useState();
    const [dadosApi, setDadosApi] = useState();
    const [dadosFiltrados, setDadosFiltrados] = useState([]);
    const fetchAllData = async () => {
      try{
        setLoading(true);

        const response = await fetch(API_URL);
        const data = await response.json();
        setDadosApi(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchAllData();
    }, []);

    /*
    let livros = [
        {
          "codigo": 1,
          "titulo": "Meditações",
          "autor": "Marco Aurélio",
          "ano": 180,
          "genero": "Filosofia",
          "nicho": "23",
          "exemplaresTotais": 5,
          "ISBN": "978-85-325-5429-7"
        },
        {
          "codigo": 2,
          "titulo": "O Príncipe",
          "autor": "Nicolau Maquiavel",
          "ano": 1532,
          "genero": "Ciência Política",
          "nicho": "32",
          "exemplaresTotais": 7,
          "ISBN": "978-85-7402-441-8"
        },
        {
          "codigo": 3,
          "titulo": "A República",
          "autor": "Platão",
          "ano": 380,
          "genero": "Filosofia Política",
          "nicho": "32",
          "exemplaresTotais": 6,
          "ISBN": "978-85-250-4465-6"
        },
        {
          "codigo": 4,
          "titulo": "Ensaio sobre a Cegueira",
          "autor": "José Saramago",
          "ano": 1995,
          "genero": "Romance",
          "nicho": "82",
          "exemplaresTotais": 9,
          "ISBN": "978-85-7592-580-8"
        },
        {
          "codigo": 5,
          "titulo": "Dom Casmurro",
          "autor": "Machado de Assis",
          "ano": 1899,
          "genero": "Romance",
          "nicho": "82",
          "exemplaresTotais": 8,
          "ISBN": "978-85-04-00779-7"
        },
        {
          "codigo": 6,
          "titulo": "Cem Anos de Solidão",
          "autor": "Gabriel García Márquez",
          "ano": 1967,
          "genero": "Realismo Mágico",
          "nicho": "86",
          "exemplaresTotais": 12,
          "ISBN": "978-85-7592-042-2"
        },
        {
          "codigo": 7,
          "titulo": "O Senhor dos Anéis",
          "autor": "J.R.R. Tolkien",
          "ano": 1954,
          "genero": "Fantasia",
          "nicho": "813",
          "exemplaresTotais": 15,
          "ISBN": "978-85-92-50897-9"
        },
        {
          "codigo": 8,
          "titulo": "O Hobbit",
          "autor": "J.R.R. Tolkien",
          "ano": 1937,
          "genero": "Fantasia",
          "nicho": "813",
          "exemplaresTotais": 11,
          "ISBN": "978-85-7592-563-9"
        },
        {
          "codigo": 9,
          "titulo": "Harry Potter e a Pedra Filosofal",
          "autor": "J.K. Rowling",
          "ano": 1997,
          "genero": "Fantasia",
          "nicho": "813",
          "exemplaresTotais": 14,
          "ISBN": "978-85-7592-625-8"
        },
        {
            "codigo": 11,
            "titulo": "O Mundo de Sofia",
            "autor": "Jostein Gaarder",
            "ano": 1991,
            "genero": "Filosofia",
            "nicho": "23",
            "exemplaresTotais": 10,
            "ISBN": "978-85-04-00949-8"
          },
          {
            "codigo": 12,
            "titulo": "Sapiens: Uma Breve História da Humanidade",
            "autor": "Yuval Noah Harari",
            "ano": 2011,
            "genero": "História",
            "nicho": "90",
            "exemplaresTotais": 18,
            "ISBN": "978-85-9507-051-5"
          },
          {
            "codigo": 13,
            "titulo": "O Poder do Hábito",
            "autor": "Charles Duhigg",
            "ano": 2012,
            "genero": "Autoajuda",
            "nicho": "158",
            "exemplaresTotais": 16,
            "ISBN": "978-85-9507-052-2"
          },
          {
            "codigo": 21,
            "titulo": "Ética à Nicômaco",
            "autor": "Aristóteles",
            "ano": 350,
            "genero": "Filosofia",
            "nicho": "23",
            "exemplaresTotais": 13,
            "ISBN": "978-85-7402-438-5"
          },
          {
            "codigo": 22,
            "titulo": "Meditações",
            "autor": "Marco Aurélio",
            "ano": 180,
            "genero": "Filosofia",
            "nicho": "23",
            "exemplaresTotais": 5,
            "ISBN": "978-85-325-5429-7"
          },
          {
            "codigo": 23,
            "titulo": "Crítica da Razão Pura",
            "autor": "Immanuel Kant",
            "ano": 1781,
            "genero": "Filosofia",
            "nicho": "23",
            "exemplaresTotais": 17,
            "ISBN": "978-85-7402-439-2"
          },
          {
            "codigo": 24,
            "titulo": "Ser e Tempo",
            "autor": "Martin Heidegger",
            "ano": 1927,
            "genero": "Filosofia",
            "nicho": "23",
            "exemplaresTotais": 20,
            "ISBN": "978-85-7402-440-9"
          },
          {
            "codigo": 25,
            "titulo": "O Segundo Sexo",
            "autor": "Simone de Beauvoir",
            "ano": 1949,
            "genero": "Filosofia Feminista",
            "nicho": "23",
            "exemplaresTotais": 19,
            "ISBN": "978-85-7402-442-5"
          },
          {
            "codigo": 26,
            "titulo": "O Leviatã",
            "autor": "Thomas Hobbes",
            "ano": 1651,
            "genero": "Filosofia Política",
            "nicho": "32",
            "exemplaresTotais": 14,
            "ISBN": "978-85-7402-443-3"
          },
          {
            "codigo": 27,
            "titulo": "Em Busca do Sentido",
            "autor": "Viktor Frankl",
            "ano": 1946,
            "genero": "Filosofia Existencial",
            "nicho": "23",
            "exemplaresTotais": 22,
            "ISBN": "978-85-7402-444-0"
          },
          {
            "codigo": 28,
            "titulo": "Assim Falou Zaratustra",
            "autor": "Friedrich Nietzsche",
            "ano": 1883,
            "genero": "Filosofia",
            "nicho": "23",
            "exemplaresTotais": 18,
            "ISBN": "978-85-7402-445-7"
          },
          {
            "codigo": 29,
            "titulo": "A República",
            "autor": "Platão",
            "ano": 380,
            "genero": "Filosofia Política",
            "nicho": "32",
            "exemplaresTotais": 6,
            "ISBN": "978-85-250-4465-6"
          },
    ]; 
    */

    const [livrosPesquisa, setLivrosPesquisa] = useState();
    
    function comparar(elemento, filtro, valor){
        return elemento[filtro].toLowerCase().includes(valor);
    }

    const handleClickProcurar = (campoPesquisa1, campoPesquisa2, filtro1, filtro2, listaTotal) => {
        let valor1 = campoPesquisa1.value.toLowerCase();
        let valor2 = campoPesquisa2.value.toLowerCase();
        let listaTemporaria;
        if(valor1.trim() !== ""){
            console.log("1 feita");
            listaTemporaria = listaTotal.filter((elemento) => comparar(elemento, filtro1, valor1));
            listaTotal = [...listaTemporaria];
        }
        if(valor2.trim() != ""){
            console.log("2 feita");
            listaTemporaria = listaTotal.filter((elemento) => comparar(elemento, filtro2, valor2));
        }
        setLivrosPesquisa(listaTemporaria);
        campoPesquisa1.value = "";
        campoPesquisa2.value = "";
    }
    return(
        <>
            <Header>Alterar</Header>
            <div className={styles.mainDiv}>
                <div className={styles.alterarTelas}>
                    <BtnAlterar nome="Alterar Livro" estado={true} idBotao="btnLivro"/>
                    <BtnAlterar nome="Alterar Aluno" estado={false} idBotao="btnAluno" />
                    <BtnAlterar nome="Alterar Funcionario" estado={false} idBotao="btnFuncionario"/>
                </div>
                <div className={styles.alterarDiv} id="mainLivro">
                    <div className={styles.pesquisar}>
                        <CampoPesquisar idInput="campoTitulo" campoNome="Título" ph="Digite o título do livro"/>
                        <CampoPesquisar idInput="campoAutor" campoNome="Autor" ph="Digite o autor do livro"/>
                        <button className={styles.btnProcurar} onClick={() => handleClickProcurar(document.getElementById("campoTitulo"),document.getElementById("campoAutor"), "nome_do_livro", "autor", dadosApi)}>Procurar Livro</button>
                    </div>
                    <TabelaAlterar dados={livrosPesquisa} tipo="livro"/>
                    <div className={styles.divRegistroSelecionado}>Registro selecionado: <span id="codigoSelecionado"></span></div>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputTitulo" nome="Título" ph="Digite o título do livro"/>
                        <CampoDados idInput="inputAutor" nome="Autor" ph="Digite o autor do livro"/>
                        <CampoDados idInput="inputGenero" nome="Gênero" ph="Digite o gênero do livro"/>
                        <CampoDados idInput="inputNicho" nome="Nicho" ph="Digite o nicho"/>
                        <CampoDados idInput="inputExemplaresTotais" nome="Exemplares Totais" ph="Digite os exemplares totais"/>
                    </div>
                    <BtnEfetuarAlteracao tipo="livro"/>
                </div>
            </div>
        </>
    )
}

