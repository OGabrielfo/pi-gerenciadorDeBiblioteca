'use client'
import styles from "./navbar.module.css"
import Link from "next/link"

import { usePathname } from 'next/navigation'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus"
import { faList } from "@fortawesome/free-solid-svg-icons/faList"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare"

export default function Navbar(){
    const pathname = usePathname();

    return(
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link className={pathname === '/consulta' ? styles.activeLink : styles.link} href="/consulta">
                        <FontAwesomeIcon className={styles.icones} icon={faMagnifyingGlass} />
                        Consultar
                    </Link>
                </li>
                <li>
                    <Link className={pathname == '/registrar' || '/registrar/emprestimos' || '/registrar/livros' || '/registrar/usuarios' ? styles.activeLink : styles.link} href="/registrar">
                        <FontAwesomeIcon className={styles.icones}  icon={faUserPlus} />
                        Registrar
                    </Link>
                </li>
                <li>
                    <Link className={pathname === '/alterar' ? styles.activeLink : styles.link} href="/alterar">
                        <FontAwesomeIcon className={styles.icones}  icon={faPenToSquare} />
                        Alterar
                    </Link>
                </li>
                <li>
                    <Link className={pathname === '/lista' ? styles.activeLink : styles.link} href="/lista">
                        <FontAwesomeIcon className={styles.icones}  icon={faList} />
                        Lista
                    </Link>
                </li>
            </ul>
        </nav>
    )
}