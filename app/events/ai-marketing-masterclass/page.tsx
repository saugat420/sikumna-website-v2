import EventLandingPage from "../EventLandingPage";
import { aiMarketingEvent } from "../eventData";
import { buildEventMetadata } from "../eventMetadata";

export function generateMetadata() {
  return buildEventMetadata(aiMarketingEvent.title, aiMarketingEvent.subtitle, aiMarketingEvent.heroImage, "/events/ai-marketing-masterclass");
}

export default function AIMarketingMasterclassPage() {
  return <EventLandingPage event={aiMarketingEvent} />;
}
