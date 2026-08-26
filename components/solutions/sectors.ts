import type { Sector } from "./SectorRow";

/** The ten sectors of the copy deck's Solutions page, verbatim and in its order. */
export const SECTORS: Sector[] = [
  {
    slug: "schools",
    name: "Schools",
    problem: "You are examined on practical science you have no laboratory to teach. Equipment is expensive, consumables run out, and one demonstration at the front of the room is not the same as thirty students doing it themselves.",
    solution: "A virtual laboratory and AR content library that runs offline on tablets, with teacher certification, lesson plans and a dashboard that shows which students repeated which experiment and where the class went wrong together.",
    impact: "Practical coverage for every student rather than a demonstration for the front row, measurable engagement gains of [40 to 50] percent, and a laboratory capability for a fraction of the [$50,000] a physical build costs a year.",
  },
  {
    slug: "parents",
    name: "Parents and families",
    problem: "Your child is memorising science they have never touched, and the extra lessons you are paying for are more of the same.",
    solution: "An individual subscription with AR books, the experiment library and the AI companion, on a device you already own, from [₦8,000] a term.",
    impact: "A child who can see what a cell, a circuit or a titration actually does, and who can repeat it as many times as it takes without anyone being embarrassed.",
  },
  {
    slug: "governments",
    name: "Governments and ministries",
    problem: "Laboratory infrastructure across a state cannot be built at the speed the curriculum requires, and procurement has to show results within a budget cycle.",
    solution: "State level deployment with device supply, teacher certification, offline content and a reporting dashboard at school, local government and state level.",
    impact: "Practical science capability delivered per school within a term, with reporting that stands up to an audit and a cost per learner you can defend in a budget hearing.",
  },
  {
    slug: "publishers",
    name: "Publishers",
    problem: "Print margins are thin, digital editions are commoditised, and your backlist is doing nothing.",
    solution: "Licence the CR8LAB AR engine and library to give your existing titles a digital layer, or co-publish new immersive titles with our studio.",
    impact: "A differentiated catalogue, a second revenue line from the same IP, and a reason for a school to buy the new edition.",
  },
  {
    slug: "museums",
    name: "Museums, galleries and heritage",
    problem: "Your collection is bigger than your floor space, the fragile pieces cannot be handled, and younger visitors move through in eleven minutes.",
    solution: "AR and mixed reality layers over existing exhibits, reconstructions of what is missing, object scanning for the archive, and a version visitors can carry home on a phone.",
    impact: "Longer dwell time, a collection that reaches people who will never visit, and a digital archive that outlasts the exhibition.",
  },
  {
    slug: "ngos",
    name: "NGOs and development partners",
    problem: "You have to prove learning outcomes across a programme, in places with no connectivity, and the reporting burden falls on people already teaching full time.",
    solution: "Offline deployment with automatic evidence capture, baseline and endline data, and disaggregated reporting built for donor formats.",
    impact: "Programme evidence that comes out of the platform rather than out of a survey, and a delivery model that works in the last mile.",
  },
  {
    slug: "training",
    name: "Corporate and industrial training",
    problem: "Training on live plant is dangerous, expensive and takes equipment offline. Classroom training does not transfer to the floor.",
    solution: "VR simulations of your actual procedures, safety scenarios that can go wrong without consequence, and assessment inside the environment.",
    impact: "Competence you can evidence before someone touches the machine, shorter time to productivity, and fewer incidents to report.",
  },
  {
    slug: "universities",
    name: "Universities",
    problem: "Laboratory time is rationed across cohorts that keep growing, and distance students get the theory without the practical.",
    solution: "Virtual laboratories for pre-lab preparation and remote practicals, plus authoring tools for your own faculty to build discipline specific simulations.",
    impact: "More effective use of scarce laboratory hours, practical access for distance cohorts, and research output from the data.",
  },
  {
    slug: "science-centres",
    name: "Science centres and libraries",
    problem: "Footfall depends on novelty, and refreshing physical exhibits costs more than your programme budget.",
    solution: "Rotating AR and VR installations, holiday programme content, and creator workshops that give young visitors something to make rather than watch.",
    impact: "A reason to come back, programming that changes without a rebuild, and a pipeline into your youth programmes.",
  },
  {
    slug: "creators",
    name: "Creators and studios",
    problem: "You have the story but not the pipeline, and outsourced 3D work costs in dollars and comes back looking like everywhere else.",
    solution: "Licence assets from the CR8LAB Library, or co-produce with our studio on AR and VR builds.",
    impact: "Original African assets, a production partner in the same time zone, and rights terms written in plain language.",
  },
];
