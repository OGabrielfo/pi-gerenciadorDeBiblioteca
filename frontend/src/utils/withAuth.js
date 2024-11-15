import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/authService';

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
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
  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return ComponentWithAuth;
};

export default withAuth;