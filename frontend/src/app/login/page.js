import styles from './login.module.css'

export default function login() {
    return(
      <body className={styles.body}>
      <div className={styles.logo}>
        <img src="/LOGO.png" alt="logo" />
      </div>
      <div className={styles.container-login}>
        <div className={styles.login}>
          <h1>Login</h1>
          <div className={styles.inputs}>
            <input type="text" placeholder="Digite seu usuário" className="input-text" />
            <input type="password" placeholder="Digite sua senha" className="input-password" />
          </div>
          <label className="checkbox-label">
         <div className={styles.checkbox-wrapper-14}>
              <input id="s1-14" type="checkbox" className="switch" />
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
  );
}