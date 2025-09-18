import React from 'react';
import { Button, Typography, Card, Row, Col, Space, Statistic } from 'antd';
import { 
  RocketOutlined, 
  BulbOutlined, 
  TrophyOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph, Text } = Typography;

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <BulbOutlined className="text-4xl text-google-yellow" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your skills, interests, and goals to suggest personalized career paths tailored just for you."
    },
    {
      icon: <RocketOutlined className="text-4xl text-google-blue" />,
      title: "Personalized Learning Plans",
      description: "Get step-by-step learning plans with curated resources, timelines, and milestones to achieve your career goals."
    },
    {
      icon: <TrophyOutlined className="text-4xl text-google-green" />,
      title: "Track Your Progress",
      description: "Monitor your learning journey with detailed progress tracking and get interview preparation support."
    }
  ];

  const stats = [
    { title: "Students Helped", value: 25000, suffix: "+" },
    { title: "Career Paths", value: 150, suffix: "+" },
    { title: "Success Rate", value: 94, suffix: "%" },
    { title: "Partner Companies", value: 500, suffix: "+" }
  ];

  const benefits = [
    "Personalized career recommendations based on your profile",
    "Detailed learning roadmaps with timeline and resources",
    "Interview preparation and resume optimization",
    "Industry insights and salary expectations",
    "Continuous support and progress tracking"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 glow-google-colors opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Floating elements for visual interest */}
            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-google-blue/10 float-animation"></div>
            <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-google-green/10 float-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full bg-google-yellow/10 float-animation" style={{animationDelay: '4s'}}></div>
            
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-google-blue mr-2 animate-pulse"></span>
                AI-Powered Career Guidance
              </div>
              
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                  <span className="text-foreground">Your Future</span>
                  <br />
                  <span className="text-google-gradient">Starts Here</span>
                </h1>
                
                <p className="max-w-3xl mx-auto text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Discover your ideal career path with AI-powered recommendations, 
                  personalized learning plans, and expert guidance tailored to your unique goals.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <button
                  onClick={() => user ? navigate('/questionnaire') : navigate('/auth')}
                  className="material-button material-button-primary pulse-glow ripple-effect group"
                >
                  <RocketOutlined className="mr-2 group-hover:animate-bounce" />
                  {user ? 'Start Your Assessment' : 'Get Started Free'}
                  <ArrowRightOutlined className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button
                  onClick={() => navigate('/plans')}
                  className="material-button material-button-secondary scale-hover"
                >
                  <BulbOutlined className="mr-2" />
                  Explore Career Paths
                </button>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">Trusted by students worldwide</p>
                <div className="flex justify-center items-center space-x-8 text-2xl font-bold text-google-blue/30">
                  <span>25K+ Students</span>
                  <span>•</span>
                  <span>150+ Careers</span>
                  <span>•</span>
                  <span>94% Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="material-card p-6 text-center group cursor-pointer">
                <div className="text-3xl lg:text-4xl font-bold text-google-blue mb-2 group-hover:text-google-green transition-colors">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              How It <span className="text-google-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our intelligent platform guides you through a comprehensive career discovery process
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 text-center group cursor-pointer"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-google-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 gradient-google">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground">
                  Why Choose <span className="text-google-gradient">Career Advisor</span>?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Experience the future of career planning with our comprehensive platform.
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-card/50 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircleOutlined className="text-google-green text-xl group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-foreground font-medium leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="material-card p-8 lg:p-12 text-center space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Join thousands of students who have successfully planned their careers with our AI advisor.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <button
                    onClick={() => user ? navigate('/questionnaire') : navigate('/auth')}
                    className="material-button material-button-primary w-full pulse-glow text-lg py-4"
                  >
                    <RocketOutlined className="mr-2" />
                    {user ? 'Take Assessment Now' : 'Sign Up Free'}
                  </button>
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      ✓ No credit card required
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ✓ 100% Free to start
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="material-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 gradient-glow opacity-50"></div>
            <div className="relative space-y-6">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
                Start Building Your Future Today
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Don't let uncertainty hold you back. Take the first step towards your dream career.
              </p>
              <button
                onClick={() => user ? navigate('/questionnaire') : navigate('/auth')}
                className="material-button material-button-primary text-lg px-8 py-4 glow-hover"
              >
                <RocketOutlined className="mr-2" />
                Begin Your Assessment
                <ArrowRightOutlined className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;