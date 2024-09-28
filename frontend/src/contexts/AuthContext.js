import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role"); // Added role retrieval
    return token ? { token, id: userId, role } : null;
  });
  const [loading, setLoading] = useState(true);

  const register = async (email, password, role) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email,
        password,
        role,
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error; // Optionally handle this in your component
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );
      const { token, role, userId } = response.data;
      setUser({ token, role, id: userId });
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role); // Store role in local storage
      return { token, role };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role"); // Remove role as well
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (token) {
      setUser({ token, id: userId, role });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
