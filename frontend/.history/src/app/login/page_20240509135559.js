import styles from './login.module.css'
import Image from 'next/image'
import Logo from '../../assets/Logotipo.png'

export default function login() {
  return(
    <body className={styles.body}>
      <div className={styles.logo}>
        <Image className={styles.img} src={ Logo } alt="logo" />
      </div>
      <div className={styles.containerLogin}>
        <div className={styles.login}>
          <h1 className={styles.h1}>Login</h1>
          <div className={styles.inputs}>
            <input type="text" placeholder="Digite seu usuário"/>
            <input type="password" placeholder="Digite sua senha"/>
          </div>
          <label className={styles.label}>
          <div className={styles.checkboxWrapper14}>
              <input id="s1-14" type="checkbox" className={styles.switch} />
              <label for="s1-14">Permanecer Conectado</label>
          </div>
          </label>
          <div className={styles.botao}>
            <button>Entrar</button>
          </div>
          <br />
        </div>
      </div>
    </body>
  )
}