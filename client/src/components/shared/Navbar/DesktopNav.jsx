import React, { useState } from 'react';
import { Home, User, Settings, Mail, BarChart3 } from 'lucide-react';

const DesktopNav = () => {
  const [activeLink, setActiveLink] = useState('home');

  const navItems = [
    { icon: Home, label: 'Home', key: 'home' },
    { icon: User, label: 'Profile', key: 'profile' },
    { icon: BarChart3, label: 'Analytics', key: 'analytics' },
    { icon: Mail, label: 'Messages', key: 'messages' },
    { icon: Settings, label: 'Settings', key: 'settings' }
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 hover:w-48 bg-gray-800 text-white transition-all duration-300 ease-in-out group">
      <div className="flex flex-col h-full py-4">
        {navItems.map((item) => (
          <div 
            key={item.key}
            className={`
              flex items-center px-4 py-3 cursor-pointer 
              hover:bg-gray-700 transition-colors 
              ${activeLink === item.key ? 'bg-blue-600' : ''}
            `}
            onClick={() => setActiveLink(item.key)}
          >
            <item.icon className="w-6 h-6 mr-4" />
            <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DesktopNav;