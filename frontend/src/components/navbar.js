import styles from "./navbar.module.css"
import Link from "next/link"

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus"
import { faList } from "@fortawesome/free-solid-svg-icons/faList"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare"

export default function Navbar(){
    return(
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">
                        <div>
                        <FontAwesomeIcon className={styles.icones} icon={faMagnifyingGlass} />
                            <p className={styles.buttonText}>Consultar</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/registrar">
                        <div>
                            <FontAwesomeIcon className={styles.icones}  icon={faUserPlus} />
                            <p>Registrar</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/alterar">
                        <div>
                        <FontAwesomeIcon className={styles.icones}  icon={faPenToSquare} />
                            <p>Alterar</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                        <div>
                            <img src="#" alt="Consulta" />
                            <p>Deletar?</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/lista">
                        <div>
                            <FontAwesomeIcon className={styles.icones}  icon={faList} />
                            <p>Lista</p>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}