import EventLandingPage from "../EventLandingPage";
import { englishFluencyEvent } from "../eventData";
import { buildEventMetadata } from "../eventMetadata";

export function generateMetadata() {
  return buildEventMetadata(englishFluencyEvent.title, englishFluencyEvent.subtitle, englishFluencyEvent.heroImage, "/events/english-fluency-workshop");
}

export default function EnglishFluencyWorkshopPage() {
  return <EventLandingPage event={englishFluencyEvent} />;
}
