import React, { useState } from 'react';
import { 
  Card, Form, Input, Button, Steps, Select, Slider, Checkbox, 
  Radio, InputNumber, Typography, Space, Progress, message, Switch
} from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  CodeOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  RocketOutlined,
  BulbOutlined,
  TargetOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlans } from '../contexts/PlanContext';
import { suggestCareer } from '../services/api';
import Spinner from '../components/Spinner';
import UserProfileStep from '../components/UserProfileStep';
import SkillTagsInput from '../components/SkillTagsInput';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Questionnaire = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setCurrentQuestionnaire, setCurrentSuggestions, setLoading } = usePlans();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Predefined options
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Economics', 'Business Studies', 'English', 'History', 'Psychology',
    'Statistics', 'Engineering', 'Design', 'Arts', 'Music'
  ];

  const skills = [
    'HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'React', 'Node.js',
    'Data Analysis', 'Machine Learning', 'Project Management', 'Communication',
    'Leadership', 'Marketing', 'Sales', 'Design', 'Writing', 'Research'
  ];

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing',
    'Consulting', 'Media', 'Gaming', 'E-commerce', 'Automotive',
    'Real Estate', 'Manufacturing', 'Retail', 'Non-profit'
  ];

  const steps = [
    {
      title: 'User Profile',
      icon: <UserOutlined />,
      description: 'Tell us about yourself'
    },
    {
      title: 'Academic Info',
      icon: <BookOutlined />,
      description: 'Your educational background'
    },
    {
      title: 'Skills & Experience',
      icon: <CodeOutlined />,
      description: 'Your technical abilities'
    },
    {
      title: 'Context & Goals',
      icon: <BulbOutlined />,
      description: 'Background information'
    },
    {
      title: 'Preferences',
      icon: <EnvironmentOutlined />,
      description: 'Time and location preferences'
    },
    {
      title: 'Career Aspirations',
      icon: <RocketOutlined />,
      description: 'Your goals and constraints'
    },
    {
      title: 'AI Preferences',
      icon: <TargetOutlined />,
      description: 'Customize your AI experience'
    }
  ];

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await handleSubmit(values);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Prepare questionnaire data
      const questionnaireData = {
        userId: user?.uid || null,
        // User Profile
        userRole: values.userRole,
        experienceLevel: values.experienceLevel,
        primaryGoal: values.primaryGoal,
        preferredContact: values.preferredContact,
        // Academic Info
        studentLevel: values.studentLevel,
        education: values.education,
        topSubjects: values.topSubjects || [],
        // Skills & Experience
        codingPref: values.codingPref || 0,
        knownSkills: values.knownSkills || [],
        skillTags: values.skillTags || [],
        githubOrPortfolio: values.githubOrPortfolio || '',
        resumeText: values.resumeText || '',
        // Context & Goals
        contextInfo: values.contextInfo || '',
        targetCompanies: values.targetCompanies || [],
        // Preferences (removed budget)
        hoursPerWeek: values.hoursPerWeek || 10,
        goalTimeline: values.goalTimeline || 6,
        locationPref: values.locationPref || 'Remote',
        // Career Aspirations
        industries: values.industries || [],
        certificationsDesired: values.certificationsDesired || false,
        constraints: values.constraints || '',
        roleSeeking: values.roleSeeking || 'internship',
        riskAppetite: values.riskAppetite || 'balanced',
        // AI Preferences
        aiConsent: values.aiConsent || false,
        aiAssistanceLevel: values.aiAssistanceLevel || 50
      };

      setCurrentQuestionnaire(questionnaireData);
      
      // Get AI suggestions
      const suggestions = await suggestCareer(questionnaireData);
      setCurrentSuggestions(suggestions);
      
      message.success('Assessment completed! Redirecting to results...');
      
      // Navigate to results page
      setTimeout(() => {
        navigate('/results');
      }, 1500);
      
    } catch (error) {
      message.error('Failed to process assessment. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <UserProfileStep />;

      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <Form.Item
              name="studentLevel"
              label={<span className="text-foreground font-semibold text-lg">🎓 What's your current academic level?</span>}
              rules={[{ required: true, message: 'Please select your student level' }]}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full" size={16}>
                  <Radio value="9-10" className="glass-card p-6 rounded-xl w-full hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">🌱</span>
                      <div>
                        <Text strong className="text-foreground text-lg block">Grades 9-10</Text>
                        <Text className="text-muted-foreground">High School (Freshman/Sophomore) - Just starting your journey!</Text>
                      </div>
                    </div>
                  </Radio>
                  <Radio value="11-12" className="glass-card p-6 rounded-xl w-full hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">🚀</span>
                      <div>
                        <Text strong className="text-foreground text-lg block">Grades 11-12</Text>
                        <Text className="text-muted-foreground">High School (Junior/Senior) - Ready to explore career options!</Text>
                      </div>
                    </div>
                  </Radio>
                  <Radio value="college" className="glass-card p-6 rounded-xl w-full hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">🎯</span>
                      <div>
                        <Text strong className="text-foreground text-lg block">College Student</Text>
                        <Text className="text-muted-foreground">Undergraduate/Graduate - Time to specialize and plan ahead!</Text>
                      </div>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="education"
              label={<span className="text-foreground font-semibold text-lg">📚 Describe your current education status</span>}
              rules={[{ required: true, message: 'Please describe your education status' }]}
            >
              <Input 
                placeholder="e.g., 10th grade at Lincoln High, 3rd year B.Tech Computer Science at MIT"
                className="glass-card py-3 text-lg"
                prefix={<span className="mr-2">✏️</span>}
              />
            </Form.Item>

            <Form.Item
              name="topSubjects"
              label={<span className="text-foreground font-semibold text-lg">📖 Top Subjects</span>}
            >
              <Select
                mode="tags"
                placeholder="Select your strongest/favorite subjects"
                className="w-full glass-card"
                size="large"
                options={subjects.map(subject => ({ label: subject, value: subject }))}
              />
            </Form.Item>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Form.Item
              name="skillTags"
              label={<span className="text-foreground font-semibold text-lg">🏷️ Skills & Technologies</span>}
            >
              <SkillTagsInput placeholder="Search and select your skills..." />
            </Form.Item>

            <Form.Item
              name="codingPref"
              label={<span className="text-foreground font-semibold text-lg">💻 Coding Interest Level: {form.getFieldValue('codingPref') || 0}/10</span>}
            >
              <div className="glass-card p-4 rounded-lg">
                <Slider
                  min={0}
                  max={10}
                  marks={{
                    0: 'No Interest',
                    5: 'Some Interest', 
                    10: 'Highly Interested'
                  }}
                  tooltipVisible={false}
                  className="mb-2"
                />
                <Text className="text-muted-foreground text-sm block">
                  How much do you enjoy programming and coding?
                </Text>
              </div>
            </Form.Item>

            <Form.Item
              name="githubOrPortfolio"
              label={<span className="text-foreground font-semibold text-lg">🔗 GitHub Profile or Portfolio</span>}
            >
              <Input 
                placeholder="https://github.com/yourusername or portfolio URL"
                className="glass-card py-3"
                prefix={<span className="mr-2">🌐</span>}
              />
            </Form.Item>

            <Form.Item
              name="resumeText"
              label={<span className="text-foreground font-semibold text-lg">📄 Resume/Experience Summary</span>}
            >
              <Input.TextArea
                rows={4}
                placeholder="Paste your resume content here or describe your key experiences and achievements..."
                className="glass-card"
              />
            </Form.Item>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Form.Item
              name="contextInfo"
              label={<span className="text-foreground font-semibold text-lg">📝 Additional Context</span>}
            >
              <Input.TextArea
                rows={6}
                placeholder="Provide additional context about your situation:
• Job descriptions you're interested in
• Company requirements you've seen
• Specific challenges you're facing
• Career transition goals
• Any other relevant information..."
                className="glass-card"
                showCount
                maxLength={2000}
              />
            </Form.Item>

            <Form.Item
              name="targetCompanies"
              label={<span className="text-foreground font-semibold text-lg">🏢 Target Companies or Organizations</span>}
            >
              <Select
                mode="tags"
                placeholder="e.g., Google, Microsoft, startups, non-profits..."
                className="w-full glass-card"
                size="large"
                options={[
                  { label: 'Google', value: 'Google' },
                  { label: 'Microsoft', value: 'Microsoft' },
                  { label: 'Apple', value: 'Apple' },
                  { label: 'Amazon', value: 'Amazon' },
                  { label: 'Meta (Facebook)', value: 'Meta' },
                  { label: 'Netflix', value: 'Netflix' },
                  { label: 'Tesla', value: 'Tesla' },
                  { label: 'Startups', value: 'Startups' },
                  { label: 'Non-profits', value: 'Non-profits' },
                  { label: 'Government', value: 'Government' },
                  { label: 'Consulting firms', value: 'Consulting firms' },
                  { label: 'Financial institutions', value: 'Financial institutions' }
                ]}
              />
            </Form.Item>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Form.Item
              name="hoursPerWeek"
              label={<span className="text-foreground font-semibold text-lg">⏰ Weekly Learning Time</span>}
            >
              <InputNumber
                min={1}
                max={40}
                placeholder="e.g., 10"
                className="w-full glass-card"
                size="large"
                addonAfter="hours/week"
              />
            </Form.Item>

            <Form.Item
              name="goalTimeline"
              label={<span className="text-foreground font-semibold text-lg">📅 Goal Timeline</span>}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full" size={12}>
                  <Radio value={3} className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">3 months (Intensive)</Text>
                      <Text className="text-muted-foreground block text-sm">Fast track, requires 20+ hours/week</Text>
                    </div>
                  </Radio>
                  <Radio value={6} className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">6 months (Balanced)</Text>
                      <Text className="text-muted-foreground block text-sm">Recommended, 10-15 hours/week</Text>
                    </div>
                  </Radio>
                  <Radio value={12} className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">12 months (Comprehensive)</Text>
                      <Text className="text-muted-foreground block text-sm">Thorough, 5-10 hours/week</Text>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="locationPref"
              label={<span className="text-foreground font-semibold text-lg">🌍 Work Location Preference</span>}
            >
              <Input 
                placeholder="e.g., Remote, San Francisco, Hybrid, Willing to relocate"
                className="glass-card py-3"
                prefix={<span className="mr-2">📍</span>}
              />
            </Form.Item>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Form.Item
              name="industries"
              label={<span className="text-foreground font-semibold text-lg">🏭 Industries of Interest</span>}
            >
              <Select
                mode="multiple"
                placeholder="Select industries you're interested in"
                className="w-full glass-card"
                size="large"
                options={industries.map(industry => ({ label: industry, value: industry }))}
              />
            </Form.Item>

            <Form.Item
              name="roleSeeking"
              label={<span className="text-foreground font-semibold text-lg">💼 Type of Role Seeking</span>}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full" size={12}>
                  <Radio value="internship" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">Internship</Text>
                      <Text className="text-muted-foreground block text-sm">Gain experience and learn</Text>
                    </div>
                  </Radio>
                  <Radio value="full-time" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">Full-time Position</Text>
                      <Text className="text-muted-foreground block text-sm">Ready for full-time employment</Text>
                    </div>
                  </Radio>
                  <Radio value="freelance" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">Freelance/Contract Work</Text>
                      <Text className="text-muted-foreground block text-sm">Flexible, project-based work</Text>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="riskAppetite"
              label={<span className="text-foreground font-semibold text-lg">🏢 Company Size Preference</span>}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full" size={12}>
                  <Radio value="startup" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">Startup (High risk, high reward)</Text>
                      <Text className="text-muted-foreground block text-sm">Fast-paced, equity potential</Text>
                    </div>
                  </Radio>
                  <Radio value="balanced" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">Mid-size Company (Balanced)</Text>
                      <Text className="text-muted-foreground block text-sm">Good growth with stability</Text>
                    </div>
                  </Radio>
                  <Radio value="corporate" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">Large Corporation (Stable)</Text>
                      <Text className="text-muted-foreground block text-sm">Job security, structured growth</Text>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="certificationsDesired"
              label={<span className="text-foreground font-semibold text-lg">🏆 Professional Certifications</span>}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full" size={12}>
                  <Radio value={true} className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">Yes, I want to earn industry certifications</Text>
                      <Text className="text-muted-foreground block text-sm">Build credibility with recognized credentials</Text>
                    </div>
                  </Radio>
                  <Radio value={false} className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong className="text-foreground">No, I prefer project-based learning</Text>
                      <Text className="text-muted-foreground block text-sm">Focus on building a strong portfolio</Text>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="constraints"
              label={<span className="text-foreground font-semibold text-lg">⚠️ Constraints or Special Considerations</span>}
            >
              <Input.TextArea
                rows={3}
                placeholder="e.g., Cannot relocate, prefer evening classes, specific accessibility needs, family obligations..."
                className="glass-card"
              />
            </Form.Item>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <Form.Item
              name="aiConsent"
              label={<span className="text-foreground font-semibold text-lg">🤖 AI-Powered Features</span>}
              valuePropName="checked"
            >
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Text strong className="text-foreground block">Enable AI Recommendations</Text>
                    <Text className="text-muted-foreground text-sm">
                      Get personalized career suggestions, learning paths, and interview preparation powered by AI
                    </Text>
                  </div>
                  <Switch size="large" />
                </div>
                <Text className="text-xs text-muted-foreground">
                  Your responses will be used to generate personalized recommendations. We respect your privacy and don't share personal information.
                </Text>
              </div>
            </Form.Item>

            <Form.Item
              name="aiAssistanceLevel"
              label={<span className="text-foreground font-semibold text-lg">🎚️ AI Assistance Level: {form.getFieldValue('aiAssistanceLevel') || 50}%</span>}
            >
              <div className="glass-card p-4 rounded-lg">
                <Slider
                  min={0}
                  max={100}
                  defaultValue={50}
                  marks={{
                    0: '🤚 Minimal',
                    25: '📝 Basic',
                    50: '🎯 Balanced',
                    75: '🚀 Detailed',
                    100: '🧠 Maximum'
                  }}
                  tooltipVisible={false}
                  className="mb-2"
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>Minimal (0-25%):</strong> Basic suggestions only</div>
                  <div><strong>Balanced (25-75%):</strong> Recommended for most users</div>
                  <div><strong>Maximum (75-100%):</strong> Comprehensive analysis and detailed guidance</div>
                </div>
              </div>
            </Form.Item>

            <div className="glass-card p-6 rounded-lg bg-blue-50/10 border-blue-200/20">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <div>
                  <Text strong className="text-foreground block mb-2">How AI Helps You</Text>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Analyzes your profile against career requirements</li>
                    <li>• Suggests personalized learning paths</li>
                    <li>• Identifies skill gaps and provides resources</li>
                    <li>• Generates interview questions and practice scenarios</li>
                    <li>• Recommends optimal career transitions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full glow-google-colors opacity-20 animate-rotate"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-google-blue/5 animate-pulse"></div>
        </div>
        
        <Card className="glass-card max-w-lg w-full mx-4 text-center relative z-10 border-0 shadow-2xl">
          <div className="space-y-6 p-8">
            {/* Enhanced Spinner */}
            <div className="relative">
              <Spinner 
                size="large" 
                className="scale-150"
              />
              <div className="absolute inset-0 rounded-full animate-ping bg-google-blue/20"></div>
            </div>
            
            <div className="space-y-4">
              <Title level={3} className="text-foreground mb-2">
                🤖 AI Analysis in Progress
              </Title>
              <Text className="text-muted-foreground text-lg leading-relaxed">
                Our advanced AI is analyzing your responses and generating 
                <span className="text-google-blue font-semibold"> personalized career recommendations</span>...
              </Text>
            </div>
            
            {/* Progress Animation */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Processing your profile...</span>
                <span>✨</span>
              </div>
              <Progress 
                percent={85} 
                showInfo={false} 
                strokeColor={{
                  '0%': '#1a73e8',
                  '100%': '#34a853',
                }}
                className="animate-pulse"
              />
            </div>
            
            <div className="text-xs text-muted-foreground bg-muted/20 rounded-lg p-3">
              💡 <strong>Did you know?</strong> Our AI analyzes over 150+ career paths to find your perfect match!
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header with Progress Indicator */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-google-blue mr-2 animate-pulse"></span>
            🎯 Career Assessment
          </div>
          <Title level={1} className="text-foreground mb-4">
            Let's Find Your Perfect Career Path
          </Title>
          <Text className="text-muted-foreground text-lg max-w-2xl mx-auto block">
            Help us understand your background, skills, and goals to provide <span className="text-google-blue font-semibold">personalized AI recommendations</span>
          </Text>
        </div>

        {/* Enhanced Progress Card */}
        <Card className="glass-card mb-8 overflow-hidden">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Text className="text-muted-foreground text-sm uppercase tracking-wide font-medium">Progress</Text>
                <span className="text-google-blue">•</span>
                <Text className="text-google-blue text-sm font-semibold">{steps[currentStep].title}</Text>
              </div>
              <div className="text-right">
                <Text className="text-foreground font-bold text-lg">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </Text>
                <Text className="text-muted-foreground text-xs block">Complete</Text>
              </div>
            </div>
            <div className="relative">
              <Progress 
                percent={((currentStep + 1) / steps.length) * 100} 
                showInfo={false}
                strokeColor={{
                  '0%': '#1a73e8',
                  '100%': '#34a853',
                }}
                strokeWidth={8}
                className="rounded-full"
              />
            </div>
          </div>
          
          <Steps
            current={currentStep}
            items={steps.map((step, index) => ({
              ...step,
              className: index <= currentStep ? 'text-google-blue' : 'text-muted-foreground'
            }))}
            responsive={false}
            size="small"
          />
        </Card>

        {/* Enhanced Form Card */}
        <Card className="glass-card shadow-2xl border-0">
          <Form
            form={form}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-google-blue/10 flex items-center justify-center">
                  <span className="text-google-blue text-2xl">{steps[currentStep].icon}</span>
                </div>
                <div className="text-left">
                  <Title level={3} className="text-foreground mb-1">
                    {steps[currentStep].title}
                  </Title>
                  <Text className="text-muted-foreground">
                    {steps[currentStep].description}
                  </Text>
                </div>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-google-blue to-google-green mx-auto rounded-full"></div>
            </div>

            {renderStep()}

            {/* Enhanced Navigation */}
            <div className="flex justify-between items-center mt-10 pt-8 border-t border-border/20">
              <Button
                size="large"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="glass-card px-6 py-3 disabled:opacity-50"
                icon={currentStep > 0 && <span>←</span>}
              >
                {currentStep > 0 ? 'Previous' : ''}
              </Button>

              <div className="flex items-center space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-google-blue scale-125'
                        : index < currentStep
                        ? 'bg-google-green'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button
                type="primary"
                size="large"
                onClick={handleNext}
                loading={submitting}
                className="glow-primary px-6 py-3"
                icon={<span>→</span>}
              >
                {currentStep === steps.length - 1 ? 'Generate Results ✨' : 'Next Step'}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Questionnaire;