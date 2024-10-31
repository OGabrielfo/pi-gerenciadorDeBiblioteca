'use client'
import styles from "./publicNavbar.module.css"
import Link from "next/link"

import { usePathname } from 'next/navigation'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"



export default function publicNavbar(){
    var isActive = false
    const pathname = usePathname();
    var resp = ""

    switch(pathname) {
        case "/":
            resp = "/"
            break;
        case "/registrar/emprestimos":
            resp = "/registrar"
            break;//TODO Necessário corrigir rota da função
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
                    <Link className={pathname === '/' ? styles.activeLink : styles.link} href="/">
                        <FontAwesomeIcon className={styles.icones} icon={faMagnifyingGlass} />
                        Consultar
                    </Link>
                </li>
                <li>
                    <Link className={resp === '/registrar' ? styles.activeLink : styles.link} href="/pag_formulario">
                        <FontAwesomeIcon className={styles.icones}  icon={faComment} />
                        Sugestões
                    </Link>
                </li>
            </ul>
        </nav>
    )
}