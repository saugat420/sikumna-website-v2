export type EventTheme = "blue" | "green";

export type EventLandingData = {
  theme: EventTheme;
  kicker: string;
  title: string;
  supportingLine?: string;
  subtitle: string;
  heroImage: string;
  bulletPoints: string[];
  learnerCount: string;
  buttonLabel: string;
  scarcity: string;
  highlights: { icon: string; title: string; description: string }[];
  lessonIntro: string;
  lessons: { icon: string; title: string; description: string }[];
  audiences: { icon: string; label: string }[];
  instructor: {
    name: string;
    image: string;
    bullets: string[];
  };
  reviewSummary: string;
  testimonials: { quote: string; name: string; role: string }[];
  reserveTitle: string;
  reserveDescription: string;
  date: string;
  time: string;
  duration: string;
  faqs: { question: string; answer: string }[];
};

export const aiMarketingEvent: EventLandingData = {
  theme: "blue",
  kicker: "Free Live Masterclass",
  title: "Learn AI Marketing From Scratch In 90 Mins",
  subtitle: "In this free masterclass, you’ll learn how AI Marketing can help you build a high-paying freelancer career in 2026—even if you are a beginner.",
  heroImage: "/generated/events/ai-marketing-masterclass-hero.png",
  bulletPoints: ["Live on Zoom", "90 Minutes", "Beginner Friendly", "Interactive Q&A"],
  learnerCount: "11,000+ learners registered",
  buttonLabel: "Reserve My Free Seat",
  scarcity: "Hurry! Only 100 Seats Available.",
  highlights: [
    { icon: "bot", title: "Learn AI Marketing", description: "from scratch" },
    { icon: "sparkles", title: "Practical strategies", description: "you can use" },
    { icon: "briefcase", title: "Live examples", description: "and case studies" },
    { icon: "route", title: "Step-by-step roadmap", description: "to get started" },
  ],
  lessonIntro: "A complete 90-minute session packed with practical insights.",
  lessons: [
    { icon: "bot", title: "What AI Marketing Actually Means", description: "Understand AI Marketing and how it is changing the game." },
    { icon: "chart", title: "How AI Is Changing Digital Marketing", description: "See how modern marketers use AI to work faster and make better decisions." },
    { icon: "route", title: "Create Marketing Assets With AI", description: "Write ads, content, emails and landing-page ideas with practical prompts." },
    { icon: "megaphone", title: "Useful AI Tools for Beginners", description: "Know which tools matter, what they do and where to begin." },
    { icon: "wallet", title: "Build Freelance Skills Step by Step", description: "Turn practical AI marketing skills into real client opportunities." },
    { icon: "messages", title: "Live Q&A Session", description: "Get your questions answered live at the end." },
  ],
  audiences: [
    { icon: "student", label: "Students" },
    { icon: "professional", label: "Working Professionals" },
    { icon: "target", label: "Job Seekers" },
    { icon: "laptop", label: "Freelancers" },
    { icon: "store", label: "Business Owners" },
    { icon: "megaphone", label: "Marketers" },
  ],
  instructor: {
    name: "Saugat Basnet",
    image: "/generated/mentors/saurav-shrestha.png",
    bullets: ["Digital Marketing Expert & Educator", "Trained 14,000+ students", "9+ years of real-world experience", "Helped 1,000+ businesses grow online", "Founder of Sikumna Nepal"],
  },
  reviewSummary: "4.9/5 from 1,000+ reviews",
  testimonials: [
    { quote: "The best masterclass I have ever attended. Very practical and eye-opening!", name: "Bikram Thapa", role: "Digital Marketer" },
    { quote: "Saugat sir explains complex things in the simplest way. Highly recommended.", name: "Anita Karki", role: "Business Owner" },
    { quote: "I learned more in 90 minutes than months of watching random videos.", name: "Rajan Shrestha", role: "Freelancer" },
  ],
  reserveTitle: "Join Live & Transform Your Marketing With AI",
  reserveDescription: "Seats are limited. Reserve your spot now and receive the joining details by email.",
  date: "Sat, 24 May 2025",
  time: "7:00 PM NPT",
  duration: "90 Minutes",
  faqs: [
    { question: "Is this masterclass really free?", answer: "Yes. The live AI Marketing Masterclass is completely free, but registration is required because seats are limited." },
    { question: "Do I need any prior marketing experience?", answer: "No. The session starts with the fundamentals and is suitable for complete beginners." },
    { question: "Will I get the recording?", answer: "Registered learners will receive an update after the session if a replay is made available." },
    { question: "How will I get the joining link?", answer: "We will email the Zoom joining details to the address you use during registration." },
  ],
};

