import React from "react";
import EditorTabs from "../components/EditorTabs";
import CodeEditor from "../components/CodeEditor";
import OutputWindow from "../components/OutputWindow";
import { useEditor } from "../context/EditorContext";
import { useApi } from "../context/ApiContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type TabKey = "html" | "css" | "js";

const TABS: { key: TabKey; label: string; language: string }[] = [
  { key: "html", label: "HTML", language: "html" },
  { key: "css", label: "CSS", language: "css" },
  { key: "js", label: "JavaScript", language: "javascript" },
];

const EditorPage: React.FC = () => {
  const { html, css, js, activeTab, setHtml, setCss, setJs, setActiveTab } =
    useEditor();
  const typedActiveTab = activeTab as TabKey;
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
          setHtml(data.html || "");
          setCss(data.css || "");
          setJs(data.js || "");
        })
        .finally(() => setFetching(false));
    }
    // eslint-disable-next-line
  }, [id]);

  const codes = { html, css, js };
  const setCode = {
    html: setHtml,
    css: setCss,
    js: setJs,
  };

  const srcDoc = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (error) {
      console.error('JavaScript Error:', error);
    }
  </script>
</body>
</html>`;

  const handleGenerateLink = async () => {
    setLoading(true);
    setGeneratedLink(null);
    try {
      const res = await saveCode({
        type: "codepen",
        html,
        css,
        js,
      });
      if (res && res.id) {
        setGeneratedLink(`${window.location.origin}/editor/${res.id}`);
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
    const currentCode = codes[typedActiveTab];
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopySuccess("Code copied!");
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.log(err);
      setCopySuccess("Failed to copy");
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const handleDownload = () => {
    const currentCode = codes[typedActiveTab];
    const extensions = { html: 'html', css: 'css', js: 'js' };
    const filename = `code.${extensions[typedActiveTab]}`;
    
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    const zip = `
<!-- HTML -->
${html}

/* CSS */
${css}

// JavaScript
${js}
`;
    
    const blob = new Blob([zip], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'web-project.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main
      className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      {/* Header Section */}
      <header className="flex-shrink-0 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Web Editor</h1>
            </div>
            {fetching && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-medium text-blue-700">Loading...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Code
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            <button
              onClick={handleDownloadAll}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Download All
            </button>
            <button
              onClick={handleGenerateLink}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg"
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
          <div className="mt-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm font-semibold text-green-800">Generated Link:</span>
                <a
                  href={generatedLink}
                  className="text-sm text-blue-600 hover:text-blue-800 underline truncate flex-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {generatedLink}
                </a>
              </div>
              <button
                onClick={handleCopyLink}
                className="ml-3 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center gap-1 flex-shrink-0"
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

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 gap-4 p-4 md:flex-row flex-col">
        {/* Editor Section */}
        <section className="flex-1 flex flex-col min-w-0 min-h-[60vh] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50">
          <EditorTabs
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="flex-1 min-h-0 rounded-b-xl overflow-hidden">
            <CodeEditor
              language={
                TABS.find((t) => t.key === typedActiveTab)?.language || "html"
              }
              value={codes[typedActiveTab]}
              onChange={(value) => setCode[typedActiveTab](value ?? "")}
            />
          </div>
        </section>

        {/* Preview Section */}
        <section className="flex-1 flex flex-col min-w-0 min-h-[60vh] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50">
          <OutputWindow srcDoc={srcDoc} />
        </section>
      </div>
    </main>
  );
};

export default EditorPage;