import type { ReactNode } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ApiContext } from "./ApiContext";

export interface SaveCodeRequest {
    type: "codepen" | "pastebin";
    html?: string;
    css?: string;
    js?: string;
    content?: string;
    fileType?: string;
    extension?: string;
  }
  
  export interface GetCodeResponse {
    // For codepen type
    html?: string;
    css?: string;
    js?: string;
    // For pastebin type
    content?: string;
    fileType?: string;
    extension?: string;
    // Common fields
    type?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface SaveCodeResponse {
    id: string;
    message?: string;
  }

const API_BASE = import.meta.env.VITE_API_URL;

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // Save code (POST)
  const saveCode = async (data: SaveCodeRequest): Promise<SaveCodeResponse> => {
    // console.log("Saving code:", data);

    try {
      const response = await axios.post(`${API_BASE}/save`, data);
      toast.success("Link generated successfully!");
      // console.log("Save response:", response.data);
      return response.data as SaveCodeResponse;
    } catch (error) {
      console.error("Save code error:", error);

      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to save code";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to save code");
      }

      throw error;
    }
  };

  // Get code (GET)
  const getCode = async (id: string): Promise<GetCodeResponse> => {
    try {
      const response = await axios.get(`${API_BASE}/get/${id}`);
      // console.log("Get response:", response.data);

      return response.data as GetCodeResponse;
    } catch (error) {
      // console.error("Get code error:", error);

      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch code";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to fetch code");
      }

      throw error;
    }
  };

  const contextValue = {
    saveCode,
    getCode,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};
