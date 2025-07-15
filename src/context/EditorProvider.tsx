import { useState } from "react";
import { EditorContext } from "./EditorContext";

const defaultHTML = `<!-- Write your HTML here -->\n<div class='hello'>Hello, WebPen!</div>`;
const defaultCSS = `/* Write your CSS here */\n.hello { color: #6366f1; font-size: 2rem; text-align: center; }`;
const defaultJS = `// Write your JS here\ndocument.querySelector('.hello').onclick = () => alert('Hello from JS!');`;

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [js, setJs] = useState(defaultJS);
  const [activeTab, setActiveTab] = useState("html");

  return (
    <EditorContext.Provider
      value={{ html, css, js, activeTab, setHtml, setCss, setJs, setActiveTab }}
    >
      {children}
    </EditorContext.Provider>
  );
};

