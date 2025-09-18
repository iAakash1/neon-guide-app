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
          <div className="space-y-6">
            <Form.Item
              name="studentLevel"
              label="Student Level"
              rules={[{ required: true, message: 'Please select your student level' }]}
            >
              <Radio.Group className="w-full">
                <Space direction="vertical" className="w-full">
                  <Radio value="9-10" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong>Grades 9-10</Text>
                      <br />
                      <Text className="text-muted-foreground">High School (Freshman/Sophomore)</Text>
                    </div>
                  </Radio>
                  <Radio value="11-12" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong>Grades 11-12</Text>
                      <br />
                      <Text className="text-muted-foreground">High School (Junior/Senior)</Text>
                    </div>
                  </Radio>
                  <Radio value="college" className="glass-card p-4 rounded-lg w-full">
                    <div>
                      <Text strong>College Student</Text>
                      <br />
                      <Text className="text-muted-foreground">Undergraduate/Graduate</Text>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="education"
              label="Current Education Status"
              rules={[{ required: true, message: 'Please describe your education status' }]}
            >
              <Input 
                placeholder="e.g., 10th grade, 3rd year B.Tech Computer Science"
                className="glass-card"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <Card className="glass-card max-w-md w-full mx-4 text-center">
          <Spinner 
            size="large" 
            tip="Analyzing your responses and generating personalized recommendations..."
          />
          <div className="mt-6">
            <Title level={4} className="text-foreground mb-2">
              Processing Your Assessment
            </Title>
            <Text className="text-muted-foreground">
              Our AI is creating your personalized career roadmap...
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Title level={2} className="text-foreground mb-4">
            Career Assessment
          </Title>
          <Text className="text-muted-foreground text-lg">
            Help us understand your background, skills, and goals to provide personalized recommendations
          </Text>
        </div>

        {/* Progress */}
        <Card className="glass-card mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <Text className="text-muted-foreground">Progress</Text>
              <Text className="text-foreground font-medium">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </Text>
            </div>
            <Progress 
              percent={((currentStep + 1) / steps.length) * 100} 
              showInfo={false}
              strokeColor="#1a73e8"
            />
          </div>
          
          <Steps
            current={currentStep}
            items={steps}
            responsive={false}
            size="small"
          />
        </Card>

        {/* Form */}
        <Card className="glass-card">
          <Form
            form={form}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <div className="mb-8">
              <Title level={3} className="text-foreground mb-2">
                {steps[currentStep].title}
              </Title>
              <Text className="text-muted-foreground">
                {steps[currentStep].description}
              </Text>
            </div>

            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/20">
              <Button
                size="large"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="glass-card"
              >
                Previous
              </Button>

              <Text className="text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </Text>

              <Button
                type="primary"
                size="large"
                onClick={handleNext}
                loading={submitting}
                className="glow-primary font-medium px-8"
              >
                {currentStep === steps.length - 1 ? 'Get My Results' : 'Next'}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Questionnaire;