import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialUserState } from "@/store/services/userSlice";
import { getUserDataWithAuthenticatedToken } from "@/customHooks/useAuth";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

getUserDataWithAuthenticatedToken().then((data) => {
  store.dispatch(initialUserState(data.data));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
