import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from "./Slice/UserSlice";
import { UserApi } from "./API/User.Api";
import { PredictionApi } from "./API/Prediction.Api";

export const store = configureStore({
  reducer: {
    UserState: UserSlice.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [PredictionApi.reducerPath]: PredictionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApi.middleware,PredictionApi.middleware),
});

setupListeners(store.dispatch);
