import type { Metadata } from "next";
import { SolutionPage } from "@/components/solutions/SolutionPage";

export const metadata: Metadata = {
  title: "Training and Simulation Solutions | CR8LAB",
  description:
    "Repeatable VR simulation of procedures where mistakes are expensive, dangerous or irreversible, for employers and health services.",
};

export default function TrainingAndSimulationSolutionPage() {
  return (
    <SolutionPage
      title="Practice the thing that is too costly to practise."
      lede="For employers, health services, technical operators and vocational institutes. Repeatable simulation of the procedures where mistakes are expensive, dangerous or irreversible."
      image={{
        src: "/brand/ceo/training-simulation.png",
        alt: "Medical staff wearing VR headsets practising a surgical simulation, with a trainee reviewing a scored training dashboard on a tablet",
      }}
      problemHeading="The tasks that most need rehearsal are the ones nobody can afford to rehearse."
      problemBody="Real equipment is in use. Real sites are hazardous. Real patients are not practice. So training becomes a slide deck and a signature, and the first live attempt is the first real attempt."
      whatWeDoHeading="What we do."
      whatWeDoItems={[
        "Procedural simulations of equipment, machinery and clinical technique",
        "Safety and emergency scenarios run to failure with no consequence",
        "Assessment that scores sequence, timing and decision, not multiple choice recall",
        "Headset and tablet delivery, deployable to a site with no connectivity",
        "Multi-language and low-literacy versions of the same scenario",
      ]}
      ctas={[{ label: "Book a demo", href: "/contact?route=demo#form" }]}
    />
  );
}
