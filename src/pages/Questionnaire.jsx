import React, { useState } from 'react';
import { 
  Card, Form, Input, Button, Steps, Select, Slider, Checkbox, 
  Radio, Upload, InputNumber, Typography, Space, Progress, message 
} from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  CodeOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlans } from '../contexts/PlanContext';
import { suggestCareer } from '../services/api';
import Spinner from '../components/Spinner';

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
      title: 'Basic Info',
      icon: <UserOutlined />,
      description: 'Tell us about yourself'
    },
    {
      title: 'Education & Skills',
      icon: <BookOutlined />,
      description: 'Your academic background'
    },
    {
      title: 'Technical Skills',
      icon: <CodeOutlined />,
      description: 'Coding and technical abilities'
    },
    {
      title: 'Preferences',
      icon: <DollarOutlined />,
      description: 'Time, budget and location'
    },
    {
      title: 'Goals & Constraints',
      icon: <RocketOutlined />,
      description: 'Your career aspirations'
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
        studentLevel: values.studentLevel,
        education: values.education,
        topSubjects: values.topSubjects || [],
        codingPref: values.codingPref || 0,
        knownSkills: values.knownSkills || [],
        hoursPerWeek: values.hoursPerWeek || 10,
        budgetPerMonth: values.budgetPerMonth || 0,
        goalTimeline: values.goalTimeline || 6,
        locationPref: values.locationPref || 'Remote',
        industries: values.industries || [],
        githubOrPortfolio: values.githubOrPortfolio || '',
        certificationsDesired: values.certificationsDesired || false,
        constraints: values.constraints || '',
        roleSeeking: values.roleSeeking || 'internship',
        riskAppetite: values.riskAppetite || 'balanced',
        resumeText: values.resumeText || ''
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
            </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <Form.Item
              name="topSubjects"
              label="Top Subjects (Select your strongest/favorite subjects)"
            >
              <Select
                mode="tags"
                placeholder="Select or type your subjects"
                className="w-full"
                options={subjects.map(subject => ({ label: subject, value: subject }))}
              />
            </Form.Item>

            <Form.Item
              name="knownSkills"
              label="Known Skills & Technologies"
            >
              <Checkbox.Group className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {skills.map(skill => (
                    <Checkbox key={skill} value={skill} className="glass-card p-2 rounded">
                      {skill}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="otherSkills"
              label="Other Skills (Optional)"
            >
              <Input 
                placeholder="Any other skills not listed above"
                className="glass-card"
              />
            </Form.Item>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Form.Item
              name="codingPref"
              label={`Coding Preference: ${form.getFieldValue('codingPref') || 0}/10`}
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
                />
                <Text className="text-muted-foreground text-sm block mt-2">
                  How much do you enjoy programming and coding?
                </Text>
              </div>
            </Form.Item>

            <Form.Item
              name="githubOrPortfolio"
              label="GitHub Profile or Portfolio (Optional)"
            >
              <Input 
                placeholder="https://github.com/yourusername or portfolio URL"
                className="glass-card"
              />
            </Form.Item>

            <Form.Item
              name="resumeText"
              label="Resume Content (Optional)"
            >
              <TextArea
                rows={4}
                placeholder="Paste your resume content here or describe your experience"
                className="glass-card"
              />
            </Form.Item>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Form.Item
              name="hoursPerWeek"
              label="Hours per week you can dedicate to learning"
            >
              <InputNumber
                min={1}
                max={40}
                placeholder="e.g., 10"
                className="w-full glass-card"
                addonAfter="hours/week"
              />
            </Form.Item>

            <Form.Item
              name="budgetPerMonth"
              label="Monthly learning budget (USD)"
            >
              <InputNumber
                min={0}
                max={5000}
                placeholder="e.g., 100"
                className="w-full glass-card"
                addonBefore="$"
                addonAfter="/month"
              />
            </Form.Item>

            <Form.Item
              name="goalTimeline"
              label="Goal Timeline (months)"
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={3}>3 months (Intensive)</Radio>
                  <Radio value={6}>6 months (Balanced)</Radio>
                  <Radio value={12}>12 months (Comprehensive)</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="locationPref"
              label="Work Location Preference"
            >
              <Input 
                placeholder="e.g., Remote, San Francisco, Hybrid"
                className="glass-card"
              />
            </Form.Item>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Form.Item
              name="industries"
              label="Industries of Interest"
            >
              <Select
                mode="multiple"
                placeholder="Select industries you're interested in"
                className="w-full"
                options={industries.map(industry => ({ label: industry, value: industry }))}
              />
            </Form.Item>

            <Form.Item
              name="roleSeeking"
              label="Type of Role Seeking"
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="internship">Internship</Radio>
                  <Radio value="full-time">Full-time Position</Radio>
                  <Radio value="freelance">Freelance/Contract Work</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="riskAppetite"
              label="Company Size Preference"
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="startup">Startup (High risk, high reward)</Radio>
                  <Radio value="balanced">Mid-size Company (Balanced)</Radio>
                  <Radio value="corporate">Large Corporation (Stable)</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="certificationsDesired"
              label="Interested in Professional Certifications?"
            >
              <Radio.Group>
                <Radio value={true}>Yes, I want to earn industry certifications</Radio>
                <Radio value={false}>No, I prefer project-based learning</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="constraints"
              label="Any Constraints or Special Considerations?"
            >
              <TextArea
                rows={3}
                placeholder="e.g., Cannot relocate, prefer evening classes, specific accessibility needs"
                className="glass-card"
              />
            </Form.Item>
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