import type { Metadata } from "next";
import { SolutionPage } from "@/components/solutions/SolutionPage";

export const metadata: Metadata = {
  title: "Brands and Enterprise Solutions | CR8LAB",
  description:
    "Immersive product experiences, virtual showrooms and AR activations for agencies, retailers and consumer brands.",
};

export default function BrandsAndEnterpriseSolutionPage() {
  return (
    <SolutionPage
      title="Let customers hold the product before they own it."
      lede="For agencies, retailers and consumer brands. Immersive product experiences, virtual showrooms and activations that people interact with instead of scroll past."
      problemHeading="Attention is the whole cost now."
      problemBody="Flat creative competes with everything else on the same screen and loses in under two seconds. The brands winning attention are the ones giving people something to do, not something to watch."
      whatWeDoHeading="What we do."
      whatWeDoItems={[
        "3D product experiences customers can rotate, open, configure and place in their own space",
        "Virtual showrooms and stores that run in a browser with no app install",
        "AR activations for launches, events and retail floors",
        "Branded 3D characters and worlds you own and can reuse across campaigns",
        "Analytics on what people actually did inside the experience",
      ]}
      extraHeading="Why us"
      extraBody="Agencies brief this work out to studios abroad and pay international rates for creative that does not know the market. We are the studio, in the market, at a price that survives a Nigerian media budget."
      ctas={[{ label: "Start a project", href: "/contact" }]}
    />
  );
}
