import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://agentpresentation.org/",
  author: "Paul Trevithick",
  desc: "Agent Presentation site",
  title: "Agent Presentation",
  ogImage: "agent-presentation.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/MeeFoundation/agentpresentation-landing",
    linkTitle: ` ${SITE.title} on Github`,
    active: false,
  },
];
