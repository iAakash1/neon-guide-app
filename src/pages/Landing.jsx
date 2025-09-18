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
    <div className="min-h-screen bg-gradient-primary">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <Title level={1} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Your AI-Powered
              <span className="block text-transparent bg-gradient-to-r from-google-blue to-google-green bg-clip-text">
                Career Advisor
              </span>
            </Title>
            <Paragraph className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover your ideal career path with personalized AI recommendations, 
              detailed learning plans, and expert guidance tailored to your skills and goals.
            </Paragraph>
          </div>

          <Space size="large" className="flex flex-wrap justify-center">
            <Button
              type="primary"
              size="large"
              onClick={() => user ? navigate('/questionnaire') : navigate('/auth')}
              className="px-8 py-4 h-auto text-lg font-semibold glow-primary hover:scale-105 transition-transform"
              icon={<RocketOutlined />}
            >
              {user ? 'Start Assessment' : 'Get Started Free'}
            </Button>
            <Button
              size="large"
              onClick={() => navigate('/plans')}
              className="px-8 py-4 h-auto text-lg font-semibold glass-card"
              icon={<ArrowRightOutlined />}
            >
              View Sample Plans
            </Button>
          </Space>

          {/* Stats Section */}
          <div className="mt-20 glass-card p-8 rounded-2xl">
            <Row gutter={[32, 16]} justify="center">
              {stats.map((stat, index) => (
                <Col xs={12} sm={6} key={index}>
                  <Statistic
                    title={<Text className="text-muted-foreground">{stat.title}</Text>}
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{ 
                      color: '#1a73e8',
                      fontWeight: 'bold',
                      fontSize: '2rem'
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Title level={2} className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </Title>
            <Paragraph className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform guides you through every step of your career journey
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} align="middle">
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  className="glass-card h-full text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  bordered={false}
                >
                  <div className="mb-6">
                    {feature.icon}
                  </div>
                  <Title level={4} className="text-foreground mb-4">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-muted-foreground">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} className="text-4xl font-bold text-foreground mb-6">
                Why Choose Career Advisor?
              </Title>
              <Space direction="vertical" size="large" className="w-full">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleOutlined className="text-google-green text-lg mt-1" />
                    <Text className="text-muted-foreground text-lg">
                      {benefit}
                    </Text>
                  </div>
                ))}
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="glass-card p-8">
                <Title level={3} className="text-foreground mb-6 text-center">
                  Ready to Start Your Journey?
                </Title>
                <div className="text-center space-y-6">
                  <Paragraph className="text-muted-foreground text-lg">
                    Join thousands of students who have successfully planned their careers with our AI advisor.
                  </Paragraph>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => user ? navigate('/questionnaire') : navigate('/auth')}
                    className="px-8 py-4 h-auto text-lg font-semibold glow-primary w-full sm:w-auto"
                    icon={<RocketOutlined />}
                  >
                    {user ? 'Take Assessment Now' : 'Sign Up Free'}
                  </Button>
                  <div className="text-center">
                    <Text className="text-muted-foreground text-sm">
                      No credit card required • 100% Free to start
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Landing;