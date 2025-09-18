import React from 'react';
import { Tag } from 'antd';

const SkillChip = ({ skill, level = 'default', onRemove = null, className = '' }) => {
  const getColor = () => {
    switch (level) {
      case 'beginner':
        return 'orange';
      case 'intermediate':
        return 'blue';
      case 'advanced':
        return 'green';
      case 'expert':
        return 'purple';
      case 'needed':
        return 'red';
      case 'have':
        return 'cyan';
      default:
        return 'default';
    }
  };

  const getLevelText = () => {
    if (level && level !== 'default') {
      return ` (${level})`;
    }
    return '';
  };

  return (
    <Tag
      color={getColor()}
      closable={!!onRemove}
      onClose={() => onRemove && onRemove(skill)}
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        transition-all duration-200 hover:scale-105 cursor-pointer
        ${className}
      `}
    >
      {skill}{getLevelText()}
    </Tag>
  );
};

export default SkillChip;