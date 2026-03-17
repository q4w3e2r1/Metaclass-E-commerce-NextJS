import * as React from 'react';

const colorMap = {
  primary: 'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  accent: 'var(--color-brand)',
};

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  fill?: string;
};

const ArrowDownIcon: React.FC<IconProps> = ({
  className,
  color = 'primary',
  fill,
  width = 24,
  height = 24,
  ...props
}) => {
  const colorValue = fill ?? colorMap[color];

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block' }}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={colorValue}
      />
    </svg>
  );
};

export default ArrowDownIcon;
