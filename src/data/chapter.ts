/** Edit this file to update names, wins, photos, and chapter details. */

export const chapter = {
  name: "Lebanon Trail FCCLA",
  school: "Lebanon Trail High School",
  city: "Frisco, Texas",
  established: 2019,
  region: "Texas FCCLA",
  tagline: "The Ultimate Leadership Experience",
  motto: "Toward New Horizons",
  flower: "Red Rose",
  flowerMeaning:
    "The red rose is the official flower of FCCLA. It stands for a desire for beauty in everyday living.",
  colors: "Red and White",
  colorsMeaning:
    "Red suggests strength, courage, and determination. White symbolizes sincerity of purpose and integrity of action.",
  mascot: "Rosie the Llama",
  mascotMeaning:
    "Rosie the Llama is the official national mascot of FCCLA.",
  flowerImage: "/brand/red-rose.png",
  mascotImage: "/brand/rosie-llama.png",
  creedLead:
    "We are the Family, Career and Community Leaders of America. We face the future with warm courage and high hope.",
  creed: [
    "We are the Family, Career and Community Leaders of America.",
    "We face the future with warm courage and high hope.",
    "For we have the clear consciousness of seeking old and precious values.",
    "For we are the builders of homes,",
    "Homes for America's future,",
    "Homes where living will be the expression of everything that is good and fair,",
    "We are the makers of ourselves and the world in which we live,",
    "We are the Family, Career and Community Leaders of America.",
  ],
  mission:
    "To promote personal growth and leadership development through Family and Consumer Sciences education. Focusing on the multiple roles of family member, wage earner, and community leader, members develop skills for life through character development, creative and critical thinking, interpersonal communication, practical knowledge, and career preparation.",
  about:
    "Lebanon Trail FCCLA brings Family and Consumer Sciences to life beyond the classroom. Members lead projects, compete across Texas, serve the community, and grow into the kind of leaders families and workplaces need.",
  joinCta:
    "Ready to join? Complete the membership form, pay $40 dues on OnlineSchoolFees, and plan to attend meetings, help with service projects, and support fundraising.",
  eligibilityNote:
    "You can join if you are enrolled in an eligible FCS course, or if you have taken one at any point in high school. Not sure you qualify? Email an officer, or visit MF A206 or KC A204 at any point in the day if an advisor is available.",
  social: {
    instagram: "https://www.instagram.com/LEBANONTRAILFCCLA/",
    twitter: "https://twitter.com/LTHSfccla",
  },
  contactEmail: "fiszerm@friscoisd.org",
  joinFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfmf-ZQcecbttkW0AgrN8pgaiVQTpIhbxUN3j_9OI4YJnLSMA/viewform",
  classrooms: [
    {
      code: "MF A206",
      advisor: "Ms. Michelle Fiszer",
      email: "fiszerm@friscoisd.org",
      note: "Visit when available for questions and membership forms",
    },
    {
      code: "KC A204",
      advisor: "Ms. Kelli Cashion",
      email: "cashionk@friscoisd.org",
      note: "Visit when available for questions and membership forms",
    },
  ],
  membership: {
    duesAmount: "$40 for the 2026-27 membership year",
    duesDetails:
      "Membership dues are $40. That covers Texas & National FCCLA affiliation plus Lebanon Trail chapter activities for the year.",
    paymentHow:
      "Pay online through Frisco ISD OnlineSchoolFees with a credit/debit card or electronic check.",
    paymentWhere:
      "Log in at onlineschoolfees.com, add your student, and pay the Lebanon Trail FCCLA membership fee. If the fee is not listed yet, visit MF A206 or KC A204 and an advisor can help.",
    paymentUrl: "https://www.onlineschoolfees.com/",
    formOnline:
      "Fill out the official membership Google Form on this page (or open it in a new tab). Online submissions go straight to advisors. No print needed for the digital form.",
    formReturn:
      "Need a paper form instead? Ask in MF A206 or KC A204, complete it, and return it to either classroom. Pay dues separately on OnlineSchoolFees.",
    expectations: [
      "Come to chapter meetings listed on the calendar",
      "Participate in service projects, including Adopurr shelter and advocacy work",
      "Help with fundraising that supports chapter projects and animal welfare",
      "If you want to compete or attend State Fair on October 7, earn at least 50 approved points in the member portal",
    ],
    steps: [
      "Check that you have taken (or are taking) an eligible FCS course",
      "Complete the membership form online or on paper",
      "Pay $40 dues on OnlineSchoolFees",
      "Show up to meetings, service, and fundraising, then track points in the portal",
    ],
  },
  calendar: {
    embedSrc:
      "https://calendar.google.com/calendar/embed?src=c_3256d0abc2a80c0cb79e6947c1ea7c084add498878449b83856b5c9cc1a5cd6e%40group.calendar.google.com&ctz=America%2FChicago",
    publicUrl:
      "https://calendar.google.com/calendar/embed?src=c_3256d0abc2a80c0cb79e6947c1ea7c084add498878449b83856b5c9cc1a5cd6e%40group.calendar.google.com&ctz=America%2FChicago",
    id: "c_3256d0abc2a80c0cb79e6947c1ea7c084add498878449b83856b5c9cc1a5cd6e@group.calendar.google.com",
  },
}

