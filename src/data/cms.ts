// Content Management System for Sarah Mitchell Law Portfolio
// This file contains all editable content for easy management

export interface CMSData {
  general: {
    name: string
    title: string
    tagline: string
    description: string
    location: string
    phone: string
    email: string
    linkedin: string
    image: string
  }
  navigation: {
    logo: string
    items: Array<{
      key: string
      label: string
      href: string
    }>
  }
  hero: {
    subtitle: string
    mainTitle: string
    description: string
    ctaText: string
    credentials: string[]
    backgroundElements: {
      particles: number
      legalIcons: number
    }
    contactIcons: Array<{
      type: 'phone' | 'email' | 'location'
      href: string
      label: string
    }>
  }
  about: {
    title: string
    subtitle: string
    description: string
    timeline: Array<{
      year: string
      title: string
      organization: string
      description: string
      icon?: string
    }>
    stats: Array<{
      number: number
      label: string
      suffix?: string
      prefix?: string
    }>
    achievements: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  practiceAreas: {
    title: string
    subtitle: string
    areas: Array<{
      title: string
      description: string
      icon: string
      skills: string[]
      cases: number
      successRate: number
    }>
  }
  caseResults: {
    title: string
    subtitle: string
    cases: Array<{
      title: string
      description: string
      outcome: string
      amount?: string
      area: string
      year: number
      image?: string
      testimonial?: {
        quote: string
        client: string
        position?: string
      }
    }>
  }
  testimonials: {
    title: string
    subtitle: string
    reviews: Array<{
      quote: string
      author: string
      position: string
      company: string
      rating: number
      image?: string
    }>
  }
  blog: {
    title: string
    subtitle: string
    posts: Array<{
      title: string
      excerpt: string
      content: string
      author: string
      date: string
      category: string
      image?: string
      readTime: number
    }>
  }
  faq: {
    title: string
    subtitle: string
    questions: Array<{
      question: string
      answer: string
      category: string
    }>
  }
  awards: {
    title: string
    subtitle: string
    awards: Array<{
      title: string
      organization: string
      year: number
      description: string
      image?: string
    }>
  }
  contact: {
    title: string
    subtitle: string
    office: {
      address: string
      phone: string
      email: string
      hours: string[]
    }
    map: {
      coordinates: {
        lat: number
        lng: number
      }
      zoom: number
    }
    form: {
      fields: Array<{
        name: string
        label: string
        type: string
        required: boolean
        options?: string[]
      }>
    }
    consultation: {
      title: string
      description: string
      duration: string
      price: string
    }
  }
}

export const cmsData: CMSData = {
  general: {
    name: "Sarah Mitchell",
    title: "Attorney at Law",
    tagline: "Experienced Legal Advocate",
    description: "With over 15 years of experience, I provide comprehensive legal solutions for businesses and individuals.",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    email: "sarah@mitchelllaw.com",
    linkedin: "https://linkedin.com/in/sarahmitchell",
    image: "/images/sarah-mitchell.jpg"
  },
  navigation: {
    logo: "Sarah Mitchell",
    items: [
      { key: "home", label: "Home", href: "#home" },
      { key: "about", label: "About", href: "#about" },
      { key: "practice", label: "Practice Areas", href: "#practice" },
      { key: "cases", label: "Case Results", href: "#cases" },
      { key: "testimonials", label: "Testimonials", href: "#testimonials" },
      { key: "blog", label: "Insights", href: "#blog" },
      { key: "contact", label: "Contact", href: "#contact" }
    ]
  },
  hero: {
    subtitle: "Experienced Legal Advocate",
    mainTitle: "Sarah Mitchell",
    description: "With over 15 years of experience, I provide comprehensive legal solutions for businesses and individuals. I'm committed to delivering exceptional results through strategic thinking, meticulous preparation, and unwavering advocacy for my clients.",
    ctaText: "Schedule Consultation",
    credentials: [
      "Licensed in NY & NJ",
      "ABA Member", 
      "Harvard Law School",
      "15+ Years Experience"
    ],
    backgroundElements: {
      particles: 50,
      legalIcons: 5
    },
    contactIcons: [
      { type: "phone", href: "tel:+15551234567", label: "Call" },
      { type: "email", href: "mailto:sarah@mitchelllaw.com", label: "Email" },
      { type: "location", href: "#contact", label: "Location" }
    ]
  },
  about: {
    title: "About Sarah Mitchell",
    subtitle: "Dedicated to Excellence in Legal Practice",
    description: "I believe that every client deserves personalized attention and strategic legal counsel tailored to their unique circumstances. My approach combines deep legal expertise with practical business acumen to deliver results that matter.",
    timeline: [
      {
        year: "2008",
        title: "Harvard Law School",
        organization: "Juris Doctor, Magna Cum Laude",
        description: "Graduated top 5% of class, Harvard Law Review"
      },
      {
        year: "2009",
        title: "Associate Attorney",
        organization: "Cravath, Swaine & Moore",
        description: "Corporate law and M&A transactions"
      },
      {
        year: "2015",
        title: "Senior Associate",
        organization: "Skadden, Arps",
        description: "Lead counsel on major litigation cases"
      },
      {
        year: "2018",
        title: "Partner",
        organization: "Mitchell & Associates",
        description: "Founded boutique firm specializing in corporate law"
      },
      {
        year: "2023",
        title: "Solo Practice",
        organization: "Mitchell Law Firm",
        description: "Expanded practice to serve diverse client base"
      }
    ],
    stats: [
      { number: 15, label: "Years Experience", suffix: "+" },
      { number: 250, label: "Cases Won", suffix: "+" },
      { number: 95, label: "Success Rate", suffix: "%" },
      { number: 50, label: "Million Recovered", prefix: "$", suffix: "M+" }
    ],
    achievements: [
      {
        title: "Super Lawyers",
        description: "Rising Stars 2015-2020, Super Lawyer 2021-2023",
        icon: "award"
      },
      {
        title: "ABA Recognition",
        description: "Outstanding Young Lawyer Award 2018",
        icon: "medal"
      },
      {
        title: "Client Choice",
        description: "Martindale-Hubbell Client Choice Award",
        icon: "star"
      }
    ]
  },
  practiceAreas: {
    title: "Practice Areas",
    subtitle: "Comprehensive Legal Services",
    areas: [
      {
        title: "Corporate Law",
        description: "Business formation, contracts, mergers & acquisitions, and corporate governance",
        icon: "briefcase",
        skills: ["Contract Negotiation", "M&A", "Corporate Governance", "Compliance"],
        cases: 85,
        successRate: 98
      },
      {
        title: "Commercial Litigation",
        description: "Complex business disputes, breach of contract, and commercial litigation",
        icon: "gavel",
        skills: ["Trial Advocacy", "Dispute Resolution", "Settlement Negotiation", "Appeals"],
        cases: 120,
        successRate: 94
      },
      {
        title: "Real Estate Law",
        description: "Property transactions, development, leasing, and real estate litigation",
        icon: "building",
        skills: ["Property Transactions", "Development", "Zoning", "Landlord-Tenant"],
        cases: 75,
        successRate: 96
      },
      {
        title: "Employment Law",
        description: "Workplace disputes, discrimination claims, and employment contracts",
        icon: "users",
        skills: ["Discrimination Defense", "Contract Review", "Compliance", "Workplace Policy"],
        cases: 60,
        successRate: 92
      }
    ]
  },
  caseResults: {
    title: "Case Results",
    subtitle: "Proven Track Record of Success",
    cases: [
      {
        title: "Tech Startup Acquisition",
        description: "Successfully negotiated $50M acquisition deal for innovative tech startup",
        outcome: "Successful acquisition completed in 90 days",
        amount: "$50M",
        area: "Corporate Law",
        year: 2023,
        testimonial: {
          quote: "Sarah's expertise was invaluable in navigating our acquisition.",
          client: "John Smith",
          position: "CEO, TechStart Inc."
        }
      },
      {
        title: "Commercial Real Estate Dispute",
        description: "Resolved complex commercial lease dispute saving client millions",
        outcome: "Favorable settlement reached",
        amount: "$3.2M",
        area: "Real Estate Law",
        year: 2023
      },
      {
        title: "Employment Discrimination Defense",
        description: "Successfully defended Fortune 500 company against discrimination claims",
        outcome: "Case dismissed with prejudice",
        area: "Employment Law",
        year: 2022
      },
      {
        title: "Contract Breach Litigation",
        description: "Won significant judgment in complex commercial contract dispute",
        outcome: "Jury verdict in favor of client",
        amount: "$8.5M",
        area: "Commercial Litigation",
        year: 2022
      }
    ]
  },
  testimonials: {
    title: "Client Testimonials",
    subtitle: "What Our Clients Say",
    reviews: [
      {
        quote: "Sarah Mitchell provided exceptional legal counsel during our company merger. Her attention to detail and strategic thinking were invaluable.",
        author: "Michael Johnson",
        position: "CEO",
        company: "Johnson Enterprises",
        rating: 5
      },
      {
        quote: "Professional, knowledgeable, and results-driven. Sarah exceeded our expectations in every way.",
        author: "Emily Davis",
        position: "General Counsel",
        company: "Davis Corporation",
        rating: 5
      },
      {
        quote: "I couldn't have asked for better representation. Sarah's expertise in commercial litigation is unmatched.",
        author: "Robert Chen",
        position: "Business Owner",
        company: "Chen Innovations",
        rating: 5
      }
    ]
  },
  blog: {
    title: "Legal Insights",
    subtitle: "Latest Legal News and Analysis",
    posts: [
      {
        title: "Navigating M&A Transactions in 2024",
        excerpt: "Key considerations for successful mergers and acquisitions in the current market.",
        content: "Full article content here...",
        author: "Sarah Mitchell",
        date: "2024-01-15",
        category: "Corporate Law",
        readTime: 5
      },
      {
        title: "Employment Law Updates: What Employers Need to Know",
        excerpt: "Recent changes in employment legislation and their impact on businesses.",
        content: "Full article content here...",
        author: "Sarah Mitchell", 
        date: "2024-01-10",
        category: "Employment Law",
        readTime: 7
      },
      {
        title: "Commercial Real Estate Trends in NYC",
        excerpt: "Market analysis and legal considerations for commercial property investments.",
        content: "Full article content here...",
        author: "Sarah Mitchell",
        date: "2024-01-05", 
        category: "Real Estate Law",
        readTime: 6
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Common Legal Questions Answered",
    questions: [
      {
        question: "What types of cases do you handle?",
        answer: "I specialize in corporate law, commercial litigation, real estate law, and employment law matters.",
        category: "General"
      },
      {
        question: "How much do you charge for legal services?",
        answer: "My fees vary depending on the complexity and nature of the case. I offer flexible billing arrangements including hourly rates, flat fees, and contingency arrangements when appropriate.",
        category: "Billing"
      },
      {
        question: "Do you offer free consultations?",
        answer: "Yes, I offer a complimentary 30-minute initial consultation to discuss your legal needs and determine how I can help.",
        category: "Consultation"
      },
      {
        question: "How quickly can you respond to urgent matters?",
        answer: "I understand that legal matters can be time-sensitive. I typically respond to urgent inquiries within 24 hours and often much sooner.",
        category: "Response Time"
      }
    ]
  },
  awards: {
    title: "Awards & Recognition",
    subtitle: "Professional Achievements",
    awards: [
      {
        title: "Super Lawyers Rising Star",
        organization: "Super Lawyers Magazine",
        year: 2020,
        description: "Recognized among top young attorneys in New York"
      },
      {
        title: "Client Choice Award",
        organization: "Martindale-Hubbell",
        year: 2021,
        description: "Awarded for exceptional client service and legal ability"
      },
      {
        title: "Outstanding Young Lawyer",
        organization: "American Bar Association",
        year: 2018,
        description: "National recognition for professional excellence"
      }
    ]
  },
  contact: {
    title: "Contact Us",
    subtitle: "Schedule Your Consultation Today",
    office: {
      address: "123 Park Avenue, Suite 1500\nNew York, NY 10017",
      phone: "+1 (555) 123-4567",
      email: "sarah@mitchelllaw.com",
      hours: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM", 
        "Sunday: By appointment only"
      ]
    },
    map: {
      coordinates: {
        lat: 40.7589,
        lng: -73.9776
      },
      zoom: 15
    },
    form: {
      fields: [
        { name: "name", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: false },
        { name: "subject", label: "Subject", type: "text", required: true },
        { name: "legalArea", label: "Legal Area", type: "select", required: true, 
          options: ["Corporate Law", "Commercial Litigation", "Real Estate Law", "Employment Law", "Other"] },
        { name: "message", label: "Message", type: "textarea", required: true }
      ]
    },
    consultation: {
      title: "Free Consultation",
      description: "Schedule a complimentary 30-minute consultation to discuss your legal needs.",
      duration: "30 minutes",
      price: "Free"
    }
  }
}

// Utility function to update CMS data
export const updateCMSData = (path: string, value: any) => {
  // This would integrate with a real CMS in production
  console.log(`Updating ${path} with:`, value)
}

// Type-safe accessor functions
export const getCMSData = (section: keyof CMSData) => {
  return cmsData[section]
}

export const getNavigation = () => getCMSData('navigation')
export const getHero = () => getCMSData('hero')
export const getAbout = () => getCMSData('about')
export const getPracticeAreas = () => getCMSData('practiceAreas')
export const getCaseResults = () => getCMSData('caseResults')
export const getTestimonials = () => getCMSData('testimonials')
export const getBlog = () => getCMSData('blog')
export const getFAQ = () => getCMSData('faq')
export const getAwards = () => getCMSData('awards')
export const getContact = () => getCMSData('contact')
export const getGeneral = () => getCMSData('general')