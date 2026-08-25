/**
 * Editable page copy.
 *
 * Every value here is overridable from Sanity; these are the defaults used when
 * the CMS is unconfigured or unreachable, so the site always renders.
 *
 * Multi-line strings use "\n" for a line break in a heading — the `Lines`
 * helper in app/components/SiteChrome.tsx renders those as <br/>.
 */

export type Labelled = { label: string; text: string };

/** A resolved image: either a file under /public or an upload from Sanity's CDN. */
export type ImageRef = { url: string; width: number; height: number };

export type HomeContent = {
  heroHeading: string;
  heroAccent: string;
  heroLede: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroProof: Labelled[];
  heroArtCaption: string;
  heroImage: ImageRef;
  introEyebrow: string;
  introHeading: string;
  introBodyBefore: string;
  introBodyAfter: string;
  introLink: string;
  moaEyebrow: string;
  moaHeading: string;
  moaDescription: string;
  cards: { number: string; title: string; text: string }[];
  stripEyebrow: string;
  stripHeading: string;
  stripText: string;
  stripStages: { label: string; state: "done" | "current" | "" }[];
  closingHeading: string;
  closingCta: string;
};

export type ScienceContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  primerEyebrow: string;
  primerHeading: string;
  primerBody: string[];
  bandEyebrow: string;
  bandHeading: string;
  features: Labelled[];
  moaEyebrow: string;
  moaHeading: string;
  moaDescription: string;
  evidenceEyebrow: string;
  evidenceHeading: string;
  evidenceSteps: string[];
};

export type PipelineContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  programLabel: string;
  programHeading: string;
  programText: string;
  chartStages: string[];
  chartCurrentLabel: string;
  programDetail: Labelled[];
  dmdEyebrow: string;
  dmdHeading: string;
  dmdBody: string[];
  figures: { src: string; alt: string; caption: string; width: number; height: number; image?: ImageRef | null }[];
  horizonEyebrow: string;
  horizonHeading: string;
  horizonItems: Labelled[];
  horizonDisclosure: string;
  ctaHeading: string;
  ctaLabel: string;
};

export type AboutContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  leadershipEyebrow: string;
  leadershipHeading: string;
  advisorsEyebrow: string;
  advisorsHeading: string;
  valuesEyebrow: string;
  valuesHeading: string;
  valuesText: string;
};

export type ContactContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  introEyebrow: string;
  introHeading: string;
  introText: string;
  topics: string[];
  inquiryTypes: string[];
  audiences: { heading: string; text: string }[];
  disclosureHeading: string;
  disclosureText: string;
};

export type SimplePageContent = {
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  note?: string;
};

export type SiteSettings = {
  footerTagline: string;
  footerFinePrint: string;
  contactEmail: string;
  logo: ImageRef;
  moaImage: ImageRef;
};

export const homeDefaults: HomeContent = {
  heroHeading: "Building a new layer of",
  heroAccent: "muscle protection",
  heroLede:
    "Elymus is engineering bottlebrush macromolecules designed to stabilize damaged muscle cell membranes, starting with Duchenne muscular dystrophy.",
  heroPrimaryCta: "Explore the science",
  heroSecondaryCta: "View our pipeline",
  heroProof: [
    { label: "Preclinical", text: "development stage" },
    { label: "DMD", text: "lead indication" },
    { label: "Peer-reviewed", text: "foundation" },
  ],
  heroArtCaption: "Engineered architecture.\nPurposeful membrane engagement.",
  heroImage: { url: "/science/bottlebrush-macromolecule.png", width: 1126, height: 1324 },
  introEyebrow: "Engineering Biology Approach",
  introHeading: "Protecting the membrane that protects the muscle",
  introBodyBefore:
    "In Duchenne muscular dystrophy, loss of dystrophin leaves the sarcolemma vulnerable to mechanical stress and disruption. Elymus is developing a powerful new class of",
  introBodyAfter: "designed to engage and stabilize the muscle membrane.",
  introLink: "How the platform works",
  moaEyebrow: "Mechanism overview",
  moaHeading: "Elymer proposed mechanism of action",
  moaDescription: "Three hypotheses for what the polymer may do on the lipid bilayer: patch, repair, and heal.",
  cards: [
    {
      number: "01",
      title: "Broad reach",
      text: "Membrane instability is a critical feature across multiple pathologies, including muscular dystrophy, myocardial infarction, and trauma related injuries.",
    },
    {
      number: "02",
      title: "Unique performance",
      text: "Bottlebrush designs have demonstrated differentiated membrane engagement, cellular protection, and physiological outcomes in preclinical studies.",
    },
    {
      number: "03",
      title: "Rigorous science",
      text: "Discovery and engineering are grounded in molecular characterization and peer-reviewed work from leaders in macromolecular science and muscle biology.",
    },
  ],
  stripEyebrow: "Lead program",
  stripHeading: "Duchenne muscular dystrophy",
  stripText: "A devastating genetic disease defined by progressive muscle degeneration and membrane fragility.",
  stripStages: [
    { label: "Discovery", state: "done" },
    { label: "Lead optimization", state: "current" },
    { label: "IND-enabling", state: "" },
    { label: "Clinical", state: "" },
  ],
  closingHeading: "Science at the interface\nof macromolecules and biology",
  closingCta: "Connect with Elymus",
};

