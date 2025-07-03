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
