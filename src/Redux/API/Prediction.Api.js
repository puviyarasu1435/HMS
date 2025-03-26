import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PredictionApi = createApi({
  reducerPath: "PredictionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://56e2-2405-201-e039-f062-e8fd-2121-5619-9dc.ngrok-free.app" }),
  endpoints: (builder) => ({
    predict: builder.mutation({
      query: (data) => ({
        url: "/predict",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePredictMutation } = PredictionApi;
