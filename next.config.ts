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
      ...[
        {
          source:
            "/media/activities/bonne%20annee%202018/anniversary/anniversary-cover.jpg",
          destination:
            "/media/activities/2018/bonne%20annee%202018/anniversary/anniversary-cover.jpg",
          permanent: true,
        },
        {
          source:
            "/media/activities/bonne%20annee%202018/anniversary/anniversary-group-01.jpg",
          destination:
            "/media/activities/2018/bonne%20annee%202018/anniversary/anniversary-group-01.jpg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-001.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-001.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-002.jpg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-002.jpg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-003.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-003.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-004.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-004.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-005.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-005.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-006.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-006.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-007.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-007.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-008.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-008.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-009.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-009.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-010.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-010.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-011.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-011.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-012.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-012.jpeg",
          permanent: true,
        },
        {
          source:
            "/media/anniversaire%202016/2016-anniversaire-seafa-photo-013.jpeg",
          destination:
            "/media/activities/2016/anniversaire%202016/2016-anniversaire-seafa-photo-013.jpeg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-01.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-01.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-02.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-02.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-03.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-03.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-04.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-04.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-05.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-05.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-06.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-06.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-07.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-07.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-08.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-08.jpg",
          permanent: true,
        },
        {
          source: "/media/community/2019/gitega-trip/gitega-trip-09.jpg",
          destination: "/media/community/2019/mabanda-trip/gitega-trip-09.jpg",
          permanent: true,
        },
        {
          source:
            "/media/community/2019/jenda-excursion/jenda-excursion-01.png",
          destination:
            "/media/activities/2021/jenda-excursion%202021/jenda-excursion-01.png",
          permanent: true,
        },
        {
          source: "/media/events/2018/karera-falls/karera-falls-group-01.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/1.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2018/karera-falls/karera-falls-group-02.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/2.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-01.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-01.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-02.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-02.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-03.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-03.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-04.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-04.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-05.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-05.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-06.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-06.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-07.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-07.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-08.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-08.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-09.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-09.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-10.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-10.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-11.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-11.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2019/anniversary/anniversary-12.jpg",
          destination:
            "/media/events/2019/anniversary%202019/anniversary-12.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-01.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-01.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-02.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-02.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-03.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-03.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-04.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-04.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-05.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-05.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-06.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-06.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-07.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-07.jpg",
          permanent: true,
        },
        {
          source: "/media/events/2021/anniversary/anniversary-08.jpg",
          destination:
            "/media/events/2021/karera-falls-anniversary%202021/anniversary-08.jpg",
          permanent: true,
        },
        {
          source: "/media/president%20hierachy/arnaud-badogomba.png",
          destination:
            "/media/president%20hierachy/arnaud-badogomba-2014-2020.png",
          permanent: true,
        },
        {
          source: "/media/president%20hierachy/president-jimmy-jambo.png",
          destination:
            "/media/president%20hierachy/president-jimmy-jambo%202024-current.png",
          permanent: true,
        },
        {
          source: "/media/president%20hierachy/president-romeo-badogomba.jpeg",
          destination:
            "/media/president%20hierachy/president-romeo-badogomba...2020-2022.jpeg",
          permanent: true,
        },
        {
          source: "/media/president%20hierachy/president-tony-ezako.jpg",
          destination:
            "/media/president%20hierachy/president-tony-ezako...2022-2024.jpg",
          permanent: true,
        },
        {
          source: "/interviews/idan",
          destination: "/interviews/idane",
          permanent: true,
        },
        {
          source: "/media/history/2013/founders.png",
          destination: "/media/history/2013/founders-corrected.svg",
          permanent: true,
        },
        {
          source: "/media/history/founders.png",
          destination: "/media/history/2013/founders-corrected.svg",
          permanent: true,
        },
      ],
      {
        source: "/gallery/history-2013",
        destination: "/history#year-2013",
        permanent: true,
      },
      {
        source: "/gallery/events-2022-anniversary",
        destination: "/gallery/nouvel-an-2018",
        permanent: true,
      },
      {
        source: "/events/events-2022-anniversary",
        destination: "/events/nouvel-an-2018",
        permanent: true,
      },
      {
        source: "/media/history/2013/founding-members-01.png",
        destination: "/media/history/2013/founders.png",
        permanent: true,
      },
      {
        source: "/media/events/2022/anniversary/:file",
        destination: "/media/activities/bonne%20annee%202018/anniversary/:file",
        permanent: true,
      },
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
      {
        source:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/IMG-20181117-WA0001.jpg",
        destination:
          "/media/activities/2020/SEAFA%20MEDICINE%202020/IMG-20181117-WA0001.jpg",
        permanent: true,
      },
      {
        source:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/IMG-20190310-WA0006.jpg",
        destination:
          "/media/activities/2020/SEAFA%20MEDICINE%202020/IMG-20190310-WA0006.jpg",
        permanent: true,
      },
      {
        source:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/IMG-20190310-WA0009.jpg",
        destination: "/media/events/2018/gala-match/IMG-20190310-WA0009.jpg",
        permanent: true,
      },
      {
        source:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/IMG-20190310-WA0024.jpg",
        destination: "/media/events/2018/gala-match/IMG-20190310-WA0024.jpg",
        permanent: true,
      },
      {
        source:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/IMG-20190310-WA0029.jpg",
        destination: "/media/events/2018/gala-match/IMG-20190310-WA0029.jpg",
        permanent: true,
      },
      {
        source:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/IMG_1677.JPG",
        destination: "/media/events/2018/gala-match/IMG_1677.JPG",
        permanent: true,
      },
      {
        source:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/IMG_1729.JPG",
        destination: "/media/events/2018/gala-match/IMG_1729.JPG",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-001.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-001.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-002.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-002.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-003.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-003.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-004.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-004.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-005.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-005.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-006.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-006.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-007.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-007.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-008.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-008.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-009.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-009.jpg",
        permanent: true,
      },
      {
        source: "/media/activities/2022/2022-conference-sante-photo-010.jpg",
        destination:
          "/media/activities/2022/conference/2022-conference-sante-photo-010.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-01.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-01.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-02.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-02.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-03.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-03.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-04.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-04.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-05.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-05.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-06.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-06.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-07.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-07.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-08.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-08.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-09.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-09.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-10.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-10.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-11.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-11.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-12.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-12.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/teza-trip/teza-trip-13.jpg",
        destination:
          "/media/activities/2021/jenda-excursion%202021/teza-trip-13.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-01.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-01.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-02.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-02.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-03.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-03.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-04.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-04.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-05.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-05.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-06.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-06.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-07.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-07.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-08.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-08.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-09.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-09.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-10.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-10.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-11.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-11.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-12.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-12.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-13.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-13.jpg",
        permanent: true,
      },
      {
        source: "/media/community/2019/walk/community-walk-14.jpg",
        destination:
          "/media/activities/2020/marche%20aller%20retour%20jusqu'a%20la%20lpage%20de%20bujumbura/community-walk-14.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-01.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-01.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-02.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-02.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-03.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-03.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-04.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-04.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-05.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-05.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-06.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-06.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-07.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-07.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-08.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-08.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-09.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-09.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-10.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-10.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-11.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-11.jpg",
        permanent: true,
      },
      {
        source: "/media/events/2019/anniversary%202017/anniversary-12.jpg",
        destination: "/media/events/2019/anniversary%202019/anniversary-12.jpg",
        permanent: true,
      },
      {
        source:
          "/media/events/2021/karera-falls-anniversary%202021/karera-falls-group-01.jpg",
        destination: "/media/events/2021/karera-falls-anniversary%202021/1.jpg",
        permanent: true,
      },
      {
        source:
          "/media/events/2021/karera-falls-anniversary%202021/karera-falls-group-02.jpg",
        destination: "/media/events/2021/karera-falls-anniversary%202021/2.jpg",
        permanent: true,
      },
      {
        source: "/gallery/community-2019-teza-trip",
        destination: "/gallery/community-2019-jenda-excursion",
        permanent: true,
      },
      {
        source: "/gallery/community-2019-walk",
        destination: "/gallery/marche-bujumbura-2020",
        permanent: true,
      },
      {
        source: "/gallery/events-2018-karera-falls",
        destination: "/gallery/events-2021-anniversary",
        permanent: true,
      },
      {
        source: "/gallery/community-jenda-group-photo",
        destination: "/gallery/community-2019-jenda-excursion",
        permanent: true,
      },
      {
        source: "/gallery/community-kibimba-group-photo",
        destination: "/gallery/history-archives",
        permanent: true,
      },
      {
        source: "/gallery/events-medical-session",
        destination: "/gallery/events-2018-medical-consultation",
        permanent: true,
      },
    ];
  },
};
export default config;
