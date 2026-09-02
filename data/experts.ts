export type Expert = {
  slug: string;
  name: string;
  image: string;
  expertise: string;
  bio: string;
  biography: string;
  areas: string[];
};

export const experts: Expert[] = [
  { slug: "saugat-basnet", name: "Saugat Basnet", image: "/generated/mentors/saurav-shrestha.webp", expertise: "AI & Growth Marketing", bio: "Helps learners turn modern marketing tools into practical skills and real opportunities.", biography: "Saugat teaches practical digital marketing and AI workflows with a focus on clear, beginner-friendly action.", areas: ["AI Marketing", "Digital Strategy", "Personal Branding"] },
  { slug: "anita-karki", name: "Anita Karki", image: "/generated/mentors/anita-karki.webp", expertise: "English Communication", bio: "Makes English communication clear, human and useful for everyday confidence.", biography: "Anita helps learners build speaking confidence through approachable practice and supportive feedback.", areas: ["Spoken English", "Workplace Communication", "Confidence"] },
  { slug: "prakriti-tamang", name: "Prakriti Tamang", image: "/generated/mentors/prakriti-tamang.webp", expertise: "Ecommerce & Business", bio: "Shares practical approaches to building and growing ideas people can actually use.", biography: "Prakriti focuses on simple ecommerce foundations, customer thinking and sustainable business habits.", areas: ["Ecommerce", "Business Strategy", "Customer Experience"] },
  { slug: "rajan-adhikari", name: "Rajan Adhikari", image: "/generated/mentors/rajan-adhikari.webp", expertise: "SEO & Digital Marketing", bio: "Teaches search strategy and practical content decisions for sustainable visibility.", biography: "Rajan turns SEO concepts into clear actions learners can apply to websites and content.", areas: ["SEO", "Content Strategy", "Analytics"] },
];

export function getExpert(slug: string) { return experts.find((expert) => expert.slug === slug); }
