import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PredictionApi = createApi({
  reducerPath: "PredictionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hms-api-ibja.onrender.com" }),
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
