import type { Product } from "./ProductSection";

/**
 * The eight products, in the copy deck's order, verbatim. The deck's
 * numbering (3.1 to 3.8) is document structure, not content, so it is not
 * rendered. `audiences` is the deck's "who it is for" sentence split into its
 * own items so it scans as chips; no item is reworded. Calls to action go to
 * the contact page until product pages exist; a funder's click should never
 * land on a 404. `image` is null until the product photograph is generated.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "books",
    name: "CR8LAB Books",
    oneLine: "Printed books with a digital layer that stands up off the page.",
    whatItIs:
      "Original illustrated titles for ages 4 to 13, written, drawn, modelled and animated in-house. Scan any page and the scene assembles in three dimensions on the desk in front of the child, narrated, labelled and touchable.",
    audiences: ["Nursery and primary schools", "homeschooling families", "libraries", "STEM clubs", "publishers licensing the format"],
    keyPoints: [
      "Curriculum mapped, with a teacher guide for every title",
      "Works with no network once the pack is downloaded",
      "Titles currently include [Into the Community, Into the Curiosity Q, and the eight book AR Science Lab series]",
    ],
    cta: { label: "See the catalogue", href: "/contact?route=demo" },
    accent: "#F5A623",
    image: null,
  },
  {
    slug: "ar",
    name: "CR8LAB AR",
    oneLine: "Scan. Discover. Interact.",
    whatItIs:
      "The augmented reality engine behind every product, available on its own for partners. Print AR, packaging AR, poster and gallery AR, product placement at true scale, and location based experiences for events, campuses and trails. Delivered in app or on the web, so there is nothing to download.",
    audiences: ["Publishers", "museums", "brands", "agencies", "event organisers", "government campaigns"],
    keyPoints: [
      "Web based delivery from a QR code or a link",
      "Original 3D assets, not store models",
      "Analytics on scans, dwell time and completion",
    ],
    cta: { label: "Start an AR project", href: "/contact?route=partner" },
    accent: "#2C276C",
    image: null,
  },
  {
    slug: "vr",
    name: "CR8LAB VR",
    oneLine: "Step inside the lesson.",
    whatItIs:
      "Environments a learner can enter and move through. Historic sites, industrial plant, the inside of a cell, a place that has not been built yet or no longer exists. Built for headset and for browser, because the best VR is the VR your audience can actually reach.",
    audiences: ["Secondary schools", "universities", "technical and vocational training", "healthcare training", "museums", "tourism"],
    keyPoints: [
      "Guided mode for a class of thirty and free mode for individual exploration",
      "Desktop and browser versions of every headset build",
      "Assessment built into the environment, not bolted on afterwards",
    ],
    cta: { label: "Explore VR", href: "/contact?route=demo" },
    accent: "#F5A623",
    image: null,
  },
  {
    slug: "labs",
    name: "CR8LAB Labs",
    oneLine: "A science laboratory that fits in a school bag.",
    whatItIs:
      "[250]+ virtual practical experiments across physics, chemistry, biology and mathematics, mapped to the curriculum and to examination practicals. Students run experiments alone or as a class, repeat what they got wrong, and handle procedures no school would risk with real reagents.",
    audiences: ["Secondary schools", "science centres", "ministries of education", "NGO programmes"],
    keyPoints: [
      "Runs offline on a [$150] tablet, device included",
      "Examination practical coverage for [WAEC and NECO]",
      "Teacher dashboard showing who repeated what, and where the class went wrong together",
    ],
    cta: { label: "See the experiment library", href: "/contact?route=demo" },
    accent: "#D97A50",
    image: null,
  },
  {
    slug: "ai",
    name: "CR8LAB AI",
    oneLine: "A learning companion that answers to the teacher.",
    whatItIs:
      "An AI tutor that works inside the curriculum, explains a concept in a second and third way when the first does not land, generates practice at the right difficulty, and hands the teacher a summary of where each student is stuck.",
    audiences: ["Schools running the platform", "families using the individual subscription"],
    keyPoints: [
      "Bounded to curriculum content, so it does not improvise a syllabus",
      "Every interaction is visible to the teacher",
      "No automated decision on grading, placement or opportunity without a teacher in the loop",
      "[Language support: English, plus [Yoruba, Hausa, Igbo, Kiswahili] on the roadmap]",
    ],
    cta: { label: "How our AI works", href: "/contact?route=demo" },
    accent: "#2C276C",
    image: null,
  },
  {
    slug: "studio",
    name: "CR8LAB Studio",
    oneLine: "Teachers build immersive lessons without writing code.",
    whatItIs:
      "The authoring tool. Pull models, scenes and simulations from the library, add your own images, audio and questions, sequence the lesson, and publish it to your class in an afternoon.",
    audiences: ["Teachers", "curriculum leads", "training managers", "publishers"],
    keyPoints: [
      "Drag and drop, with templates for lesson, practical, revision and assessment",
      "Share to your school, or to the wider CR8LAB library if you choose",
      "Teacher certification and onboarding included with every school deployment",
    ],
    cta: { label: "Try Studio", href: "/contact?route=demo" },
    accent: "#B6502E",
    image: null,
  },
  {
    slug: "creator",
    name: "CR8LAB Creator",
    oneLine: "Students stop consuming the experience and start building it.",
    whatItIs:
      "A guided creation tool where students assemble their own AR scenes and interactive stories, then publish them to their class, their school or a competition. The point at which a child moves from user to maker is the point the whole thing was built for.",
    audiences: ["Upper primary and secondary students", "STEM clubs", "holiday programmes", "competitions"],
    keyPoints: [
      "Age appropriate, moderated, and safe by default",
      "Feeds directly into CR8LAB Community challenges and creator grants",
      "Produces a portfolio a student can show a university or an employer",
    ],
    cta: { label: "See what students have built", href: "/contact?route=demo" },
    accent: "#F5A623",
    image: null,
  },
  {
    slug: "library",
    name: "CR8LAB Library",
    oneLine: "The asset library everything else draws on.",
    whatItIs:
      "[X]+ original 3D models, environments, characters, animations and simulations, produced in-house and owned by us. Growing every month, licensed to partners, and the reason a new title takes weeks instead of quarters.",
    audiences: ["Every product above", "publishers and studios who licence assets directly"],
    keyPoints: [
      "Original work, cleared for commercial use",
      "Game engine ready, delivered in [standard formats]",
      "African environments, characters and contexts as standard, not as a special request",
    ],
    cta: { label: "Licence from the library", href: "/contact?route=partner" },
    accent: "#8F87CF",
    image: null,
  },
];
