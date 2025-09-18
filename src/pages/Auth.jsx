import React, { useState } from 'react';
import { Card, Form, Input, Button, Tabs, Typography, Space, Divider, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  GoogleOutlined,
  GithubOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text, Link } = Typography;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const from = location.state?.from?.pathname || '/questionnaire';

  const handleSignIn = async (values) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
      message.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      message.error('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signUp(values.email, values.password, values.displayName);
      message.success('Account created successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      message.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider) => {
    // TODO: Implement social authentication when Firebase is connected
    message.info(`${provider} authentication will be available when Firebase is configured`);
  };

  const SignInForm = () => (
    <Form
      name="signin"
      onFinish={handleSignIn}
      layout="vertical"
      size="large"
      requiredMark={false}
    >
      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input 
          prefix={<MailOutlined />} 
          placeholder="Enter your email"
          className="glass-card"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          className="glass-card"
        />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-between items-center mb-4">
          <Link className="text-google-blue">Forgot password?</Link>
        </div>
        
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full glow-primary font-semibold"
          size="large"
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );

  const SignUpForm = () => (
    <Form
      name="signup"
      onFinish={handleSignUp}
      layout="vertical"
      size="large"
      requiredMark={false}
    >
      <Form.Item
        name="displayName"
        label="Full Name"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="Enter your full name"
          className="glass-card"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input 
          prefix={<MailOutlined />} 
          placeholder="Enter your email"
          className="glass-card"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please enter a password' },
          { min: 6, message: 'Password must be at least 6 characters' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Create a password"
          className="glass-card"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          { required: true, message: 'Please confirm your password' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm your password"
          className="glass-card"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full glow-primary font-semibold"
          size="large"
        >
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );

  const SocialButtons = () => (
    <div className="space-y-3">
      <Button
        size="large"
        className="w-full glass-card font-medium"
        icon={<GoogleOutlined />}
        onClick={() => handleSocialAuth('Google')}
      >
        Continue with Google
      </Button>
      <Button
        size="large"
        className="w-full glass-card font-medium"
        icon={<GithubOutlined />}
        onClick={() => handleSocialAuth('GitHub')}
      >
        Continue with GitHub
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-google-blue to-google-green rounded-xl flex items-center justify-center glow-primary">
              <span className="text-white font-bold text-lg">CA</span>
            </div>
            <Title level={2} className="text-foreground">Career Advisor</Title>
          </div>
          <Text className="text-muted-foreground text-lg">
            {activeTab === 'signin' ? 'Welcome back!' : 'Create your account'} Start your personalized career journey.
          </Text>
        </div>

        {/* Auth Card */}
        <Card className="glass-card shadow-2xl border border-border/20">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            items={[
              {
                key: 'signin',
                label: 'Sign In',
                children: (
                  <div>
                    <SignInForm />
                    <Divider className="text-muted-foreground">or continue with</Divider>
                    <SocialButtons />
                  </div>
                )
              },
              {
                key: 'signup',
                label: 'Sign Up',
                children: (
                  <div>
                    <SignUpForm />
                    <Divider className="text-muted-foreground">or continue with</Divider>
                    <SocialButtons />
                  </div>
                )
              }
            ]}
          />
        </Card>

        {/* Footer */}
        <div className="text-center">
          <Text className="text-muted-foreground text-sm">
            By continuing, you agree to our{' '}
            <Link className="text-google-blue">Terms of Service</Link>
            {' '}and{' '}
            <Link className="text-google-blue">Privacy Policy</Link>
          </Text>
        </div>

        {/* Development Note */}
        <div className="text-center p-4 glass-card rounded-lg">
          <Text className="text-yellow-500 text-sm block mb-2">
            🚧 Development Mode
          </Text>
          <Text className="text-muted-foreground text-xs">
            Firebase authentication is not configured. This is using mock authentication for development.
            Add your Firebase config to .env.local to enable real authentication.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Auth;