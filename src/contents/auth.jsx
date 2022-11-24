import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoverdUser = localStorage.getItem("user");
    if (recoverdUser) {
      setUser(JSON.parse(recoverdUser));
    }
    setLoading(false);
  }, []);

  const login = async (user, email, senha) => {
    //criar uma session na api
    const loggedUser = {
      user,
      email,
    };
    const response = await api.usuarioAuth({emailLogin: email, senha: senha})

    const token = response.data.data.token

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", JSON.stringify(token));

    /* api.defaults.headers.Authorization = `Bearer ${token}` */

    setUser({ user, email, token });
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    /* api.defaults.headers.Authorization = null */
    setUser(null);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
