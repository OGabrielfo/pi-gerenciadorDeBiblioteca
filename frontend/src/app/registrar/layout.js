import Header from '../../components/header'
import styles from './registrar.module.css'
import NavButton from '../../components/navButton'

export default function Layout({ children }) {
    return (
            <div>
                <Header>Registrar</Header>
                <section className={ styles.container }>
                    <div className={ styles.navbarRegistro }>
                        <NavButton link="/registrar/emprestimos" titulo="Registro de Empréstimos" />
                        <NavButton link="/registrar/usuarios" titulo="Registro de Usuários" />
                        <NavButton link="/registrar/livros" titulo="Registro de Livros" />
                    </div>
                    
                </section>
                {children}
            </div>
    );
}