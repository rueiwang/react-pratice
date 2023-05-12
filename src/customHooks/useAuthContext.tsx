import useLocalStorage from "@/customHooks/useLocalStorage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

type UserName = string | null;
export interface AuthContextType {
  user: UserName;
  login: (userName: UserName) => void;
  logout: () => void;
}
// default value only return when provider not find, so I set default value as undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<string | null>("user", null);
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

// Fast refresh only works when a file only export components.
// Use a new file to share constant or functions between components.
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
