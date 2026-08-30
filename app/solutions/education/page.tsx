import type { Metadata } from "next";
import { SolutionPage } from "@/components/solutions/SolutionPage";

export const metadata: Metadata = {
  title: "Education Solutions | CR8LAB",
  description:
    "Virtual laboratories, AR titles and virtual field trips for schools, universities and ministries, running fully offline.",
};

export default function EducationSolutionPage() {
  return (
    <SolutionPage
      title="Laboratories, field trips and practicals with no building required."
      lede="For schools, universities, ministries and training institutes. Students do the experiment, walk the site and handle the equipment, on the devices the school already has."
      problemHeading="Practical learning is the first thing a tight budget cuts."
      problemBody="Laboratories cost more than most schools will ever have. Field trips cost more than most parents will approve. Equipment breaks, consumables run out, and the students who need the practical most are the ones who never get near it. So science gets taught from a diagram and examined from memory."
      whatWeDoHeading="We put the laboratory on the desk."
      whatWeDoItems={[
        "Virtual science laboratories across physics, chemistry and biology, with real procedure and real consequence",
        "AR titles that turn a printed textbook page into a 3D model students can rotate and take apart",
        "Virtual field trips to sites, ecosystems and facilities a class will never reach in person",
        "Gamified assessment that records what a student did, not just what they selected",
        "Full offline delivery, so no lesson depends on the school's connection",
      ]}
      extraHeading="Proof"
      extraBody="Deployed with 10+ institutions across three states, with 150+ interactive simulations in service and backing from LASRIC, NITDA and NTI."
      ctas={[
        { label: "Book a school demo", href: "/contact?route=demo#form" },
        { label: "Request institutional pricing", href: "/contact" },
      ]}
    />
  );
}
