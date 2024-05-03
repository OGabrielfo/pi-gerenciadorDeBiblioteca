import styles from './alterar.module.css'
import Header from '../../components/header'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import BtnEfetuarPesquisa from '@/components/btnEfetuarPesquisa'
import LinhaTabelaLivro from '@/components/linhaTabelaLivro'
import LinhaTabelaUsuario from '@/components/linhaTabelaUsuario'
import CampoDados from '@/components/campoDados'
import BtnEfetuarAlteracao from '@/components/btnEfetuarAlteracao'


export default function alterar() {
    let livrosVazio;
    let usuariosVazio;

    let usuarios = [{codigo:"10", nome:"Anderson Oliveira", sala:"Funcionario", telefone:"12-99193-3444"},
                  {codigo:"11", nome:"Anderson Lucas Silva", sala:"9a", telefone:""},
                  {codigo:"12", nome:"Anderson Paulo Santos", sala:"7a", telefone:""}];
    
    let livros = [{codigo:"10", titulo:"O julgamento de Sócrates", autor:"Sócrates", ano:2, genero:"Filosofia", nicho:"65", exemplaresTotais:3, ISBN:"454FG45"},
                  {codigo:"11", titulo:"Apologia", autor:"Sócrates", autor:"Sócrates", ano:8, genero:"Filosofia", nicho:"63", exemplaresTotais:2, ISBN:"354FG45"},
                  {codigo:"12", titulo:"O Críton de Sócrates", autor:"Sócrates", autor:"Sócrates", ano:1, genero:"Filosofia", nicho:"27", exemplaresTotais:1, ISBN:"454FG45"}];
   
    
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
    return(
        <div>
            <Header>Alterar</Header>
            <div className={styles.alterarTelas}>
                <BtnAlterar nome="Alterar Usuario" />
                <BtnAlterar nome="Alterar Livro" />
            </div>

            <div className={styles.alterarUsuario}>
                <div className={styles.pesquisar}>
                    <CampoPesquisar idInput="campoNome" campoNome="Nome" ph="Digite o nome do usuário"/>
                    <CampoPesquisar idInput="campoSala" campoNome="Sala" ph="Digite a sala ou funcionario"/>
                    <BtnEfetuarPesquisa nome="Procurar Usuários"></BtnEfetuarPesquisa>
                </div>
                <div className={styles.table}>
                    {renderLinesUsuarios(usuarios, usuarios.length)}
                </div>
                <div className={styles.camps}>
                    <CampoDados idInput="nome" nome="Nome" ph="Digite o nome"/>
                    <CampoDados idInput="sala" nome="Sala" ph="Digite a sala ou funcionario"/>
                    <CampoDados idInput="telefone" nome="Telefone" ph="Digite o telefone"/>
                </div>
                <BtnEfetuarAlteracao />
            </div>
            <div className={styles.alterarLivros}>
                <div className={styles.pesquisar}>
                    <CampoPesquisar idInput="campoTitulo" campoNome="Título" ph="Digite o título do livro"/>
                    <CampoPesquisar idInput="campoAutor" campoNome="Autor" ph="Digite o autor do livro"/>
                    <BtnEfetuarPesquisa nome="Procurar Livros"></BtnEfetuarPesquisa>
                </div>
                <div className={styles.table}>
                    {renderLinesLivros(livros, livros.length)}
                </div>
                <div className={styles.camps}>
                    <CampoDados idInput="titulo" nome="Título" ph="Digite o título do livro"/>
                    <CampoDados idInput="autor" nome="Autor" ph="Digite o autor do livro"/>
                    <CampoDados idInput="ano-publicacao" nome="Ano de Publicação" ph="Digite o ano de publicação"/>
                    <CampoDados idInput="genero" nome="Gênero" ph="Digite o gênero do livro"/>
                    <CampoDados idInput="nicho" nome="Nicho" ph="Digite o nicho"/>
                    <CampoDados idInput="exemplares-totais" nome="Exemplares Totais" ph="Digite os exemplares totais"/>
                    <CampoDados idInput="isbn" nome="ISBN" ph="Digite o ISBN do livro"/>
                </div>
                <BtnEfetuarAlteracao />
            </div>

        </div>
    )
}