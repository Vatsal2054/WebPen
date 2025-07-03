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

  return (
    <main
      className="h-screen flex flex-col bg-gray-50"
      style={{ fontFamily: "Mona Sans, ui-sans-serif, system-ui" }}
    >
      {/* Header Section */}
      <header className="flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">Web Editor</h1>
            {fetching && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Loading code...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateLink}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate Link"
              )}
            </button>
          </div>
        </div>
        {generatedLink && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-green-800">
                Generated Link:
              </span>
              <a
                href={generatedLink}
                className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {generatedLink}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 gap-1 p-1">
        {/* Editor Section */}
        <section className="flex-1 flex flex-col min-w-0 bg-white rounded-lg shadow-sm border border-gray-200">
          <EditorTabs
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="flex-1 min-h-0">
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
        <section className="flex-1 flex flex-col min-w-0 bg-white rounded-lg shadow-sm border border-gray-200">
          <OutputWindow srcDoc={srcDoc} />
        </section>
      </div>
    </main>
  );
};

export default EditorPage;
