'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/authService';
import styles from './login.module.css'
import Image from 'next/image'
import Logo from '../../assets/Logotipo.png'

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [stayConnected, setStayConnected] = useState(false) // novo estado para a checkbox

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(username, password, stayConnected);
      router.push('/consulta');
    } catch (error) {
      setError('Usuário ou senha inválidos');
      throw error;
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.logo}>
        <Image priority={true} className={styles.img} src={ Logo } alt="logo" />
      </div>
      <div className={styles.containerLogin}>
        <div className={styles.login}>
          <h1 className={styles.h1}>Login</h1>
          <form onSubmit={handleSubmit} className={styles.inputs}>
            <input type="text" placeholder="Digite seu usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className={styles.inputPassword} type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className={styles.label}>
              <div className={styles.checkboxWrapper14}>
                <input id="s1-14" type="checkbox" className={styles.switch} checked={stayConnected} onChange={(e) => setStayConnected(e.target.checked)} /> {/* atualizado para usar o estado stayConnected */}
                <label htmlFor="s1-14">Permanecer Conectado</label>
              </div>
            </label>
            {error && <p>{error}</p>}
            <button className={styles.button} type="submit">Entrar</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}

export default LoginPage