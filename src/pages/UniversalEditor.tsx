import React, { useRef, useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import { useApi } from "../context/ApiContext";
import { useParams } from "react-router-dom";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "jsx", label: "JSX" },
  { value: "typescript", label: "TypeScript" },
  { value: "tsx", label: "TSX" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "rust", label: "Rust" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
  { value: "shell", label: "Shell" },
  { value: "yaml", label: "YAML" },
  { value: "xml", label: "XML" },
  { value: "plaintext", label: "Plain Text" },
];

const UniversalEditor: React.FC = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { saveCode, getCode } = useApi();
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      setFetching(true);
      getCode(id)
        .then((data) => {
          setCode(data.content || "");
          setLanguage(data.fileType || "plaintext");
        })
        .finally(() => setFetching(false));
    }
    // eslint-disable-next-line
  }, [id]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    setCode(text);
    // Try to auto-detect language from file extension
    const ext = file.name.split(".").pop()?.toLowerCase();
    const langExists = LANGUAGES.find((lang) => lang.value === ext);
    if (ext && langExists) setLanguage(ext);
  };

  const handleGenerateLink = async () => {
    setLoading(true);
    setGeneratedLink(null);
    try {
      const res = await saveCode({
        type: "pastebin",
        content: code,
        fileType: language,
        extension: fileName ? fileName.split(".").pop() : "",
      });
      if (res && res.id) {
        setGeneratedLink(`${window.location.origin}/universal/${res.id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (generatedLink) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        setCopySuccess("Link copied!");
        setTimeout(() => setCopySuccess(null), 2000);
      } catch (err) {
        console.log(err);
        setCopySuccess("Failed to copy");
        setTimeout(() => setCopySuccess(null), 2000);
      }
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess("Code copied!");
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.log(err);
      setCopySuccess("Failed to copy");
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const handleDownload = () => {
    const getFileExtension = (lang: string) => {
      const extensions: { [key: string]: string } = {
        javascript: 'js',
        jsx: 'jsx',
        typescript: 'ts',
        tsx: 'tsx',
        python: 'py',
        java: 'java',
        c: 'c',
        cpp: 'cpp',
        csharp: 'cs',
        go: 'go',
        php: 'php',
        ruby: 'rb',
        rust: 'rs',
        html: 'html',
        css: 'css',
        json: 'json',
        markdown: 'md',
        shell: 'sh',
        yaml: 'yaml',
        xml: 'xml',
        plaintext: 'txt'
      };
      return extensions[lang] || 'txt';
    };

    const extension = getFileExtension(language);
    const filename = fileName || `code.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getLanguageIcon = (lang: string) => {
    const icons: { [key: string]: string } = {
      javascript: "🟨",
      jsx: "⚛️",
      typescript: "🔷",
      tsx: "⚛️",
      python: "🐍",
      java: "☕",
      c: "⚙️",
      cpp: "⚙️",
      csharp: "🟦",
      go: "🐹",
      php: "🐘",
      ruby: "💎",
      rust: "🦀",
      html: "🌐",
      css: "🎨",
      json: "📋",
      markdown: "📝",
      shell: "🐚",
      yaml: "📄",
      xml: "📄",
      plaintext: "📝"
    };
    return icons[lang] || "📄";
  };

  // Map language to file extension(s) for file input
  const languageToExtension: { [key: string]: string } = {
    javascript: '.js',
    jsx: '.jsx',
    typescript: '.ts',
    tsx: '.tsx',
    python: '.py',
    java: '.java',
    c: '.c',
    cpp: '.cpp',
    csharp: '.cs',
    go: '.go',
    php: '.php',
    ruby: '.rb',
    rust: '.rs',
    html: '.html',
    css: '.css',
    json: '.json',
    markdown: '.md',
    shell: '.sh',
    yaml: '.yaml,.yml',
    xml: '.xml',
    plaintext: '.txt',
  };

  return (
    <main
      className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Header Section */}
      <header className="flex-shrink-0 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Universal Code Editor</h1>
            </div>
            {fetching && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full">
                <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-medium text-purple-700">Loading...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Code
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            <button
              onClick={handleGenerateLink}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Generate Link
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Success Message */}
        {copySuccess && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-sm font-medium text-green-800">{copySuccess}</span>
            </div>
          </div>
        )}
        
        {/* Generated Link */}
        {generatedLink && (
          <div className="mt-3 p-4 bg-gradient-to-r from-green-50 to-purple-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm font-semibold text-green-800">Generated Link:</span>
                <a
                  href={generatedLink}
                  className="text-sm text-purple-600 hover:text-purple-800 underline truncate flex-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {generatedLink}
                </a>
              </div>
              <button
                onClick={handleCopyLink}
                className="ml-3 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-100 border border-purple-300 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 flex items-center gap-1 flex-shrink-0"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Toolbar Section */}
      <section className="flex-shrink-0 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200/80">
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getLanguageIcon(language)}</span>
              <label
                htmlFor="language-select"
                className="text-sm font-semibold text-gray-700"
              >
                Language:
              </label>
            </div>
            <select
              id="language-select"
              title="Select language"
              className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm font-medium transition-all duration-200"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div className="flex items-center gap-3">
            <input
              id="file-upload"
              type="file"
              title="Upload code file"
              accept={languageToExtension[language] || '.txt'}
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={handleFileButtonClick}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload File
            </button>
            {fileName && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm text-purple-800 font-medium">
                  {fileName}
                </span>
                <button
                  title="Remove File"
                  onClick={() => {
                    setFileName(null);
                    setCode("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-purple-600 hover:text-purple-800 ml-1 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Editor Section */}
      <section className="flex-1 flex flex-col min-h-0 p-4">
        <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="h-full">
            <CodeEditor
              language={language}
              value={code}
              onChange={(value) => setCode(value ?? "")}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default UniversalEditor;