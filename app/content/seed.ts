/**
 * Seed content — the copy that lived inline in the page files before the CMS.
 *
 * Two jobs:
 *  1. Fallback when Sanity is unconfigured or unreachable, so the site always renders.
 *  2. Source data for `npm run cms:seed`, which imports it into Sanity once.
 *
 * After the import, Sanity is the source of truth. Edit content there, not here.
 */

export type NewsItem = {
  _id?: string;
  type: string;
  source: string;
  title: string;
  url: string;
};

export type Publication = {
  _id?: string;
  year: string;
  journal: string;
  title: string;
  authors: string;
  detail: string;
  url: string;
};

export type TeamMember = {
  _id?: string;
  name: string;
  role: string;
  note: string;
  image: string;
  linkedin: string;
  group: "leadership" | "advisor";
};

export const newsSeed: NewsItem[] = [
  {
    type: "Research news",
    source: "University of Minnesota Medical School",
    title: "University of Minnesota research team discovers new therapy potential for Duchenne muscular dystrophy",
    url: "https://med.umn.edu/news/university-minnesota-research-team-discovers-new-therapy-potential-duchenne-muscular-dystrophy-0",
  },
  {
    type: "Research news",
    source: "University of Minnesota College of Science & Engineering",
    title: "Bottlebrush approach shows new potential for Duchenne muscular dystrophy",
    url: "https://cse.umn.edu/college/news/university-minnesota-research-team-discovers-new-therapy-potential-duchenne-muscular",
  },
  {
    type: "Podcast",
    source: "Base by Base · Episode 173",
    title: "Bottlebrush block copolymer shields muscles and prevents DMD onset",
    url: "https://basebybase.castos.com/episodes/synthetic-bottlebrush-block-copolymer-prevents-disease-onset",
  },
];

export const publicationsSeed: Publication[] = [
  {
    year: "2025",
    journal: "PNAS",
    title: "Synthetic bottlebrush block copolymer prevents disease onset in Duchenne muscular dystrophy",
    authors: "Cohen, H.; Angulski, A.B.B.; Quick, J.D.; Kuebler, T.; Thompson, B.R.; et al.",
    detail: "122 (42), e2513599122",
    url: "https://www.pnas.org/doi/10.1073/pnas.2513599122",
  },
  {
    year: "2023",
    journal: "Langmuir",
    title: "Discovery of kinetic trapping of poloxamers inside liposomes via thermal treatment",
    authors: "Hassler, J.; Lawson, M.; Arroyo, E.; Bates, F.S.; Hackel, B.J.; Lodge, T.P.",
    detail: "39, 14263–14274",
    url: "https://pubmed.ncbi.nlm.nih.gov/37755825/",
  },
  {
    year: "2023",
    journal: "Biomacromolecules",
    title: "Effect of bottlebrush poloxamer architecture on binding to liposomes",
    authors: "Hassler, J.; Crabtree, A.A.; Liberman, L.; Bates, F.S.; Hackel, B.J.; Lodge, T.P.",
    detail: "24, 449–461",
    url: "https://pubmed.ncbi.nlm.nih.gov/36563027/",
  },
  {
    year: "2022",
    journal: "ACS Macro Letters",
    title: "Synthesis and micellization of bottlebrush poloxamers",
    authors: "Hassler, J.F.; Van Zee, N.J.; Crabtree, A.A.; Bates, F.S.; Hackel, B.J.; Lodge, T.P.",
    detail: "11, 460–467",
    url: "https://pubmed.ncbi.nlm.nih.gov/35575325/",
  },
];

export const teamSeed: TeamMember[] = [
  { name: "Nithya Iyer Singh", role: "Chief Executive Officer", note: "Co-founder, 2123iX · GSK, Tesaro, Medco", image: "/team/nithya.png", linkedin: "https://www.linkedin.com/in/nithyaiyersingh/", group: "leadership" },
  { name: "Frank Bates", role: "Co-founder · Regents Professor", note: "Chemical Engineering & Materials Science, University of Minnesota", image: "/team/frank.png", linkedin: "https://www.linkedin.com/in/frank-bates-6794a621a/", group: "leadership" },
  { name: "Ben Hackel", role: "Co-founder · Professor", note: "Chemical Engineering & Materials Science, University of Minnesota", image: "/team/ben.png", linkedin: "https://www.linkedin.com/in/benjamin-hackel-5a366225/", group: "leadership" },
  { name: "Tim Lodge", role: "Co-founder · Regents Professor", note: "Chemistry and Chemical Engineering & Materials Science, University of Minnesota", image: "/team/tim.png", linkedin: "https://www.linkedin.com/in/tim-lodge-a728ab268/", group: "leadership" },
  { name: "Joe Metzger", role: "Professor; Dept. Head & Chair", note: "Integrative Biology & Physiology, University of Minnesota", image: "/team/joe.png", linkedin: "https://www.linkedin.com/school/university-of-minnesota-medical-school", group: "advisor" },
  { name: "Demetris Yannopoulos, MD", role: "Professor of Medicine", note: "Research Director, Interventional Cardiology; Director, Resuscitation Medicine", image: "/team/demetris.png", linkedin: "https://www.linkedin.com/in/demetris-yannopoulos-b110518a/", group: "advisor" },
  { name: "Navjot Singh", role: "Business Advisor", note: "Co-founder & CEO, 2123iX; Senior Partner Emeritus, McKinsey", image: "/team/navjot.png", linkedin: "https://www.linkedin.com/in/navjot-singh-imagine/", group: "advisor" },
];
