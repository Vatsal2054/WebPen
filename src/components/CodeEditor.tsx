import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange }) => (
  <div className="h-full bg-white">
    <MonacoEditor
      height="100%"
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={onChange}
      options={{
        fontSize: 14,
        fontFamily: 'Geist-mono, ui-monospace, SFMono-Regular, monospace',
        minimap: { enabled: false },
        wordWrap: 'on',
        formatOnType: true,
        formatOnPaste: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        tabSize: 2,
        scrollBeyondLastLine: false,
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        autoIndent: 'full',
        lineNumbers: 'on',
        renderLineHighlight: 'line',
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        accessibilitySupport: 'on',
        theme: 'vs',
        padding: { top: 16, bottom: 16 },
        lineHeight: 1.6,
        letterSpacing: 0.5,
        folding: true,
        foldingHighlight: true,
        showFoldingControls: 'mouseover',
        bracketPairColorization: { enabled: true },
        guides: {
          indentation: true,
          highlightActiveIndentation: true,
          bracketPairs: true,
          bracketPairsHorizontal: true,
        },
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
          useShadows: false,
        },
      }}
      theme="vs"
    />
  </div>
);

export default CodeEditor;