import styles from './alterar.module.css'
import TitlePH from '@/components/titlePH'
import BtnAlterar from '@/components/btnAlterar'
import CampoPesquisar from '@/components/campoPesquisar'
import BtnEfetuarPesquisa from '@/components/btnEfetuarPesquisa'
import LinhaTabelaLivro from '@/components/linhaTabelaLivro'
import LinhaTabelaUsuario from '@/components/linhaTabelaUsuario'


export default function alterar() {
    let livrosVazio;
    let usuariosVazio;
    /*
    let usuarios = [{codigo:"10", nome:"Anderson Oliveira", sala:"Funcionario", telefone:"12-99193-3444"},
                  {codigo:"11", nome:"Anderson Lucas Silva", sala:"9a", telefone:""},
                  {codigo:"12", nome:"Anderson Paulo Santos", sala:"7a", telefone:""}];
    
    let livros = [{codigo:"10", titulo:"O julgamento de Sócrates", autor:"Sócrates"},
                  {codigo:"11", titulo:"Apologia", autor:"Sócrates"},
                  {codigo:"12", titulo:"O Críton de Sócrates", autor:"Sócrates"}];
    */
   
    
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
            console.log(lenghtData)
            return [<LinhaTabelaLivro codigo="Código" titulo="Título" autor="Autor"></LinhaTabelaLivro>,
            data.map((livro, index) => (<LinhaTabelaLivro key={livro.codigo} codigo={livro.codigo} titulo={livro.titulo} autor={livro.autor} index={index} lenght={lenghtData}></LinhaTabelaLivro>))]
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
            console.log(lenghtData)
            return [<LinhaTabelaUsuario codigo="Código" nome="Nome" sala="Sala" telefone="Telefone"></LinhaTabelaUsuario>,
            data.map((usuario, index) => (<LinhaTabelaUsuario key={usuario.codigo} codigo={usuario.codigo} nome={usuario.nome} sala={usuario.sala} telefone={usuario.telefone} index={index} lenght={lenghtData}></LinhaTabelaUsuario>))]
        }
    }
    return(
        <div>
            <TitlePH />
            <div className={styles.flexRow}>
                <BtnAlterar nome="Alterar Usuario" />
                <BtnAlterar nome="Alterar Livro" />
            </div>

            <div className={styles.alterarUsuario}>
                <div className={styles.pesquisar}>
                    <CampoPesquisar idInput="campoNome" campoNome="Nome" ph="Digite o nome do usuário"/>
                    <CampoPesquisar idInput="campoSala" campoNome="Sala" ph="Digite a sala do usuário"/>
                    <BtnEfetuarPesquisa nome="Procurar Usuários"></BtnEfetuarPesquisa>
                </div>
                <div className={styles.table}>
                    {renderLinesUsuarios(usuariosVazio)}
                </div>
                <div className={styles.campos}>
                    
                </div>
            </div>

            <div className={styles.alterarLivros}>
                <div className={styles.pesquisar}>
                    <CampoPesquisar idInput="campoTitulo" campoNome="Título" ph="Digite o título do livro"/>
                    <CampoPesquisar idInput="campoAutor" campoNome="Autor" ph="Digite o autor do livro"/>
                    <BtnEfetuarPesquisa nome="Procurar Livros"></BtnEfetuarPesquisa>
                </div>
                <div className={styles.table}>
                    {renderLinesLivros(livrosVazio)}
                </div>
                <div className={styles.campos}>

                </div>
            </div>

        </div>
    )
}