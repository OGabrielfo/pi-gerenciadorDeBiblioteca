import styles from "./titlePH.module.css";
import iconeBiblioteca from "@/assets/icone-biblioteca.png";
import Image from "next/image";

export default function TitlePH(){
    return(
        <div className={styles.divTitle}>
            <Image src={iconeBiblioteca} className={styles.icone}/>
            <div className={styles.divh1}>
                <h1 className={styles.title}>Alterar</h1>
            </div>
        </div>
        
    )
}