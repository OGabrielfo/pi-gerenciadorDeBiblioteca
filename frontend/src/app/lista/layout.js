import Header from '../../components/header'
import styles from './lista.module.css'
import NavButton from '../../components/navButton'

export default function Layout({ children }) {
    return (
        <html lang="pt-br">
            <body>
                <Header>Lista de Devedores</Header>
                <section className={ styles.container }>
                    <div className={ styles.navbarRegistro }>
                        <NavButton link="/lista/alunos" titulo="Alunos Devendo" />
                        <NavButton link="/lista/funcionarios" titulo="Funcionários Devendo" />
                    </div>
                </section>
                {children}
            </body>
        </html>
    );
}