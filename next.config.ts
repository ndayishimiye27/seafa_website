import type { NextConfig } from "next";
const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingExcludes: {
    "/*": [
      "./tmp/**/*",
      "./tests/**/*",
      "./test-results/**/*",
      "./playwright-report/**/*",
    ],
  },
  async redirects() {
    return [
      {
        source: "/media/president%20hierachy/president-romeo.jpeg",
        destination:
          "/media/president%20hierachy/president-romeo-badogomba.jpeg",
        permanent: true,
      },
      {
        source: "/gallery/community-2019-mentoring",
        destination: "/gallery/community-2021-placide-conference-saint-esprit",
        permanent: true,
      },
      {
        source: "/activities/community-2019-mentoring",
        destination: "/gallery/community-2021-placide-conference-saint-esprit",
        permanent: true,
      },
      {
        source: "/gallery/people",
        destination: "/history#presidents",
        permanent: true,
      },
      {
        source: "/gallery/match-2015",
        destination: "/gallery/events-2016-anniversary",
        permanent: true,
      },
      { source: "/squad", destination: "/team", permanent: true },
      {
        source: "/leadership",
        destination: "/team#leadership-title",
        permanent: true,
      },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      {
        source: "/match-request",
        destination: "/request-match",
        permanent: true,
      },
    ];
  },
};
export default config;
