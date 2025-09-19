import React from 'react';
import { 
  GithubOutlined, 
  TwitterOutlined, 
  LinkedinOutlined, 
  MailOutlined,
  RocketOutlined,
  BulbOutlined,
  UserOutlined
} from '@ant-design/icons';

const Footer = () => {
  const quickLinks = [
    { href: '/questionnaire', label: 'Career Assessment', icon: <RocketOutlined /> },
    { href: '/plans', label: 'My Plans', icon: <BulbOutlined /> },
    { href: '/auth', label: 'Sign In', icon: <UserOutlined /> },
  ];

  const socialLinks = [
    { href: 'https://github.com', icon: <GithubOutlined />, label: 'GitHub' },
    { href: 'https://twitter.com', icon: <TwitterOutlined />, label: 'Twitter' },
    { href: 'https://linkedin.com', icon: <LinkedinOutlined />, label: 'LinkedIn' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-card/50 border-t border-border/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-google-blue to-google-green flex items-center justify-center shadow-elevation-2">
                    <span className="text-white font-bold text-lg">CA</span>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-google-blue to-google-green opacity-20 blur-lg"></div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    Career Advisor
                  </h3>
                  <p className="text-xs text-muted-foreground">AI-Powered Planning</p>
                </div>
              </div>
              
              <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
                Discover your ideal career path with AI-powered recommendations, 
                personalized learning plans, and expert guidance tailored to your unique goals.
              </p>
              
              {/* Contact */}
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MailOutlined className="text-google-blue" />
                <span className="text-sm">support@careeradvisor.ai</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-google-blue transition-colors group"
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Social & Community */}
            <div>
              <h4 className="text-foreground font-semibold mb-4">Connect</h4>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-google-blue/10 text-muted-foreground hover:text-google-blue transition-all duration-200 hover:scale-110"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Join our community of</p>
                  <p className="font-semibold text-google-blue">25,000+ students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2024 Career Advisor. All rights reserved. Made with ❤️ and AI
            </div>
            
            <nav className="flex items-center space-x-6">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-google-blue text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="text-border">•</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;