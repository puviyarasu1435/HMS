import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../API/User.Api";

const UserSlice = createSlice({
  name: "UserState",
  initialState: {
    patientId:"",
    userId: null,
    username: "",
    messages: [],
    predictions:{},
    age:0,
    role: "",
    isAuthenticated: false,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setPredictions: (state, action) => {
      console.log(action.payload)
      state.predictions = action.payload;
    },
    addPrediction: (state, action) => {
      state.predictions.push(action.payload);
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(UserApi.endpoints.fetchUsersByid.matchFulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      console.log(payload)
      // state.userId = payload.user_id;
      state.messages = payload.messages;
      state.predictions = payload.predictions;
      state.username = payload.username;
      state.role = payload.role;
      state.age = payload.age;
      state.patientId = payload.patientId;
    });
  },
});

export const {
  setUserId,
  setMessages,
  addMessage,
  setPredictions,
  addPrediction,
  setAuthenticated,
} = UserSlice.actions;

export default UserSlice;
