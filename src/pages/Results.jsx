import React, { useState, useEffect } from 'react';
import { 
  Card, Button, Typography, Progress, Space, Tag, List, 
  Row, Col, Statistic, Alert, Modal, message 
} from 'antd';
import { 
  RocketOutlined, 
  TrophyOutlined, 
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  BookOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePlans } from '../contexts/PlanContext';
import { useAuth } from '../contexts/AuthContext';
import { generatePlan } from '../services/api';
import SkillChip from '../components/SkillChip';
import Spinner from '../components/Spinner';

const { Title, Text, Paragraph } = Typography;

const Results = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    currentSuggestions, 
    currentQuestionnaire, 
    setLoading,
    savePlan 
  } = usePlans();
  const [selectedPath, setSelectedPath] = useState(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  useEffect(() => {
    // Redirect if no suggestions available
    if (!currentSuggestions) {
      navigate('/questionnaire');
    }
  }, [currentSuggestions, navigate]);

  const handleGeneratePlan = async (path) => {
    if (!user) {
      message.warning('Please sign in to generate a detailed plan');
      navigate('/auth', { state: { from: { pathname: '/results' } } });
      return;
    }

    setGeneratingPlan(true);
    setSelectedPath(path);

    try {
      const planRequest = {
        userId: user.uid,
        selectedPath: path.name,
        context: currentQuestionnaire,
        preferences: { track: 'Balanced' }
      };

      const planData = await generatePlan(planRequest);
      
      // Save the plan
      const savedPlan = await savePlan(planData);
      
      message.success('Plan generated successfully!');
      
      // Navigate to plan detail
      navigate(`/plan/${savedPlan.id}`);
      
    } catch (error) {
      message.error('Failed to generate plan. Please try again.');
      console.error('Plan generation error:', error);
    } finally {
      setGeneratingPlan(false);
      setSelectedPath(null);
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high': return 'green';
      case 'medium': return 'orange';
      case 'low': return 'red';
      default: return 'blue';
    }
  };

  if (!currentSuggestions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <Spinner tip="Loading your results..." />
      </div>
    );
  }

  const { top_paths, confidence, skill_gap, next_steps } = currentSuggestions;

  return (
    <div className="min-h-screen bg-gradient-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Title level={1} className="text-foreground mb-4">
            Your Personalized Career Recommendations
          </Title>
          <Text className="text-muted-foreground text-lg">
            Based on your assessment, here are the career paths that best match your profile
          </Text>
        </div>

        {/* Confidence & Overview */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={16}>
            <Card className="glass-card">
              <div className="flex items-center justify-between mb-6">
                <Title level={3} className="text-foreground mb-0">
                  Analysis Confidence
                </Title>
                <Tag color={getConfidenceColor(confidence)} className="text-lg px-4 py-2">
                  {confidence.toUpperCase()} MATCH
                </Tag>
              </div>
              
              <Alert
                type="info"
                showIcon
                message="Assessment Complete"
                description="Our AI has analyzed your skills, interests, and goals to provide these personalized recommendations. Each suggestion includes a detailed explanation of why it's a good fit for you."
                className="mb-4"
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card className="glass-card">
              <Statistic
                title={<Text className="text-muted-foreground">Career Paths Found</Text>}
                value={top_paths?.length || 0}
                prefix={<TrophyOutlined className="text-google-blue" />}
                valueStyle={{ color: '#1a73e8', fontSize: '2rem' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Career Path Recommendations */}
        <div className="mb-8">
          <Title level={2} className="text-foreground mb-6">
            Recommended Career Paths
          </Title>
          
          <Row gutter={[24, 24]}>
            {top_paths?.map((path, index) => (
              <Col xs={24} lg={12} xl={8} key={index}>
                <Card 
                  className="glass-card h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => handleGeneratePlan(path)}
                      loading={generatingPlan && selectedPath?.name === path.name}
                      className="glow-primary font-medium"
                      icon={<RocketOutlined />}
                    >
                      Generate Learning Plan
                    </Button>
                  ]}
                >
                  <div className="text-center mb-4">
                    <Title level={4} className="text-foreground mb-2">
                      {path.name}
                    </Title>
                    <div className="mb-4">
                      <Text className="text-muted-foreground">Match Score</Text>
                      <Progress
                        type="circle"
                        percent={path.score}
                        size={80}
                        strokeColor="#1a73e8"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Why it's a good fit */}
                    <div>
                      <Text strong className="text-foreground block mb-2">
                        Why this fits you:
                      </Text>
                      <Paragraph className="text-muted-foreground text-sm">
                        {path.why}
                      </Paragraph>
                    </div>

                    {/* Key Skills */}
                    <div>
                      <Text strong className="text-foreground block mb-2">
                        Key Skills:
                      </Text>
                      <Space wrap>
                        {path.key_skills?.map((skill, idx) => (
                          <SkillChip key={idx} skill={skill} level="needed" />
                        ))}
                      </Space>
                    </div>

                    {/* Cost Range */}
                    <div>
                      <Text strong className="text-foreground block mb-2">
                        Learning Investment:
                      </Text>
                      <div className="flex justify-between text-sm">
                        <span className="text-google-green">
                          Budget: ${path.estimated_cost_range?.low}
                        </span>
                        <span className="text-google-yellow">
                          Balanced: ${path.estimated_cost_range?.mid}
                        </span>
                        <span className="text-google-red">
                          Premium: ${path.estimated_cost_range?.high}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Skill Gap Analysis */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={12}>
            <Card className="glass-card h-full">
              <Title level={3} className="text-foreground mb-4">
                <CheckCircleOutlined className="text-google-green mr-2" />
                Skills You Have
              </Title>
              <Space wrap>
                {skill_gap?.have?.map((skill, index) => (
                  <SkillChip key={index} skill={skill} level="have" />
                ))}
              </Space>
              {(!skill_gap?.have || skill_gap.have.length === 0) && (
                <Text className="text-muted-foreground">
                  Based on your assessment, we'll help you build foundational skills.
                </Text>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card className="glass-card h-full">
              <Title level={3} className="text-foreground mb-4">
                <BookOutlined className="text-google-blue mr-2" />
                Skills to Develop
              </Title>
              <Space wrap>
                {skill_gap?.need?.map((skill, index) => (
                  <SkillChip key={index} skill={skill} level="needed" />
                ))}
              </Space>
              <Text className="text-muted-foreground text-sm block mt-4">
                These skills will be included in your personalized learning plan.
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Next Steps */}
        <Card className="glass-card mb-8">
          <Title level={3} className="text-foreground mb-4">
            <ClockCircleOutlined className="text-google-yellow mr-2" />
            Recommended Next Steps
          </Title>
          <List
            size="large"
            dataSource={next_steps || []}
            renderItem={(step, index) => (
              <List.Item className="border-b border-border/10 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-google-blue text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <Text className="text-muted-foreground">{step}</Text>
                </div>
              </List.Item>
            )}
          />
        </Card>

        {/* Actions */}
        <div className="text-center">
          <Space size="large" wrap>
            <Button
              size="large"
              onClick={() => navigate('/questionnaire')}
              className="glass-card font-medium px-8"
            >
              Retake Assessment
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/plans')}
              className="glow-primary font-medium px-8"
              icon={<BookOutlined />}
            >
              View My Plans
            </Button>
          </Space>
        </div>
      </div>

      {/* Loading Modal for Plan Generation */}
      <Modal
        open={generatingPlan}
        footer={null}
        closable={false}
        centered
        className="text-center"
      >
        <div className="py-8">
          <Spinner 
            size="large" 
            tip="Creating your personalized learning plan..."
          />
          <Title level={4} className="text-foreground mt-6 mb-2">
            Generating Your Plan
          </Title>
          <Text className="text-muted-foreground">
            This may take a few moments while we create a detailed roadmap for "{selectedPath?.name}"
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default Results;