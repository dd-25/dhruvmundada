type IconProps = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function GithubIcon({ size = 19 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function LinkedinIcon({ size = 19 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function XIcon({ size = 19 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M3 3l7.5 9.8L3.4 21h2.2l6-6.6 5 6.6H21l-7.9-10.3L20.5 3h-2.2l-5.5 6L8.3 3z" />
    </svg>
  );
}

export function MailIcon({ size = 19 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

export function SiteIcon({ size = 19 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </svg>
  );
}

export function DownloadIcon({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

export function ArrowIcon({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PhoneIcon({ size = 19 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  email: MailIcon,
  site: SiteIcon,
} as const;

export type SocialIconId = keyof typeof SOCIAL_ICONS;

export function SocialIcon({ id, size }: { id: SocialIconId; size?: number }) {
  const Icon = SOCIAL_ICONS[id];
  return <Icon size={size} />;
}
