// auth/auth-context.tsx
import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
}

export interface IAuthContext {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("admin");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);;
        
        setUser(parsedUser);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export {AuthContext};