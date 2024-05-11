import styles from './consulta.module.css'
import Header from '../../components/header'

export default function consulta() {
    return(
<div>
<Header>Consulta </Header>   
<div className={styles.container}>

<div className={styles.title}>
<label>Título</label>
<input type="text" placeholder="Digite o título do livro"></input>
</div>

<div className={styles.aut}>
<label>Autor</label>
<input className={styles.input} type="text" placeholder="Digite o autor do livro"></input>

</div>
<div className={styles.gen}>
<label>Gênero</label>
<input type="text" placeholder="Digite o gênero do livro"></input>
</div>
<div className={styles.botao}>
<br/>
<button>Consultar</button>
</div>
 </div>
 </div>
)
}