export const englishFluencyEvent: EventLandingData = {
  theme: "blue",
  kicker: "Free Live Workshop",
  title: "Speak English Confidently in Daily Life",
  supportingLine: "Join the FREE English Fluency Workshop",
  subtitle: "If you understand English but feel nervous while speaking, this workshop will help you learn simple techniques to speak more confidently, form better sentences, and improve your daily conversation.",
  heroImage: "/generated/events/english-fluency-workshop-hero.png",
  bulletPoints: ["Live on Zoom", "120 Minutes", "Interactive Practice", "100% Free"],
  learnerCount: "8,500+ learners registered",
  buttonLabel: "Reserve My FREE Seat",
  scarcity: "Only 67 seats remaining… Hurry up!",
  highlights: [
    { icon: "messages", title: "Speak with confidence", description: "in daily life" },
    { icon: "clipboard", title: "Practical techniques", description: "that work" },
    { icon: "users", title: "Live practice", description: "and feedback" },
    { icon: "shield", title: "Improve in just", description: "60 days" },
  ],
  lessonIntro: "A power-packed 2-hour workshop to transform your English speaking.",
  lessons: [
    { icon: "help", title: "Why You Struggle To Speak English", description: "Understand the real reasons and how to overcome them." },
    { icon: "lightbulb", title: "7 Practical Techniques That Work", description: "Easy techniques to improve your fluency quickly." },
    { icon: "book", title: "Think in English, Not Translate", description: "Learn how to think in English naturally." },
    { icon: "mic", title: "Speak Fluently In Any Situation", description: "Daily life, office, meetings, interviews and more." },
    { icon: "shield", title: "Build Confidence That Lasts", description: "Overcome fear and speak without hesitation." },
    { icon: "messages", title: "Live Practice & Feedback", description: "Practice speaking and get live feedback." },
  ],
  audiences: [
    { icon: "student", label: "Students" },
    { icon: "professional", label: "Professionals" },
    { icon: "target", label: "Job Seekers" },
    { icon: "store", label: "Entrepreneurs" },
    { icon: "home", label: "Homemakers" },
    { icon: "messages", label: "Anyone who wants to speak English" },
  ],
  instructor: {
    name: "Smriti Ma’am",
    image: "/generated/mentors/anita-karki.png",
    bullets: ["English Communication Expert", "Trained 50,000+ learners", "6+ years of teaching experience", "Specialized in spoken English and communication skills"],
  },
  reviewSummary: "4.9/5 from 800+ reviews",
  testimonials: [
    { quote: "Smriti ma’am makes learning fun and easy. My confidence improved a lot!", name: "Prakriti Tamang", role: "Student" },
    { quote: "The techniques are super practical. I can use them every day.", name: "Sushil Adhikari", role: "Working Professional" },
    { quote: "Best workshop for anyone who wants to speak English fluently.", name: "Neha KC", role: "Job Seeker" },
  ],
  reserveTitle: "Start Speaking English Confidently Today",
  reserveDescription: "Seats are limited. Reserve your spot now and receive the joining details by email.",
  date: "Sun, 25 May 2025",
  time: "7:00 PM NPT",
  duration: "120 Minutes",
  faqs: [
    { question: "Is this workshop really free?", answer: "Yes. The live English Fluency Workshop is completely free, but advance registration is required." },
    { question: "Do I need to know English already?", answer: "Only basic understanding is helpful. The workshop is designed to support beginners and developing speakers." },
    { question: "Will I get the recording?", answer: "Registered learners will receive an update after the workshop if a replay becomes available." },
    { question: "How will I get the joining link?", answer: "The Zoom joining link and reminders will be sent to your registration email." },
  ],
};
