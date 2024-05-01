import styles from "./navbarPH.module.css"
import Link from "next/link"

export default function NavbarPH(){
    return(
        <nav className={styles.mainNav}>
            <ul>
                <li>
                    <Link href="/"><p>Consoulta</p></Link>
                </li>
                <li>
                    <Link href="/login"><p>Login</p></Link>
                </li>
                <li>
                    <Link href="/lista"><p>Devedores</p></Link>
                </li>
                <li>
                    <Link href="/alterar"><p>Alterar</p></Link>
                </li>
                <li>
                    <Link href="/registrar"><p>Cadastrar</p></Link>
                </li>
            </ul>
        </nav>
    )
}