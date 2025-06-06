import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const API_URL = apiUrl+'/auth/login/';

export const login = async (username, password, stayConnected) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    const { access, refresh } = response.data;

    // Salvar tokens nos cookies se for true
    if (stayConnected){
        Cookies.set('accessToken', access, { expires: 7 }); // expira em 7 dia
        Cookies.set('refreshToken', refresh, { expires: 30 }); // expira em 30 dias
    } else {
      Cookies.set('accessToken', access, { expires: new Date(new Date().getTime() + 9 * 60 * 60 * 1000) }); // expira em 9 horas
      Cookies.set('refreshToken', refresh, { expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000) }); // expira em 12 horas
    }
  
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const fetchWithAuth = async (url, { method = 'GET', data, ...options } = {}) => {
  //console.log(data)
  const token = getAccessToken();
  if (!token) {
    throw new Error('No access token available');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  const requestOptions = {
    ...options,
    method,
    headers,
    body: ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && data
    ? JSON.stringify(data)
    : undefined,
  };

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};