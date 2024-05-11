import styles from './consulta.module.css'
import Header from '../../components/header'

export default function consulta() {
    return(
<div>
<Header>Consulta </Header>   
<div className={styles.container}>

<div className={styles.title}>
<label>Título</label>
<input className={styles.input} type="text" placeholder="Digite o título do livro"/>
</div>

<div className={styles.aut}>
<label>Autor</label>
<input className={styles.input} type="text" placeholder="Digite o autor do livro"/>

</div>
<div className={styles.gen}>
<label className={}>Gênero</label>
<input className={styles.input} type="text" placeholder="Digite o gênero do livro"/>
</div>
<div className={styles.botao}>
<br/>
<button>Consultar</button>
</div>
 </div>
 </div>
)
}