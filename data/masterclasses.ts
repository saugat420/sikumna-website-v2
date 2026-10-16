export type Masterclass = {
  slug: string; title: string; trainerId: string; category: string; thumbnail: string;
  youtubeId?: string; duration: string; description: string; learningOutcomes: string[]; featured?: boolean; publishedAt?: string;
};

export const masterclasses: Masterclass[] = [
  { slug: "freelancing-101", title: "Freelancing 101", trainerId: "saugat-basnet", category: "Freelancing", thumbnail: "/content/masterclasses/freelancing.webp", duration: "60 min", featured: true, description: "Build the foundations for finding clients, pricing your work and starting a sustainable freelance journey.", learningOutcomes: ["Choose a clear freelance service", "Present your skills with confidence", "Create a practical client outreach plan"] },
  { slug: "seo-masterclass", title: "SEO Masterclass", trainerId: "rajan-adhikari", category: "SEO", thumbnail: "/content/masterclasses/seo.webp", duration: "45 min", description: "Learn practical ways to improve search visibility and make better content decisions.", learningOutcomes: ["Understand search intent", "Plan useful keyword-led content", "Track the signals that matter"] },
  { slug: "ecommerce-masterclass", title: "Ecommerce Masterclass", trainerId: "prakriti-tamang", category: "Business", thumbnail: "/content/masterclasses/ecommerce.webp", duration: "50 min", description: "Understand the essentials of launching and growing an online store with confidence.", learningOutcomes: ["Validate a product idea", "Plan a simple customer journey", "Build a practical launch checklist"] },
  { slug: "personal-branding-masterclass", title: "Personal Branding Masterclass", trainerId: "saugat-basnet", category: "Personal Branding", thumbnail: "/content/masterclasses/personal-branding.webp", duration: "40 min", description: "Create a professional identity that helps the right opportunities find you.", learningOutcomes: ["Clarify what you want to be known for", "Create a consistent online presence", "Share useful work without feeling salesy"] },
  { slug: "social-media-marketing", title: "Social Media Marketing", trainerId: "saugat-basnet", category: "Marketing", thumbnail: "/content/masterclasses/social-media-marketing.webp", duration: "55 min", description: "Plan useful content and make smarter social media decisions for a growing brand.", learningOutcomes: ["Choose useful content pillars", "Build a repeatable weekly plan", "Measure progress beyond likes"] },
];

export function getMasterclass(slug: string) { return masterclasses.find((item) => item.slug === slug); }
