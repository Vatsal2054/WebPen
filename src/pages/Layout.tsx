import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout: React.FC = () => (
  <div className="h-screen w-full flex flex-col bg-gray-300 font-sans overflow-x-hidden">
    <Header />
    <Outlet />
  </div>
);

export default Layout; 