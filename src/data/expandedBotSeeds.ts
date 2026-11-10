import { BANGALORE_COMPANIES } from './companies';
import { BANGALORE_COLLEGE_DOMAINS } from './colleges';
import { InterviewFeedback, Difficulty, RoundNumber } from '../types';

// Company Archetype Definitions
type ArchetypeKey = 
  | 'faang_product' 
  | 'fintech_payments' 
  | 'quant_investment' 
  | 'semiconductor_vlsi' 
  | 'cloud_enterprise_saas' 
  | 'consumer_ecommerce' 
  | 'automotive_iot' 
  | 'it_services' 
  | 'consulting_analytics';

interface ArchetypeConfig {
  key: ArchetypeKey;
  roles: string[];
  difficultyDist: { Easy: number; Medium: number; Hard: number };
  baseStyles: {
    2024: { tech: number; ai: number; apt: number };
    2025: { tech: number; ai: number; apt: number };
    2026: { tech: number; ai: number; apt: number };
  };
  topicPool: string[];
  techQuestionTemplates: string[];
  hrQuestionTemplates: string[];
  juniorTipsTemplates: string[];
}

const ARCHETYPES: Record<ArchetypeKey, ArchetypeConfig> = {
  faang_product: {
    key: 'faang_product',
    roles: [
      'Software Development Engineer (SDE-1)',
      'Software Development Engineer (Core Platform)',
      'Distributed Systems SDE Intern'
    ],
    difficultyDist: { Easy: 0.05, Medium: 0.35, Hard: 0.60 },
    baseStyles: {
      2024: { tech: 78, ai: 4, apt: 18 },
      2025: { tech: 70, ai: 16, apt: 14 },
      2026: { tech: 62, ai: 26, apt: 12 }
    },
    topicPool: [
      'Arrays, Strings & HashMaps',
      'Dynamic Programming & Recursion',
      'Trees, Binary Search Trees & Heaps',
      'Graphs, BFS/DFS & Shortest Path',
      'High-Level System Design (HLD / Microservices / Scalability)',
      'Low-Level System Design (LLD / Design Patterns)',
      'System Caching & Message Queues (Redis, RabbitMQ, Kafka)',
      'Tries & Segment Trees',
      'Operating Systems (Process Scheduling, Threading, Deadlocks)',
      'Database Management Systems (DBMS / ACID Properties)'
    ],
    techQuestionTemplates: [
      'Design a distributed rate limiter supporting 500k RPS with sliding window counter; solve LeetCode Hard Alien Dictionary using Topological Sort.',
      'Binary Tree Maximum Path Sum with tricky negative values; Followed by low-level design of an in-memory Pub-Sub broker.',
      'Given an array of strings, group anagrams in O(N*K) time, then optimize LRU Cache eviction with doubly linked lists and concurrency locks.',
      'Median of Two Sorted Arrays in O(log(min(N,M))) logarithmic time, followed by designing high-throughput URL shortening service with Redis cluster.'
    ],
    hrQuestionTemplates: [
      'Tell me about a technical disagreement you had with a team member during your major capstone project and how you achieved resolution.',
      'Explain a time when you took full ownership of an edge-case production bug during an internship or hackathon.',
      'Why our engineering team over other product firms? Describe how you prioritize fast delivery vs code maintainability under deadlines.'
    ],
    juniorTipsTemplates: [
      'Master Graph BFS/DFS cycle detection and dynamic programming state transitions. Always speak your thought process aloud before writing code.',
      'Focus heavily on time and space complexity trade-offs. The interviewers care much more about your edge-case analysis than memorized syntax.',
      'Prepare 2-3 deep real-world project stories focusing on technical challenges, latency bottlenecks, and trade-offs made.'
    ]
  },

  fintech_payments: {
    key: 'fintech_payments',
    roles: [
      'Backend Engineer (Payments & Settlements)',
      'Software Engineer - Core Fintech Infrastructure',
      'Platform Reliability Engineer'
    ],
    difficultyDist: { Easy: 0.05, Medium: 0.45, Hard: 0.50 },
    baseStyles: {
      2024: { tech: 72, ai: 5, apt: 23 },
      2025: { tech: 66, ai: 15, apt: 19 },
      2026: { tech: 58, ai: 26, apt: 16 }
    },
    topicPool: [
      'Database Management Systems (DBMS / ACID Properties)',
      'SQL Queries, Indexing & Joins',
      'System Caching & Message Queues (Redis, RabbitMQ, Kafka)',
      'Low-Level System Design (LLD / Design Patterns)',
      'RESTful APIs, WebSockets & GraphQL',
      'Operating Systems (Process Scheduling, Threading, Deadlocks)',
      'Web Security (JWT, OAuth, CORS, XSS, CSRF)',
      'Arrays, Strings & HashMaps',
      'Unit Testing, Mocking & Test-Driven Development (TDD)'
    ],
    techQuestionTemplates: [
      'Explain two-phase commit (2PC) and idempotency keys in financial payment webhooks; Implement double-entry ledger database schema with PostgreSQL locks.',
      'Design a resilient wallet transfer API handling concurrent duplicate debit requests without balance corruption; LeetCode 3Sum and Coin Change.',
      'Explain Kafka partitions, consumer group rebalancing, and exactly-once delivery semantics in high-velocity ledger processing.',
      'Write optimized SQL query with window functions to detect anomalous transaction bursts within 5-minute rolling windows.'
    ],
    hrQuestionTemplates: [
      'How do you approach zero-downtime reliability when handling sensitive user financial data?',
      'Describe a situation where a minor oversight could lead to monetary loss and how you implemented defensive guardrails.',
      'Why do you want to build high-scale financial infrastructure in Bangalore?'
    ],
    juniorTipsTemplates: [
      'Understand ACID isolation levels (Read Committed vs Serializable) and optimistic vs pessimistic locking inside and out.',
      'Practice designing payment APIs with idempotency keys and exponential backoff retry mechanisms.',
      'Be ready to explain how Redis distributed locks (Redlock) operate under network partition scenarios.'
    ]
  },

  quant_investment: {
    key: 'quant_investment',
    roles: [
      'Quantitative Developer (Analyst)',
      'Software Engineering Analyst (Core Banking)',
      'Risk & Valuation Technology Associate'
    ],
    difficultyDist: { Easy: 0.05, Medium: 0.40, Hard: 0.55 },
    baseStyles: {
      2024: { tech: 54, ai: 4, apt: 42 },
      2025: { tech: 50, ai: 12, apt: 38 },
      2026: { tech: 46, ai: 20, apt: 34 }
    },
    topicPool: [
      'Quantitative Aptitude & Mathematics',
      'Logical Reasoning & Data Interpretation',
      'Analytical Puzzles & Lateral Thinking',
      'Dynamic Programming & Recursion',
      'Arrays, Strings & HashMaps',
      'SQL Queries, Indexing & Joins',
      'Operating Systems (Process Scheduling, Threading, Deadlocks)',
      'Memory Management & Pointers (C/C++)',
      'Low-Level System Design (LLD / Design Patterns)'
    ],
    techQuestionTemplates: [
      'Probability problem: What is the expected number of coin flips to get 3 consecutive heads? Then solve LeetCode Trapping Rain Water.',
      'Implement an order matching engine (limit orders & market orders) in C++/Java with min-heap and hash maps; Analyze lock-free queues.',
      'Matrix multiplication optimization and cache locality; LeetCode Hard Minimum Window Substring with custom frequency map.',
      'Given an infinite stream of numbers, find running median with dual heaps; Explain virtual memory, page faults, and TLB cache.'
    ],
    hrQuestionTemplates: [
      'Why quantitative finance technology instead of typical consumer app companies?',
      'Walk us through how you handle high-stress situations when trading algorithms face unexpected market anomalies.',
      'Describe your experience analyzing complex statistical data sets during coursework.'
    ],
    juniorTipsTemplates: [
      'Brush up on classic probability puzzles (Monty Hall, Bayes Theorem, geometric distributions) alongside LeetCode DP and Heaps.',
      'Be prepared to code in C++ or Java with zero reliance on IDE autocompletion. Understand cache line invalidation and memory alignment.',
      'Show strong mental math and explain your quantitative reasoning step-by-step.'
    ]
  },

  semiconductor_vlsi: {
    key: 'semiconductor_vlsi',
    roles: [
      'Silicon Design Engineer (RTL / Verification)',
      'Embedded Software Engineer (Firmware & BSP)',
      'System Software Engineer (Kernel & CUDA)'
    ],
    difficultyDist: { Easy: 0.05, Medium: 0.30, Hard: 0.65 },
    baseStyles: {
      2024: { tech: 80, ai: 4, apt: 16 },
      2025: { tech: 74, ai: 14, apt: 12 },
      2026: { tech: 68, ai: 22, apt: 10 }
    },
    topicPool: [
      'Memory Management & Pointers (C/C++)',
      'Operating Systems (Process Scheduling, Threading, Deadlocks)',
      'Code Output Prediction & Tracing',
      'Arrays, Strings & HashMaps',
      'Sorting, Searching & Two-Pointers',
      'Linux Shell Scripting & Command Line Tools',
      'Analytical Puzzles & Lateral Thinking',
      'Unit Testing, Mocking & Test-Driven Development (TDD)'
    ],
    techQuestionTemplates: [
      'Write a thread-safe lock-free ring buffer in C using volatile pointers and memory barriers; Explain cache coherence (MESI vs MOESI).',
      'Implement your own custom malloc() and free() functions managing fragmented memory blocks; Bit manipulation to swap odd and even bits.',
      'Explain interrupt service routines (ISR), interrupt latency, and DMA controller operations in multi-core ARM SoC.',
      'Reverse bits of a 32-bit unsigned integer using bitwise operations; Explain TLB misses, page table walks, and MMU virtualization.'
    ],
    hrQuestionTemplates: [
      'What excites you about the hardware-software boundary and silicon tape-outs?',
      'How do you debug obscure memory corruption or race conditions that only happen once every 10,000 runs?',
      'Explain an academic project where you worked directly with microcontrollers, FPGA, or kernel device drivers.'
    ],
    juniorTipsTemplates: [
      'Revise C pointers, struct padding, volatile keyword, and memory-mapped I/O registers thoroughly.',
      'Practice bit manipulation problems on LeetCode and understand digital electronics basics (setup and hold times).',
      'Be clear on Linux process memory layout (text, data, BSS, heap, stack).'
    ]
  },

  cloud_enterprise_saas: {
    key: 'cloud_enterprise_saas',
    roles: [
      'Associate Cloud Infrastructure Engineer',
      'Enterprise Software Engineer (Java / Golang)',
      'Site Reliability Engineer (SRE)'
    ],
    difficultyDist: { Easy: 0.10, Medium: 0.50, Hard: 0.40 },
    baseStyles: {
      2024: { tech: 68, ai: 6, apt: 26 },
      2025: { tech: 62, ai: 18, apt: 20 },
      2026: { tech: 54, ai: 28, apt: 18 }
    },
    topicPool: [
      'Computer Networks (TCP/IP, HTTP/S, DNS, OSI Model)',
      'Cloud Computing Services (AWS, GCP, Azure, Firebase)',
      'Docker, Containers & Kubernetes',
      'Linux Shell Scripting & Command Line Tools',
      'NoSQL Databases (MongoDB, Redis, Firestore)',
      'RESTful APIs, WebSockets & GraphQL',
      'Web Security (JWT, OAuth, CORS, XSS, CSRF)',
      'High-Level System Design (HLD / Microservices / Scalability)',
      'Database Management Systems (DBMS / ACID Properties)'
    ],
    techQuestionTemplates: [
      'Explain what happens under the hood when typing https://company.com in browser; Followed by designing multi-tenant SaaS DB schema.',
      'Implement consistent hashing ring with virtual nodes in Java/Go; LeetCode Network Delay Time using Dijkstra algorithm.',
      'Explain TCP three-way handshake, TCP slow start, and difference between HTTP/2 multiplexing vs HTTP/3 over QUIC.',
      'Container isolation: Explain Linux cgroups and namespaces; Write bash script to parse access logs and count unique 5xx errors.'
    ],
    hrQuestionTemplates: [
      'Describe how you approach enterprise client SLA guarantees and incident post-mortems.',
      'How do you keep up with the fast-evolving cloud native landscape (Kubernetes, Envoy, OpenTelemetry)?',
      'Tell us about a time you collaborated across distributed timezones on an open-source or campus project.'
    ],
    juniorTipsTemplates: [
      'Computer Networks (DNS, TCP, TLS, Reverse Proxies) is heavily tested. Review Kurose & Ross networking chapters.',
      'Understand Docker container lifecycle and basic Kubernetes concepts (Pods, Deployments, Services, Ingress).',
      'Be confident discussing RESTful API design conventions, status codes, and security best practices.'
    ]
  },

  consumer_ecommerce: {
    key: 'consumer_ecommerce',
    roles: [
      'Software Engineer (Mobile & Web Full Stack)',
      'SDE-1 (Order & Dispatch Systems)',
      'Growth & Search SDE'
    ],
    difficultyDist: { Easy: 0.10, Medium: 0.45, Hard: 0.45 },
    baseStyles: {
      2024: { tech: 66, ai: 8, apt: 26 },
      2025: { tech: 60, ai: 20, apt: 20 },
      2026: { tech: 52, ai: 30, apt: 18 }
    },
    topicPool: [
      'RESTful APIs, WebSockets & GraphQL',
      'System Caching & Message Queues (Redis, RabbitMQ, Kafka)',
      'Frontend Frameworks (React, Vue, Angular)',
      'Backend Development (Node.js, Express, Flask, Django, Spring Boot)',
      'Arrays, Strings & HashMaps',
      'Low-Level System Design (LLD / Design Patterns)',
      'High-Level System Design (HLD / Microservices / Scalability)',
      'SQL Queries, Indexing & Joins',
      'NoSQL Databases (MongoDB, Redis, Firestore)'
    ],
    techQuestionTemplates: [
      'Design flash sale checkout system handling 100k users competing for 500 mobile phones; Redis stock decrement with Lua script.',
      'LeetCode Course Schedule (Topological sort BFS), then design high-concurrency food delivery tracking with WebSockets.',
      'Explain database indexing (B+ Tree vs Hash Index); How would you shard an orders database across multiple geographical regions?',
      'Implement debounce and throttle in JavaScript/TypeScript from scratch, then solve LeetCode Longest Substring Without Repeating Characters.'
    ],
    hrQuestionTemplates: [
      'Why consumer tech? How would you improve user conversion rates in our mobile application?',
      'Tell me about an instance when you had to ship a feature rapidly while balancing technical debt.',
      'Describe your favorite product app and how you would re-architect one of its slow features.'
    ],
    juniorTipsTemplates: [
      'Learn how Redis caching patterns (Cache-Aside, Write-Through) work alongside message queues like Kafka and RabbitMQ.',
      'Be prepared to design real-time systems using WebSockets or Server-Sent Events (SSE).',
      'Practice standard LeetCode Mediums on Two Pointers, Sliding Window, and BFS/DFS.'
    ]
  },

  automotive_iot: {
    key: 'automotive_iot',
    roles: [
      'Software Engineer (ADAS & Connected Vehicle)',
      'Embedded C++ R&D Engineer',
      'Industrial IoT Systems Developer'
    ],
    difficultyDist: { Easy: 0.10, Medium: 0.55, Hard: 0.35 },
    baseStyles: {
      2024: { tech: 70, ai: 6, apt: 24 },
      2025: { tech: 64, ai: 16, apt: 20 },
      2026: { tech: 56, ai: 26, apt: 18 }
    },
    topicPool: [
      'Memory Management & Pointers (C/C++)',
      'Operating Systems (Process Scheduling, Threading, Deadlocks)',
      'Linux Shell Scripting & Command Line Tools',
      'Computer Networks (TCP/IP, HTTP/S, DNS, OSI Model)',
      'Unit Testing, Mocking & Test-Driven Development (TDD)',
      'Object-Oriented Programming (OOPs)',
      'Code Output Prediction & Tracing',
      'Project Deep-Dive & Architecture Explanation'
    ],
    techQuestionTemplates: [
      'Explain CAN bus arbitration, baud rate synchronization, and MQTT telemetry protocol in connected car sensors.',
      'Implement real-time sensor data circular queue with producer-consumer mutex locks in modern C++ (C++17/20).',
      'Explain virtual destructors, dynamic_cast vs static_cast, and smart pointers (unique_ptr vs shared_ptr reference count).',
      'Solve LeetCode Rotten Oranges using BFS; Explain differences between hard real-time and soft real-time operating systems.'
    ],
    hrQuestionTemplates: [
      'What inspires you about the future of autonomous driving and connected automotive mobility in India?',
      'Safety and validation are paramount in automotive R&D. How do you ensure zero regression in production firmware?',
      'Tell us about a hardware or robotics project you built during college.'
    ],
    juniorTipsTemplates: [
      'Review Modern C++ features (lambdas, RAII, move semantics, smart pointers) and OS thread synchronization primitives.',
      'Understand communication protocols (CAN, SPI, I2C, MQTT) and real-time scheduling algorithms (Rate Monotonic, EDF).',
      'Be ready to explain every single project listed on your resume in depth.'
    ]
  },

  it_services: {
    key: 'it_services',
    roles: [
      'Associate Software Engineer',
      'Graduate Systems Engineer',
      'Junior Technology Consultant'
    ],
    difficultyDist: { Easy: 0.30, Medium: 0.60, Hard: 0.10 },
    baseStyles: {
      2024: { tech: 46, ai: 4, apt: 50 },
      2025: { tech: 42, ai: 16, apt: 42 },
      2026: { tech: 38, ai: 28, apt: 34 }
    },
    topicPool: [
      'Quantitative Aptitude & Mathematics',
      'Logical Reasoning & Data Interpretation',
      'Verbal Ability & Technical Communication',
      'Object-Oriented Programming (OOPs)',
      'Database Management Systems (DBMS / ACID Properties)',
      'SQL Queries, Indexing & Joins',
      'Arrays, Strings & HashMaps',
      'Code Output Prediction & Tracing'
    ],
    techQuestionTemplates: [
      'Explain the 4 pillars of OOPs with real-world examples in Java/Python; Write SQL query to find 2nd highest salary using subquery.',
      'Check if a string is palindrome or anagram; Explain primary key vs unique key and normalization (1NF, 2NF, 3NF).',
      'Explain method overloading vs method overriding; Write code to reverse a singly linked list.',
      'Difference between Abstract Class and Interface in Java 8; Predict code output of static variable blocks and constructor chaining.'
    ],
    hrQuestionTemplates: [
      'Are you open to relocating to any branch location across India and working flexible project shifts?',
      'Why choose our IT services global organization for starting your engineering career?',
      'How do you quickly learn a completely new enterprise programming language or framework?'
    ],
    juniorTipsTemplates: [
      'Practice quantitative aptitude and logical puzzles regularly. The online assessment cutoff is heavily aptitude-dependent.',
      'Be crystal clear on Java OOPs (Inheritance, Polymorphism, Abstraction, Encapsulation) and basic SQL join queries.',
      'Speak politely and confidently during the HR interview; communication skills are evaluated closely.'
    ]
  },

  consulting_analytics: {
    key: 'consulting_analytics',
    roles: [
      'Technology Consultant Analyst',
      'Data Science & Analytics Associate',
      'Business Technology Solutions Trainee'
    ],
    difficultyDist: { Easy: 0.15, Medium: 0.55, Hard: 0.30 },
    baseStyles: {
      2024: { tech: 48, ai: 10, apt: 42 },
      2025: { tech: 42, ai: 22, apt: 36 },
      2026: { tech: 36, ai: 34, apt: 30 }
    },
    topicPool: [
      'Case Study & Business Problem Solving',
      'Analytical Puzzles & Lateral Thinking',
      'Machine Learning Basics (Regression, Classification, Clustering)',
      'SQL Queries, Indexing & Joins',
      'Quantitative Aptitude & Mathematics',
      'Verbal Ability & Technical Communication',
      'System Trade-offs & Engineering Decision Making',
      'Big Data Pipelines (Spark, Hadoop, PySpark)'
    ],
    techQuestionTemplates: [
      'Guesstimate: Estimate the daily revenue of Bangalore Kempegowda International Airport food courts; Then analyze customer churn dataset in SQL.',
      'Explain bias-variance tradeoff in Machine Learning; Write SQL query with aggregate GROUP BY and HAVING clauses to segment high-value clients.',
      'Case study: How would you architect a digital transformation platform for a legacy retail chain moving to omni-channel delivery?',
      'Explain precision vs recall vs F1-score in imbalanced fraud detection; Solve LeetCode Merge Intervals.'
    ],
    hrQuestionTemplates: [
      'Walk us through how you communicate complex technical tradeoffs to non-technical business stakeholders.',
      'Describe a time when you managed conflicting client deadlines across two simultaneous projects.',
      'Why technology consulting rather than pure software development?'
    ],
    juniorTipsTemplates: [
      'Structure your case study responses using structured frameworks (MECE principle: Mutually Exclusive, Collectively Exhaustive).',
      'Practice mental arithmetic guesstimates and SQL queries involving window functions and multiple table joins.',
      'Dress sharply and maintain confident, structured technical articulation.'
    ]
  }
};

