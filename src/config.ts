import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://providerdiscovery.org/",
  author: "Paul Trevithick",
  desc: "Provider Discovery site",
  title: "Provider Discovery",
  ogImage: "provider-discovery.jpg",
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
    href: "https://github.com/MeeFoundation/providerdiscovery-landing",
    linkTitle: ` ${SITE.title} on Github`,
    active: false,
  },
];
