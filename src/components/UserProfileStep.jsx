import React from 'react';
import { Form, Radio, Select, Input, Space, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;

const UserProfileStep = () => {
  return (
    <div className="space-y-6">
      <Form.Item
        name="userRole"
        label={<span className="text-foreground font-semibold text-lg">👤 What's your current role?</span>}
        rules={[{ required: true, message: 'Please select your role' }]}
      >
        <Radio.Group className="w-full">
          <Space direction="vertical" className="w-full" size={16}>
            <Radio value="student" className="glass-card p-6 rounded-xl w-full hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">🎓</span>
                <div>
                  <Text strong className="text-foreground text-lg block">Student</Text>
                  <Text className="text-muted-foreground">Currently enrolled in an educational program</Text>
                </div>
              </div>
            </Radio>
            <Radio value="professional" className="glass-card p-6 rounded-xl w-full hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">💼</span>
                <div>
                  <Text strong className="text-foreground text-lg block">Working Professional</Text>
                  <Text className="text-muted-foreground">Currently employed, looking for career advancement</Text>
                </div>
              </div>
            </Radio>
            <Radio value="career-changer" className="glass-card p-6 rounded-xl w-full hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">🔄</span>
                <div>
                  <Text strong className="text-foreground text-lg block">Career Changer</Text>
                  <Text className="text-muted-foreground">Looking to transition to a new field</Text>
                </div>
              </div>
            </Radio>
            <Radio value="job-seeker" className="glass-card p-6 rounded-xl w-full hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">🔍</span>
                <div>
                  <Text strong className="text-foreground text-lg block">Job Seeker</Text>
                  <Text className="text-muted-foreground">Currently unemployed, actively seeking opportunities</Text>
                </div>
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="experienceLevel"
        label={<span className="text-foreground font-semibold text-lg">⭐ Experience Level</span>}
        rules={[{ required: true, message: 'Please select your experience level' }]}
      >
        <Select
          placeholder="Select your experience level"
          className="w-full glass-card"
          size="large"
        >
          <Option value="beginner">🌱 Beginner - Just starting out</Option>
          <Option value="intermediate">🚀 Intermediate - Some experience, ready to grow</Option>
          <Option value="advanced">⚡ Advanced - Experienced, seeking new challenges</Option>
          <Option value="expert">🏆 Expert - Highly experienced, looking for leadership roles</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="primaryGoal"
        label={<span className="text-foreground font-semibold text-lg">🎯 Primary Goal</span>}
        rules={[{ required: true, message: 'Please select your primary goal' }]}
      >
        <Select
          placeholder="What's your main objective?"
          className="w-full glass-card"
          size="large"
        >
          <Option value="career-advice">💡 Career Guidance & Path Planning</Option>
          <Option value="skill-development">📚 Skill Development & Learning Plan</Option>
          <Option value="job-search">🎯 Job Search Strategy & Opportunities</Option>
          <Option value="interview-prep">🎤 Interview Preparation & Practice</Option>
          <Option value="resume-review">📄 Resume Review & Optimization</Option>
          <Option value="salary-negotiation">💰 Salary Negotiation Guidance</Option>
          <Option value="networking">🤝 Professional Networking Strategy</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="preferredContact"
        label={<span className="text-foreground font-semibold text-lg">📞 Preferred Contact Method</span>}
      >
        <Select
          placeholder="How would you like to receive updates?"
          className="w-full glass-card"
          size="large"
        >
          <Option value="email">📧 Email</Option>
          <Option value="phone">📱 Phone/SMS</Option>
          <Option value="linkedin">💼 LinkedIn</Option>
          <Option value="slack">💬 Slack</Option>
          <Option value="discord">🎮 Discord</Option>
          <Option value="none">🚫 No contact preferred</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default UserProfileStep;