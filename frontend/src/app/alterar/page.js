import styles from './alterar.module.css'
import TitlePH from '@/components/titlePH'
import BtnAlterar from '@/components/btnAlterar'


export default function alterar() {
    
    return(
        <div>
            <TitlePH />
            <div className={styles.flexRow}>
                <BtnAlterar nome="Alterar Usuario" />
                <BtnAlterar nome="Alterar Livro" />
            </div>
        </div>
    )
}