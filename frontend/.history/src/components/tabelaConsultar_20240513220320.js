'use client'
import Image from "next/image";
import styles from "./tabelaConsultar.module.css";

let dados = [
    {
      "codigo": 1,
      "titulo": "Meditações",
      "autor": "Marco Aurélio",
      "nicho": "23",
      "exemplaresTotais": 5,
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

export default function TabelaConsultar(props) {
    function renderLines(dados, codigo, titulo, autor, genero, nicho, disponiveis){
        if(dados == null){
            let linhasVazias = [];
            for(let i = 0; i < 3; i++){
                linhasVazias.push(<tr key={i} className={styles.linha}>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado}>‎</td>
                                    <td className={styles.dado + " " + styles.terceira}>‎</td>
                                  </tr>)
            }
            return(linhasVazias);
        }
        else{
            let linhasComDados = [];
            linhasComDados = dados.map((dado, index) => (
                <tr key={dado[campo1]} className={styles.linha}>
                    <td id={campo1} className={styles.dado}>
                        {dado["codigo"]} 
                    </td>
                    <td id={campo2} className={styles.dado}>
                        {dado["titulo"]}</td>
                    <td id={campo3} className={styles.dado}>
                        {dado["autor"]} 
                    </td>
                    <td id={campo3} className={styles.dado}>
                        {dado["genero"]} 
                    </td>
                    <td id={campo3} className={styles.dado}>
                        {dado["nicho"]}
                    </td>      
                    <td id={campo3} className={styles.dado}>
                        {dado["disponiveis"]} 
                    </td>
                </tr>
            ))
            return(linhasComDados);
        }
    }
    return (
            <div className={styles.mainDiv}>
                <table className={styles.tabela}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.dadoHeader + " " + styles.primeira}>Código</th>
                            <th className={styles.dadoHeader}>Título</th>
                            <th className={styles.dadoHeader}>Autor</th>
                            <th className={styles.dadoHeader}>Gênero</th>
                            <th className={styles.dadoHeader}>Nicho</th>
                            <th className={styles.dadoHeader + " " + styles.terceira}>Disponíveis</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {renderLines(props.dados)}
                    </tbody>
                </table>
            </div>
    );
    
}