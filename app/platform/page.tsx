import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ListBeat } from "@/components/ui/ListBeat";
import { ClosingBeat } from "@/components/ui/ClosingBeat";
import { ImageBand } from "@/components/ui/ImageBand";
import { StackRings } from "@/components/platform/StackRings";
import { StackList } from "@/components/platform/StackList";

export const metadata: Metadata = {
  title: "The CR8LAB Platform | Books, AR, VR, AI and Analytics in One Stack",
  description:
    "How the CR8LAB platform fits together, from printed books to cloud, AI and analytics. Offline first, built for entry level devices and low bandwidth.",
};

export default function PlatformPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="The platform"
        title="One platform. Multiple worlds."
        lede="A book, a phone, a headset, a classroom display and a cloud that ties them together. Here is exactly how the pieces connect, and what happens when the network does not."
        device={<StackRings />}
      />

      <div data-tone="light">
        <Reveal>
          <StackList />
        </Reveal>
        <Reveal>
          <ImageBand
            image={null}
            placeholder="platform-stack.png, the book, phone, tablet and headset in a line, from above"
          />
        </Reveal>
      </div>

      <div data-tone="adire">
        <Reveal>
          <ListBeat
            tone="dark"
            heading="The constraints we designed around, on purpose"
            items={[
              "Offline first. Full lessons, laboratories and assessments run with no network. Results sync when a connection appears, and nothing is lost while it does not.",
              "Low bandwidth. Asset budgets, texture sizes and download packs are set for 3G. A school on a shared mobile connection is our design target, not an edge case.",
              "Entry level devices. We test on the cheapest Android in the deployment, not on the newest.",
              "Power. Content is cached so a lesson survives an outage mid session, and the tablet is specified for a full school day of use.",
              "Local pricing. Charged in naira, VAT inclusive, on school term cycles.",
            ]}
          />
        </Reveal>
      </div>

      <div data-tone="light">
        <Reveal>
          <ListBeat
            heading="It has to live with what schools already run"
            items={[
              "Curriculum mapping to [the Nigerian national curriculum, WAEC and NECO practicals, and the Kenyan CBC].",
              "Export and integration through [SCORM, xAPI, LTI, CSV]. [Confirm which are live today and which are on the roadmap, and label them accordingly. Do not list an unbuilt integration without the word roadmap next to it.]",
              "Single sign on with [Google Workspace for Education, Microsoft Entra]. [Confirm.]",
              "Bulk import of classes and rosters, with a supported import file and a real human on the first migration.",
            ]}
          />
        </Reveal>
        <Reveal>
          <ListBeat
            heading="A classroom is not an advertising market"
            items={[
              "No advertising in any product, at any age, on any tier.",
              "No sale, rental or brokerage of student data, and no behavioural profiles built for anyone outside the school.",
              "Learner data handled under the Nigeria Data Protection Act 2023, with [hosting arrangement] and published retention limits.",
              "The school is the data controller. Schools and parents can inspect, export or delete a learner record, and we act within [X] working days.",
              "Role based access, audit logs, and encryption in transit and at rest.",
            ]}
            after={
              <Button href="/platform/security" variant="dark">
                Read our full position on children&apos;s data
              </Button>
            }
          />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <ListBeat
            tone="dark"
            heading="Build on CR8LAB"
            intro="Publishers, ministries and partners who want to bring their own content into the platform can do it through our content pipeline today, and through a public API [on the roadmap for [timeframe]]. Documentation, asset specifications and a sandbox are available on request."
            items={[]}
            after={
              <Button href="/contact?route=partner" variant="light" theme="dark">
                Talk to us about integration
              </Button>
            }
          />
        </Reveal>
        <Reveal>
          <ClosingBeat
            text="The fastest way to understand the platform is thirty minutes with it in your hands."
            cta={{ label: "Book a demo", href: "/contact" }}
          />
        </Reveal>
      </div>
    </InnerPage>
  );
}
