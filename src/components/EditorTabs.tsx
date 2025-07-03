import React from 'react';

interface Tab {
  key: string;
  label: string;
}

interface EditorTabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabKey: string) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex-shrink-0 flex bg-gray-50 border-b border-gray-200" style={{ fontFamily: 'Mona Sans, ui-sans-serif, system-ui' }}>
    {tabs.map((tab, index) => (
      <button
        key={tab.key}
        className={`px-4 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset relative ${
          activeTab === tab.key 
            ? 'text-blue-600 bg-white border-b-2 border-blue-600' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        onClick={() => setActiveTab(tab.key)}
        type="button"
        style={{
          borderTopLeftRadius: index === 0 ? '0.5rem' : 0,
          borderTopRightRadius: index === tabs.length - 1 ? '0.5rem' : 0,
        }}
      >
        {tab.label}
        {activeTab === tab.key && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
        )}
      </button>
    ))}
  </div>
);

export default EditorTabs;