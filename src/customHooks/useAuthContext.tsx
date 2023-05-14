import { useContext } from "react";
import useLocalStorage from "@/customHooks/useLocalStorage";
import { createContext, ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type UserName = string | null;
interface AuthProviderProps {
  children: ReactNode;
  user: UserName;
}

export interface AuthContextType {
  user: UserName;
  login?: (userName: UserName) => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null });
export const AuthProvider = ({
  children,
  user: initialUser,
}: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<string | null>("user", initialUser);
  const navigate = useNavigate();

  const login = async (userName: string | null) => {
    setUser(userName);
    navigate("/home");
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ?? Fast refresh only works when a file only export components.
// Use a new file to share constant or functions between components.
export const useAuth = () => {
  return useContext(AuthContext);
};
