import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const defaultHTML = `<!-- Write your HTML here -->\n<div class='hello'>Hello, WebPen!</div>`;
const defaultCSS = `/* Write your CSS here */\n.hello { color: #6366f1; font-size: 2rem; text-align: center; }`;
const defaultJS = `// Write your JS here\ndocument.querySelector('.hello').onclick = () => alert('Hello from JS!');`;

const EditorContext = createContext<EditorState | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [js, setJs] = useState(defaultJS);
  const [activeTab, setActiveTab] = useState('html');

  return (
    <EditorContext.Provider value={{ html, css, js, activeTab, setHtml, setCss, setJs, setActiveTab }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within an EditorProvider');
  return context;
}; 