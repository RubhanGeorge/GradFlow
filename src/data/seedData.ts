import { InterviewFeedback } from '../types';

export const INITIAL_FEEDBACK_DATA: InterviewFeedback[] = [
  {
    id: 'seed-1',
    company: 'Amazon',
    role: 'Software Development Engineer (SDE-1)',
    round: 2,
    durationMinutes: 60,
    overallDifficulty: 'Hard',
    panelTypes: ['Technical Lead / Manager', 'Senior Developer / Peer'],
    questionStyles: {
      techPercent: 70,
      techDifficulty: 'Hard',
      aiPercent: 10,
      aiDifficulty: 'Medium',
      aptitudePercent: 20,
      aptitudeDifficulty: 'Medium'
    },
    topicsTested: [
      'Trees, Binary Search Trees & Heaps',
      'Graphs, BFS/DFS & Shortest Path',
      'Dynamic Programming & Recursion',
      'Low-Level System Design (LLD / Design Patterns)',
      'System Trade-offs & Engineering Decision Making'
    ],
    technicalQuestions: 'Given a stream of integers, implement a median finder in O(log n). Follow-up: Distributed cache eviction policy (LRU vs LFU) with lock-free concurrency.',
    hrQuestions: 'Describe a situation where you had to push back on a deadline to ensure high code quality. Which Leadership Principle resonates most with your projects?',
    juniorTips: 'Focus heavily on Tree traversals and edge-case handling. Clarify ambiguous constraints BEFORE writing a single line of code. Write modular helper functions.',
    submittedAt: '2026-10-14T10:30:00Z',
    collegeDomain: 'cmrit.ac.in',
    year: 2026
  },
  {
    id: 'seed-2',
    company: 'Goldman Sachs',
    role: 'Associate Software Engineer',
    round: 1,
    durationMinutes: 90,
    overallDifficulty: 'Hard',
    panelTypes: ['Senior Developer / Peer'],
    questionStyles: {
      techPercent: 50,
      techDifficulty: 'Hard',
      aiPercent: 0,
      aiDifficulty: 'Easy',
      aptitudePercent: 50,
      aptitudeDifficulty: 'Hard'
    },
    topicsTested: [
      'Arrays, Strings & HashMaps',
      'Dynamic Programming & Recursion',
      'Quantitative Aptitude & Mathematics',
      'Logical Reasoning & Data Interpretation',
      'Analytical Puzzles & Lateral Thinking'
    ],
    technicalQuestions: 'Find the minimum jumps to reach the end of array with negative weight transitions. Also 3 probability and combinatorics puzzles on coin tosses and Monty Hall variants.',
    hrQuestions: 'Why financial technology over pure-play consumer tech?',
    juniorTips: 'Do not ignore math and probability! Even if your DSA is 10/10, Goldman OA filters heavily on quantitative accuracy and puzzle speed.',
    submittedAt: '2026-09-28T14:15:00Z',
    collegeDomain: 'rvce.edu.in',
    year: 2026
  },
  {
    id: 'seed-3',
    company: 'Swiggy',
    role: 'Backend Developer',
    round: 3,
    durationMinutes: 45,
    overallDifficulty: 'Medium',
    panelTypes: ['Technical Lead / Manager'],
    questionStyles: {
      techPercent: 65,
      techDifficulty: 'Medium',
      aiPercent: 20,
      aiDifficulty: 'Medium',
      aptitudePercent: 15,
      aptitudeDifficulty: 'Easy'
    },
    topicsTested: [
      'High-Level System Design (HLD / Microservices / Scalability)',
      'System Caching & Message Queues (Redis, RabbitMQ, Kafka)',
      'RESTful APIs, WebSockets & GraphQL',
      'SQL Queries, Indexing & Joins',
      'AI Code Generation & Vibe Coding Tools (Cursor, AI Studio, GitHub Copilot)'
    ],
    technicalQuestions: 'Design a real-time order delivery tracker. Asked about geo-sharding (Uber H3 hex vs Google S2 geometry), WebSocket connection pooling, and Kafka event buffering during surge hours.',
    hrQuestions: 'How do you prioritize fixing critical production bugs versus feature shipping deadlines?',
    juniorTips: 'Read Alex Xu System Design Volume 1. Understand Redis TTL, Cache stampede solutions, and pub/sub messaging thoroughly.',
    submittedAt: '2026-10-02T16:00:00Z',
    collegeDomain: 'pes.edu',
    year: 2026
  },
  {
    id: 'seed-4',
    company: 'Cred',
    role: 'Frontend Developer',
    round: 2,
    durationMinutes: 60,
    overallDifficulty: 'Hard',
    panelTypes: ['Senior Developer / Peer', 'College Alumni'],
    questionStyles: {
      techPercent: 75,
      techDifficulty: 'Hard',
      aiPercent: 15,
      aiDifficulty: 'Easy',
      aptitudePercent: 10,
      aptitudeDifficulty: 'Medium'
    },
    topicsTested: [
      'Web Technologies (HTML, CSS, JavaScript, DOM)',
      'Frontend Frameworks (React, Vue, Angular)',
      'Unit Testing, Mocking & Test-Driven Development (TDD)',
      'Code Refactoring, Optimization & Profiling',
      'Web Security (JWT, OAuth, CORS, XSS, CSRF)'
    ],
    technicalQuestions: 'Build a custom virtualization windowing library from scratch in vanilla JS without external DOM packages. Explain Event Loop microtask vs macrotask execution order in React 19 concurrent mode.',
    hrQuestions: 'Walk through an open-source project or side project you are genuinely proud of. What trade-offs did you make?',
    juniorTips: 'Cred values craft and UI fluidity. Know your browser internals: Compositor threads, reflow vs repaint, requestAnimationFrame, and CSS GPU acceleration.',
    submittedAt: '2026-08-20T11:45:00Z',
    collegeDomain: 'bmsce.ac.in',
    year: 2026
  },
  {
    id: 'seed-5',
    company: 'Accenture',
    role: 'Associate Software Engineer',
    round: 1,
    durationMinutes: 45,
    overallDifficulty: 'Easy',
    panelTypes: ['HR / Talent Acquisition', 'Technical Lead / Manager'],
    questionStyles: {
      techPercent: 40,
      techDifficulty: 'Easy',
      aiPercent: 10,
      aiDifficulty: 'Easy',
      aptitudePercent: 50,
      aptitudeDifficulty: 'Medium'
    },
    topicsTested: [
      'Object-Oriented Programming (OOPs)',
      'SQL Queries, Indexing & Joins',
      'Quantitative Aptitude & Mathematics',
      'Verbal Ability & Technical Communication',
      'Resume Verification & Tech Stack Validation'
    ],
    technicalQuestions: 'Explain the 4 OOPs pillars with real-world examples. Write SQL queries with GROUP BY, HAVING, and INNER JOIN. Predict output of static methods in C++ / Java.',
    hrQuestions: 'Are you comfortable relocating to any delivery center across India? How do you handle working in diverse cross-functional teams?',
    juniorTips: 'Accenture assessment is very time-sensitive. Practice speed calculations and basic SQL syntax. Be crisp in your verbal answers during the HR discussion.',
    submittedAt: '2026-09-05T09:00:00Z',
    collegeDomain: 'msrit.edu',
    year: 2025
  },
  {
    id: 'seed-6',
    company: 'Tata Consultancy Services (TCS)',
    role: 'Software Development Engineer (SDE-1)',
    round: 4,
    durationMinutes: 30,
    overallDifficulty: 'Medium',
    panelTypes: ['HR / Talent Acquisition', 'College Alumni'],
    questionStyles: {
      techPercent: 50,
      techDifficulty: 'Medium',
      aiPercent: 10,
      aiDifficulty: 'Easy',
      aptitudePercent: 40,
      aptitudeDifficulty: 'Medium'
    },
    topicsTested: [
      'Database Management Systems (DBMS / ACID Properties)',
      'Computer Networks (TCP/IP, HTTP/S, DNS, OSI Model)',
      'Operating Systems (Process Scheduling, Threading, Deadlocks)',
      'Project Deep-Dive & Architecture Explanation'
    ],
    technicalQuestions: 'Explain OSI 7 layers and how TCP 3-way handshake handles SYN flood attacks. Discuss your final year college capstone project architecture.',
    hrQuestions: 'What do you know about TCS research and innovation labs? Willingness to work on night shifts or offshore support?',
    juniorTips: 'Alumni on the panel are friendly but expect you to know your resume inside-out. Do not put buzzwords on your resume if you cannot explain the architecture.',
    submittedAt: '2026-09-12T15:20:00Z',
    collegeDomain: 'dsce.edu.in',
    year: 2025
  },
  {
    id: 'seed-7',
    company: 'Razorpay',
    role: 'Backend Developer',
    round: 2,
    durationMinutes: 60,
    overallDifficulty: 'Hard',
    panelTypes: ['Technical Lead / Manager', 'Senior Developer / Peer'],
    questionStyles: {
      techPercent: 80,
      techDifficulty: 'Hard',
      aiPercent: 10,
      aiDifficulty: 'Medium',
      aptitudePercent: 10,
      aptitudeDifficulty: 'Easy'
    },
    topicsTested: [
      'RESTful APIs, WebSockets & GraphQL',
      'Database Management Systems (DBMS / ACID Properties)',
      'SQL Queries, Indexing & Joins',
      'System Caching & Message Queues (Redis, RabbitMQ, Kafka)',
      'Web Security (JWT, OAuth, CORS, XSS, CSRF)',
      'System Trade-offs & Engineering Decision Making'
    ],
    technicalQuestions: 'Design an idempotent payment webhook processing pipeline that guarantees exactly-once processing even if the external gateway delivers 5 duplicate webhooks.',
    hrQuestions: 'How do you handle high pressure incidents when production services degrade during business peaks?',
    juniorTips: 'Master transaction isolation levels (Read Committed vs Serializable) and database row locks (SELECT FOR UPDATE). Razorpay digs deep into data consistency.',
    submittedAt: '2026-10-18T13:00:00Z',
    collegeDomain: 'cmrit.ac.in',
    year: 2026
  },
  {
    id: 'seed-8',
    company: 'Infosys',
    role: 'Software Development Engineer (SDE-1)',
    round: 1,
    durationMinutes: 60,
    overallDifficulty: 'Medium',
    panelTypes: ['Technical Lead / Manager'],
    questionStyles: {
      techPercent: 60,
      techDifficulty: 'Medium',
      aiPercent: 0,
      aiDifficulty: 'Easy',
      aptitudePercent: 40,
      aptitudeDifficulty: 'Medium'
    },
    topicsTested: [
      'Arrays, Strings & HashMaps',
      'Sorting, Searching & Two-Pointers',
      'Object-Oriented Programming (OOPs)',
      'Quantitative Aptitude & Mathematics'
    ],
    technicalQuestions: 'Find longest substring without repeating characters in O(n) time. Java memory heap vs stack memory allocation.',
    hrQuestions: 'Tell me about a time you led a team during a college tech fest or hackathon.',
    juniorTips: 'For the SP/DSE role (Specialist Programmer), practice medium LeetCode questions in Java or Python. Speed and clean syntax are key.',
    submittedAt: '2026-08-30T10:00:00Z',
    collegeDomain: 'iiitb.ac.in',
    year: 2025
  }
];

