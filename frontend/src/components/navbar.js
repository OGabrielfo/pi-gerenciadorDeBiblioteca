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
import { faChartLine } from "@fortawesome/free-solid-svg-icons"



export default function Navbar(){
    var isActive = false
    const pathname = usePathname();
    var resp = ""

    switch(pathname) {
        case "/registrar":
            resp = "/registrar"
            break;
        case "/registrar/emprestimos":
            resp = "/registrar"
            break;
        case "/registrar/livros":
            resp = "/registrar"
            break;
        case "/registrar/usuarios":
            resp = "/registrar"
            break;
        case "/alterar":
            resp = "/alterar"
            break;
        case "/alterar/aluno":
            resp = "/alterar"
            break;
        case "/alterar/funcionario":
            resp = "/alterar"
            break;
        case "/lista":
            resp = "/lista"
            break;
        case "/lista/alunos":
            resp = "/lista"
            break;
        case "/lista/funcionarios":
            resp = "/lista"
            break;
        case "/reservar":
            resp = "/reservar"
            break;
        case "/dados":
            resp = "/dados"
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
                    <Link className={resp === '/registrar' ? styles.activeLink : styles.link} href="/registrar">
                        <FontAwesomeIcon className={styles.icones}  icon={faUserPlus} />
                        Registrar
                    </Link>
                </li>
                <li>
                    <Link className={resp === '/alterar' ? styles.activeLink : styles.link} href="/alterar">
                        <FontAwesomeIcon className={styles.icones}  icon={faPenToSquare} />
                        Alterar
                    </Link>
                </li>
                <li>
                    <Link className={resp === '/lista' ? styles.activeLink : styles.link} href="/lista">
                        <FontAwesomeIcon className={styles.icones}  icon={faList} />
                        Devedores
                    </Link>
                </li>
                <li>
                    <Link className={resp === '/reservar' ? styles.activeLink : styles.link} href="/reservar">
                        <FontAwesomeIcon className={styles.icones}  icon={faList} />
                        Reservas
                    </Link>
                </li>
                <li>
                    <Link className={resp === '/dados' ? styles.activeLink : styles.link} href="/dados">
                        <FontAwesomeIcon className={styles.icones}  icon={faChartLine} />
                        Dados
                    </Link>
                </li>
            </ul>
        </nav>
    )
}