export const purposes = [
  "To provide opportunities for personal development and preparation for adult life.",
  "To strengthen the function of the family as a basic unit of society.",
  "To encourage democracy through cooperative action in the home and community.",
  "To encourage individual and group involvement in helping achieve global cooperation and harmony.",
  "To promote greater understanding between youth and adults.",
  "To provide opportunities for making decisions and for assuming responsibilities.",
  "To prepare for the multiple roles of men and women in today's society.",
  "To promote Family and Consumer Sciences and related occupations.",
]

export const eligibleCourses = [
  "Entrepreneurship",
  "Architecture and Construction",
  "Professional Communications",
  "Intro to Culinary Arts",
  "Interpersonal Studies",
  "Child Development",
  "Fashion Design",
  "Interior Design",
  "Food Science",
  "Survey of Education and Training",
  "Survey of Hospitality and Tourism",
  "Dollars and Senses",
  "Fashion Marketing",
  "Travel and Tourism Management",
  "Hotel Management",
]

export type CareerPath = {
  area: string
  courses: string[]
  jobs: string[]
}

export const fcsPathways: CareerPath[] = [
  {
    area: "Culinary & Food Science",
    courses: ["Intro to Culinary Arts", "Food Science"],
    jobs: [
      "Chef or pastry cook",
      "Food scientist / product developer",
      "Nutrition assistant",
      "Food safety specialist",
      "Restaurant or catering manager",
    ],
  },
  {
    area: "Hospitality & Tourism",
    courses: [
      "Survey of Hospitality and Tourism",
      "Travel and Tourism Management",
      "Hotel Management",
    ],
    jobs: [
      "Hotel or resort manager",
      "Event planner",
      "Travel coordinator",
      "Guest experience specialist",
      "Tourism marketing associate",
    ],
  },
  {
    area: "Fashion & Design",
    courses: ["Fashion Design", "Fashion Marketing", "Interior Design"],
    jobs: [
      "Fashion designer",
      "Merchandiser or buyer",
      "Stylist",
      "Interior designer",
      "Visual merchandiser",
    ],
  },
  {
    area: "Human Services & Education",
    courses: [
      "Child Development",
      "Interpersonal Studies",
      "Survey of Education and Training",
    ],
    jobs: [
      "Early childhood educator",
      "Teacher or instructional aide",
      "Social services assistant",
      "Family support specialist",
      "Counseling support roles (with further education)",
    ],
  },
  {
    area: "Business, Communications & Built Environment",
    courses: [
      "Entrepreneurship",
      "Professional Communications",
      "Dollars and Senses",
      "Architecture and Construction",
    ],
    jobs: [
      "Small business owner",
      "Marketing or communications specialist",
      "Financial coach or banking associate",
      "Project coordinator",
      "Design or construction support roles",
    ],
  },
]

