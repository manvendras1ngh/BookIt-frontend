import axios from "axios";
import type { FinalExperience } from "../utils/types";

const API_BASE_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const experienceApi = {
  getAllExperiences: async (): Promise<FinalExperience[]> => {
    const response = await api.get("/experience");
    return response.data.data.map(
      ({ _id, ...rest }: { _id: string; rest: FinalExperience }) => ({
        id: _id,
        ...rest,
      })
    );
  },

  getExperienceById: async (id: string): Promise<FinalExperience> => {
    const response = await api.get(`/experience/${id}`);
    const { _id, ...rest } = response.data.data;
    const formattedResponse = {
      id: _id,
      ...rest,
    };
    return formattedResponse;
  },
};

export const bookingApi = async (formData: any): Promise<string> => {
  const response = await api.post("/booking", formData);
  return response.data.bookingId;
};

type PromoResponse = {
  valid: boolean;
  discountAmount: number;
  message: string;
};

export const promoApi = async (code: string): Promise<PromoResponse> => {
  try {
    const response = await api.post("/promo/validate", { code });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {
        valid: false,
        discountAmount: 0,
        message: "Invalid promo code",
      };
    }
    throw error;
  }
};
