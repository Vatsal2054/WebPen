import { createContext, useContext } from 'react';
interface EditorState {
  html: string;
  css: string;
  js: string;
  activeTab: string;
  setHtml: (value: string) => void;
  setCss: (value: string) => void;
  setJs: (value: string) => void;
  setActiveTab: (tab: string) => void;
}

export const EditorContext = createContext<EditorState | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within an EditorProvider');
  return context;
}; 