export type Person = {
  name: string
  role: string
  bio: string
  focus?: string
  email?: string
  photo?: string
  classroom?: string
}

export const officers: Person[] = [
  {
    name: "Tanisa Isha",
    role: "President",
    bio: "Leads chapter meetings, sets the vision for the year, and represents Lebanon Trail FCCLA on campus and beyond.",
    focus: "Chapter leadership",
    email: "tanisaahmed.isha.965@k12.friscoisd.org",
    photo: "/team/tanisa-isha.jpg",
  },
  {
    name: "Marmika Ghaisas",
    role: "Executive Vice President",
    bio: "Partners with the president to keep officers aligned and chapter plans moving from idea to action.",
    focus: "Operations",
    email: "marmika.ghaisas.132@k12.friscoisd.org",
    photo: "/team/marmika-ghaisas.jpg",
  },
  {
    name: "Makayla Townes",
    role: "Executive Vice President",
    bio: "Supports day-to-day chapter leadership and helps members stay connected to meetings, service, and competition.",
    focus: "Operations",
    email: "makayla.townes.381@k12.friscoisd.org",
    photo: "/team/makayla-townes.jpg",
  },
  {
    name: "Shruthika Omkumar",
    role: "VP of Competitive Events",
    bio: "Guides members through STAR Events, testing, and competition prep from region to state and nationals.",
    focus: "STAR Events",
    email: "shruthika.omkumar.246@k12.friscoisd.org",
    photo: "/team/shruthika-omkumar.jpg",
  },
  {
    name: "Coming soon",
    role: "VP of Leadership",
    bio: "Plans leadership activities that strengthen members' skills for life.",
    focus: "Leadership development",
  },
  {
    name: "Coming soon",
    role: "VP of Service",
    bio: "Leads community service, including our Adopurr work in animal welfare and adoption.",
    focus: "Community impact",
  },
  {
    name: "Coming soon",
    role: "VP of Finance",
    bio: "Looks after chapter budgeting, fundraising awareness, and money smarts.",
    focus: "Stewardship",
  },
  {
    name: "Coming soon",
    role: "VP of Public Relations",
    bio: "Tells the chapter story across campus and in the community.",
    focus: "Communications",
  },
  {
    name: "Coming soon",
    role: "VP of Membership",
    bio: "Welcomes new members and helps students check course eligibility.",
    focus: "Recruitment",
  },
  {
    name: "Coming soon",
    role: "Secretary / Historian",
    bio: "Keeps the record of meetings, milestones, and Trail FCCLA history.",
    focus: "Documentation",
  },
]

export const advisors: Person[] = [
  {
    name: "Michelle Fiszer",
    role: "Chapter Advisor",
    bio: "Visit MF A206 when available for membership questions and forms.",
    focus: "FCS Teacher · MF A206",
    email: "fiszerm@friscoisd.org",
    photo: "/team/advisor-michelle-fiszer.png",
    classroom: "MF A206",
  },
  {
    name: "Kelli Cashion",
    role: "Chapter Advisor",
    bio: "Visit KC A204 when available for membership questions and forms.",
    focus: "FCS Teacher · KC A204",
    email: "cashionk@friscoisd.org",
    photo: "/team/advisor-kelli-cashion.png",
    classroom: "KC A204",
  },
]

export type CompetitionTrack = {
  name: string
  subtitle?: string
  summary: string
  bullets: string[]
  categoryLabel?: string
  categories?: string[]
}

