import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/authService';

export const useAuth = () => {
    const router = useRouter();
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Verifica se está no lado do cliente
          const accessToken = getAccessToken();
          if (!accessToken) {
            router.push('/login');
          } else {
            setAuthData({ token: accessToken });
          }
        }
      }, [router]);

  return { authData };
};