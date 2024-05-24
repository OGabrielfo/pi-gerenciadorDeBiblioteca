import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000/api/auth/login/';

export const login = async (username, password, stayConnected) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    const { access, refresh } = response.data;

    // Salvar tokens nos cookies se for true
    if (stayConnected){
        Cookies.set('accessToken', access, { expires: 7 }); // expira em 7 dia
        Cookies.set('refreshToken', refresh, { expires: 30 }); // expira em 30 dias
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