import styles from './consulta.module.css'
import Header from '../../components/header'

export default function Clicar(){
    let 
}

export default function consulta() {
    return(


<div>
<Header>Consulta </Header>   
<div className={styles.container}>

<div className={styles.title}>
<label className={styles.label}>Título</label>
<input className={styles.input} type="text" placeholder="Digite o título do livro"/>
</div>

<div className={styles.aut}>
<label className={styles.label}>Autor</label>
<input className={styles.input} type="text" placeholder="Digite o autor do livro"/>

</div>
<div className={styles.gen}>
<label className={styles.label}>Gênero</label>
<input className={styles.input} type="text" placeholder="Digite o gênero do livro"/>
</div>
<div className={styles.botao}>
<br/>
<button className={styles.button}>Consultar</button>
</div>
 </div>
 </div>
)


}