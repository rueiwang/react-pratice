import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, userLogout } from "@/features/userSlice";
import useLocalStorage from "@/customHooks/useLocalStorage";

import { now } from "lodash";
import { AppDispatch, RootState } from "@/store";

export type UserName = string | null;

export interface LoginPayload {
  userName: UserName;
  password: string;
}

interface ResponseData<T> {
  status: number;
  data: T;
}

export interface AuTokenResponse {
  user: UserName;
  accessToken: number | null;
  refreshToken: number | null;
}

export const getAuthToken = async (userLoginInfo: LoginPayload) => {
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
          user: userLoginInfo.userName,
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

export const getUserDataWithAuthenticatedToken = async (): Promise<
  ResponseData<AuTokenResponse>
> => {
  const result: ResponseData<AuTokenResponse> = {
    status: 401,
    data: {
      user: null,
      accessToken: null,
      refreshToken: null
    },
  };
 
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return result;
  }

  const status = checkIsTokenExpired(accessToken);
  if (status === 200) {
    result.status = 200;
    result.data.user = JSON.parse(localStorage.getItem("user") as string);    
    result.data.refreshToken = JSON.parse(localStorage.getItem("refreshToken") as string)
    result.data.accessToken = JSON.parse(localStorage.getItem("accessToken") as string)
  } else if (status === 401) {
    // accessToken 已過期需要 refresh
    console.log("expired accessToke!");

    const newAccessToken = refreshAccessToken();
    if (newAccessToken === null) return result;

    result.status = 200;
    result.data.user = JSON.parse(localStorage.getItem("user") as string);
    result.data.refreshToken = JSON.parse(localStorage.getItem("refreshToken") as string)
    result.data.accessToken = newAccessToken
  }
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve(result);
    }, 300);
  });
};

const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    return null
  }

  let newAccessToken = null;
  const status = checkIsTokenExpired(refreshToken);
  if (status === 200) {
    const timestamp = now();
    newAccessToken = timestamp + 30 * 1000;
  } else {
    console.log("expired refreshToken!");
  }

  return newAccessToken;
};

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.user.name);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.user.refreshToken
  );
  const status = useSelector((state: RootState) => state.user.requestStatus);

  const [, setNameInLocalStorage] = useLocalStorage("user", userName);
  const [, setAccessTokenInLocalStorage] = useLocalStorage(
    "accessToken",
    accessToken
  );
  const [, setRefreshTokenInLocalStorage] = useLocalStorage(
    "refreshToken",
    refreshToken
  );
  useEffect(() => {
    setNameInLocalStorage(userName);
    setAccessTokenInLocalStorage(accessToken);
    setRefreshTokenInLocalStorage(refreshToken);
  }, [accessToken]);

  const login = (loginInput: LoginPayload) => {
    dispatch(userLogin(loginInput));
  };
  const logout = () => {
    dispatch(userLogout());
  };

  const isInitialized = status === undefined;
  const isLoading = status === "pending";
  const isError = status === "failed";
  const isSuccess = status === "success";

  return { login, logout, userName, isLoading, isError, isSuccess, isInitialized };
};
