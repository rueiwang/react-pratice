import { useCallback, useContext } from "react";
import useLocalStorage from "@/customHooks/useLocalStorage";
import { createContext, ReactNode, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { now } from "lodash";

export type UserName = string | null;
interface AuthProviderProps {
  children: ReactNode;
  user: UserName;
}

interface LoginPayload {
  userName: UserName;
  password: string;
}
export interface AuthContextType {
  user: UserName;
  login?: (payload: LoginPayload) => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null });
export const AuthProvider = ({
  children,
  user: initialUser,
}: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<string | null>("user", initialUser);
  const [, setAccessToken] = useLocalStorage<number | null>(
    "accessToken",
    null
  );
  const [, setRefreshToken] = useLocalStorage<number | null>(
    "refreshToken",
    null
  );
  const navigate = useNavigate();

  // send request to /auth with userInfo 並，預期 response 為 accessToken+refreshToken 記錄 user+accessToken+refreshToken
  const login = useCallback(async ({ userName, password }: LoginPayload) => {
    const {
      data: { accessToken, refreshToken },
    } = await getAuthToken({ userName, password });
    setUser(userName);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    navigate("/home");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    navigate("/login", { replace: true });
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

interface ResponseData<T> {
  status: number;
  data: T;
}

interface AuTokenResponse {
  accessToken: number;
  refreshToken: number;
}

const getAuthToken = (userLoginInfo: LoginPayload) => {
  // mock fetch auth token from api
  return new Promise<ResponseData<AuTokenResponse>>((resolve) => {
    return setTimeout(() => {
      // accessToken 30 秒過期，refreshToken 120 秒過期
      const timestamp = now();
      const expiredTimeForAccess = timestamp + 30 * 1000;
      const expiredTimeForRefresh = timestamp + 120 * 1000;
      resolve({
        status: 200,
        data: {
          accessToken: expiredTimeForAccess,
          refreshToken: expiredTimeForRefresh,
        },
      });
    });
  });
};

// 檢查 timestamp 是否超過 now ? 401 : 200
const checkIsTokenExpired = (timeStamp: string): number => {
  const currentTime = now();
  return parseInt(timeStamp) !== undefined && currentTime > parseInt(timeStamp)
    ? 401
    : 200;
};

interface UserResponse {
  user: UserName;
}
export const getUserDataWithAuthenticatedToken =
  (): ResponseData<UserResponse> => {
    const result: ResponseData<UserResponse> = {
      status: 401,
      data: {
        user: null,
      },
    };

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      resetUserInfo();
      return result;
    }

    const status = checkIsTokenExpired(accessToken);
    if (status === 200) {
      result.status = 200;
      result.data.user = localStorage.getItem("user");
    } else if (status === 401) {
      // accessToken 已過期需要 refresh
      console.log("expired accessToke!");

      const newAccessToken = refreshAccessToken();
      if (!newAccessToken) return result;

      result.status = 200;
      result.data.user = localStorage.getItem("user");
    }

    return result;
  };

const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    resetUserInfo();
    return;
  }

  let newAccessToken = null;
  const status = checkIsTokenExpired(refreshToken);
  if (status === 200) {
    const timestamp = now();
    newAccessToken = timestamp + 30 * 1000;
    localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
  } else {
    console.log("expired refreshToken!");
    resetUserInfo();
  }

  return newAccessToken;
};

const resetUserInfo = () => {
  localStorage.setItem("accessToken", JSON.stringify(null));
  localStorage.setItem("user", JSON.stringify(null));
  localStorage.setItem("refreshToken", JSON.stringify(null));
};