export const INITIAL_OPPORTUNITIES: any[] = [
  {
    id: 'opp-1',
    title: 'Google Summer of Code (GSoC) 2027 Mentor Track',
    provider: 'Google Open Source',
    type: 'Internship',
    link: 'https://summerofcode.withgoogle.com',
    deadline: '2027-03-31',
    location: 'Remote (Global)',
    requiredSkills: ['Git', 'Python', 'Go', 'React', 'Open Source'],
    descriptionSummary: 'Global online program focused on bringing new contributors into open source software development. Stipends awarded for successfully completing coding milestones.',
    stipendOrPrize: '$3,000 Stipend'
  },
  {
    id: 'opp-2',
    title: 'Smart India Hackathon (SIH) - College Internal Round',
    provider: 'Ministry of Education & AICTE',
    type: 'Hackathon',
    link: 'https://sih.gov.in',
    deadline: '2026-12-15',
    location: 'Bangalore / Nationwide Grand Finale',
    requiredSkills: ['AI / ML', 'Mobile / Web Dev', 'IoT', 'System Design'],
    descriptionSummary: 'National initiative to provide students with a platform to solve real pressing problems faced by ministries, departments, and leading industries.',
    stipendOrPrize: 'INR 1,00,000 / Problem Statement'
  },
  {
    id: 'opp-3',
    title: 'Amazon WOW - 2027 Software Development Intern',
    provider: 'Amazon India',
    type: 'Internship',
    link: 'https://amazon.jobs',
    deadline: '2026-11-30',
    location: 'Bangalore / Hyderabad / Chennai',
    requiredSkills: ['Data Structures', 'Algorithms', 'Java / C++', 'OOPs'],
    descriptionSummary: 'Dedicated diversity and talent engineering mentorship initiative with direct assessment pathways into 6-month and 2-month summer internship roles.',
    stipendOrPrize: 'INR 1,10,000 / month'
  },
  {
    id: 'opp-4',
    title: 'Flipkart GRiD 7.0 - Robotics & AI Challenge',
    provider: 'Flipkart & Unstop',
    type: 'Competition',
    link: 'https://unstop.com/competitions/flipkart-grid',
    deadline: '2027-01-20',
    location: 'Bangalore (Finals)',
    requiredSkills: ['Computer Vision', 'Deep Learning', 'PyTorch', 'Automation'],
    descriptionSummary: 'Flagship engineering campus challenge inviting top engineering colleges across India to solve high-scale e-commerce logistics and intelligence problems.',
    stipendOrPrize: 'INR 5,00,000 Prize Pool + PPI'
  }
];
