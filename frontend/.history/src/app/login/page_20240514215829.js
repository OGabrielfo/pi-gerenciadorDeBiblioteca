'use client'
import { useState } from 'react'
import { setCookie } from 'nookies'
import jwtSimple from 'jwt-simple'
import { useRouter } from 'next/router'
import styles from './login.module.css'
import Image from 'next/image'
import Logo from '../../assets/Logotipo.png'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Aqui você faria uma requisição para o seu servidor para autenticar o usuário
    // e receberia um token de autenticação. Como estamos apenas simulando, vou criar um token fictício.
    const mockUser = { id: '123', username: 'user', password: 'password' }

    if (username === mockUser.username && password === mockUser.password) {
      const token = jwtSimple.encode(mockUser, 'your-secret-key')

      // Armazenando o token de autenticação em um cookie
      setCookie(null, 'token', token, {
        maxAge: 6 * 30 * 24 * 60 * 60, // 6 meses
        path: '/',
      })

      // Redirecionando o usuário para a página de consulta após o login
      router.push('/consulta')
    } else {
      alert('Usuário ou senha incorretos')
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
            <input type="text" placeholder="Digite seu usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label className={styles.label}>
              <div className={styles.checkboxWrapper14}>
                <input id="s1-14" type="checkbox" className={styles.switch} />
                <label htmlFor="s1-14">Permanecer Conectado</label>
              </div>
            </label>
            <div className={styles.botao}>
              <button type="submit">Entrar</button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </body>
  )
}
