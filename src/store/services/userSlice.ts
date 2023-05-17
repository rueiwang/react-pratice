import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken, LoginPayload } from "@/customHooks/useAuth";

export interface UserState {
  name: string | null;
  accessToken: number | null;
  refreshToken: number | null;
  requestStatus: "initialized" | "pending" | "success" | "failed" | undefined;
  error: { payload: any } | null;
}

const initialState: UserState = {
  name: null,
  accessToken: null,
  refreshToken: null,
  requestStatus: undefined,
  error: null,
};

export const userLogin = createAsyncThunk(
  "user/login", // action type
  async ({ userName, password }: LoginPayload, { rejectWithValue }) => {
    const response = await getAuthToken({ userName, password });
    if (response.status !== 200) {
      return rejectWithValue("使用者尚未註冊");
    }
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialUserState: (state, action) => {
      state.requestStatus = "initialized";
      state.name = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    userLogout: (state) => {
      // 因為 redux toolkit 用了 immer 才可以用會直接 mutate object 的方式更改 state
      state.name = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.requestStatus = "pending";
    }),
      builder.addCase(userLogin.fulfilled, (state, action) => {
        state.requestStatus = "success";
        state.name = action.meta.arg.userName;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }),
      builder.addCase(userLogin.rejected, (state) => {
        state.requestStatus = "failed";
      });
  },
});

export const { userLogout, initialUserState } = userSlice.actions;
export default userSlice.reducer;
