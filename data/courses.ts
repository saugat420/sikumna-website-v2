export type CourseLesson = {
  id: string;
  title: string;
  youtubeId?: string;
};

export type FreeCourse = {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  lessons: CourseLesson[];
};

const digitalMarketingLessonTitles = [
  "Welcome to Digital Marketing",
  "Understanding the Digital Customer",
  "How the Marketing Funnel Works",
  "Setting Clear Marketing Goals",
  "Building a Useful Customer Persona",
  "Brand Positioning Basics",
  "Creating a Digital Marketing Strategy",
  "Website and Landing Page Fundamentals",
  "Introduction to Content Marketing",
  "Planning Content That Helps People",
  "Copywriting Basics for Beginners",
  "Building a Social Media Strategy",
  "Facebook Marketing Basics",
  "Instagram Marketing Basics",
  "Creating Short-Form Video Content",
  "Community Management and Engagement",
  "Introduction to SEO",
  "Keyword Research Fundamentals",
  "On-Page SEO Basics",
  "Getting Started with Google Business Profile",
  "Introduction to Email Marketing",
  "Creating a Simple Lead Magnet",
  "Introduction to Paid Advertising",
  "Meta Ads Fundamentals",
  "Google Ads Fundamentals",
  "Measuring Campaign Performance",
  "Understanding Marketing Analytics",
  "Improving a Campaign with Data",
  "Building Your Digital Marketing Portfolio",
  "Your Next Steps in Digital Marketing",
];

export const digitalMarketingCourse: FreeCourse = {
  slug: "digital-marketing",
  title: "Free Digital Marketing Course",
  category: "Digital Marketing",
  description: "Build a practical foundation across strategy, content, social media, SEO, email, advertising and analytics—one lesson at a time.",
  thumbnail: "/content/courses/digital-marketing-course.webp",
  lessons: digitalMarketingLessonTitles.map((title, index) => ({
    id: `lesson-${String(index + 1).padStart(2, "0")}`,
    title,
  })),
};
