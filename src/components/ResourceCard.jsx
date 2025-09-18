import React from 'react';
import { Tag, Typography } from 'antd';
import { 
  BookOutlined, 
  PlayCircleOutlined, 
  FileTextOutlined, 
  LinkOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  StarFilled,
  PlusOutlined,
  ExportOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const ResourceCard = ({ resource, onAddToPlan = null, className = '' }) => {
  const { title, url, cost, type, description, duration, rating } = resource;

  const getTypeConfig = () => {
    switch (type) {
      case 'course':
        return {
          icon: <PlayCircleOutlined />,
          color: 'google-blue',
          bgColor: 'bg-google-blue/10',
          borderColor: 'border-google-blue/20'
        };
      case 'book':
        return {
          icon: <BookOutlined />,
          color: 'google-green',
          bgColor: 'bg-google-green/10',
          borderColor: 'border-google-green/20'
        };
      case 'article':
      case 'guide':
        return {
          icon: <FileTextOutlined />,
          color: 'google-yellow',
          bgColor: 'bg-google-yellow/10',
          borderColor: 'border-google-yellow/20'
        };
      case 'interactive':
        return {
          icon: <LinkOutlined />,
          color: 'google-red',
          bgColor: 'bg-google-red/10',
          borderColor: 'border-google-red/20'
        };
      default:
        return {
          icon: <LinkOutlined />,
          color: 'muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20'
        };
    }
  };

  const typeConfig = getTypeConfig();

  const formatCost = () => {
    if (cost === 0) return 'Free';
    return `$${cost}`;
  };

  return (
    <div className={`material-card group cursor-pointer relative ${className}`}>
      {/* Card Header */}
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className={`p-2 rounded-lg ${typeConfig.bgColor} ${typeConfig.borderColor} border`}>
              <span className={`text-${typeConfig.color} text-lg`}>
                {typeConfig.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-google-blue transition-colors">
                {title}
              </h3>
            </div>
          </div>
          <div className="ml-2 flex-shrink-0">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} text-${typeConfig.color} border ${typeConfig.borderColor} capitalize`}>
              {type}
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
        )}
      </div>

      {/* Meta Information */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            {/* Cost */}
            <div className="flex items-center space-x-1">
              <DollarOutlined className="text-muted-foreground" />
              <span className={`font-medium ${cost === 0 ? 'text-google-green' : 'text-foreground'}`}>
                {formatCost()}
              </span>
            </div>

            {/* Duration */}
            {duration && (
              <div className="flex items-center space-x-1">
                <ClockCircleOutlined className="text-muted-foreground" />
                <span className="text-muted-foreground">
                  {duration}
                </span>
              </div>
            )}

            {/* Rating */}
            {rating && (
              <div className="flex items-center space-x-1">
                <StarFilled className="text-google-yellow text-xs" />
                <span className="text-muted-foreground">
                  {rating}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 pt-2 border-t border-border/20">
        <div className="flex items-center justify-between space-x-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 material-button material-button-secondary text-xs py-2 justify-center space-x-2 no-underline hover:no-underline"
          >
            <ExportOutlined />
            <span>Open Resource</span>
          </a>
          
          {onAddToPlan && (
            <button
              onClick={() => onAddToPlan(resource)}
              className="flex-shrink-0 p-2 rounded-lg hover:bg-google-green/10 text-google-green transition-colors group/btn"
              title="Add to Plan"
            >
              <PlusOutlined className="text-sm group-hover/btn:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-transparent to-google-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ResourceCard;
