import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = ({ 
  size = 'default', 
  tip = '', 
  className = '',
  spinning = true,
  children = null 
}) => {
  const customIcon = (
    <LoadingOutlined 
      style={{ 
        fontSize: size === 'large' ? 48 : size === 'small' ? 16 : 24,
        color: '#1a73e8' // Google Blue
      }} 
      spin 
    />
  );

  if (children) {
    return (
      <Spin 
        spinning={spinning}
        indicator={customIcon}
        tip={tip}
        size={size}
        className={className}
      >
        {children}
      </Spin>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      <div className="relative">
        <Spin 
          indicator={customIcon}
          size={size}
        />
        <div className="absolute inset-0 rounded-full animate-ping bg-google-blue/20 scale-150"></div>
      </div>
      {tip && (
        <p className="text-muted-foreground text-center animate-pulse max-w-md leading-relaxed">
          {tip}
        </p>
      )}
    </div>
  );
};

export default Spinner;