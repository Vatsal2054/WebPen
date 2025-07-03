import React from 'react';

interface OutputWindowProps {
  srcDoc: string;
}

const OutputWindow: React.FC<OutputWindowProps> = ({ srcDoc }) => (
  <div className="flex flex-col h-full min-h-0">
    {/* Header */}
    <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200" style={{ fontFamily: 'Mona Sans, ui-sans-serif, system-ui' }}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-medium text-gray-700">Preview</span>
      </div>
      <span className="text-xs text-gray-500">Live Output</span>
    </div>
    
    {/* Content */}
    <div className="flex-1 min-h-0 bg-white">
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        sandbox="allow-scripts allow-same-origin allow-modals"
        frameBorder="0"
        className="w-full h-full border-0 bg-white"
        style={{ 
          minHeight: 0, 
          height: '100%',
          colorScheme: 'light'
        }}
      />
    </div>
  </div>
);

export default OutputWindow;