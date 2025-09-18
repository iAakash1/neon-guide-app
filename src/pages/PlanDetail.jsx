import React, { useState, useEffect } from 'react';
import { 
  Card, Button, Typography, Timeline, Row, Col, Tag, Space, 
  Progress, Modal, List, Statistic, message, Drawer 
} from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined,
  DollarOutlined,
  BookOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { usePlans } from '../contexts/PlanContext';
import { useAuth } from '../contexts/AuthContext';
import ResourceCard from '../components/ResourceCard';
import { exportToPDF } from '../utils/exportPdf';

const { Title, Text, Paragraph } = Typography;

const PlanDetail = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { getPlanById, updatePlan } = usePlans();
  const [plan, setPlan] = useState(null);
  const [interviewModalVisible, setInterviewModalVisible] = useState(false);
  const [resourcesDrawerVisible, setResourcesDrawerVisible] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const foundPlan = getPlanById(planId);
    if (foundPlan) {
      setPlan(foundPlan);
      
      // Auto-export if requested via URL param
      if (searchParams.get('export') === 'true') {
        handleExportPDF();
      }
    } else {
      navigate('/plans');
    }
  }, [planId, getPlanById, navigate, searchParams]);

  const handleMarkMilestoneComplete = async (milestoneIndex) => {
    if (!plan) return;
    
    try {
      const updatedMilestones = [...plan.milestones];
      updatedMilestones[milestoneIndex] = {
        ...updatedMilestones[milestoneIndex],
        completed: !updatedMilestones[milestoneIndex].completed,
        completedAt: new Date().toISOString()
      };

      await updatePlan(plan.id, { milestones: updatedMilestones });
      setPlan({ ...plan, milestones: updatedMilestones });
      
      message.success(
        updatedMilestones[milestoneIndex].completed 
          ? 'Milestone marked as complete!' 
          : 'Milestone marked as incomplete'
      );
    } catch (error) {
      message.error('Failed to update milestone');
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      await exportToPDF(plan);
      message.success('Plan exported successfully!');
    } catch (error) {
      message.error('Failed to export plan');
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  const calculateProgress = () => {
    if (!plan?.milestones) return 0;
    const completed = plan.milestones.filter(m => m.completed).length;
    return Math.round((completed / plan.milestones.length) * 100);
  };

  const getAllResources = () => {
    if (!plan?.milestones) return [];
    return plan.milestones.reduce((acc, milestone) => {
      return [...acc, ...(milestone.resources || [])];
    }, []);
  };

  const getInterviewQuestions = () => {
    // Mock interview questions based on career path
    const questions = {
      "Full Stack Developer": [
        "Explain the difference between frontend and backend development.",
        "How would you optimize a web application's performance?",
        "Describe your experience with version control systems like Git.",
        "What's your approach to debugging complex issues?",
        "How do you stay updated with new web technologies?"
      ],
      "Data Scientist": [
        "Explain the data science pipeline from data collection to model deployment.",
        "How would you handle missing data in a dataset?",
        "Describe the difference between supervised and unsupervised learning.",
        "What metrics would you use to evaluate a classification model?",
        "How do you ensure your models are not biased?"
      ],
      "Default": [
        "Tell me about yourself and your career goals.",
        "Why are you interested in this field?",
        "What are your greatest strengths and weaknesses?",
        "Describe a challenging project you've worked on.",
        "Where do you see yourself in 5 years?"
      ]
    };

    return questions[plan?.selectedPath] || questions["Default"];
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <Text className="text-muted-foreground">Plan not found</Text>
      </div>
    );
  }

  const progress = calculateProgress();
  const allResources = getAllResources();
  const interviewQuestions = getInterviewQuestions();

  return (
    <div className="min-h-screen bg-gradient-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex-1">
            <Title level={1} className="text-foreground mb-2">
              {plan.selectedPath}
            </Title>
            <Space wrap>
              <Text className="text-muted-foreground">
                <CalendarOutlined className="mr-1" />
                Created {new Date(plan.createdAt).toLocaleDateString()}
              </Text>
              <Tag color={progress === 100 ? 'green' : progress > 0 ? 'blue' : 'red'}>
                {progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started'}
              </Tag>
            </Space>
          </div>
          <Space size="middle" wrap>
            <Button
              onClick={() => setResourcesDrawerVisible(true)}
              className="glass-card font-medium"
              icon={<BookOutlined />}
            >
              All Resources
            </Button>
            <Button
              onClick={() => setInterviewModalVisible(true)}
              className="glass-card font-medium"
              icon={<QuestionCircleOutlined />}
            >
              Interview Prep
            </Button>
            <Button
              type="primary"
              onClick={handleExportPDF}
              loading={exporting}
              className="glow-primary font-medium"
              icon={<DownloadOutlined />}
            >
              Export PDF
            </Button>
          </Space>
        </div>

        {/* Stats Overview */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={12} sm={6}>
            <Card className="glass-card text-center">
              <Statistic
                title={<Text className="text-muted-foreground">Progress</Text>}
                value={progress}
                suffix="%"
                valueStyle={{ color: progress === 100 ? '#34a853' : '#1a73e8' }}
              />
              <Progress percent={progress} showInfo={false} strokeColor="#1a73e8" />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="glass-card text-center">
              <Statistic
                title={<Text className="text-muted-foreground">Duration</Text>}
                value={plan.totalDurationMonths || 6}
                suffix="months"
                valueStyle={{ color: '#fbbc05' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="glass-card text-center">
              <Statistic
                title={<Text className="text-muted-foreground">Milestones</Text>}
                value={plan.milestones?.length || 0}
                valueStyle={{ color: '#34a853' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="glass-card text-center">
              <Statistic
                title={<Text className="text-muted-foreground">Est. Cost</Text>}
                value={plan.costEstimate?.mid || 0}
                prefix="$"
                valueStyle={{ color: '#ea4335' }}
                formatter={(value) => `$${value}`}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row gutter={[24, 24]}>
          {/* Timeline */}
          <Col xs={24} lg={16}>
            <Card className="glass-card">
              <Title level={3} className="text-foreground mb-6">
                Learning Timeline
              </Title>
              
              {plan.milestones && plan.milestones.length > 0 ? (
                <Timeline
                  mode="left"
                  className="custom-timeline"
                  items={plan.milestones.map((milestone, index) => ({
                    color: milestone.completed ? '#34a853' : '#1a73e8',
                    dot: milestone.completed ? <CheckCircleOutlined className="text-google-green" /> : <PlayCircleOutlined className="text-google-blue" />,
                    label: (
                      <div className="text-right">
                        <Text className="text-muted-foreground text-sm block">
                          Month {milestone.month}, Week {milestone.week}
                        </Text>
                        <Text className="text-muted-foreground text-xs">
                          {milestone.hours} hours
                        </Text>
                      </div>
                    ),
                    children: (
                      <div className="ml-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Title level={5} className="text-foreground mb-1">
                              {milestone.title}
                            </Title>
                            <Paragraph className="text-muted-foreground mb-3">
                              {milestone.description}
                            </Paragraph>
                          </div>
                          <Button
                            size="small"
                            type={milestone.completed ? "default" : "primary"}
                            onClick={() => handleMarkMilestoneComplete(index)}
                            className="ml-4 shrink-0"
                          >
                            {milestone.completed ? 'Undo' : 'Complete'}
                          </Button>
                        </div>
                        
                        {milestone.resources && milestone.resources.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {milestone.resources.slice(0, 2).map((resource, idx) => (
                              <ResourceCard key={idx} resource={resource} />
                            ))}
                          </div>
                        )}
                        
                        {milestone.resources && milestone.resources.length > 2 && (
                          <Button
                            type="link"
                            size="small"
                            onClick={() => {
                              setSelectedMilestone(milestone);
                              setResourcesDrawerVisible(true);
                            }}
                            className="mt-2"
                          >
                            View all {milestone.resources.length} resources
                          </Button>
                        )}
                      </div>
                    )
                  }))}
                />
              ) : (
                <div className="text-center py-12">
                  <Text className="text-muted-foreground">
                    No milestones available for this plan.
                  </Text>
                </div>
              )}
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" className="w-full">
              {/* Cost Breakdown */}
              {plan.costEstimate && (
                <Card className="glass-card">
                  <Title level={4} className="text-foreground mb-4">
                    <DollarOutlined className="mr-2" />
                    Investment Options
                  </Title>
                  <Space direction="vertical" className="w-full" size="middle">
                    <div className="flex justify-between items-center">
                      <Text className="text-google-green">Budget Track</Text>
                      <Text className="text-foreground font-bold">${plan.costEstimate.low}</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text className="text-google-blue">Balanced Track</Text>
                      <Text className="text-foreground font-bold">${plan.costEstimate.mid}</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text className="text-google-red">Premium Track</Text>
                      <Text className="text-foreground font-bold">${plan.costEstimate.high}</Text>
                    </div>
                  </Space>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="glass-card">
                <Title level={4} className="text-foreground mb-4">
                  Quick Actions
                </Title>
                <Space direction="vertical" className="w-full" size="small">
                  <Button
                    block
                    onClick={() => setInterviewModalVisible(true)}
                    className="glass-card font-medium text-left"
                    icon={<QuestionCircleOutlined />}
                  >
                    Practice Interview Questions
                  </Button>
                  <Button
                    block
                    onClick={() => setResourcesDrawerVisible(true)}
                    className="glass-card font-medium text-left"
                    icon={<BookOutlined />}
                  >
                    Browse All Resources
                  </Button>
                  <Button
                    block
                    onClick={handleExportPDF}
                    loading={exporting}
                    className="glass-card font-medium text-left"
                    icon={<FileTextOutlined />}
                  >
                    Download Study Plan
                  </Button>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Interview Preparation Modal */}
      <Modal
        title="Interview Preparation"
        open={interviewModalVisible}
        onCancel={() => setInterviewModalVisible(false)}
        footer={null}
        width={800}
        className="interview-modal"
      >
        <div className="space-y-6">
          <div>
            <Title level={4} className="text-foreground mb-4">
              Common Interview Questions for {plan.selectedPath}
            </Title>
            <List
              dataSource={interviewQuestions}
              renderItem={(question, index) => (
                <List.Item className="border-b border-border/10 last:border-b-0">
                  <div className="flex items-start space-x-3 w-full">
                    <div className="w-6 h-6 bg-google-blue text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <Text className="text-foreground flex-1">{question}</Text>
                  </div>
                </List.Item>
              )}
            />
          </div>
          
          <div className="p-4 glass-card rounded-lg">
            <Title level={5} className="text-foreground mb-2">
              💡 Interview Tips
            </Title>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>• Practice your answers out loud before the interview</li>
              <li>• Prepare specific examples from your projects and experiences</li>
              <li>• Research the company and role thoroughly</li>
              <li>• Prepare thoughtful questions to ask the interviewer</li>
              <li>• Follow up with a thank-you note after the interview</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Resources Drawer */}
      <Drawer
        title="Learning Resources"
        placement="right"
        onClose={() => setResourcesDrawerVisible(false)}
        open={resourcesDrawerVisible}
        width={400}
      >
        <div className="space-y-4">
          {allResources.length > 0 ? (
            allResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))
          ) : (
            <div className="text-center py-8">
              <Text className="text-muted-foreground">
                No resources available yet.
              </Text>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default PlanDetail;