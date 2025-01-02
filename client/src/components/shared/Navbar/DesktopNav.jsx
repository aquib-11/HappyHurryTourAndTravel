import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Settings, 
  Mail, 
  BarChart3, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

const DesktopNav = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', key: 'home', tooltip: 'Overview of your workspace' },
    { icon: BarChart3, label: 'Analytics', key: 'analytics', tooltip: 'Detailed performance metrics' },
    { icon: User, label: 'Profile', key: 'profile', tooltip: 'Manage your account' },
    { icon: Mail, label: 'Messages', key: 'messages', tooltip: 'Your communication hub' },
    { icon: Settings, label: 'Settings', key: 'settings', tooltip: 'Configure preferences' }
  ];

  const toggleNavExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav 
      className={`
        fixed left-0 top-0 h-full 
        bg-white 
        shadow-xl 
        transition-[width] duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'}
        lg:flex flex-col
        overflow-hidden
        hidden 
        z-50
      `}
      onMouseEnter={toggleNavExpansion}
      onMouseLeave={toggleNavExpansion}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center border-b border-gray-200">
        <div className={`
          flex items-center space-x-2
          transition-transform duration-300 ease-in-out
          ${isExpanded ? 'translate-x-0 scale-100' : 'translate-x-0 scale-90'}
        `}>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className={`
            font-semibold text-gray-800 text-lg
            transition-[opacity,transform] duration-300 ease-in-out
            ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
            whitespace-nowrap
          `}>
            AppName
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-grow overflow-hidden">
        {navItems.map((item) => (
          <div 
            key={item.key}
            className={`
              group relative 
              ${activeLink === item.key ? 'bg-blue-50' : 'hover:bg-gray-50'}
              cursor-pointer 
              transition-colors duration-200
              px-4 py-3 
              flex items-center
            `}
            onClick={() => setActiveLink(item.key)}
          >
            {/* Icon */}
            <div className={`
              w-12 h-12 
              ${activeLink === item.key ? 'bg-blue-100' : 'bg-gray-100'}
              rounded-lg 
              flex items-center justify-center
              transition-all duration-200
              group-hover:bg-blue-100
              transform 
              group-hover:scale-105
              shrink-0
            `}>
              <item.icon 
                className={`
                  w-6 h-6 
                  ${activeLink === item.key ? 'text-blue-600' : 'text-gray-500'}
                  group-hover:text-blue-600
                  transition-colors duration-200
                `} 
              />
            </div>

            {/* Label and Tooltip */}
            <div className={`
              ml-4 
              flex-grow
              transition-[opacity,transform] duration-300 ease-in-out
              ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
              overflow-hidden
            `}>
              <span className={`
                font-medium
                ${activeLink === item.key ? 'text-blue-600' : 'text-gray-700'}
                transition-colors duration-200
                block
                whitespace-nowrap
              `}>
                {item.label}
              </span>
              <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                {item.tooltip}
              </p>
            </div>

            {/* Hover Tooltip for Collapsed State */}
            {!isExpanded && (
              <div className="
                absolute left-full ml-2 
                bg-gray-800 text-white 
                text-sm px-3 py-2 rounded 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-200
                pointer-events-none
                z-10
                whitespace-nowrap
              ">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expansion Toggle */}
      <div 
        className="
          h-16 
          flex items-center justify-center 
          border-t border-gray-200 
          cursor-pointer 
          hover:bg-gray-100
          transition-colors duration-200
        "
        onClick={toggleNavExpansion}
      >
        {isExpanded 
          ? <ChevronLeft className="w-6 h-6 text-gray-600 transition-transform duration-200 hover:scale-110" /> 
          : <ChevronRight className="w-6 h-6 text-gray-600 transition-transform duration-200 hover:scale-110" />
        }
      </div>
    </nav>
  );
};

export default DesktopNav;