export const scienceDefaults: ScienceContent = {
  heroEyebrow: "Science / Platform",
  heroHeading: "Engineering macromolecules\nfor muscle protection",
  heroText:
    "Bottlebrush molecular architecture opens a differentiated physical approach to stabilizing mechanically stressed cell membranes.",
  primerEyebrow: "The biological challenge",
  primerHeading: "A fragile membrane sits at the center of muscle damage",
  primerBody: [
    "The sarcolemma is the membrane surrounding each muscle fiber. In Duchenne muscular dystrophy, the absence of functional dystrophin makes this membrane vulnerable to repeated contraction-induced damage.",
    "That damage allows dysregulated movement of ions and other molecules across the membrane, contributing to progressive loss of functional muscle tissue.",
  ],
  bandEyebrow: "The Elymus platform",
  bandHeading:
    "Elymers are engineered bottlebrush macromolecules designed to combine nanoscale architecture with membrane engagement",
  features: [
    { label: "Architecture", text: "A branched macromolecule format creates a dense, tunable molecular structure." },
    { label: "Engagement", text: "Amphiphilic domains are designed to interact with the lipid bilayer." },
    { label: "Protection", text: "The intended result is physical membrane stabilization under mechanical stress." },
  ],
  moaEyebrow: "Mechanism overview",
  moaHeading: "Elymer proposed mechanism of action",
  moaDescription: "Three hypotheses for what the polymer may do on the lipid bilayer: patch, repair, and heal.",
  evidenceEyebrow: "Evidence framework",
  evidenceHeading: "From molecular behavior to physiological performance",
  evidenceSteps: [
    "Molecular characterization",
    "Membrane-binding studies",
    "Cellular protection",
    "Preclinical physiology",
  ],
};

export const pipelineDefaults: PipelineContent = {
  heroEyebrow: "Pipeline",
  heroHeading: "Focused first\nScalable by design",
  heroText:
    "Elymus is prioritizing Duchenne muscular dystrophy while building a platform with potential relevance across membrane-instability disorders.",
  programLabel: "Lead program",
  programHeading: "Duchenne muscular dystrophy",
  programText: "Preclinical-stage membrane stabilization program",
  chartStages: ["Discovery", "Lead optimization", "IND-enabling", "Phase 1"],
  chartCurrentLabel: "Current focus",
  programDetail: [
    { label: "Modality", text: "Bottlebrush macromolecule" },
    { label: "Target", text: "Sarcolemma stabilization" },
    { label: "Stage", text: "Preclinical" },
  ],
  dmdEyebrow: "DMD background",
  dmdHeading: "Dystrophin is the molecular shock absorber for normal muscle cell membranes",
  dmdBody: [
    "Duchenne muscular dystrophy is caused by mutations in a gene that result in absent or severely reduced dystrophin. Dystrophin helps connect the muscle cell cytoskeleton to the membrane associated protein complex, supporting the sarcolemma during repeated contraction. Without this support, the membrane becomes vulnerable to disruption and abnormal calcium entry. Repeated injury contributes to inflammation, loss of functional muscle tissue, progressive weakness, and loss of mobility.",
    "Elymus is pursuing a physical membrane stabilization approach intended to address this downstream feature of DMD biology, independent of an individual mutation.",
  ],
  figures: [
    {
      src: "/dmd/dystrophin-activity-elymus.png",
      alt: "Dystrophin mechanical link between the extracellular matrix, muscle-cell membrane, and actin cytoskeleton",
      caption:
        "Dystrophin provides a mechanical link between the extracellular matrix, muscle-cell membrane, and actin cytoskeleton.",
      width: 1672,
      height: 941,
    },
    {
      src: "/dmd/dmd-progression-elymus.png",
      alt: "Illustrative overview of DMD progression from early signs to assisted mobility",
      caption: "Illustrative overview of DMD progression; progression varies by individual.",
      width: 1672,
      height: 941,
    },
  ],
  horizonEyebrow: "Platform horizon",
  horizonHeading: "Membrane instability extends beyond DMD",
  horizonItems: [
    { label: "Muscular dystrophies", text: "Core focus" },
    { label: "Ischemic reperfusion injury", text: "Future research" },
    { label: "Post trauma related injuries", text: "Future research" },
  ],
  horizonDisclosure: "Future indications are exploratory and do not represent active development programs.",
  ctaHeading: "Interested in the Elymus platform?",
  ctaLabel: "Partner with us",
};

