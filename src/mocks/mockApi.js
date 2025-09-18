// Mock API responses for development and fallback

/**
 * Mock career suggestion response
 */
export const mockSuggestCareer = async (questionnaireData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { studentLevel, codingPref, topSubjects, industries } = questionnaireData;

  // Generate suggestions based on input
  const suggestions = [];

  if (codingPref >= 7) {
    suggestions.push({
      name: "Full Stack Developer",
      score: 92,
      why: "Your high coding preference and technical background make you an excellent candidate for full stack development. This role combines frontend and backend development, offering diverse challenges and strong job market demand.",
      key_skills: ["JavaScript", "React", "Node.js", "Databases", "Git"],
      estimated_cost_range: { low: 0, mid: 500, high: 2000 }
    });
  }

  if (topSubjects?.includes('Math') || topSubjects?.includes('Statistics')) {
    suggestions.push({
      name: "Data Scientist",
      score: 88,
      why: "Your strong mathematical background combined with analytical thinking makes data science a natural fit. This field is rapidly growing with excellent career prospects and competitive salaries.",
      key_skills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
      estimated_cost_range: { low: 100, mid: 800, high: 3000 }
    });
  }

  if (industries?.includes('Finance') || industries?.includes('Business')) {
    suggestions.push({
      name: "Product Manager",
      score: 85,
      why: "Your interest in business and technology intersection makes product management ideal. You'll bridge technical and business teams to create products users love.",
      key_skills: ["Product Strategy", "User Research", "Analytics", "Communication", "Agile"],
      estimated_cost_range: { low: 200, mid: 600, high: 1500 }
    });
  }

  // Default suggestions if none match
  if (suggestions.length === 0) {
    suggestions.push(
      {
        name: "Software Engineer",
        score: 82,
        why: "A versatile career path that offers excellent growth opportunities and is in high demand across all industries. Perfect for building strong technical foundations.",
        key_skills: ["Programming", "Problem Solving", "Algorithms", "Testing", "Version Control"],
        estimated_cost_range: { low: 0, mid: 400, high: 1800 }
      },
      {
        name: "UX/UI Designer",
        score: 78,
        why: "Combines creativity with technology to create user-friendly digital experiences. Great career growth and increasing demand in the digital world.",
        key_skills: ["Design Thinking", "Prototyping", "User Research", "Figma", "HTML/CSS"],
        estimated_cost_range: { low: 150, mid: 700, high: 2200 }
      }
    );
  }

  return {
    top_paths: suggestions.slice(0, 3),
    confidence: suggestions.length > 0 ? "high" : "medium",
    skill_gap: {
      have: questionnaireData.knownSkills || ["Basic Computer Skills"],
      need: ["Advanced Programming", "Industry Knowledge", "Soft Skills"]
    },
    next_steps: [
      "1. Complete foundational courses in your chosen field",
      "2. Build 2-3 portfolio projects",
      "3. Start networking with industry professionals",
      "4. Apply for internships or entry-level positions"
    ]
  };
};

/**
 * Mock plan generation response
 */
export const mockGeneratePlan = async (planRequest) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  const { selectedPath } = planRequest;
  
  const baseMilestones = [
    {
      month: 1,
      week: 1,
      title: "Foundations Setup",
      description: "Set up learning environment and complete basic orientation courses",
      hours: 10,
      resources: [
        {
          title: "Getting Started Guide",
          url: "https://example.com/getting-started",
          cost: 0,
          type: "guide"
        }
      ]
    },
    {
      month: 1,
      week: 2,
      title: "Core Concepts Introduction",
      description: "Learn fundamental concepts and terminology in your chosen field",
      hours: 12,
      resources: [
        {
          title: "Introduction Course",
          url: "https://coursera.org/intro-course",
          cost: 49,
          type: "course"
        }
      ]
    }
  ];

  // Generate path-specific milestones
  const pathSpecificMilestones = generatePathMilestones(selectedPath);
  
  return {
    planId: `plan_${Date.now()}`,
    createdAt: new Date().toISOString(),
    selectedPath,
    milestones: [...baseMilestones, ...pathSpecificMilestones],
    costEstimate: { low: 120, mid: 850, high: 2400 },
    totalDurationMonths: 6,
    weeklyHours: 15
  };
};

function generatePathMilestones(path) {
  const pathMilestones = {
    "Full Stack Developer": [
      {
        month: 1,
        week: 3,
        title: "HTML & CSS Mastery",
        description: "Master HTML5 and CSS3, including responsive design and CSS Grid/Flexbox",
        hours: 15,
        resources: [
          { title: "HTML/CSS Complete Course", url: "https://example.com/html-css", cost: 0, type: "course" },
          { title: "CSS Grid Garden", url: "https://cssgridgarden.com", cost: 0, type: "interactive" }
        ]
      },
      {
        month: 2,
        week: 1,
        title: "JavaScript Fundamentals",
        description: "Learn JavaScript ES6+, DOM manipulation, and async programming",
        hours: 20,
        resources: [
          { title: "JavaScript: The Complete Guide", url: "https://udemy.com/js-course", cost: 89, type: "course" }
        ]
      },
      {
        month: 2,
        week: 3,
        title: "React Development",
        description: "Build modern web applications with React, hooks, and state management",
        hours: 18,
        resources: [
          { title: "React - The Complete Guide", url: "https://udemy.com/react-course", cost: 94, type: "course" }
        ]
      },
      {
        month: 3,
        week: 2,
        title: "Backend with Node.js",
        description: "Learn server-side development with Node.js, Express, and databases",
        hours: 22,
        resources: [
          { title: "Node.js Developer Course", url: "https://example.com/nodejs", cost: 79, type: "course" }
        ]
      }
    ],
    "Data Scientist": [
      {
        month: 1,
        week: 3,
        title: "Python Programming",
        description: "Master Python syntax, data structures, and programming fundamentals",
        hours: 18,
        resources: [
          { title: "Python for Data Science", url: "https://coursera.org/python-ds", cost: 49, type: "course" }
        ]
      },
      {
        month: 2,
        week: 1,
        title: "Statistics & Probability",
        description: "Learn statistical concepts essential for data analysis and machine learning",
        hours: 16,
        resources: [
          { title: "Statistics for Data Science", url: "https://edx.org/stats-course", cost: 0, type: "course" }
        ]
      },
      {
        month: 2,
        week: 3,
        title: "Data Analysis with Pandas",
        description: "Master data manipulation and analysis using Python pandas library",
        hours: 14,
        resources: [
          { title: "Pandas Mastery Course", url: "https://example.com/pandas", cost: 69, type: "course" }
        ]
      },
      {
        month: 3,
        week: 2,
        title: "Machine Learning Basics",
        description: "Introduction to ML algorithms, scikit-learn, and model evaluation",
        hours: 20,
        resources: [
          { title: "Machine Learning A-Z", url: "https://udemy.com/ml-course", cost: 129, type: "course" }
        ]
      }
    ]
  };

  return pathMilestones[path] || [
    {
      month: 2,
      week: 1,
      title: "Skill Building Phase 1",
      description: "Focus on core technical skills for your chosen career path",
      hours: 16,
      resources: [
        { title: "Foundational Skills Course", url: "https://example.com/foundations", cost: 79, type: "course" }
      ]
    },
    {
      month: 3,
      week: 1,
      title: "Project Development",
      description: "Build your first major project to demonstrate your skills",
      hours: 25,
      resources: [
        { title: "Project-Based Learning", url: "https://example.com/projects", cost: 99, type: "course" }
      ]
    }
  ];
}