import React, { useRef, useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import { useApi } from '../context/ApiContext';
import { useParams } from 'react-router-dom';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'rust', label: 'Rust' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'shell', label: 'Shell' },
  { value: 'yaml', label: 'YAML' },
  { value: 'xml', label: 'XML' },
  { value: 'plaintext', label: 'Plain Text' }
];

const UniversalEditor: React.FC = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { saveCode, getCode } = useApi();
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      setFetching(true);
      getCode(id)
        .then(data => {
          setCode(data.content || '');
          setLanguage(data.fileType || 'plaintext');
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
    const ext = file.name.split('.').pop()?.toLowerCase();
    const langExists = LANGUAGES.find(lang => lang.value === ext);
    if (ext && langExists) setLanguage(ext);
  };

  const handleGenerateLink = async () => {
    setLoading(true);
    setGeneratedLink(null);
    try {
      const res = await saveCode({
        type: 'pastebin',
        content: code,
        fileType: language,
        extension: fileName ? fileName.split('.').pop() : ''
      });
      if (res && res.id) {
        setGeneratedLink(`${window.location.origin}/universal/${res.id}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="h-screen flex flex-col bg-gray-50" style={{ fontFamily: 'Mona Sans, ui-sans-serif, system-ui' }}>
      {/* Header Section */}
      <header className="flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">Universal Code Editor</h1>
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
                'Generate Link'
              )}
            </button>
          </div>
        </div>
        {generatedLink && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-green-800">Generated Link:</span>
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

      {/* Toolbar Section */}
      <section className="flex-shrink-0 px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
              Language:
            </label>
            <select
              id="language-select"
              title="Select language"
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div className="flex items-center gap-2">
            <input
              id="file-upload"
              type="file"
              title="Upload code file"
              accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cs,.go,.php,.rb,.rs,.html,.css,.json,.md,.sh,.yaml,.yml,.xml,.txt"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={handleFileButtonClick}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload File
            </button>
            {fileName && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-blue-800 font-medium">{fileName}</span>
                <button
                  title='Remove File'
                  onClick={() => {
                    setFileName(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Editor Section */}
      <section className="flex-1 flex flex-col min-h-0 p-1">
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-full">
            <CodeEditor
              language={language}
              value={code}
              onChange={setCode}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default UniversalEditor;