import React from 'react';

interface CSSSparkleProps {
  size?: number;
  color?: string;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  delay?: string;
  points?: 4 | 8;
  style?: React.CSSProperties;
}

export const CSSSparkle: React.FC<CSSSparkleProps> = ({ 
  size = 20, 
  color = '#EAEAEA', 
  top, 
  left, 
  right, 
  bottom, 
  delay = '0s', 
  points = 4,
  style
}) => {
  const is8Point = points === 8;
  return (
    <div style={{ 
      position: 'absolute', 
      top, left, right, bottom, 
      width: size, height: size, 
      animation: `sparkleTwinkle 3s ease-in-out infinite ${delay}`,
      zIndex: 0,
      pointerEvents: 'none',
      ...style
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sparkleTwinkle {
          0%, 100% { transform: scale(0.5); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 1; }
        }
      `}} />
      <div style={{
        position: 'absolute', width: '100%', height: '100%', backgroundColor: color,
        clipPath: 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)',
        boxShadow: `0 0 10px ${color}`
      }} />
      {is8Point && (
        <div style={{
          position: 'absolute', width: '70%', height: '70%', top: '15%', left: '15%', backgroundColor: color,
          clipPath: 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)',
          transform: 'rotate(45deg)'
        }} />
      )}
    </div>
  );
};
