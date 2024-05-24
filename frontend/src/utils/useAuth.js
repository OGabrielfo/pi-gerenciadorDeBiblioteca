import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import { getAccessToken } from '@/utils/authService';

export const useAuth = () => {
    const [authData, setAuthData] = useState(null);
  
    useEffect(() => {
        if (typeof window !== 'undefined') { // Verifica se está no lado do cliente
          const accessToken = getAccessToken()
          if (!accessToken) {
            redirect('/login', 'replace')
          } else {
            setAuthData({ token: accessToken })
          }
        }
      }, []);
  
    return { authData }
  };