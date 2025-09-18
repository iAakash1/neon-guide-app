import React from 'react';
import { Layout, Space, Typography } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="glass-card border-t border-border/20 text-center py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <Text className="text-lg font-bold text-foreground">Career Advisor</Text>
            </div>
            <Text className="text-muted-foreground">
              AI-powered personalized career guidance for students and professionals.
            </Text>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <Text className="text-foreground font-semibold block mb-4">Quick Links</Text>
            <Space direction="vertical" size="small">
              <Link href="/questionnaire" className="text-muted-foreground hover:text-google-blue">
                Career Assessment
              </Link>
              <Link href="/plans" className="text-muted-foreground hover:text-google-blue">
                My Plans
              </Link>
              <Link href="/auth" className="text-muted-foreground hover:text-google-blue">
                Sign In
              </Link>
            </Space>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <Text className="text-foreground font-semibold block mb-4">Connect</Text>
            <Space size="large" className="mb-4">
              <Link 
                href="https://github.com" 
                target="_blank"
                className="text-muted-foreground hover:text-google-blue text-lg"
              >
                <GithubOutlined />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                className="text-muted-foreground hover:text-google-blue text-lg"
              >
                <TwitterOutlined />
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank"
                className="text-muted-foreground hover:text-google-blue text-lg"
              >
                <LinkedinOutlined />
              </Link>
            </Space>
            <div className="text-muted-foreground">
              <Text>support@careeradvisor.ai</Text>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <Text className="text-muted-foreground text-sm">
              © 2024 Career Advisor. All rights reserved.
            </Text>
            <Space split={<span className="text-border">•</span>}>
              <Link href="/privacy" className="text-muted-foreground hover:text-google-blue text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-google-blue text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-google-blue text-sm">
                Contact
              </Link>
            </Space>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;