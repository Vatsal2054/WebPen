import { createContext, useContext } from 'react';

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

// Context type
export interface ApiContextType {
  saveCode: (data: SaveCodeRequest) => Promise<SaveCodeResponse>;
  getCode: (id: string) => Promise<GetCodeResponse>;
}

// Create context
export const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Custom hook to use the context
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};