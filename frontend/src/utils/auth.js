import { useEffect } from 'react';
import Router from 'next/router';
import { useAuth } from './AuthProvider';

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const { authData } = useAuth();

    useEffect(() => {
      // Verifica se o usuário está autenticado
      if (!authData) {
        Router.push('/login'); // Redireciona para a página de login
      }
    }, [authData]);

    // Renderiza o componente envolvido se o usuário estiver autenticado
    return authData ? <WrappedComponent {...props} /> : null;
  };

  return Auth;
};

export default withAuth;