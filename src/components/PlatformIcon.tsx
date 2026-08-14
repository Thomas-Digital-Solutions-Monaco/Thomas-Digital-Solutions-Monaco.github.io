import type { Platform } from "../i18n/translations";

// Inline brand marks so the platform buttons always render (no network needed).
const paths: Record<Platform, { label: string; svg: JSX.Element }> = {
  ios: {
    label: "iOS",
    svg: (
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    ),
  },
  mac: {
    label: "macOS",
    svg: (
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    ),
  },
  android: {
    label: "Android",
    svg: (
      <g>
        <path d="M6 9h12v7a1 1 0 0 1-1 1h-1v3a1 1 0 1 1-2 0v-3h-2v3a1 1 0 1 1-2 0v-3H8a1 1 0 0 1-1-1V9zM4 9a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0V9zm14 0a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0V9z" />
        <path d="M7.6 8a4.4 4.4 0 0 1 8.8 0H7.6z" />
        <circle cx="9.6" cy="5.6" r=".55" />
        <circle cx="14.4" cy="5.6" r=".55" />
      </g>
    ),
  },
  windows: {
    label: "Windows",
    svg: (
      <path d="M3 5.5l7.5-1v7.5H3V5.5zm0 8.5h7.5v7.5L3 20V14zm9-9.7L21 3v9h-9V4.3zM12 13h9v8l-9-1.3V13z" />
    ),
  },
};

export const platformLabel = (p: Platform) => paths[p].label;

const PlatformIcon = ({
  platform,
  className = "h-4 w-4",
}: {
  platform: Platform;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {paths[platform].svg}
  </svg>
);

export default PlatformIcon;
