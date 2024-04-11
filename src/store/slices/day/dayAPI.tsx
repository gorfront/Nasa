import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDay = createAsyncThunk(
  "day/fetchDay",
  async function (year: string) {
    const res = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=hehDOk2wSfjKt28ZSEfiwc6m9C9XIJRhyheh0glX&date=${year}`
    );
    const data = res.data;

    return data;
  }
);
