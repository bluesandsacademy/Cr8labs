export type Product = {
  slug: string;
  name: string;
  format: string;
  price: string;
  body: string;
  includes: string;
  /** The full, uncropped source photo — shown whole (object-contain) on the product's own page. */
  image: { src: string; alt: string };
  accent: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "into-the-community",
    name: "Into the Community",
    format: "AR",
    price: "from $250",
    body: "Five vivid AR stories about the places we live in. Users scan the page, and the community stands up in front of them: the market, the clinic, the road, the people who keep it all running. Built for early years and lower primary, and also to keep the kids busy at home while parents are busy with other chores.",
    includes: "Printed book set, Spotty camera, smart tablet, AR app licence, offline content pack, markers.",
    image: {
      src: "/brand/ceo/into-the-community.png",
      alt: "A girl wearing a VR headset smiling and waving beside a tablet on a giraffe-topped stand, with a fan of AR storybooks open in front of her",
    },
    accent: "#FFEB59",
  },
  {
    slug: "into-the-curiosity-q",
    name: "Into the Curiosity Q",
    format: "AR",
    price: "from $350",
    body: "Vivid virtual experiences that make big ideas click. The questions children ask, and adults struggle to answer, rendered as things they can watch happen and take apart. Built for upper primary and lower secondary.",
    includes: "Printed book set, Spotty camera, smart tablet, AR app licence, offline content pack, markers.",
    image: {
      src: "/brand/ceo/into-the-curiosity-q.png",
      alt: "A child wearing a VR headset, smiling, with a tablet on a carved stand and AR animal fact-cards fanned out on the table in front of her",
    },
    accent: "#2C276C",
  },
  {
    slug: "ar-science-lab",
    name: "AR Science Lab",
    format: "AR",
    price: "from $450",
    body: "An eight-book AR science series across four subjects. Full practical procedure, apparatus students assemble themselves, and experiments that fail properly when done wrong. This is the laboratory for schools that will never build one.",
    includes: "Printed book set, Spotty camera, smart tablet, AR app licence, offline content pack, markers.",
    image: {
      src: "/brand/ceo/ar-science-lab.png",
      alt: "A field guide, binoculars and a lab test-tube rack beside two tablets showing wildlife AR and surgical simulation apps, with a child wearing a VR headset",
    },
    accent: "#B6502E",
  },
  {
    slug: "experience-africa",
    name: "Experience Africa",
    format: "VR",
    price: "from $500",
    body: "Headset-led virtual worlds, shipped as a ready-to-run VR kit. Walk through African heritage sites, ecosystems and reconstructions in full presence, with nothing else in view. Set it up in a classroom, a gallery, an exhibition stand or a training room and run a session without technical support.",
    includes: "Headsets, preloaded offline content library, charging and storage case, self-help training session.",
    image: {
      src: "/brand/ceo/experience-africa.png",
      alt: "A child wearing a VR headset, hand raised, surrounded by AR animal fact-cards, with a tablet on a carved stand and a storybook open in front of her",
    },
    accent: "#6E67B8",
  },
];
