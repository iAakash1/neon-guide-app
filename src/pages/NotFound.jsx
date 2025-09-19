import React from 'react';
import { Button, Typography, Card } from 'antd';
import { HomeOutlined, RocketOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="glass-card text-center p-8">
          {/* Animated 404 */}
          <div className="mb-8">
            <div className="text-8xl lg:text-9xl font-display font-bold text-google-gradient animate-pulse">
              404
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-google-blue to-google-green mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-4 mb-8">
            <Title level={2} className="text-foreground mb-2">
              Oops! Page not found
            </Title>
            <Text className="text-muted-foreground text-lg block">
              The page you're looking for doesn't exist or has been moved.
            </Text>
          </div>

          <div className="space-y-4">
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate('/')}
              className="material-button material-button-primary w-full glow-primary"
            >
              Return to Home
            </Button>
            
            <Button
              size="large"
              icon={<RocketOutlined />}
              onClick={() => navigate('/questionnaire')}
              className="material-button material-button-secondary w-full"
            >
              Start Career Assessment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;