export const aboutDefaults: AboutContent = {
  heroEyebrow: "About Elymus",
  heroHeading: "Built across scientific\ndisciplines",
  heroText:
    "Our team brings together expertise in macromolecular science, biomolecular engineering, deep knowledge of muscular dystrophy, cardiovascular disease, and drug development.",
  leadershipEyebrow: "Leadership",
  leadershipHeading: "Founders and executive leadership",
  advisorsEyebrow: "Advisors",
  advisorsHeading: "Scientific, medical and business guidance",
  valuesEyebrow: "How we work",
  valuesHeading: "Rigorous by design",
  valuesText:
    "We connect fundamental molecular insight to biological performance through careful characterization, translational focus, and multidisciplinary collaboration.",
};

export const contactDefaults: ContactContent = {
  heroEyebrow: "Contact",
  heroHeading: "Let’s explore what\nmacromolecular science can do",
  heroText:
    "We welcome conversations with pharmaceutical partners, investors, scientific collaborators, and the DMD community.",
  introEyebrow: "Start a conversation",
  introHeading: "Contact Elymus",
  introText:
    "Tell us a little about your inquiry and the Elymus team can direct it to the appropriate scientific or business contact.",
  topics: ["Partnering", "Scientific collaboration", "Investment", "Media"],
  inquiryTypes: ["Partnering", "Scientific collaboration", "Investment", "Media", "DMD community", "Other"],
  audiences: [
    {
      heading: "For the DMD community",
      text: "Elymus is currently in preclinical development and cannot provide medical advice, enrollment information, or access to an investigational therapy. We are committed to communicating progress clearly as the program develops.",
    },
    {
      heading: "Media and research",
      text: "Visit our News and Publications pages for source materials and peer reviewed research.",
    },
  ],
  disclosureHeading: "Important disclosure",
  disclosureText:
    "All Elymus programs are preclinical. No Elymus product candidate has been approved for commercial use. Statements about mechanism, performance, or potential applications are based on laboratory and preclinical research and should not be interpreted as evidence of safety or efficacy in people.",
};

export const newsDefaults: SimplePageContent = {
  heroEyebrow: "News & perspectives",
  heroHeading: "Following the science\nas it advances",
  heroText: "Independent coverage and conversations about the research behind Elymus.",
};

export const publicationsDefaults: SimplePageContent = {
  heroEyebrow: "Publications",
  heroHeading: "A peer-reviewed\nscientific foundation",
  heroText:
    "Selected work underpinning the molecular architecture, membrane interaction, and preclinical promise of bottlebrush macromolecules.",
  note: "Publications describe research conducted by academic investigators and collaborators. Findings from preclinical models may not translate to humans.",
};

export const siteSettingsDefaults: SiteSettings = {
  footerTagline: "Leveraging unique performance from bottlebrush macromolecules.",
  footerFinePrint:
    "Elymus is a preclinical-stage biotechnology company. Its investigational technologies have not been approved by any regulatory authority, and safety and efficacy have not been established.",
  contactEmail: "contact@elymus.bio",
  logo: { url: "/elymus-mark.png", width: 1130, height: 2048 },
  moaImage: { url: "/science/elymer-moa-three-hypotheses.png", width: 960, height: 540 },
};
