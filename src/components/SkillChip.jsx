import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

const SkillChip = ({ skill, level = 'default', onRemove = null, className = '' }) => {
  const getLevelConfig = () => {
    switch (level) {
      case 'beginner':
        return {
          color: 'text-google-yellow',
          bg: 'bg-google-yellow/10',
          border: 'border-google-yellow/20',
          text: 'Beginner'
        };
      case 'intermediate':
        return {
          color: 'text-google-blue',
          bg: 'bg-google-blue/10',
          border: 'border-google-blue/20',
          text: 'Intermediate'
        };
      case 'advanced':
        return {
          color: 'text-google-green',
          bg: 'bg-google-green/10',
          border: 'border-google-green/20',
          text: 'Advanced'
        };
      case 'expert':
        return {
          color: 'text-purple-500',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'Expert'
        };
      case 'needed':
        return {
          color: 'text-google-red',
          bg: 'bg-google-red/10',
          border: 'border-google-red/20',
          text: 'Needed'
        };
      case 'have':
        return {
          color: 'text-google-green',
          bg: 'bg-google-green/10',
          border: 'border-google-green/20',
          text: 'Have'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted/10',
          border: 'border-muted/20',
          text: null
        };
    }
  };

  const config = getLevelConfig();

  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        ${config.bg} ${config.border} ${config.color}
        border transition-all duration-200 hover:scale-105 cursor-pointer
        hover:shadow-elevation-1 group
        ${className}
      `}
    >
      <span className="truncate">
        {skill}
      </span>
      
      {config.text && (
        <span className="text-xs opacity-75 font-normal">
          ({config.text})
        </span>
      )}
      
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(skill);
          }}
          className="ml-1 p-0.5 rounded-full hover:bg-current/10 transition-colors group-hover:scale-110"
          aria-label={`Remove ${skill}`}
        >
          <CloseOutlined className="text-xs" />
        </button>
      )}
    </span>
  );
};

export default SkillChip;