// Map each company in BANGALORE_COMPANIES to its industry archetype
function getArchetypeForCompany(company: string): ArchetypeKey {
  const c = company.toLowerCase();

  // 1. FAANG & Elite Product Tech
  if (['google', 'microsoft', 'meta', 'apple', 'amazon', 'uber', 'atlassian', 'adobe', 'linkedin', 'directi'].includes(c)) {
    return 'faang_product';
  }

  // 2. Semiconductor & VLSI Hardware
  if (['nvidia', 'qualcomm', 'intel', 'amd', 'texas instruments', 'synopsys', 'cadence design systems', 'micron technology', 'microchip technology', 'analog devices', 'applied materials'].includes(c)) {
    return 'semiconductor_vlsi';
  }

  // 3. Quant & Global Investment Banks
  if (['goldman sachs', 'morgan stanley', 'jpmorgan chase', 'deutsche bank', 'wells fargo', 'hsbc', 'societe generale'].includes(c)) {
    return 'quant_investment';
  }

  // 4. Fast Fintech & Payment Gateways
  if (['razorpay', 'cred', 'phonepe', 'paytm', 'paypal', 'zeta', 'kreditbee', 'ripple', 'experian', 'acko'].includes(c)) {
    return 'fintech_payments';
  }

  // 5. Consumer Apps, Hyperlocal E-Commerce & Gaming
  if (['flipkart', 'swiggy', 'zomato', 'meesho', 'urban company', 'dream11', 'games24x7', 'inmobi', 'target', 'tesco', 'walmart global tech', 'dmart', 'hackerrank', 'apollo 24|7'].includes(c)) {
    return 'consumer_ecommerce';
  }

  // 6. Automotive R&D & Smart Energy
  if (['mercedes-benz r&d india', 'bosch', 'siemens', 'schneider electric', 'honeywell', 'nokia', 'reliance', 'jio'].includes(c)) {
    return 'automotive_iot';
  }

  // 7. IT Services & Global Solutions
  if (['tata consultancy services (tcs)', 'infosys', 'wipro', 'accenture', 'cognizant', 'capgemini', 'lti mindtree', 'hcltech', 'amdocs'].includes(c)) {
    return 'it_services';
  }

  // 8. Management Consulting & Data Analytics
  if (['mckinsey & company', 'boston consulting group', 'deloitte', 'ernst & young (ey)', 'pwc', 'kpmg', 'fractal analytics', 'mu sigma', "byju's", 'thoughtworks'].includes(c)) {
    return 'consulting_analytics';
  }

  // 9. Cloud Infrastructure, Enterprise SaaS & Enterprise Tech (Default for all remaining tech giants)
  return 'cloud_enterprise_saas';
}

