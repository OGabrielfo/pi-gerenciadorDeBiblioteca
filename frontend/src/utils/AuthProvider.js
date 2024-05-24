import React, { createContext, useContext, useState } from 'react';

// Crie o contexto de autenticação
const AuthContext = createContext();

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  // Função para definir os dados de autenticação
  const login = (userData) => {
    setAuthData(userData);
  };

  // Função para limpar os dados de autenticação
  const logout = () => {
    setAuthData(null);
  };

  // Fornece o contexto de autenticação para os componentes filhos
  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);