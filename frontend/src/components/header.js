import styles from './header.module.css'
import Navbar from './navbar'
import PublicNavbar from './publicNavbar'
import Image from 'next/image'
import Logo from '../assets/Icone.png'

export default function Header({children, PublicNav}) {
    return(
        <>
            <header className={styles.header}>
                <div>
                    <Image src={ Logo } alt="Logotipo" />
                </div>
                {!PublicNavbar ? <Navbar /> : <PublicNavbar />}
                <h1>{children}</h1>
            </header>
        </>
    )
}