// Helper: Slugify company name for pristine document IDs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Generate exactly 11 distinct interview rounds for each company
function generateFeedbacksForCompany(company: string, compIndex: number): InterviewFeedback[] {
  const archetypeKey = getArchetypeForCompany(company);
  const arch = ARCHETYPES[archetypeKey];
  const companySlug = slugify(company);

  const collegePool = BANGALORE_COLLEGE_DOMAINS;
  const entries: InterviewFeedback[] = [];

  // 11 distinct interview feedback rounds per company
  // 2 x Round 1 (Online Assessment)
  // 3 x Round 2 (Technical Round 1)
  // 3 x Round 3 (Technical Round 2 / System Design)
  // 2 x Round 4 (HR / Behavioral)
  // 1 x Round 5 (Bar Raiser / Final Composite)
  const roundPlan: { round: RoundNumber; year: number; duration: number }[] = [
    { round: 1, year: 2024, duration: 90 },
    { round: 1, year: 2025, duration: 90 },
    { round: 2, year: 2024, duration: 60 },
    { round: 2, year: 2025, duration: 60 },
    { round: 2, year: 2026, duration: 60 },
    { round: 3, year: 2024, duration: 60 },
    { round: 3, year: 2025, duration: 75 },
    { round: 3, year: 2026, duration: 60 },
    { round: 4, year: 2025, duration: 45 },
    { round: 4, year: 2026, duration: 45 },
    { round: 5, year: 2026, duration: 60 }
  ];

  roundPlan.forEach((plan, i) => {
    // Unique deterministic ID matching Firestore regex rules: ^[a-zA-Z0-9._\-]+$
    const id = `bot-${companySlug}-r${plan.round}-${i + 1}`;

    // Select role deterministically
    const role = arch.roles[(compIndex + i) % arch.roles.length];

    // Select college domain deterministically
    const collegeDomain = collegePool[(compIndex * 7 + i * 3) % collegePool.length];

    // Select overall difficulty
    let overallDifficulty: Difficulty = 'Medium';
    if (plan.round === 1) {
      overallDifficulty = arch.difficultyDist.Hard > 0.4 ? 'Hard' : 'Medium';
    } else if (plan.round === 2 || plan.round === 3) {
      overallDifficulty = (i % 2 === 0) ? (arch.difficultyDist.Hard > 0.3 ? 'Hard' : 'Medium') : 'Medium';
    } else if (plan.round === 4) {
      overallDifficulty = arch.difficultyDist.Easy > 0.2 ? 'Easy' : 'Medium';
    } else if (plan.round === 5) {
      overallDifficulty = 'Hard';
    }

    // Question Style Percentages (Tech, AI, Aptitude totaling exactly 100%)
    const yearKey = plan.year as 2024 | 2025 | 2026;
    const baseStyle = arch.baseStyles[yearKey];

    // Slight deterministic variance per round
    let techPercent = baseStyle.tech;
    let aiPercent = baseStyle.ai;
    let aptitudePercent = baseStyle.apt;

    if (plan.round === 1) {
      // OA usually has higher aptitude / coding problem solving
      aptitudePercent = Math.min(60, baseStyle.apt + 10);
      techPercent = 100 - aptitudePercent - aiPercent;
    } else if (plan.round === 4) {
      // HR round has higher behavioral / aptitude evaluation
      aptitudePercent = Math.min(50, baseStyle.apt + 20);
      techPercent = 100 - aptitudePercent - aiPercent;
    }

    // Ensure sum is exactly 100
    const currentSum = techPercent + aiPercent + aptitudePercent;
    if (currentSum !== 100) {
      techPercent += (100 - currentSum);
    }

    // Panel Types
    let panelTypes: string[];
    if (plan.round === 1) {
      panelTypes = ['Technical Lead / Manager'];
    } else if (plan.round === 2) {
      panelTypes = ['Senior Developer / Peer', 'College Alumni'];
    } else if (plan.round === 3) {
      panelTypes = ['Technical Lead / Manager', 'Senior Developer / Peer'];
    } else if (plan.round === 4) {
      panelTypes = ['HR / Talent Acquisition'];
    } else {
      panelTypes = ['Executive / Founder', 'Technical Lead / Manager'];
    }

    // Topics tested: pick 3 to 6 distinct topics from the archetype's pool
    const topicPoolLen = arch.topicPool.length;
    const startIndex = (compIndex * 2 + i * 3) % topicPoolLen;
    const topicCount = 3 + (i % 3); // 3, 4, or 5 topics
    const topicsTested: string[] = [];
    for (let t = 0; t < topicCount; t++) {
      const top = arch.topicPool[(startIndex + t) % topicPoolLen];
      if (!topicsTested.includes(top)) {
        topicsTested.push(top);
      }
    }

    // Question & Tips texts tailored to company
    const techQuestion = arch.techQuestionTemplates[(compIndex + i) % arch.techQuestionTemplates.length]
      .replace('company.com', `${companySlug}.com`);
    const hrQuestion = arch.hrQuestionTemplates[(compIndex + i) % arch.hrQuestionTemplates.length];
    const juniorTips = `${arch.juniorTipsTemplates[(compIndex + i) % arch.juniorTipsTemplates.length]} Note for ${company}: research their engineering culture and recent tech stack announcements.`;

    // Timestamp creation
    const month = ((compIndex + i) % 12) + 1;
    const day = ((compIndex * 3 + i * 5) % 27) + 1;
    const pad = (n: number) => n.toString().padStart(2, '0');
    const submittedAt = `${plan.year}-${pad(month)}-${pad(day)}T10:30:00.000Z`;

    entries.push({
      id,
      feedbackType: 'bot',
      company,
      role,
      round: plan.round,
      durationMinutes: plan.duration,
      overallDifficulty,
      panelTypes,
      questionStyles: {
        techPercent,
        techDifficulty: overallDifficulty,
        aiPercent,
        aiDifficulty: overallDifficulty,
        aptitudePercent,
        aptitudeDifficulty: overallDifficulty,
        dsa: techPercent,
        systemDesign: aiPercent,
        behavioral: aptitudePercent
      },
      topicsTested,
      technicalQuestions: techQuestion,
      hrQuestions: hrQuestion,
      juniorTips,
      submittedAt,
      collegeDomain,
      userEmail: `student.${companySlug}@${collegeDomain}`,
      submittedByUid: `bot-uid-${companySlug}-${i + 1}`,
      authorUid: `bot-uid-${companySlug}-${i + 1}`,
      year: plan.year
    });
  });

  return entries;
}

// Generate the master BOT_SEED_FEEDBACKS dataset covering all 105 Bangalore companies
export const BOT_SEED_FEEDBACKS: InterviewFeedback[] = BANGALORE_COMPANIES.flatMap((company, idx) => 
  generateFeedbacksForCompany(company, idx)
);

console.log(`[GradFlow] Generated ${BOT_SEED_FEEDBACKS.length} authentic bot interview feedbacks across all ${BANGALORE_COMPANIES.length} companies.`);
