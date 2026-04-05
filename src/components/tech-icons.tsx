const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const techMap: Record<string, { label: string; icon: string }> = {
  "React.js": { label: "React", icon: "/icons/react_dark.svg" },
  "React Native": { label: "React Native", icon: "/icons/react_native.svg" },
  "TypeScript": { label: "TypeScript", icon: "/icons/typescript.svg" },
  "JavaScript": { label: "JavaScript", icon: "/icons/javascript.svg" },
  "Next.js": { label: "Next.js", icon: "/icons/nextjs_icon_dark.svg" },
  "Vue.js": { label: "Vue", icon: "/icons/vue.svg" },
  "Redux": { label: "Redux", icon: "/icons/redux.svg" },
  "Zustand": { label: "Zustand", icon: "/icons/react_dark.svg" },
  "Tailwind CSS": { label: "Tailwind", icon: "/icons/tailwindcss.svg" },
  "Material UI": { label: "MUI", icon: "/icons/materialui.svg" },
  "Ant Design": { label: "Ant Design", icon: "/icons/antdesign.svg" },
  "Bootstrap": { label: "Bootstrap", icon: "/icons/bootstrap.svg" },
  "SASS": { label: "SASS", icon: "/icons/sass.svg" },
  "Git": { label: "Git", icon: "/icons/git.svg" },
  "Docker": { label: "Docker", icon: "/icons/docker.svg" },
  "Notion": { label: "Notion", icon: "/icons/notion.svg" },
  "CSS": { label: "CSS", icon: "/icons/css.svg" },
};

interface TechTagProps {
  name: string;
}

export function TechTag({ name }: TechTagProps) {
  const tech = techMap[name];

  if (!tech) {
    return (
      <span className="inline-flex items-center rounded-full border border-teal/20 bg-teal/10 px-3 py-1.5 text-xs font-medium text-teal">
        {name}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal/10 px-3 py-1.5 text-xs font-medium text-teal">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${tech.icon}`}
        alt={tech.label}
        width={14}
        height={14}
        className="h-3.5 w-3.5"
      />
      <span>{tech.label}</span>
    </span>
  );
}
