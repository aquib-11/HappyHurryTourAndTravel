import React, { useState, useCallback } from 'react';
import { 
  Home, 
  User, 
  Settings, 
  Mail, 
  BarChart3, 
  Menu, 
  X 
} from 'lucide-react';

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const navItems = [
    { icon: Home, label: 'Dashboard', key: 'home' },
    { icon: BarChart3, label: 'Analytics', key: 'analytics' },
    { icon: User, label: 'Profile', key: 'profile' },
    { icon: Mail, label: 'Messages', key: 'messages' },
    { icon: Settings, label: 'Settings', key: 'settings' }
  ];

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleNavItemClick = useCallback((key) => {
    setActiveLink(key);
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Bottom Navigation */}
      <div className="
        bg-white 
        shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] 
        flex justify-around 
        items-center 
        h-16 
        px-4
        transition-all
        duration-300
        ease-in-out
      ">
        {navItems.slice(0, 4).map((item) => (
          <button 
            key={item.key}
            onClick={() => handleNavItemClick(item.key)}
            className={`
              flex flex-col 
              items-center 
              justify-center 
              w-full 
              py-2 
              transition-all 
              duration-300
              ${activeLink === item.key 
                ? 'text-blue-600 transform scale-105' 
                : 'text-gray-500'}
            `}
          >
            <div className={`
              w-10 h-10
              rounded-full
              flex
              items-center
              justify-center
              mb-1
              transition-all
              duration-300
              ${activeLink === item.key 
                ? 'bg-blue-50 scale-110' 
                : 'bg-transparent'}
            `}>
              <item.icon 
                className={`
                  w-6 h-6 
                  transition-all
                  duration-300
                  ${activeLink === item.key 
                    ? 'text-blue-600' 
                    : 'text-gray-500'}
                `} 
              />
            </div>
            <span className={`
              text-xs 
              transition-all 
              duration-300
              ${activeLink === item.key 
                ? 'font-semibold' 
                : 'font-normal'}
            `}>
              {item.label}
            </span>
          </button>
        ))}

        {/* More Options Button */}
        <button 
          onClick={toggleMenu}
          className="
            flex flex-col 
            items-center 
            justify-center 
            w-full 
            py-2 
            text-gray-500
            transition-all
            duration-300
          "
        >
          <div className="
            w-10 h-10
            rounded-full
            flex
            items-center
            justify-center
            mb-1
          ">
            <Menu className="w-6 h-6" />
          </div>
          <span className="text-xs">More</span>
        </button>
      </div>

      {/* Full Screen Overlay Menu */}
      {isMenuOpen && (
        <div 
          className="
            fixed 
            inset-0 
            bg-white 
            z-[60] 
            overflow-y-auto
            animate-fade-in
            pt-16
          "
        >
          {/* Close Button */}
          <button 
            onClick={toggleMenu}
            className="
              absolute 
              top-4 
              right-4 
              text-gray-600 
              p-2
              rounded-full
              bg-gray-100
              transition-all
              duration-300
            "
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full Menu Items */}
          <div className="
            grid 
            grid-cols-3 
            gap-4 
            p-4
            animate-slide-up
          ">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => handleNavItemClick(item.key)}
                className={`
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  p-4 
                  rounded-2xl 
                  transition-all 
                  duration-300
                  transform
                  ${activeLink === item.key 
                    ? 'bg-blue-50 scale-105 shadow-md' 
                    : 'bg-gray-50'}
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`
                  w-16 h-16 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  mb-3 
                  transition-all
                  duration-300
                  ${activeLink === item.key 
                    ? 'bg-blue-100 shadow-md' 
                    : 'bg-white shadow-sm'}
                `}>
                  <item.icon 
                    className={`
                      w-7 h-7 
                      transition-all
                      duration-300
                      ${activeLink === item.key 
                        ? 'text-blue-600 scale-110' 
                        : 'text-gray-500'}
                    `} 
                  />
                </div>
                <span className={`
                  text-sm 
                  transition-all 
                  duration-300
                  ${activeLink === item.key 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 font-normal'}
                `}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;