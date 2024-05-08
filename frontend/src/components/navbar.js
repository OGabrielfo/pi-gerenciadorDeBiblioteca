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
import { faBars } from "@fortawesome/free-solid-svg-icons"



export default function Navbar(){
    var isActive = false
    const pathname = usePathname();
    var resp = ""
    switch(pathname) {
        case "/registrar":
            resp = pathname
            break;
        case "/registrar/emprestimos":
            resp = pathname
            break;
        case "/registrar/livros":
            resp = pathname
            break;
        case "/registrar/usuarios":
            resp = pathname
            break;
        default:
            resp = ""
    }

    const setMenuActive = () => {
        const menuComp = document.getElementById("navbar")
        if (isActive){
            isActive = false
            menuComp.className = styles.navbar
        } else {
            isActive = true
            menuComp.className = styles.activeNavbar
        }
    }

    return(
        <nav className={styles.container}>
            <div className={styles.openNavbar} onClick={setMenuActive}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <ul id="navbar" className={styles.navbar}>
                <li>
                    <Link className={pathname === '/consulta' ? styles.activeLink : styles.link} href="/consulta">
                        <FontAwesomeIcon className={styles.icones} icon={faMagnifyingGlass} />
                        Consultar
                    </Link>
                </li>
                <li>
                    <Link className={pathname === resp ? styles.activeLink : styles.link} href="/registrar">
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