export const competitionTracks: CompetitionTrack[] = [
  {
    name: "STAR Events",
    subtitle: "Students Taking Action with Recognition",
    summary:
      "Individual or team competitions where members identify real-world issues, build solutions, and present to judges.",
    bullets: [
      "Individual or team competitions",
      "Identify real-world issues and create solutions",
      "Include research, planning, and implementation",
      "Present your project to judges",
      "Focus on leadership and career skills",
    ],
    categories: [
      "Baking and Pastry",
      "Career Investigation",
      "Chapter in Review (Display & Portfolio)",
      "Chapter Service Project (Display & Portfolio)",
      "Culinary Arts",
      "Early Childhood Education",
      "Entrepreneurship",
      "Event Management",
      "Fashion Construction",
      "Fashion Design",
      "Focus on Children",
      "Food Innovations",
      "Hospitality, Tourism, and Recreation",
      "Interior Design",
      "Interpersonal Communications",
      "Job Interview",
      "Leadership",
      "National Programs in Action",
      "Nutrition and Wellness",
      "Parliamentary Procedure",
      "Personal Finance (Presented by EVERFI)",
      "Professional Presentation",
      "Promote and Publicize FCCLA",
      "Public Policy Advocate",
      "Repurpose and Redesign",
      "Say Yes to FCS Education",
      "Sports Nutrition",
      "Sustainability Challenge",
      "Teach or Train",
      "Teaching Strategies",
    ],
  },
  {
    name: "Online STAR Events",
    summary:
      "Digital, internet-based STAR competitions. Projects often include portfolios and can be individual, team, or chapter entries that advance toward the national level.",
    bullets: [
      "Completed and submitted online",
      "Portfolio-based options available",
      "Individual, team, or chapter entries",
      "Pathway toward national competition",
    ],
    categories: [
      "Digital Stories for Change",
      "FCCLA Chapter Website",
      "Instructional Video Design",
      "Red Talks on Education",
      "Tech Apps for FCCLA",
    ],
  },
  {
    name: "FCSAs",
    subtitle: "Family and Consumer Sciences Assessments",
    summary:
      "Objective, multiple-choice tests that show what you know in specific FCS content areas. Members typically test at Fall and State Leadership Conferences.",
    bullets: [
      "Multiple-choice knowledge tests",
      "Tied to FCS course content",
      "Offered at major conferences",
      "Medals and recognition for strong scores",
    ],
    categories: [
      "Child Development",
      "Culinary Arts",
      "Education and Training",
      "Fashion Construction",
      "Fashion Design",
      "Food Science",
      "Hospitality, Tourism, and Recreation",
      "Housing and Interior Design",
      "Human Development",
      "Interior Design",
      "Interpersonal Studies",
      "Nutrition and Wellness",
      "Personal Finance",
      "Textiles and Apparel",
    ],
  },
  {
    name: "Skill Demonstration Events",
    summary:
      "Fast-paced competitions that spotlight a specific occupational or leadership skill. These are often held at state conferences and the National Leadership Conference.",
    bullets: [
      "Focus on one clear skill",
      "Short demonstration format",
      "Great intro to competing",
      "Offered at state and national conferences",
    ],
    categories: [
      "Culinary Food Art",
      "Culinary Knife Skills",
      "Fashion Sketch",
      "FCCLA Creed Speaking and Interpretation",
      "Impromptu Speaking",
      "Interior Design Sketch",
      "Interviewing Skills",
      "Lesson Plan Development and Modifications",
      "Pastry Arts Technical Decorating Skills",
      "Speak Out for FCCLA",
      "#TeachFCS",
      "Technology in Teaching",
      "Toys that Teach",
    ],
  },
  {
    name: "Spotlight on Projects",
    subtitle: "National Programs showcase",
    summary:
      "A competitive opportunity that showcases a chapter’s involvement in the FCCLA National Programs. Spotlight on Projects does not have an oral presentation. It is a display with specifications explained in the guidelines and rubric. It is a regional competition that can advance to state. State winners have the opportunity to be showcased at the National Conference.",
    bullets: [
      "Display-based (no oral presentation)",
      "Highlights National Program involvement",
      "Competes at region and can advance to state",
      "State winners may be showcased nationally",
    ],
    categoryLabel: "Categories available",
    categories: [
      "Career Connection",
      "FACTS",
      "Families First",
      "Stand Up",
      "Student Body",
    ],
  },
  {
    name: "FCCLA/LifeSmarts Knowledge Bowl",
    subtitle: "Team quiz competition",
    summary:
      "Team-based quiz competition (teams of 5) covering life skills topics. Multiple rounds of online and national competition with a focus on teamwork and knowledge.",
    bullets: [
      "Teams of 5",
      "Covers life skills topics (finance, health, tech, and more)",
      "Multiple rounds of online and national competition",
      "Focus on teamwork and knowledge",
    ],
    categoryLabel: "Topics",
    categories: [
      "Personal Finance",
      "Consumer Rights & Responsibilities",
      "Technology",
      "Health & Safety",
      "Environment",
      "FCCLA Knowledge",
    ],
  },
  {
    name: "FCCLA/Knowledge Matters Virtual Business Challenge",
    subtitle: "Simulation-based competition",
    summary:
      "Make decisions in virtual business scenarios. Topics include personal finance or fashion, and entries are scored based on performance outcomes.",
    bullets: [
      "Simulation-based competition",
      "Make decisions in virtual business scenarios",
      "Topics include personal finance or fashion",
      "Scored based on performance outcomes",
    ],
    categoryLabel: "Categories available",
    categories: ["Personal Finance", "Fashion"],
  },
  {
    name: "FCCLA Challenge Tests",
    subtitle: "Presented by G-W Publisher",
    summary:
      "Standardized subject-area exams based on Family and Consumer Sciences topics. Testing may be online or in person and measures academic and career readiness.",
    bullets: [
      "Standardized subject-area exams",
      "Based on Family and Consumer Sciences topics",
      "Online or in-person testing",
      "Measures academic and career readiness",
    ],
    categoryLabel: "Categories available",
    categories: [
      "Apparel: Fashion Design & Construction",
      "Child Development: Early Stages Through Adolescence",
      "Counseling and Mental Health Services",
      "Culinary Math",
      "FCCLA Knowledge",
      "Hospitality Services",
      "Housing and Interior Design",
      "Interpersonal Relationships",
      "Math for Financial Literacy",
      "Nutrition & Wellness for Life",
      "Principles of Food Science",
      "Principles of Human Services",
      "School to Career",
      "Teaching",
      "Working with Young Children",
    ],
  },
  {
    name: "FCCLA National Program Awards",
    subtitle: "Application-based recognition",
    summary:
      "Complete national FCCLA program projects and submit evidence of impact and results. Focused on leadership and community impact.",
    bullets: [
      "Application-based recognition program",
      "Complete national FCCLA program projects",
      "Submit evidence of impact and results",
      "Focus on leadership and community impact",
    ],
    categoryLabel: "Programs available",
    categories: [
      "Career Connection",
      "Community Service",
      "FACTS",
      "Families First",
      "Financial Fitness",
      "Stand Up",
      "Student Body",
    ],
  },
]

