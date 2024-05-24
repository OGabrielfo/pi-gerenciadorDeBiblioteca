'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './login.module.css'
import axios from 'axios'
import Image from 'next/image'
import Logo from '../../assets/Logotipo.png'
const API_URL = 'http://127.0.0.1:8000/api/login/'

export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [stayConnected, setStayConnected] = useState(false) // novo estado para a checkbox

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const dados = {
      username: email,
      password: password,
    }

    try {
      const response = await axios.post(API_URL, dados);
      
      if (response.status === 200) {
        router.push('/consulta');
        return response.data;
      }} catch (error) {
        setError('Usuário ou senha inválidos');
        throw error;
    }
  }

  return (
    <body className={styles.body}>
      <div className={styles.logo}>
        <Image className={styles.img} src={ Logo } alt="logo" />
      </div>
      <div className={styles.containerLogin}>
        <div className={styles.login}>
          <h1 className={styles.h1}>Login</h1>
          <form onSubmit={handleSubmit} className={styles.inputs}>
            <input type="text" placeholder="Digite seu usuário" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.inputPassword} type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className={styles.label}>
              <div className={styles.checkboxWrapper14}>
                <input id="s1-14" type="checkbox" className={styles.switch} checked={stayConnected} onChange={(e) => setStayConnected(e.target.checked)} /> {/* atualizado para usar o estado stayConnected */}
                <label htmlFor="s1-14">Permanecer Conectado</label>
              </div>
            </label>
            {error && <p>{error}</p>}
            <div className={styles.botao}>
              <button className={styles.button} type="submit">Entrar</button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </body>
  )
}