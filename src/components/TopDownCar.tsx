const TopDownCar = ({ scale = 1 }: { scale?: number }) => (
  <g transform={`scale(${scale})`}>
    <ellipse cx="0" cy="0" rx="15" ry="8" fill="#000" opacity="0.18" />
    <rect x="4.5" y="-9.5" width="4.5" height="3.6" rx="1" fill="#111319" />
    <rect x="4.5" y="5.9" width="4.5" height="3.6" rx="1" fill="#111319" />
    <rect x="-9.5" y="-10.2" width="5.2" height="4.2" rx="1" fill="#111319" />
    <rect x="-9.5" y="6" width="5.2" height="4.2" rx="1" fill="#111319" />
    <rect x="12.5" y="-8" width="2.6" height="16" rx="1" fill="#e9e9ef" />
    <rect x="11" y="-8" width="1.6" height="16" rx="0.6" fill="#b9111f" />
    <rect x="-14.5" y="-8.5" width="3" height="17" rx="1" fill="#141319" />
    <rect x="-13" y="-8.5" width="1.4" height="17" rx="0.6" fill="#e9e9ef" />
    <path d="M 13 0 L 8 -2.6 L 2 -3.4 L -4 -4.6 L -12 -4 L -13 -2.4 L -13 2.4 L -12 4 L -4 4.6 L 2 3.4 L 8 2.6 Z" fill="#d81e2c" stroke="#8f0f1b" strokeWidth="0.7" />
    <path d="M 12 0 L 4 -0.9 L -12 -1.1 L -12 1.1 L 4 0.9 Z" fill="#f4f4f8" opacity="0.9" />
    <path d="M 1 -3.2 L -7 -3.6 L -7 -5.6 L -1 -5 Z" fill="#9b1c31" />
    <path d="M 1 3.2 L -7 3.6 L -7 5.6 L -1 5 Z" fill="#9b1c31" />
    <path d="M -5 -2.2 L -12 -1.6 L -12 1.6 L -5 2.2 Z" fill="#a5121e" />
    <circle cx="-1" cy="0" r="3" fill="#141319" /><circle cx="-1" cy="0" r="1.7" fill="#f4f4f8" /><circle cx="-1" cy="0" r="0.8" fill="#d81e2c" />
    <path d="M 13 0 L 8.5 -1.5 L 8.5 1.5 Z" fill="#f4f4f8" />
  </g>
);
export default TopDownCar;
