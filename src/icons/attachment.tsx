import React from "react";

interface AttachmentIconProps {
  size?: number;
  color?: string;
}

const AttachmentIcon = ({ size = 24, color = "currentColor" }: AttachmentIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 21.9983 8.005 21.9983C6.41277 21.9983 4.88584 21.3658 3.76 20.24C2.63416 19.1142 2.00166 17.5872 2.00166 15.995C2.00166 14.4028 2.63416 12.8758 3.76 11.75L12.33 3.18C13.0807 2.42932 14.099 2.00053 15.16 2.00053C16.221 2.00053 17.2393 2.42932 17.99 3.18C18.7407 3.93068 19.1695 4.94903 19.1695 6.01C19.1695 7.07097 18.7407 8.08932 17.99 8.84L9.41 17.41C9.03471 17.7853 8.52573 17.9961 7.995 17.9961C7.46427 17.9961 6.95529 17.7853 6.58 17.41C6.20471 17.0347 5.99389 16.5257 5.99389 15.995C5.99389 15.4643 6.20471 14.9553 6.58 14.58L15.07 6.1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AttachmentIcon; 