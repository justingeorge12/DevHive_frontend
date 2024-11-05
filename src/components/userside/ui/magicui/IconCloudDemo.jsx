import { IconCloud } from "./Icon_cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function IconCloudDemo() {
  return (
    <div className="flex justify-center">
      <div className="flex bg-gradient-to-t from-black-050 via-slate-800 to-black size-full max-w-lg items-center justify-center overflow-hidden rounded-lg  px-20 pb-20 pt-8 ">
        <IconCloud iconSlugs={slugs} />
      </div>
    </div>
  );
}
