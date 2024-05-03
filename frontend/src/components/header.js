import styles from './header.module.css'
import Navbar from './navbar'
import Image from 'next/image'
import Logo from '../assets/Icone.png'

export default function Header({children}) {
    return(
        <>
            <header className={styles.header}>
                <div>
                    <Image src={ Logo } alt="Logotipo" />
                </div>
                <Navbar />
                <h1>{children}</h1>
            </header>
        </>
    )
}