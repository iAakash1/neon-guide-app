import React from 'react';
import { Card, Tag, Button, Space, Typography } from 'antd';
import { 
  BookOutlined, 
  PlayCircleOutlined, 
  FileTextOutlined, 
  LinkOutlined,
  DollarOutlined 
} from '@ant-design/icons';

const { Text, Link } = Typography;

const ResourceCard = ({ resource, onAddToPlan = null, className = '' }) => {
  const { title, url, cost, type, description, duration, rating } = resource;

  const getTypeIcon = () => {
    switch (type) {
      case 'course':
        return <PlayCircleOutlined className="text-google-blue" />;
      case 'book':
        return <BookOutlined className="text-google-green" />;
      case 'article':
      case 'guide':
        return <FileTextOutlined className="text-google-yellow" />;
      case 'interactive':
        return <LinkOutlined className="text-google-red" />;
      default:
        return <LinkOutlined className="text-muted-foreground" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'course':
        return 'blue';
      case 'book':
        return 'green';
      case 'article':
      case 'guide':
        return 'orange';
      case 'interactive':
        return 'purple';
      default:
        return 'default';
    }
  };

  const formatCost = () => {
    if (cost === 0) return 'Free';
    return `$${cost}`;
  };

  return (
    <Card
      className={`glass-card hover:shadow-lg transition-all duration-300 ${className}`}
      size="small"
      actions={[
        <Button
          type="link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          icon={<LinkOutlined />}
          className="text-google-blue"
        >
          Open Resource
        </Button>,
        ...(onAddToPlan ? [
          <Button
            type="text"
            onClick={() => onAddToPlan(resource)}
            className="text-google-green"
          >
            Add to Plan
          </Button>
        ] : [])
      ]}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getTypeIcon()}
            <Text strong className="text-foreground line-clamp-2">
              {title}
            </Text>
          </div>
          <Tag color={getTypeColor()} className="ml-2 shrink-0">
            {type}
          </Tag>
        </div>

        {/* Description */}
        {description && (
          <Text className="text-muted-foreground text-sm block line-clamp-2">
            {description}
          </Text>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between">
          <Space size="middle">
            {/* Cost */}
            <div className="flex items-center space-x-1">
              <DollarOutlined className="text-muted-foreground text-xs" />
              <Text className={`text-sm font-medium ${cost === 0 ? 'text-google-green' : 'text-foreground'}`}>
                {formatCost()}
              </Text>
            </div>

            {/* Duration */}
            {duration && (
              <Text className="text-muted-foreground text-sm">
                {duration}
              </Text>
            )}

            {/* Rating */}
            {rating && (
              <Text className="text-muted-foreground text-sm">
                ⭐ {rating}
              </Text>
            )}
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;