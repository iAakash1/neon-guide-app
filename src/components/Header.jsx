import React, { useState } from 'react';
import { Layout, Button, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header: AntHeader } = Layout;

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
      icon: <MenuOutlined />,
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

  const isActive = (path) => location.pathname === path;

  return (
    <AntHeader className="glass-card border-b border-border/20 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-google-blue to-google-green rounded-xl flex items-center justify-center glow-primary">
            <span className="text-white font-bold text-lg">CA</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground">Career Advisor</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Career Planning</p>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button
            type={isActive('/questionnaire') ? 'primary' : 'text'}
            onClick={() => navigate('/questionnaire')}
            className="font-medium"
          >
            Assessment
          </Button>
          {user && (
            <Button
              type={isActive('/plans') ? 'primary' : 'text'}
              onClick={() => navigate('/plans')}
              className="font-medium"
            >
              My Plans
            </Button>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Space className="cursor-pointer hover:bg-secondary/50 px-3 py-2 rounded-lg transition-colors">
                <Avatar 
                  size="default"
                  icon={<UserOutlined />}
                  className="bg-google-blue"
                />
                <span className="hidden sm:inline text-foreground font-medium">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </Space>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              onClick={() => navigate('/auth')}
              className="glow-hover font-medium px-6"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;