import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/authService';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const accessToken = getAccessToken();

    useEffect(() => {
      if (!accessToken) {
        router.push('/login');
      }
    }, [accessToken, router]);

    if (!accessToken) {
      return <div>Carregando...</div>; // Ou qualquer mensagem de carregamento
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;