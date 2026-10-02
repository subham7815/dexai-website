import { INTEGRATIONS } from "@/lib/constants";
import { IntegrationBadge } from "./ui/IntegrationBadge";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

export function TrustBar() {
  return (
    <section className="border-b border-line bg-white" aria-labelledby="trust-title">
      <div className="container-x flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-7">
        <Reveal>
          <h2 id="trust-title" className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-muted">
            Built to simplify modern financial operations.
          </h2>
        </Reveal>
        <Stagger as="ul" className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {INTEGRATIONS.map((i) => (
            <StaggerItem as="li" key={i.id}>
              <IntegrationBadge integration={i} size="sm" className="opacity-80 transition-opacity hover:opacity-100" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
