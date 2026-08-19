import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'monochrome';
  light?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  light = false,
}) => {
  const heightMap = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
    xl: 'h-14 sm:h-16',
  };

  const primaryDark = light ? '#FFFFFF' : '#0F172A';
  const secondaryDark = light ? '#E2E8F0' : '#1E293B';

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightMap[size]} w-auto aspect-square ${className}`}
      >
        <defs>
          <linearGradient id="orangeGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="50%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#E63E00" />
          </linearGradient>
          <linearGradient id="plusGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA040" />
            <stop offset="40%" stopColor="#FF6600" />
            <stop offset="100%" stopColor="#E03800" />
          </linearGradient>
          <filter id="glowIcon" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF5500" floodOpacity="0.35" />
          </filter>
        </defs>
        
        {/* Background rounded badge if needed */}
        <rect width="120" height="120" rx="28" fill={light ? '#0F172A' : '#111827'} />
        
        {/* Stylized 'B' with orange folding ribbon */}
        <path
          d="M26 28H64C76 28 84 34 84 44C84 51 79 56 71 58C81 60 88 67 88 77C88 88 78 94 63 94H26V28Z"
          fill="none"
        />
        {/* Main B Dark Base */}
        <path
          d="M28 28H62C72 28 78 33 78 41C78 47 74 52 66 54C75 56 80 62 80 71C80 81 72 87 59 87H28V28Z"
          fill={light ? '#F8FAFC' : '#FFFFFF'}
        />
        {/* Orange sweeping dynamic ribbon arc */}
        <path
          d="M28 30C36 29 48 29 58 31C67 33 73 38 73 45C73 52 66 57 56 58C46 59 36 60 28 60V30Z"
          fill="url(#orangeGradIcon)"
        />
        {/* Cutouts for inner B loops */}
        <path
          d="M42 40H57C62 40 65 42 65 46C65 50 62 52 57 52H42V40Z"
          fill={light ? '#0F172A' : '#111827'}
        />
        <path
          d="M42 63H56C62 63 66 66 66 71C66 76 62 78 56 78H42V63Z"
          fill={light ? '#0F172A' : '#111827'}
        />

        {/* Brand Plus icon */}
        <path
          d="M84 46H94V36H102V46H112V54H102V64H94V54H84V46Z"
          fill="url(#plusGradIcon)"
          filter="url(#glowIcon)"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 740 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightMap[size]} w-auto max-w-full`}
        role="img"
        aria-label="BRAND+ Logo"
      >
        <defs>
          <linearGradient id="brandOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA033" />
            <stop offset="30%" stopColor="#FF6600" />
            <stop offset="70%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#E63000" />
          </linearGradient>

          <linearGradient id="brandOrangeGradA" x1="20%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#E63000" />
            <stop offset="35%" stopColor="#FF4500" />
            <stop offset="70%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FFA640" />
          </linearGradient>

          <linearGradient id="plusGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFAE42" />
            <stop offset="45%" stopColor="#FF5E00" />
            <stop offset="100%" stopColor="#E62E00" />
          </linearGradient>

          <filter id="plusShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#FF5500" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* LETTER 'B' */}
        <g id="letter-B">
          {/* Main Dark Body */}
          <path
            d="M20 40H74C102 40 118 52 118 70C118 82 108 92 94 96C112 100 124 112 124 128C124 148 104 158 74 158H20V40Z"
            fill={primaryDark}
          />
          {/* Top orange ribbon swoop on B matching the official Brand+ identity */}
          <path
            d="M20 40H70C92 40 106 48 106 63C106 77 92 86 68 86H20V40Z"
            fill="url(#brandOrangeGrad)"
          />
          {/* Top inner counter */}
          <path
            d="M48 58H68C78 58 84 62 84 68C84 74 78 77 68 77H48V58Z"
            fill={light ? '#0F172A' : '#FFFFFF'}
          />
          {/* Bottom inner counter */}
          <path
            d="M48 108H72C84 108 92 114 92 122C92 130 84 136 72 136H48V108Z"
            fill={light ? '#0F172A' : '#FFFFFF'}
          />
          {/* Sleek lower cut detail */}
          <path
            d="M20 90H56V104H20V90Z"
            fill={primaryDark}
          />
        </g>

        {/* LETTER 'R' */}
        <g id="letter-R">
          <path
            d="M148 40H208C236 40 252 54 252 74C252 90 240 102 222 106L256 158H224L194 112H176V158H148V40ZM176 90H204C218 90 226 84 226 74C226 64 218 58 204 58H176V90Z"
            fill={primaryDark}
          />
        </g>

        {/* LETTER 'A' with distinctive Orange folding ribbon */}
        <g id="letter-A">
          {/* Right leg and top connection in dark */}
          <path
            d="M328 40H356L392 158H362L352 122H314L328 78L328 40Z"
            fill={primaryDark}
          />
          {/* Left sweeping orange ribbon leg wrapping into the apex */}
          <path
            d="M276 158L334 40H356L318 158H276Z"
            fill="url(#brandOrangeGradA)"
          />
          {/* Inner cutout */}
          <path
            d="M325 86L343 86L334 54L325 86Z"
            fill={light ? '#0F172A' : '#FFFFFF'}
          />
        </g>

        {/* LETTER 'N' */}
        <g id="letter-N">
          <path
            d="M408 40H436L482 118V40H508V158H480L434 80V158H408V40Z"
            fill={primaryDark}
          />
        </g>

        {/* LETTER 'D' */}
        <g id="letter-D">
          <path
            d="M532 40H582C616 40 638 62 638 99C638 136 616 158 582 158H532V40ZM560 134H582C603 134 614 120 614 99C614 78 603 64 582 64H560V134Z"
            fill={primaryDark}
          />
        </g>

        {/* VIBRANT GLOWING PLUS SIGN '+' */}
        <g id="symbol-PLUS" filter="url(#plusShadow)">
          {/* Outer Plus Bevel / 3D Look */}
          <path
            d="M662 82H688V56H712V82H738V106H712V132H688V106H662V82Z"
            fill="url(#plusGlow)"
          />
          {/* Subtle 3D Top Highlight */}
          <path
            d="M688 56H712V82H738V90H708V60H688V56Z"
            fill="#FFFFFF"
            fillOpacity="0.25"
          />
        </g>
      </svg>
    </div>
  );
};