export type RecordLevel = "National" | "State" | "Region" | "Chapter"

export type MemberResult = {
  name: string
  grade: string
  year: string
  results: { event: string; placement: string; level: RecordLevel }[]
}

export const memberResults: MemberResult[] = [
  {
    name: "Shruthika Omkumar",
    grade: "10th Grade",
    year: "2025-26",
    results: [
      {
        event: "School to Career Challenge",
        placement: "National 1st Place",
        level: "National",
      },
      {
        event: "Power of One",
        placement: "Completed Power of One",
        level: "National",
      },
      {
        event: "Sustainability Challenge (Level 2)",
        placement:
          "1st Place at Region III, then 3rd Place at the Texas State Leadership Conference (National Qualifier)",
        level: "State",
      },
      {
        event: "FCSA State Testing",
        placement: "State Gold Medal",
        level: "State",
      },
    ],
  },
  {
    name: "Marmika Ghaisas",
    grade: "10th Grade",
    year: "2025-26",
    results: [
      {
        event: "FCSA State Testing",
        placement: "State Gold Medal",
        level: "State",
      },
    ],
  },
  {
    name: "Ragavi Rajkumar",
    grade: "12th Grade",
    year: "2025-26",
    results: [
      {
        event: "Power of One",
        placement: "Completed Power of One",
        level: "National",
      },
      {
        event: "FCSA State Testing",
        placement: "State Silver Medal",
        level: "State",
      },
      {
        event: "Fashion Construction",
        placement: "Regional Event Finalist (advanced to State)",
        level: "Region",
      },
    ],
  },
  {
    name: "Lucianna De Conciliis",
    grade: "12th Grade",
    year: "2025-26",
    results: [
      {
        event: "FCSA Interior Design",
        placement: "State Qualifier",
        level: "State",
      },
      {
        event: "FCSA State Testing",
        placement: "State Bronze Medal",
        level: "State",
      },
    ],
  },
]

