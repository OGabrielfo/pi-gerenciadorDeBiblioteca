import styles from './consulta.module.css'
import Header from '../../components/header'

export default function consulta() {
    return(
<div>
<Header>Consulta </Header>   
<div className={styles.container}>

<div className={styles.title}>
<label>Título</label>
<input
</div>

<div className={styles.aut}>
<label>Autor</label>

</div>
<div className={styles.gen}>
<label>Gênero</label>
</div>

 </div>
 </div>
)
}