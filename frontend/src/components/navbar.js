import styles from "./navbar.module.css"
import Link from "next/link"

export default function Navbar(){
    return(
        <nav>
            <ul>
                <li>
                    <Link href="/"><p>Consulta</p></Link>
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