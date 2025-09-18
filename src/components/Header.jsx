import React, { useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  MenuOutlined, 
  RocketOutlined,
  BulbOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile')
    },
    {
      key: 'plans',
      icon: <BulbOutlined />,
      label: 'My Plans',
      onClick: () => navigate('/plans')
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      onClick: handleSignOut
    },
  ];

  const navigationItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/questionnaire', label: 'Assessment', icon: <RocketOutlined /> },
    { path: '/plans', label: 'Plans', icon: <BulbOutlined /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-google-blue to-google-green flex items-center justify-center shadow-elevation-2 group-hover:shadow-elevation-3 transition-all duration-300">
                  <span className="text-white font-bold text-lg">CA</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-google-blue to-google-green opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold text-foreground group-hover:text-google-blue transition-colors">
                  Career Advisor
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Planning</p>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    relative px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2
                    ${isActive(item.path)
                      ? 'text-google-blue bg-google-blue/10 shadow-elevation-1' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-google-blue rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              
              {/* Assessment CTA for non-users */}
              {!user && (
                <button
                  onClick={() => navigate('/questionnaire')}
                  className="hidden sm:inline-flex material-button material-button-secondary text-sm"
                >
                  <RocketOutlined className="mr-1" />
                  Try Assessment
                </button>
              )}

              {/* User Menu or Sign In */}
              {user ? (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                  overlayClassName="header-dropdown"
                >
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group">
                    <Avatar 
                      size={32}
                      icon={<UserOutlined />}
                      className="shadow-elevation-1 group-hover:shadow-elevation-2 transition-shadow"
                      style={{ 
                        backgroundColor: 'hsl(var(--google-blue))',
                        border: '2px solid hsl(var(--border))'
                      }}
                    />
                    <span className="hidden sm:inline text-foreground font-medium text-sm">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="material-button material-button-primary"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                {mobileMenuVisible ? (
                  <CloseOutlined className="text-foreground" />
                ) : (
                  <MenuOutlined className="text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuVisible && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuVisible(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border/20 shadow-elevation-4 z-50 lg:hidden animate-slide-up">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuVisible(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                      ${isActive(item.path)
                        ? 'text-google-blue bg-google-blue/10 shadow-elevation-1' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                
                {!user && (
                  <div className="pt-4 border-t border-border/20 mt-4">
                    <button
                      onClick={() => {
                        navigate('/auth');
                        setMobileMenuVisible(false);
                      }}
                      className="w-full material-button material-button-primary justify-center"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;