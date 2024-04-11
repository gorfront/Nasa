import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface AsteroidDetails {
  id: string;
  name: string;
  close_approach_data: { miss_distance: { kilometers: string } }[];
  absolute_magnitude_h: string;
  estimated_diameter: {
    kilometers: { estimated_diameter_max: string };
  };
  is_potentially_hazardous_asteroid: string;
  miss_distance_kilometers?: string;
  estimated_diameter_max_km?: string;
}

interface FetchNearbyArgs {
  startFormattedDate: string;
  endFormattedDate: string;
}

export const fetchNearby = createAsyncThunk<
  AsteroidDetails[],
  FetchNearbyArgs,
  {
    rejectValue: { error: string };
  }
>(
  "nearby/fetchNearby",
  async function (
    { startFormattedDate, endFormattedDate },
    { rejectWithValue }
  ) {
    try {
      const res: AxiosResponse<{
        near_earth_objects: Record<string, AsteroidDetails[]>;
      }> = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startFormattedDate}&end_date=${endFormattedDate}&api_key=hehDOk2wSfjKt28ZSEfiwc6m9C9XIJRhyheh0glX`
      );

      const data = Object.values(res.data.near_earth_objects)[0].map(
        (el: AsteroidDetails) => ({
          id: el.id,
          name: el.name,
          miss_distance_kilometers: (
            Math.round(
              Number(el.close_approach_data[0].miss_distance.kilometers) * 10
            ) / 10
          )
            .toFixed(1)
            .toString(),
          absolute_magnitude_h: el.absolute_magnitude_h,
          estimated_diameter_max_km: Number(
            el.estimated_diameter.kilometers.estimated_diameter_max
          )
            .toFixed(4)
            .toString(),
          is_potentially_hazardous_asteroid:
            el.is_potentially_hazardous_asteroid ? "Yes" : "No",
        })
      );
      console.log(data);

      return data as AsteroidDetails[];
    } catch (error) {
      console.error("Error fetching nearby asteroids:", error);
      return rejectWithValue({ error: "Failed to fetch nearby asteroids" });
    }
  }
);
