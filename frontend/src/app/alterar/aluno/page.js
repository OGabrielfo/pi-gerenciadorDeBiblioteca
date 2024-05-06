import styles from './aluno.module.css'
import Header from '@/components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import BtnEfetuarPesquisa from '@/components/btnEfetuarPesquisa'
import LinhaTabelaLivro from '@/components/linhaTabelaLivro'
import LinhaTabelaUsuario from '@/components/linhaTabelaUsuario'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'
import TabelaAlterar from '@/components/tabelaAlterar'


export default function alterar() {
    let livrosVazio;
    let usuariosVazio;

    let usuarios = [{codigo:"10", nome:"Anderson Oliveira", sala:"Funcionario", funcao:"Professor-Portugues"},
                  {codigo:"11", nome:"Anderson Lucas Silva", sala:"9a", funcao:"Professor-Matematica"},
                  {codigo:"12", nome:"Anderson Paulo Santos", sala:"7a", funcao:"Professor-Fisica"}];
    
    let livros = [{codigo:"10", titulo:"O julgamento de Sócrates", autor:"Sócrates", ano:2, genero:"Filosofia", nicho:"65", exemplaresTotais:3, ISBN:"454FG45"},
                  {codigo:"11", titulo:"Apologia", autor:"Sócrates", autor:"Sócrates", ano:8, genero:"Filosofia", nicho:"63", exemplaresTotais:2, ISBN:"354FG45"},
                  {codigo:"12", titulo:"O Críton de Sócrates", autor:"Sócrates" , ano:1, genero:"Filosofia", nicho:"27", exemplaresTotais:1, ISBN:"454FG45"}];
    
    return(
        <>
            <Header>Alterar</Header>
            <div className={styles.mainDiv}>
                <div className={styles.alterarTelas}>
                    <BtnAlterar nome="Alterar Livro" estado={false} idBotao="btnLivro" />
                    <BtnAlterar nome="Alterar Aluno" estado={true} idBotao="btnAluno" />
                    <BtnAlterar nome="Alterar Funcionario" estado={false} idBotao="btnFuncionario"/>
                </div>
                <div className={styles.alterarAluno}>
                    <div className={styles.pesquisar}>
                        <CampoPesquisar idInput="campoNomeAluno" campoNome="Nome" ph="Digite o nome do aluno"/>
                        <CampoPesquisar idInput="campoSala" campoNome="Sala" ph="Digite a sala"/>
                        <BtnEfetuarPesquisa nome="Procurar Alunos"></BtnEfetuarPesquisa>
                    </div>
                    <TabelaAlterar dados={usuarios} tipo="aluno" id="mainAluno"/>
                    <div className={styles.camps}>
                        <CampoDados idInput="inputNome" nome="Nome" ph="Digite o nome do aluno"/>
                        <CampoDados idInput="inputSala" nome="Sala" ph="Digite a sala"/>
                    </div>
                    <BtnEfetuarAlteracao />
                </div>
            </div>
        </>
        
    )
}

/*
    function renderLinesLivros(data, lenghtData){
        if (data == null){
            return(
                [<LinhaTabelaLivro codigo="Código" titulo="Título" autor="Autor"></LinhaTabelaLivro>,
                <LinhaTabelaLivro codigo="default" index={0} ></LinhaTabelaLivro>,
                <LinhaTabelaLivro codigo="default" index={1} ></LinhaTabelaLivro>,
                <LinhaTabelaLivro codigo="default" index={2} ></LinhaTabelaLivro>]
            )
        }
        else{
            return [<LinhaTabelaLivro codigo="Código" titulo="Título" autor="Autor"></LinhaTabelaLivro>,
            data.map((livro, index) => (<LinhaTabelaLivro key={livro.codigo} codigo={livro.codigo} titulo={livro.titulo} autor={livro.autor} index={index} dadosLargura={lenghtData} livro={livro}></LinhaTabelaLivro>))]
        }
    }

    function renderLinesUsuarios(data, lenghtData){
        if (data == null){
            return(
                [<LinhaTabelaUsuario codigo="Código" nome="Nome" sala="Sala" telefone="Telefone"></LinhaTabelaUsuario>,
                <LinhaTabelaUsuario codigo="default" index={0} ></LinhaTabelaUsuario>,
                <LinhaTabelaUsuario codigo="default" index={1} ></LinhaTabelaUsuario>,
                <LinhaTabelaUsuario codigo="default" index={2} ></LinhaTabelaUsuario>]
            )
        }
        else{
            return [<LinhaTabelaUsuario codigo="Código" nome="Nome" sala="Sala" telefone="Telefone"></LinhaTabelaUsuario>,
            data.map((usuario, index) => (<LinhaTabelaUsuario key={usuario.codigo} codigo={usuario.codigo} nome={usuario.nome} sala={usuario.sala} telefone={usuario.telefone} index={index} dadosLargura={lenghtData} usuario={usuario}></LinhaTabelaUsuario>))]
        }
    }
    */