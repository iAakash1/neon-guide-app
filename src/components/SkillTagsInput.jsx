import React, { useState } from 'react';
import { Select, Tag, Input, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SkillTagsInput = ({ value = [], onChange, placeholder = "Search or add skills" }) => {
  const [inputValue, setInputValue] = useState('');

  // Comprehensive skill database
  const skillDatabase = [
    // Programming Languages
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin',
    'PHP', 'Ruby', 'Scala', 'R', 'MATLAB', 'SQL', 'HTML', 'CSS', 'Dart', 'Perl',
    
    // Frontend Technologies
    'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Redux', 'Vuex', 'Tailwind CSS',
    'Bootstrap', 'Material-UI', 'Ant Design', 'Sass', 'Less', 'Webpack', 'Vite', 'Parcel',
    
    // Backend Technologies
    'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Ruby on Rails',
    'ASP.NET', 'Laravel', 'Symfony', 'Gin', 'Fiber', 'Actix', 'Koa.js',
    
    // Databases
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB',
    'Oracle', 'SQLite', 'MariaDB', 'InfluxDB', 'Neo4j', 'CouchDB',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions',
    'Terraform', 'Ansible', 'Chef', 'Puppet', 'Nginx', 'Apache', 'Linux', 'Ubuntu', 'CentOS',
    
    // Data Science & AI
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas',
    'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter', 'Apache Spark', 'Hadoop', 'Kafka',
    'Data Analysis', 'Statistics', 'A/B Testing', 'Data Visualization', 'Tableau', 'Power BI',
    
    // Mobile Development
    'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 'Ionic',
    'Cordova', 'Unity', 'Unreal Engine',
    
    // Design & UX
    'UI/UX Design', 'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InDesign',
    'After Effects', 'Framer', 'Principle', 'Prototyping', 'User Research', 'Wireframing',
    'Design Systems', 'Accessibility', 'Responsive Design',
    
    // Business & Management
    'Project Management', 'Agile', 'Scrum', 'Kanban', 'Product Management', 'Business Analysis',
    'Strategic Planning', 'Risk Management', 'Change Management', 'Team Leadership',
    'Client Relations', 'Stakeholder Management', 'Budget Management',
    
    // Marketing & Sales
    'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing',
    'Email Marketing', 'Google Analytics', 'Facebook Ads', 'Google Ads', 'Sales',
    'Lead Generation', 'Customer Acquisition', 'Brand Management', 'Market Research',
    
    // Soft Skills
    'Communication', 'Leadership', 'Problem Solving', 'Critical Thinking', 'Creativity',
    'Adaptability', 'Time Management', 'Teamwork', 'Mentoring', 'Presentation Skills',
    'Negotiation', 'Conflict Resolution', 'Emotional Intelligence', 'Decision Making',
    
    // Tools & Platforms
    'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence', 'Slack', 'Microsoft Office',
    'Google Workspace', 'Notion', 'Trello', 'Asana', 'Monday.com', 'Salesforce', 'HubSpot',
    'Zapier', 'Postman', 'Insomnia', 'VS Code', 'IntelliJ IDEA', 'Eclipse'
  ];

  const handleChange = (newValue) => {
    onChange?.(newValue);
  };

  const handleInputChange = (newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAddCustomSkill = () => {
    if (inputValue && !value.includes(inputValue)) {
      handleChange([...value, inputValue]);
      setInputValue('');
    }
  };

  const filteredSkills = skillDatabase.filter(skill => 
    skill.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(skill)
  );

  return (
    <div className="space-y-4">
      <Select
        mode="multiple"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onSearch={handleInputChange}
        searchValue={inputValue}
        className="w-full"
        size="large"
        showSearch
        filterOption={false}
        notFoundContent={
          inputValue ? (
            <div className="p-2 text-center">
              <Text className="text-muted-foreground">No matching skills found.</Text>
              <br />
              <button
                onClick={handleAddCustomSkill}
                className="mt-2 text-google-blue hover:text-google-blue/80 transition-colors"
              >
                <PlusOutlined /> Add "{inputValue}" as custom skill
              </button>
            </div>
          ) : null
        }
        tagRender={(props) => {
          const { label, value: tagValue, onClose } = props;
          const isCustom = !skillDatabase.includes(tagValue);
          
          return (
            <Tag
              color={isCustom ? 'orange' : 'blue'}
              onClose={onClose}
              closable
              className="m-1"
            >
              {isCustom && '⭐ '}{label}
            </Tag>
          );
        }}
      >
        {filteredSkills.slice(0, 50).map(skill => (
          <Select.Option key={skill} value={skill}>
            {skill}
          </Select.Option>
        ))}
      </Select>
      
      {value.length > 0 && (
        <div className="glass-card p-4 rounded-lg">
          <Text className="text-muted-foreground text-sm block mb-2">
            Selected Skills ({value.length}):
          </Text>
          <Space size="small" wrap>
            {value.map(skill => {
              const isCustom = !skillDatabase.includes(skill);
              return (
                <Tag
                  key={skill}
                  color={isCustom ? 'orange' : 'blue'}
                  className="cursor-default"
                >
                  {isCustom && '⭐ '}{skill}
                </Tag>
              );
            })}
          </Space>
        </div>
      )}
    </div>
  );
};

export default SkillTagsInput;