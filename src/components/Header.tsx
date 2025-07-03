import React from 'react';

const Header: React.FC = () => (
  <header className="w-full px-6 py-4 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
    <div className="flex items-center gap-2">
      <span className="text-2xl font-extrabold tracking-tight text-blue-600 select-none">WebPen</span>
    </div>
  </header>
);

export default Header; 