const levelOrder: Record<RecordLevel, number> = {
  National: 0,
  State: 1,
  Region: 2,
  Chapter: 3,
}

export const chapterMilestones = [
  {
    year: "Chapter",
    name: "Lebanon Trail FCCLA",
    grade: "",
    title: "Competitive resurgence",
    detail:
      "The 2025-26 school year marked the chapter's official competitive comeback, with a national qualifier and multiple state award winners.",
    level: "Chapter" as const,
    event: "Competitive resurgence",
    placement:
      "The 2025-26 school year marked the chapter's official competitive comeback, with a national qualifier and multiple state award winners.",
  },
  {
    year: "Chapter",
    name: "Lebanon Trail FCCLA",
    grade: "",
    title: "Established 2019",
    detail:
      "Lebanon Trail FCCLA has been building leaders through FCS education, service, and competition since 2019.",
    level: "Chapter" as const,
    event: "Established 2019",
    placement:
      "Lebanon Trail FCCLA has been building leaders through FCS education, service, and competition since 2019.",
  },
]

/** Flat board rows for the records list UI. National first, then State, Region, Chapter. */
export function buildCompetitionRecords(
  results: MemberResult[] = memberResults,
  milestones: typeof chapterMilestones = chapterMilestones,
) {
  return [
    ...results.flatMap((member) =>
      member.results.map((result) => ({
        year: member.year,
        name: member.name,
        grade: member.grade,
        title: `${member.name} · ${result.event}`,
        detail: `${member.grade}. ${result.placement}`,
        level: result.level,
        event: result.event,
        placement: result.placement,
      })),
    ),
    ...milestones,
  ].sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
}

export const competitionRecords = buildCompetitionRecords()

export type ServiceEvent = {
  title: string
  date: string
  status: "upcoming" | "ongoing" | "completed" | "core"
  description: string
  impact?: string
  image?: string
  featured?: boolean
}

export const coreServiceProject: ServiceEvent = {
  title: "Adopurr",
  date: "2026-27 Core Project",
  status: "core",
  featured: true,
  image: "/projects/adopurr.png",
  description:
    "Adopurr is Lebanon Trail FCCLA's core community service project for 2026-27. Members volunteer at local shelters, raise funds for sterilization, advocate for animal welfare, and earn points toward competing and the State Fair.",
  impact: "Shelter service hours, adoption advocacy, and animal welfare fundraising",
}

export const communityService: ServiceEvent[] = [
  coreServiceProject,
  {
    title: "Monthly Shelter Visits",
    date: "Ongoing 2026-27",
    status: "ongoing",
    description:
      "Volunteer at any local animal shelter or rescue for care shifts and adoption-floor support. Bring a supervisor signature or confirmation email. Service hours available.",
    impact: "Direct animal care + service hours",
  },
  {
    title: "Adopurr Outreach & Fundraising",
    date: "Fall-Spring 2026-27",
    status: "upcoming",
    description:
      "Flyers, social posts, and cold emails to raise money for sterilization and promote animal care across North Texas shelters.",
    impact: "Funds + community awareness",
  },
  {
    title: "Dog Toy Making Event",
    date: "Winter 2026-27",
    status: "upcoming",
    description:
      "Chapter work night building enrichment toys for shelter dogs partnered with Adopurr.",
    impact: "Hands-on support for animals in care",
  },
  {
    title: "Emerson × Lebanon Trail Connect",
    date: "2026-27",
    status: "upcoming",
    description:
      "Cross-chapter collaboration focused on cultural promotion and connecting FCCLA communities.",
    impact: "Campus + chapter partnership",
  },
  {
    title: "Plano × Lebanon Trail Stand Up",
    date: "2026-27",
    status: "upcoming",
    description: "Joint Stand Up chapter project with Plano FCCLA.",
    impact: "Collaborative service leadership",
  },
]

