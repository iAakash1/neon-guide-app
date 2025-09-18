import React, { useState } from 'react';
import { 
  Card, Button, Typography, Empty, Row, Col, Tag, Space, 
  Dropdown, Modal, message, Statistic, Progress 
} from 'antd';
import { 
  PlusOutlined, 
  BookOutlined, 
  ClockCircleOutlined,
  DollarOutlined,
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePlans } from '../contexts/PlanContext';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

const Plans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { plans, deletePlan } = usePlans();
  const [loading, setLoading] = useState({});

  const handleDeletePlan = (planId, planName) => {
    confirm({
      title: 'Delete Learning Plan',
      content: `Are you sure you want to delete "${planName}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(prev => ({ ...prev, [planId]: true }));
          await deletePlan(planId);
          message.success('Plan deleted successfully');
        } catch (error) {
          message.error('Failed to delete plan');
        } finally {
          setLoading(prev => ({ ...prev, [planId]: false }));
        }
      }
    });
  };

  const getMenuItems = (plan) => [
    {
      key: 'view',
      icon: <BookOutlined />,
      label: 'View Details',
      onClick: () => navigate(`/plan/${plan.id}`)
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Plan',
      onClick: () => message.info('Edit functionality coming soon!')
    },
    {
      key: 'share',
      icon: <ShareAltOutlined />,
      label: 'Share Plan',
      onClick: () => message.info('Share functionality coming soon!')
    },
    {
      key: 'download',
      icon: <DownloadOutlined />,
      label: 'Export PDF',
      onClick: () => navigate(`/plan/${plan.id}?export=true`)
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete Plan',
      onClick: () => handleDeletePlan(plan.id, plan.selectedPath),
      danger: true
    }
  ];

  const calculateProgress = (plan) => {
    if (!plan.milestones) return 0;
    // Mock progress calculation - in real app, track completed milestones
    const completedMilestones = plan.milestones.filter(m => m.completed).length;
    return Math.round((completedMilestones / plan.milestones.length) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDurationText = (plan) => {
    if (plan.totalDurationMonths) {
      return `${plan.totalDurationMonths} months`;
    }
    if (plan.milestones && plan.milestones.length > 0) {
      const maxMonth = Math.max(...plan.milestones.map(m => m.month));
      return `${maxMonth} months`;
    }
    return 'Variable duration';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center py-8 px-4">
        <Card className="glass-card max-w-md w-full text-center">
          <Title level={3} className="text-foreground mb-4">
            Sign In Required
          </Title>
          <Paragraph className="text-muted-foreground mb-6">
            Please sign in to view and manage your learning plans.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/auth')}
            className="glow-primary font-medium"
          >
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <Title level={1} className="text-foreground mb-2">
              My Learning Plans
            </Title>
            <Text className="text-muted-foreground text-lg">
              Track your progress and manage your career development journey
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/questionnaire')}
            className="glow-primary font-medium"
            icon={<PlusOutlined />}
          >
            Create New Plan
          </Button>
        </div>

        {/* Stats Overview */}
        {plans && plans.length > 0 && (
          <Row gutter={[24, 24]} className="mb-8">
            <Col xs={12} sm={6}>
              <Card className="glass-card text-center">
                <Statistic
                  title={<Text className="text-muted-foreground">Total Plans</Text>}
                  value={plans.length}
                  valueStyle={{ color: '#1a73e8' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="glass-card text-center">
                <Statistic
                  title={<Text className="text-muted-foreground">In Progress</Text>}
                  value={plans.filter(p => calculateProgress(p) > 0 && calculateProgress(p) < 100).length}
                  valueStyle={{ color: '#fbbc05' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="glass-card text-center">
                <Statistic
                  title={<Text className="text-muted-foreground">Completed</Text>}
                  value={plans.filter(p => calculateProgress(p) === 100).length}
                  valueStyle={{ color: '#34a853' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="glass-card text-center">
                <Statistic
                  title={<Text className="text-muted-foreground">Not Started</Text>}
                  value={plans.filter(p => calculateProgress(p) === 0).length}
                  valueStyle={{ color: '#ea4335' }}
                />
              </Card>
            </Col>
          </Row>
        )}

        {/* Plans Grid */}
        {plans && plans.length > 0 ? (
          <Row gutter={[24, 24]}>
            {plans.map((plan) => {
              const progress = calculateProgress(plan);
              const progressColor = progress === 0 ? '#ea4335' : progress === 100 ? '#34a853' : '#fbbc05';
              
              return (
                <Col xs={24} lg={12} xl={8} key={plan.id}>
                  <Card
                    className="glass-card h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    actions={[
                      <Button
                        type="text"
                        onClick={() => navigate(`/plan/${plan.id}`)}
                        className="text-google-blue font-medium"
                      >
                        View Details
                      </Button>,
                      <Dropdown
                        menu={{ items: getMenuItems(plan) }}
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <Button
                          type="text"
                          icon={<MoreOutlined />}
                          loading={loading[plan.id]}
                        />
                      </Dropdown>
                    ]}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Title level={4} className="text-foreground mb-1 line-clamp-2">
                            {plan.selectedPath}
                          </Title>
                          <Text className="text-muted-foreground text-sm">
                            Created {formatDate(plan.createdAt)}
                          </Text>
                        </div>
                        <Tag color={progressColor} className="ml-2">
                          {progress === 0 ? 'Not Started' : progress === 100 ? 'Completed' : 'In Progress'}
                        </Tag>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Text className="text-muted-foreground text-sm">Progress</Text>
                          <Text className="text-foreground font-medium">{progress}%</Text>
                        </div>
                        <Progress percent={progress} strokeColor={progressColor} showInfo={false} />
                      </div>

                      {/* Plan Details */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <ClockCircleOutlined className="text-google-blue text-lg block mb-1" />
                          <Text className="text-muted-foreground text-sm block">Duration</Text>
                          <Text className="text-foreground font-medium text-sm">
                            {getDurationText(plan)}
                          </Text>
                        </div>
                        <div>
                          <BookOutlined className="text-google-green text-lg block mb-1" />
                          <Text className="text-muted-foreground text-sm block">Milestones</Text>
                          <Text className="text-foreground font-medium text-sm">
                            {plan.milestones?.length || 0} tasks
                          </Text>
                        </div>
                      </div>

                      {/* Cost Estimate */}
                      {plan.costEstimate && (
                        <div className="text-center p-3 bg-card/30 rounded-lg">
                          <DollarOutlined className="text-google-yellow text-lg block mb-1" />
                          <Text className="text-muted-foreground text-sm block">Est. Investment</Text>
                          <Space>
                            <Text className="text-foreground font-medium text-sm">
                              ${plan.costEstimate.low} - ${plan.costEstimate.high}
                            </Text>
                          </Space>
                        </div>
                      )}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          /* Empty State */
          <Card className="glass-card text-center py-12">
            <Empty
              image="/placeholder.svg"
              imageStyle={{ height: 120 }}
              description={
                <div className="space-y-2">
                  <Title level={4} className="text-foreground">
                    No Learning Plans Yet
                  </Title>
                  <Paragraph className="text-muted-foreground max-w-md mx-auto">
                    Start your career journey by taking our assessment. 
                    We'll create a personalized learning plan based on your goals and skills.
                  </Paragraph>
                </div>
              }
            >
              <Space size="middle">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate('/questionnaire')}
                  className="glow-primary font-medium"
                  icon={<PlusOutlined />}
                >
                  Take Career Assessment
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate('/')}
                  className="glass-card font-medium"
                >
                  Learn More
                </Button>
              </Space>
            </Empty>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Plans;