export const importantDetails = [
  {
    label: "Who can join",
    value:
      "Students who take (or have taken) an eligible FCS course at any point in their high school years. If you are unsure, stop by MF A206 or KC A204 to confirm eligibility.",
  },
  {
    label: "What we do",
    value:
      "STAR Events, community service (led by Adopurr in 2026-27), leadership conferences, fundraising, and chapter projects with family at the center.",
  },
  {
    label: "Where to find us",
    value:
      "Email an officer with questions, or visit advisors in MF A206 (Ms. Fiszer) or KC A204 (Ms. Cashion) at any point in the day if they are available. Pay $40 dues on OnlineSchoolFees. Follow us on Instagram @LEBANONTRAILFCCLA.",
  },
  {
    label: "Our marks",
    value:
      "Official flower: red rose. Official national mascot: Rosie the Llama. Colors: red and white. Motto: Toward New Horizons.",
  },
  {
    label: "Texas FCCLA",
    value:
      "Part of a statewide network of 550+ chapters and 25,000+ members annually, with conferences, scholarships, and pathways from local to national.",
  },
]

export const faqs = [
  {
    question: "Who can join Lebanon Trail FCCLA?",
    answer:
      "Students who are enrolled in an eligible FCS course, or who have taken one at any point in high school. If you are unsure, email an officer, or visit MF A206 or KC A204 at any point in the day if an advisor is available.",
  },
  {
    question: "How do I join?",
    answer:
      "Complete the membership form on the Join page (online Google Form or paper from an advisor classroom), pay $40 dues on OnlineSchoolFees, and plan to attend meetings, service projects, and fundraising.",
  },
  {
    question: "How much are dues and how do I pay?",
    answer:
      "Membership dues are $40 for the 2026-27 year. Pay online at OnlineSchoolFees (onlineschoolfees.com). If the FCCLA fee does not show on your account yet, visit MF A206 or KC A204 and an advisor can help.",
  },
  {
    question: "What is expected of members?",
    answer:
      "Come to chapter meetings, participate in service projects (including Adopurr), and help with fundraising. Members who want to compete or attend State Fair also need at least 50 approved points in the member portal.",
  },
  {
    question: "Where do I submit forms?",
    answer:
      "Submit the Google Form online from the Join page, or return a paper form to MF A206 or KC A204. Pay $40 dues on OnlineSchoolFees.",
  },
  {
    question: "Who should I contact with questions?",
    answer:
      "Email an officer from the Officers page, or visit Ms. Fiszer in MF A206 or Ms. Cashion in KC A204 at any point in the day if they are available.",
  },
  {
    question: "Do I have to compete?",
    answer:
      "No. You can be a general member focused on meetings, service, and leadership. Competing in STAR Events, FCSAs, or skill demos is optional and encouraged if you want that path.",
  },
  {
    question: "What is Adopurr?",
    answer:
      "Adopurr is our 2026-27 core service project focused on animal welfare, shelter volunteering, sterilization fundraising, and adoption advocacy. See the Adopurr page for the full flow and partner shelters.",
  },
  {
    question: "How do points work for competing and State Fair?",
    answer:
      "Members log completed activities in the Member Portal. Officers and advisors approve honest claims. You need at least 50 approved points to compete and to attend the State Fair on October 7.",
  },
  {
    question: "When is State Fair?",
    answer:
      "State Fair is October 7. Members who want to attend need at least 50 approved points in the member portal.",
  },
  {
    question: "When does the chapter meet?",
    answer:
      "Meeting times are posted on the chapter calendar. Check Calendar for the latest dates and locations.",
  },
]
