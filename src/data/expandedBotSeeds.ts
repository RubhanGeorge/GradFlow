import { InterviewFeedback } from '../types';

export const TARGET_20_COMPANIES = [
  'Amazon',
  'Goldman Sachs',
  'Swiggy',
  'Cred',
  'Razorpay',
  'Infosys',
  'Accenture',
  'TCS',
  'Wipro',
  'Google',
  'Microsoft',
  'Walmart',
  'Cisco',
  'Oracle',
  'Flipkart',
  'Adobe',
  'PhonePe',
  'Atlassian',
  'Intuit',
  'SAP Labs'
] as const;

interface CompanyTemplate {
  company: string;
  roles: string[];
  collegePool: string[];
  entries: {
    round: 1 | 2 | 3 | 4 | 5;
    role: string;
    durationMinutes: number;
    overallDifficulty: 'Easy' | 'Medium' | 'Hard';
    panelTypes: string[];
    dsa: number;
    systemDesign: number;
    behavioral: number;
    topics: string[];
    technicalQuestions: string;
    hrQuestions: string;
    juniorTips: string;
  }[];
}

const TEMPLATES: CompanyTemplate[] = [
  {
    company: 'Amazon',
    roles: ['Software Development Engineer (SDE-1)', 'Systems Engineer', 'Cloud Developer'],
    collegePool: ['cmrit.ac.in', 'rvce.edu.in', 'bmsce.ac.in', 'pes.edu', 'msrit.edu'],
    entries: [
      {
        round: 1,
        role: 'Software Development Engineer (SDE-1)',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 80,
        systemDesign: 0,
        behavioral: 20,
        topics: ['Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion'],
        technicalQuestions: 'Q1: Substring with concatenation of all words. Q2: Rotten Oranges BFS grid traversal with multi-source queue optimization. Debugging round: 7 buggy C++/Java snippets.',
        hrQuestions: 'Amazon Work Style Assessment: Evaluated against Customer Obsession and Bias for Action principles.',
        juniorTips: 'Time management is key during the OA. The test auto-submits; finish the 2 coding questions within 65 minutes to save time for behavioral.'
      },
      {
        round: 2,
        role: 'Software Development Engineer (SDE-1)',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager', 'Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Design and code a Trie-based Autocomplete system with frequency ranking. Asked to optimize memory using ternary search trees.',
        hrQuestions: 'Tell me about a time you made a decision without having all the information (Bias for Action).',
        juniorTips: 'Interviewer wrote dry-run test cases with edge conditions (empty string, unicode, scale). Never jump to coding before verifying edge inputs.'
      },
      {
        round: 3,
        role: 'Software Development Engineer (SDE-1)',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 60,
        systemDesign: 30,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'Graphs, BFS/DFS & Shortest Path', 'High Throughput Concurrency'],
        technicalQuestions: 'Design a distributed rate limiter supporting Token Bucket and Leaky Bucket algorithms with Redis cluster keys.',
        hrQuestions: 'Describe a situation where you had an unpopular opinion and how you convinced your peers (Have Backbone; Disagree and Commit).',
        juniorTips: 'Draw clean class diagrams first. Explicitly discuss race conditions, mutex locks, and network latency.'
      },
      {
        round: 4,
        role: 'Software Development Engineer (SDE-1)',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['HR / Talent Acquisition', 'Technical Lead / Manager'],
        dsa: 30,
        systemDesign: 20,
        behavioral: 50,
        topics: ['System Architecture Trade-offs', 'Engineering Ethics & Teamwork'],
        technicalQuestions: 'High level walkthrough of your final-year capstone project architecture, database schema, and failure modes.',
        hrQuestions: 'Detailed STAR format questions on 4 Leadership Principles: Deliver Results, Dive Deep, Earn Trust, and Ownership.',
        juniorTips: 'Prepare at least 2 distinct real stories for every single Amazon Leadership Principle.'
      },
      {
        round: 5,
        role: 'Software Development Engineer (SDE-1)',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Executive / Founder', 'Technical Lead / Manager'],
        dsa: 50,
        systemDesign: 30,
        behavioral: 20,
        topics: ['Dynamic Programming & Recursion', 'System Architecture & LLD', 'Distributed Caching & Redis'],
        technicalQuestions: 'Bar Raiser Round: Alien Dictionary topological sorting followed by designing a cache eviction protocol with sub-millisecond guarantees.',
        hrQuestions: 'What is the biggest technical failure you have experienced and how did you remediate it?',
        juniorTips: 'Bar Raisers assess your reasoning under stress. If your first solution is challenged, evaluate the trade-offs calmly.'
      },
      {
        round: 2,
        role: 'Cloud Developer',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 50,
        systemDesign: 35,
        behavioral: 15,
        topics: ['Linux & Shell Scripting', 'RESTful APIs, WebSockets & GraphQL', 'Docker & Containerization'],
        technicalQuestions: 'Explain how Linux epoll handles 100k concurrent file descriptors versus select/poll. Write a bash script to monitor memory leaks.',
        hrQuestions: 'Why do you want to specialize in AWS Cloud Infrastructure?',
        juniorTips: 'Solidify OS fundamentals, TCP/IP handshake, and HTTP/2 multiplexing.'
      }
    ]
  },
  {
    company: 'Goldman Sachs',
    roles: ['Technology Analyst', 'Associate Software Engineer', 'Quant Developer'],
    collegePool: ['rvce.edu.in', 'pes.edu', 'bmsce.ac.in', 'iiitb.ac.in', 'cmrit.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Technology Analyst',
        durationMinutes: 105,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 40,
        systemDesign: 10,
        behavioral: 50,
        topics: ['Quantitative Aptitude & Mathematics', 'Arrays, Strings & HashMaps', 'Analytical Puzzles & Lateral Thinking'],
        technicalQuestions: 'OA had 2 coding problems (0/1 Knapsack variation and Tree Diameter) plus 20 advanced quantitative questions on Bayes Theorem and Markov Chains.',
        hrQuestions: 'Goldman culture scenario: Prioritizing between risk management and trade execution velocity.',
        juniorTips: 'The math section has negative marking! Skip questions if not 100% sure. Speed and precision determine the cutoff.'
      },
      {
        round: 2,
        role: 'Technology Analyst',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 70,
        systemDesign: 15,
        behavioral: 15,
        topics: ['Dynamic Programming & Recursion', 'Trees, Binary Search Trees & Heaps', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Implement Median in a running data stream with two heaps. Follow-up: Implement Trapping Rain Water in 2D grid.',
        hrQuestions: 'Why Goldman Sachs over pure consumer technology product firms?',
        juniorTips: 'Explain time complexity for both space and auxiliary stack frames. Interviewer was very analytical.'
      },
      {
        round: 3,
        role: 'Technology Analyst',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 60,
        systemDesign: 25,
        behavioral: 15,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'SQL Queries, Indexing & Joins', 'High Throughput Concurrency'],
        technicalQuestions: 'Design an in-memory Order Book matching engine supporting market and limit orders with multithreading synchronization.',
        hrQuestions: 'How do you handle high pressure when production transactions are failing?',
        juniorTips: 'Know Java/C++ memory models, volatile variables, and atomic operations inside out.'
      },
      {
        round: 4,
        role: 'Technology Analyst',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['College Alumni', 'Technical Lead / Manager'],
        dsa: 30,
        systemDesign: 20,
        behavioral: 50,
        topics: ['Logical Reasoning & Puzzles', 'Probability & Combinatorics'],
        technicalQuestions: 'Puzzles: 25 horses racing on 5 tracks; Poisoned wine bottles with 10 testing prisoners. Graph representation of currency arbitrage.',
        hrQuestions: 'Walk me through your resume projects and personal interest in financial markets.',
        juniorTips: 'Be ready for classic math puzzles. State your initial assumptions clearly before proposing the final solution.'
      },
      {
        round: 5,
        role: 'Technology Analyst',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder'],
        dsa: 20,
        systemDesign: 30,
        behavioral: 50,
        topics: ['Engineering Ethics & Teamwork', 'System Trade-offs & Engineering Decision Making'],
        technicalQuestions: 'Managing Director round: Reviewing macro architecture of low latency trading gateways and distributed clock synchronization (NTP/PTP).',
        hrQuestions: 'Where do you see yourself in 3 years at the Bangalore technology center?',
        juniorTips: 'Be crisp, professional, and showcase genuine curiosity about distributed financial ledgers.'
      }
    ]
  },
  {
    company: 'Swiggy',
    roles: ['Backend Developer', 'Frontend SDE-1', 'Full Stack Engineer'],
    collegePool: ['cmrit.ac.in', 'pes.edu', 'dsce.edu.in', 'msrit.edu', 'rnsit.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Backend Developer',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Arrays, Strings & HashMaps', 'Graphs, BFS/DFS & Shortest Path', 'SQL Queries, Indexing & Joins'],
        technicalQuestions: 'HackerEarth OA: Q1: Shortest Path in a weighted grid with obstacles (Dijkstra variation). Q2: SQL query to find 3rd highest spending customer per zone using window functions.',
        hrQuestions: 'Basic aptitude questions and behavioral questions on ownership.',
        juniorTips: 'Practice SQL window functions like DENSE_RANK() and PARTITION BY; Swiggy tests database query capability heavily.'
      },
      {
        round: 2,
        role: 'Backend Developer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 65,
        systemDesign: 25,
        behavioral: 10,
        topics: ['Dynamic Programming & Recursion', 'System Caching & Message Queues (Redis, RabbitMQ, Kafka)', 'RESTful APIs, WebSockets & GraphQL'],
        technicalQuestions: 'Live coding: Design a food delivery ETA calculator considering delivery partner velocity, traffic multipliers, and kitchen prep queues.',
        hrQuestions: 'What was the toughest bug you tracked down in your college projects?',
        juniorTips: 'Discuss Redis caching strategies and Cache stampede mitigation using distributed locks.'
      },
      {
        round: 3,
        role: 'Backend Developer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 35,
        systemDesign: 50,
        behavioral: 15,
        topics: ['High-Level System Design (HLD / Microservices / Scalability)', 'Database Indexing & SQL', 'High Throughput Concurrency'],
        technicalQuestions: 'Design real-time live location tracking of 50,000 active delivery executives with sub-second battery-friendly mobile updates.',
        hrQuestions: 'How do you prioritize between technical debt reduction and new feature requests?',
        juniorTips: 'Mention spatial indexing like Uber H3 or Geo-hashes. Interviewer was impressed when I drew the geofencing ingestion pipeline.'
      },
      {
        round: 4,
        role: 'Backend Developer',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['HR / Talent Acquisition'],
        dsa: 10,
        systemDesign: 15,
        behavioral: 75,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'High level summary of project trade-offs.',
        hrQuestions: 'Culture fit round: Swiggy values (Consumer Comes First, Always Be Curious, Display Humility).',
        juniorTips: 'Express genuine passion for consumer tech logistics and on-demand hyperlocal delivery.'
      },
      {
        round: 2,
        role: 'Frontend SDE-1',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 40,
        systemDesign: 35,
        behavioral: 25,
        topics: ['Frontend Performance Optimization', 'JavaScript Engine & Event Loop', 'RESTful APIs, WebSockets & GraphQL'],
        technicalQuestions: 'Code an infinite scrolling restaurant menu with debounced search, virtual list DOM recycling, and offline cache using IndexedDB.',
        hrQuestions: 'How do you measure Web Vitals (LCP, CLS, FID) in a real web app?',
        juniorTips: 'Master Vanilla JS closures, event bubbling, and microtask vs macrotask execution.'
      }
    ]
  },
  {
    company: 'Cred',
    roles: ['Backend SDE', 'Mobile Engineer', 'Security Analyst'],
    collegePool: ['rvce.edu.in', 'pes.edu', 'iiitb.ac.in', 'bmsce.ac.in', 'cmrit.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Backend SDE',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 80,
        systemDesign: 10,
        behavioral: 10,
        topics: ['Arrays, Strings & HashMaps', 'Dynamic Programming & Recursion', 'High Throughput Concurrency'],
        technicalQuestions: 'OA on Devpost/HackerRank: Segment Trees with lazy propagation + Coin change 2D DP matrix optimization under strict 1 second time limits.',
        hrQuestions: 'None in OA.',
        juniorTips: 'Cred code tests demand O(n log n) or O(n) solutions. Naive O(n^2) will get time-limit-exceeded on 80% of test suites.'
      },
      {
        round: 2,
        role: 'Backend SDE',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'Object-Oriented Programming (OOPs)', 'Database Management Systems (DBMS)'],
        technicalQuestions: 'Machine Coding round: Implement a full transactional credit card reward points ledger with rollback mechanisms and idempotency keys.',
        hrQuestions: 'Why do you take pride in writing clean, well-factored code?',
        juniorTips: 'Use SOLID principles, clean variable naming, and write unit test fixtures right inside the editor.'
      },
      {
        round: 3,
        role: 'Backend SDE',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 50,
        behavioral: 10,
        topics: ['High-Level System Design (HLD / Microservices / Scalability)', 'Distributed Caching & Redis', 'System Architecture Trade-offs'],
        technicalQuestions: 'Design a flash-sale credit card statement bill payment processing system that withstands 20,000 TPS spikes at midnight without double charging.',
        hrQuestions: 'Tell me about an open-source project or technology you explored on your own.',
        juniorTips: 'Focus on ACID guarantees, two-phase commits vs SAGA pattern, and dead-letter queues.'
      },
      {
        round: 4,
        role: 'Backend SDE',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder'],
        dsa: 20,
        systemDesign: 30,
        behavioral: 50,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Deep dive into an architectural bug you created in the past and the lessons learned.',
        hrQuestions: 'Cred culture fit: Radical transparency, high agency, and craftsmanship.',
        juniorTips: 'Show hunger for excellence. Cred values engineers who care deeply about typography, speed, and elegance.'
      },
      {
        round: 2,
        role: 'Mobile Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 50,
        systemDesign: 40,
        behavioral: 10,
        topics: ['Mobile App Architecture (Flutter/React Native/Native)', 'Frontend Performance Optimization'],
        technicalQuestions: 'Build a smooth 60fps card swiping carousel with physics springs and background offline synchronization.',
        hrQuestions: 'How do you minimize battery drain and network payload on low-end smartphones?',
        juniorTips: 'Cred is famous for high-polish mobile interfaces. Understand GPU rendering pipelines and thread scheduling.'
      }
    ]
  },
  {
    company: 'Razorpay',
    roles: ['Platform Engineer', 'Full Stack Engineer', 'SDE-1 Backend'],
    collegePool: ['cmrit.ac.in', 'rvce.edu.in', 'dsce.edu.in', 'msrit.edu', 'bmsit.in'],
    entries: [
      {
        round: 1,
        role: 'Platform Engineer',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 15,
        behavioral: 15,
        topics: ['Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps', 'RESTful APIs, WebSockets & GraphQL'],
        technicalQuestions: 'OA: Implement LRU Cache with TTL expiry + Graph cycle detection in payment settlement dependency graph.',
        hrQuestions: 'Explain Razorpay API payment gateway flow.',
        juniorTips: 'Understand webhook retry protocols with exponential backoff.'
      },
      {
        round: 2,
        role: 'Platform Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 65,
        systemDesign: 25,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'High Throughput Concurrency', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Machine coding: Design a multi-gateway payment router that intelligently retries payments across HDFC, ICICI, and Axis based on live bank success rates.',
        hrQuestions: 'How do you balance fast shipping with bulletproof security?',
        juniorTips: 'Write extensible code using Strategy Pattern and Observer Pattern.'
      },
      {
        round: 3,
        role: 'Platform Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 50,
        behavioral: 10,
        topics: ['High-Level System Design (HLD / Microservices / Scalability)', 'Distributed Caching & Redis', 'Database Indexing & SQL'],
        technicalQuestions: 'Design an idempotent webhook delivery engine handling 100 million webhook dispatches a day with at-least-once delivery semantics.',
        hrQuestions: 'Describe a project where you took complete end-to-end accountability.',
        juniorTips: 'Explain Kafka partitions, consumer groups, and Redis distributed deduplication.'
      },
      {
        round: 4,
        role: 'Platform Engineer',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['HR / Talent Acquisition'],
        dsa: 15,
        systemDesign: 15,
        behavioral: 70,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Reviewing compensation expectations and tech stack alignment.',
        hrQuestions: 'Why FinTech? How do you deal with ambiguity when specs are changing?',
        juniorTips: 'Highlight adaptability and strong focus on developer productivity.'
      },
      {
        round: 2,
        role: 'Full Stack Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 45,
        systemDesign: 40,
        behavioral: 15,
        topics: ['RESTful APIs, WebSockets & GraphQL', 'React, Next.js & Modern Web', 'SQL Queries, Indexing & Joins'],
        technicalQuestions: 'Build a merchant checkout dashboard with live analytics, filtering transactions by date and payment status with optimistic UI updates.',
        hrQuestions: 'How do you handle cross-origin CORS security and token authentication in SPAs?',
        juniorTips: 'Demonstrate clean state management and debounced backend queries.'
      }
    ]
  },
  {
    company: 'Google',
    roles: ['Software Engineer Campus L3', 'Associate Product Manager', 'Solutions Architect'],
    collegePool: ['iiitb.ac.in', 'iisc.ac.in', 'rvce.edu.in', 'pes.edu', 'bmsce.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Software Engineer Campus L3',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 90,
        systemDesign: 0,
        behavioral: 10,
        topics: ['Dynamic Programming & Recursion', 'Graphs, BFS/DFS & Shortest Path', 'Trees, Binary Search Trees & Heaps'],
        technicalQuestions: 'Google OA on HackerEarth: 2 problems. Problem 1: Tree rerooting DP. Problem 2: Bipartite matching with flow algorithms.',
        hrQuestions: 'None in OA.',
        juniorTips: 'Practice LeetCode Hard and Codeforces Div 2 D/E level problems. Corner cases with maximum N constraints must be accounted for.'
      },
      {
        round: 2,
        role: 'Software Engineer Campus L3',
        durationMinutes: 45,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 90,
        systemDesign: 0,
        behavioral: 10,
        topics: ['Graphs, BFS/DFS & Shortest Path', 'Arrays, Strings & HashMaps'],
        technicalQuestions: 'Technical Screen: Word Ladder 2 variant with minimum mutations and returning all paths. Follow-up: Bidirectional BFS optimization.',
        hrQuestions: 'Tell me about yourself in 2 minutes.',
        juniorTips: 'Communicate out loud before typing! Interviewers care more about your thought process than silent syntax typing.'
      },
      {
        round: 3,
        role: 'Software Engineer Campus L3',
        durationMinutes: 45,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 85,
        systemDesign: 5,
        behavioral: 10,
        topics: ['Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion'],
        technicalQuestions: 'Construct Binary Tree from ancestor matrix with missing pairs. Implement O(1) lowest common ancestor query with binary lifting.',
        hrQuestions: 'What is your favorite Google open source library and why?',
        juniorTips: 'State complexity upfront: time complexity O(N log N), space complexity O(N).'
      },
      {
        round: 4,
        role: 'Software Engineer Campus L3',
        durationMinutes: 45,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 75,
        systemDesign: 15,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'High Throughput Concurrency'],
        technicalQuestions: 'Design an in-memory thread-safe key-value store with read-write locks and snapshot isolation.',
        hrQuestions: 'Googleyness: How do you handle working with team members who have fundamentally different engineering viewpoints?',
        juniorTips: 'Demonstrate humility, bias for collaboration, and rigorous test-driven validation.'
      },
      {
        round: 5,
        role: 'Software Engineer Campus L3',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder'],
        dsa: 20,
        systemDesign: 20,
        behavioral: 60,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'High level system walkthrough and algorithmic trade-offs.',
        hrQuestions: 'Googleyness & Leadership: Discuss an ambiguous project you initiated, navigated, and delivered successfully.',
        juniorTips: 'Be honest and authentic. Googleyness checks if you are helpful, ethical, and collaborative.'
      }
    ]
  },
  {
    company: 'Microsoft',
    roles: ['Software Engineer SDE-1', 'Azure Cloud Engineer', 'Data Scientist'],
    collegePool: ['rvce.edu.in', 'pes.edu', 'cmrit.ac.in', 'msrit.edu', 'bmsce.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Software Engineer SDE-1',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 75,
        systemDesign: 10,
        behavioral: 15,
        topics: ['Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion'],
        technicalQuestions: 'Codility OA: 3 questions. String compression with run-length encoding; Max sum of contiguous subarray with wrap-around; Tree vertical order traversal.',
        hrQuestions: 'None in OA.',
        juniorTips: 'Codility checks performance on large inputs. Make sure to optimize helper functions.'
      },
      {
        round: 2,
        role: 'Software Engineer SDE-1',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Trees, Binary Search Trees & Heaps', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Check if a binary tree is symmetric. Follow-up: Serialize and deserialize an N-ary tree into a compact byte stream.',
        hrQuestions: 'Why Microsoft? Which product group excites you the most (Azure, Office 365, Teams)?',
        juniorTips: 'Focus on clean C# / C++ / Java OOP interfaces and clear variable naming.'
      },
      {
        round: 3,
        role: 'Software Engineer SDE-1',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 60,
        systemDesign: 30,
        behavioral: 10,
        topics: ['Graphs, BFS/DFS & Shortest Path', 'High-Level System Design (HLD / Microservices / Scalability)'],
        technicalQuestions: 'Topological sort on build dependency graphs (CMake/MSBuild). Design an Azure Blob Storage chunked upload protocol with parallel workers.',
        hrQuestions: 'Tell me about a time you had to learn a completely new programming framework in under 48 hours.',
        juniorTips: 'Explain network retry semantics, checksum hashing (MD5/SHA256), and resumable uploads.'
      },
      {
        round: 4,
        role: 'Software Engineer SDE-1',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder'],
        dsa: 20,
        systemDesign: 30,
        behavioral: 50,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Partner Director Round: Deep dive into systems thinking, cloud scalability, and latency tradeoffs.',
        hrQuestions: 'Microsoft Growth Mindset: How do you embrace failure as a learning opportunity?',
        juniorTips: 'Emphasize curiosity, adaptability, and continuous learning.'
      },
      {
        round: 2,
        role: 'Azure Cloud Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 40,
        systemDesign: 45,
        behavioral: 15,
        topics: ['Operating Systems & Memory Management', 'Computer Networks & Protocols', 'Docker & Containerization'],
        technicalQuestions: 'Explain DNS resolution lifecycle, TCP windowing, and Kubernetes container orchestration under high CPU load.',
        hrQuestions: 'How do you monitor infrastructure health proactively?',
        juniorTips: 'Strong foundation in networking, subnetting, and Linux CLI is expected.'
      }
    ]
  },
  {
    company: 'Flipkart',
    roles: ['Software Development Engineer SDE-1', 'UI Engineer', 'Backend SDE'],
    collegePool: ['cmrit.ac.in', 'rvce.edu.in', 'pes.edu', 'msrit.edu', 'dsce.edu.in'],
    entries: [
      {
        round: 1,
        role: 'Software Development Engineer SDE-1',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 80,
        systemDesign: 10,
        behavioral: 10,
        topics: ['Dynamic Programming & Recursion', 'Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps'],
        technicalQuestions: 'OA: 3 hard problems. Finding largest rectangle in histogram variant + Graph shortest path with fuel refueling constraints.',
        hrQuestions: 'None.',
        juniorTips: 'Flipkart OA has high cutoff. Practice dynamic programming on trees and Monotonic Stacks.'
      },
      {
        round: 2,
        role: 'Software Development Engineer SDE-1',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 50,
        systemDesign: 40,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Famous Flipkart Machine Coding Round (90 minutes): Design an E-Commerce Flipkart Big Billion Day Flash Sale inventory management engine with coupon validation rules.',
        hrQuestions: 'Brief discussion on design choices.',
        juniorTips: 'Machine coding requires executable code with mock driver CLI or JUnit tests. Must demonstrate Separation of Concerns and Factory/Strategy design patterns.'
      },
      {
        round: 3,
        role: 'Software Development Engineer SDE-1',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Dynamic Programming & Recursion', 'Graphs, BFS/DFS & Shortest Path'],
        technicalQuestions: 'Problem Solving & Data Structures round: Maximum path sum in a matrix with jump teleportation portals.',
        hrQuestions: 'Why Flipkart when there are global multinational alternatives?',
        juniorTips: 'Write optimized O(N) code and explain edge case bounds explicitly.'
      },
      {
        round: 4,
        role: 'Software Development Engineer SDE-1',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['HR / Talent Acquisition', 'Technical Lead / Manager'],
        dsa: 20,
        systemDesign: 20,
        behavioral: 60,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Reviewing project challenges.',
        hrQuestions: 'Flipkart Culture values: Audacity, Bias for Action, Customer First, Integrity.',
        juniorTips: 'Demonstrate enthusiasm for building large-scale Indian consumer internet applications.'
      }
    ]
  },
  {
    company: 'Infosys',
    roles: ['Specialist Programmer (SP)', 'Digital Specialist Engineer (DSE)', 'Systems Engineer'],
    collegePool: ['cmrit.ac.in', 'bit-bangalore.edu.in', 'nmit.ac.in', 'rnsit.ac.in', 'bmsit.in', 'oxfordengg.edu'],
    entries: [
      {
        round: 1,
        role: 'Specialist Programmer (SP)',
        durationMinutes: 120,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 90,
        systemDesign: 0,
        behavioral: 10,
        topics: ['Dynamic Programming & Recursion', 'Graphs, BFS/DFS & Shortest Path', 'Trees, Binary Search Trees & Heaps'],
        technicalQuestions: 'HackWithInfy / InfyTQ Advanced OA: 3 difficult questions. Question 1 was 2D DP on grids; Question 2 was Fenwick Tree range queries; Question 3 was Trie traversal.',
        hrQuestions: 'None.',
        juniorTips: 'Specialist Programmer (9.5 LPA) requires at least 2 full questions passing all test cases. Practice Hard LeetCode.'
      },
      {
        round: 2,
        role: 'Specialist Programmer (SP)',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 65,
        systemDesign: 20,
        behavioral: 15,
        topics: ['Database Management Systems (DBMS)', 'Object-Oriented Programming (OOPs)', 'Operating Systems & Memory Management'],
        technicalQuestions: 'Live coding: Reconstruct itinerary using Eulerian path. Detailed questions on ACID properties, B+ tree indexing vs Hash indexing, and process scheduling algorithms.',
        hrQuestions: 'Are you comfortable working in client locations across India or globally?',
        juniorTips: 'Know CS fundamentals thoroughly: paging vs segmentation, deadlock four conditions, normalization forms (1NF to BCNF).'
      },
      {
        round: 3,
        role: 'Specialist Programmer (SP)',
        durationMinutes: 30,
        overallDifficulty: 'Easy',
        panelTypes: ['HR / Talent Acquisition'],
        dsa: 10,
        systemDesign: 10,
        behavioral: 80,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Discussion of certifications and final year electives.',
        hrQuestions: 'Infosys foundation training expectations in Mysore campus and willingness to relocate.',
        juniorTips: 'Clear, confident verbal English communication and polite demeanor are key.'
      },
      {
        round: 1,
        role: 'Digital Specialist Engineer (DSE)',
        durationMinutes: 120,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 10,
        behavioral: 20,
        topics: ['Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps', 'Quantitative Aptitude & Mathematics'],
        technicalQuestions: 'DSE OA (6.25 LPA): 3 medium questions covering Array manipulation, string permutations, and basic BFS graph traversal.',
        hrQuestions: 'None.',
        juniorTips: 'Solving 1.5 to 2 questions guarantees a DSE interview call.'
      },
      {
        round: 2,
        role: 'Digital Specialist Engineer (DSE)',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 50,
        systemDesign: 25,
        behavioral: 25,
        topics: ['Object-Oriented Programming (OOPs)', 'SQL Queries, Indexing & Joins'],
        technicalQuestions: 'Write code to reverse linked list in groups of K. Write SQL query using GROUP BY and HAVING to filter departments with average salary > 50,000.',
        hrQuestions: 'Tell me about a time you solved a conflict in a college team project.',
        juniorTips: 'Revise OOP pillars: Abstraction vs Encapsulation, Method Overloading vs Overriding.'
      }
    ]
  },
  {
    company: 'TCS',
    roles: ['TCS Digital', 'TCS Prime', 'TCS Ninja'],
    collegePool: ['cmrit.ac.in', 'bit-bangalore.edu.in', 'mvjce.edu.in', 'gat.ac.in', 'sir-mvit.edu'],
    entries: [
      {
        round: 1,
        role: 'TCS Prime',
        durationMinutes: 120,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 10,
        behavioral: 20,
        topics: ['Arrays, Strings & HashMaps', 'Dynamic Programming & Recursion', 'Quantitative Aptitude & Mathematics'],
        technicalQuestions: 'TCS NQT Prime track: Advanced coding (2 questions: DP on subsets and matrix rotation) + Advanced quantitative logic and verbal reasoning.',
        hrQuestions: 'None in NQT test.',
        juniorTips: 'Do not spend more than 1 minute per aptitude question. Save maximum time for the advanced coding section.'
      },
      {
        round: 2,
        role: 'TCS Prime',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Technical Lead / Manager', 'HR / Talent Acquisition'],
        dsa: 40,
        systemDesign: 30,
        behavioral: 30,
        topics: ['Object-Oriented Programming (OOPs)', 'Database Management Systems (DBMS)', 'AI Code Generation & Vibe Coding Tools (Cursor, AI Studio, GitHub Copilot)'],
        technicalQuestions: 'Composite panel (Tech + MR + HR): Write binary search code on paper. Explain your experience with Generative AI tools and full stack development.',
        hrQuestions: 'Are you flexible with shift timings and project assignments in TCS delivery centers?',
        juniorTips: 'TCS Composite interviews test your overall composure, resume veracity, and clarity of college project explanations.'
      },
      {
        round: 1,
        role: 'TCS Digital',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 60,
        systemDesign: 15,
        behavioral: 25,
        topics: ['Arrays, Strings & HashMaps', 'Logical Reasoning & Data Interpretation', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'TCS Digital OA (7.5 LPA): 2 coding problems on array transformation and string anagram anagram verification under time limits.',
        hrQuestions: 'None.',
        juniorTips: 'Accuracy matters. TCS uses negative marking on quantitative sections.'
      },
      {
        round: 2,
        role: 'TCS Digital',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 45,
        systemDesign: 25,
        behavioral: 30,
        topics: ['RESTful APIs, WebSockets & GraphQL', 'SQL Queries, Indexing & Joins'],
        technicalQuestions: 'Explain foreign keys, primary keys, and composite keys. Walk through the architecture of your web project.',
        hrQuestions: 'Why TCS over other IT service organizations?',
        juniorTips: 'Be confident in describing database normalization and REST API methods (GET vs POST vs PUT).'
      }
    ]
  },
  {
    company: 'Accenture',
    roles: ['Advanced Associate Software Engineer (AASE)', 'Associate Software Engineer (ASE)'],
    collegePool: ['cmrit.ac.in', 'bit-bangalore.edu.in', 'dsce.edu.in', 'nmit.ac.in', 'amcgroup.edu.in'],
    entries: [
      {
        round: 1,
        role: 'Advanced Associate Software Engineer (AASE)',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 50,
        systemDesign: 20,
        behavioral: 30,
        topics: ['Quantitative Aptitude & Mathematics', 'Logical Reasoning & Data Interpretation', 'Computer Networks & Protocols'],
        technicalQuestions: 'Cognitive & Technical Assessment: 90 questions on Verbal, Critical Thinking, Abstract Reasoning, Pseudocode, Common Applications, and MS Office.',
        hrQuestions: 'None.',
        juniorTips: 'Practice pseudocode output questions! Accenture tests bitwise operations and loop execution counts heavily.'
      },
      {
        round: 2,
        role: 'Advanced Associate Software Engineer (AASE)',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 80,
        systemDesign: 10,
        behavioral: 10,
        topics: ['Arrays, Strings & HashMaps', 'Dynamic Programming & Recursion'],
        technicalQuestions: 'Coding assessment immediately following cognitive: 2 questions. Problem 1 was array frequency count; Problem 2 was dynamic programming on strings.',
        hrQuestions: 'None.',
        juniorTips: 'You must solve both coding problems to be shortlisted for the AASE 6.5 LPA role instead of ASE 4.5 LPA.'
      },
      {
        round: 3,
        role: 'Advanced Associate Software Engineer (AASE)',
        durationMinutes: 30,
        overallDifficulty: 'Easy',
        panelTypes: ['Technical Lead / Manager', 'HR / Talent Acquisition'],
        dsa: 30,
        systemDesign: 20,
        behavioral: 50,
        topics: ['Object-Oriented Programming (OOPs)', 'Engineering Ethics & Teamwork'],
        technicalQuestions: 'Explain OOP concepts with real-world examples. Questions on your final-year college project.',
        hrQuestions: 'Tell me about a challenging situation you handled in a team. Where do you see yourself in 3 years?',
        juniorTips: 'Accenture values strong communication skills, professional presentation, and adaptability to new technologies.'
      }
    ]
  },
  {
    company: 'Wipro',
    roles: ['Turbo Engineer', 'Elite Developer'],
    collegePool: ['cmrit.ac.in', 'mvjce.edu.in', 'gat.ac.in', 'rnsit.ac.in', 'sjbit.edu.in'],
    entries: [
      {
        round: 1,
        role: 'Turbo Engineer',
        durationMinutes: 120,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 65,
        systemDesign: 10,
        behavioral: 25,
        topics: ['Arrays, Strings & HashMaps', 'Quantitative Aptitude & Mathematics', 'Logical Reasoning & Data Interpretation'],
        technicalQuestions: 'Wipro National Talent Hunt (NLTH) Turbo track (6.5 LPA): Aptitude + Verbal + 2 coding questions on string manipulation and array sorting.',
        hrQuestions: 'Written communication test: 20-minute essay writing on contemporary technology topic.',
        juniorTips: 'For essay writing, avoid grammatical errors and maintain structured paragraphs (Introduction, Pros, Cons, Conclusion).'
      },
      {
        round: 2,
        role: 'Turbo Engineer',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 25,
        behavioral: 35,
        topics: ['Object-Oriented Programming (OOPs)', 'Database Management Systems (DBMS)', 'C, C++ & Low-Level Foundations'],
        technicalQuestions: 'Differentiate between call by value and call by reference. Write a program to find cycle in linked list. Explain 2NF and 3NF.',
        hrQuestions: 'Willingness to learn emerging cloud stacks and relocate to any Wipro development center in India.',
        juniorTips: 'Be sound with pointers, memory allocation (malloc/free), and basic SQL syntax.'
      },
      {
        round: 3,
        role: 'Turbo Engineer',
        durationMinutes: 20,
        overallDifficulty: 'Easy',
        panelTypes: ['HR / Talent Acquisition'],
        dsa: 10,
        systemDesign: 10,
        behavioral: 80,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Verification of academic marks and background check.',
        hrQuestions: 'Standard HR questions on family background, college extracurriculars, and agreement with service bonds.',
        juniorTips: 'Maintain eye contact, answer clearly, and ask a thoughtful question about project onboarding at the end.'
      }
    ]
  },
  {
    company: 'Cisco',
    roles: ['Software Consulting Engineer', 'Network SDE', 'Security Specialist'],
    collegePool: ['rvce.edu.in', 'pes.edu', 'bmsce.ac.in', 'msrit.edu', 'cmrit.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Software Consulting Engineer',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 50,
        systemDesign: 30,
        behavioral: 20,
        topics: ['Computer Networks & Protocols', 'Operating Systems & Memory Management', 'Arrays, Strings & HashMaps'],
        technicalQuestions: 'Cisco OA on HackerRank: 20 MCQs on Subnetting, TCP/UDP headers, BGP routing, OS kernel, and 2 coding problems on graph minimum spanning tree (Kruskal/Prim).',
        hrQuestions: 'None.',
        juniorTips: 'Cisco tests Computer Networks far more heavily than pure algorithmic firms. Master OSI layers, CIDR subnetting, and socket programming.'
      },
      {
        round: 2,
        role: 'Software Consulting Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 45,
        systemDesign: 40,
        behavioral: 15,
        topics: ['Computer Networks & Protocols', 'Linux & Shell Scripting', 'C, C++ & Low-Level Foundations'],
        technicalQuestions: 'Explain TCP 3-way handshake and 4-way termination with packet flags (SYN, ACK, FIN, RST). Write code to reverse bits of an integer and detect endianness.',
        hrQuestions: 'Why networking and security over web development?',
        juniorTips: 'Interviewer drilled into packet encapsulation and Wireshark inspection. Be technically honest.'
      },
      {
        round: 3,
        role: 'Software Consulting Engineer',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 35,
        systemDesign: 35,
        behavioral: 30,
        topics: ['RESTful APIs, WebSockets & GraphQL', 'Engineering Ethics & Teamwork'],
        technicalQuestions: 'Design an automated network diagnostic tool that pings 10,000 routers and alerts on packet drop anomalies.',
        hrQuestions: 'Describe a situation where a project failed and what you learned from the experience.',
        juniorTips: 'Show interest in SDN (Software Defined Networking) and network automation.'
      },
      {
        round: 4,
        role: 'Software Consulting Engineer',
        durationMinutes: 30,
        overallDifficulty: 'Easy',
        panelTypes: ['Executive / Founder', 'HR / Talent Acquisition'],
        dsa: 10,
        systemDesign: 15,
        behavioral: 75,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'High level career goals.',
        hrQuestions: 'Cisco culture round: Collaboration, giving back, and technical integrity.',
        juniorTips: 'Express enthusiasm for Cisco Bangalore campus innovation labs.'
      }
    ]
  },
  {
    company: 'Oracle',
    roles: ['Member of Technical Staff - MTS', 'Cloud Database Engineer', 'Applications Developer'],
    collegePool: ['rvce.edu.in', 'pes.edu', 'bmsce.ac.in', 'cmrit.ac.in', 'msrit.edu'],
    entries: [
      {
        round: 1,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 60,
        systemDesign: 30,
        behavioral: 10,
        topics: ['Database Management Systems (DBMS)', 'Trees, Binary Search Trees & Heaps', 'SQL Queries, Indexing & Joins'],
        technicalQuestions: 'Oracle OA: Multiple sections on Core Java, C++, SQL queries, and 2 coding problems on Binary Trees and interval scheduling.',
        hrQuestions: 'None.',
        juniorTips: 'Oracle OA checks language nuances like static initialization blocks in Java and pointer arithmetic in C++.'
      },
      {
        round: 2,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 65,
        systemDesign: 25,
        behavioral: 10,
        topics: ['Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion', 'Database Management Systems (DBMS)'],
        technicalQuestions: 'Implement B+ Tree insertion and node split logic conceptually. Code Lowest Common Ancestor in Binary Tree without parent pointers.',
        hrQuestions: 'Why Oracle OCI (Oracle Cloud Infrastructure)?',
        juniorTips: 'Understand database indexing internals, write-ahead logs (WAL), and MVCC.'
      },
      {
        round: 3,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 50,
        systemDesign: 35,
        behavioral: 15,
        topics: ['Operating Systems & Memory Management', 'High Throughput Concurrency', 'Low-Level System Design (LLD / Design Patterns)'],
        technicalQuestions: 'Implement Reader-Writer problem using semaphores and mutexes preventing writer starvation. Explain virtual memory page fault handling.',
        hrQuestions: 'How do you test your code for race conditions?',
        juniorTips: 'Master synchronization primitives: semaphores, mutexes, conditional variables, and spinlocks.'
      },
      {
        round: 4,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder'],
        dsa: 20,
        systemDesign: 30,
        behavioral: 50,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Director round on software architecture and reliability.',
        hrQuestions: 'Discuss your long-term technical aspirations and preferred tech stack within Oracle Bangalore.',
        juniorTips: 'Show passion for systems engineering, database kernels, and cloud storage.'
      }
    ]
  },
  {
    company: 'Walmart',
    roles: ['Software Development Engineer', 'Big Data Analyst', 'Infrastructure SDE'],
    collegePool: ['cmrit.ac.in', 'rvce.edu.in', 'bmsce.ac.in', 'pes.edu', 'dsce.edu.in'],
    entries: [
      {
        round: 1,
        role: 'Software Development Engineer',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 75,
        systemDesign: 15,
        behavioral: 10,
        topics: ['Arrays, Strings & HashMaps', 'Dynamic Programming & Recursion', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Walmart Global Tech OA on HackerEarth: 2 problems. Problem 1 was coin change variation; Problem 2 was graph reachability with minimum edge weights.',
        hrQuestions: 'None.',
        juniorTips: 'Walmart OA is very accessible if you practice standard LeetCode Mediums.'
      },
      {
        round: 2,
        role: 'Software Development Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Trees, Binary Search Trees & Heaps', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Find k-th smallest element in a BST. Convert binary tree to doubly linked list in-place.',
        hrQuestions: 'Why retail technology? How does Walmart tech handle Black Friday scale?',
        juniorTips: 'Explain time and space complexity with in-place pointer manipulation.'
      },
      {
        round: 3,
        role: 'Software Development Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 45,
        behavioral: 15,
        topics: ['High-Level System Design (HLD / Microservices / Scalability)', 'Distributed Caching & Redis', 'SQL Queries, Indexing & Joins'],
        technicalQuestions: 'Design a real-time Walmart store inventory sync platform that updates online inventory when a physical barcode is scanned at point of sale.',
        hrQuestions: 'Tell me about a time you worked with someone whose working style differed significantly from yours.',
        juniorTips: 'Emphasize eventual consistency, message queues (Kafka), and database sharding by store region.'
      },
      {
        round: 4,
        role: 'Software Development Engineer',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['HR / Talent Acquisition'],
        dsa: 10,
        systemDesign: 15,
        behavioral: 75,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'General overview of university achievements.',
        hrQuestions: 'Walmart 4 core values: Service to Customer, Respect for Individual, Strive for Excellence, Act with Integrity.',
        juniorTips: 'Give practical examples from college festivals, hackathons, or group assignments.'
      }
    ]
  },
  {
    company: 'Adobe',
    roles: ['Member of Technical Staff - MTS', 'Computer Scientist', 'Web SDE'],
    collegePool: ['rvce.edu.in', 'pes.edu', 'iiitb.ac.in', 'bmsce.ac.in', 'cmrit.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 80,
        systemDesign: 10,
        behavioral: 10,
        topics: ['Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion'],
        technicalQuestions: 'Adobe OA on HackerRank: 3 coding problems. Max rectangle in 0-1 matrix, Trie string matching with wildcards, and DP on palindromes.',
        hrQuestions: 'None.',
        juniorTips: 'Adobe coding tests focus heavily on geometry, matrix manipulations, and tree structures.'
      },
      {
        round: 2,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 75,
        systemDesign: 15,
        behavioral: 10,
        topics: ['Trees, Binary Search Trees & Heaps', 'Graphs, BFS/DFS & Shortest Path', 'C, C++ & Low-Level Foundations'],
        technicalQuestions: 'Implement flood fill algorithm for Photoshop paint bucket tool. Optimize memory usage using scanline fill.',
        hrQuestions: 'Why do you want to join Adobe Creative Cloud / Document Cloud?',
        juniorTips: 'Demonstrate deep understanding of graphics algorithms, pixel buffers, and stack overflow prevention.'
      },
      {
        round: 3,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 60,
        systemDesign: 30,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'Object-Oriented Programming (OOPs)', 'Frontend Performance Optimization'],
        technicalQuestions: 'Design an undo-redo engine for an image editor supporting 100 historical brush strokes with memory caps (Command & Memento Patterns).',
        hrQuestions: 'Describe an instance where you pushed through an ambitious deadline.',
        juniorTips: 'Design patterns are mandatory. Explain why Memento pattern preserves encapsulation.'
      },
      {
        round: 4,
        role: 'Member of Technical Staff - MTS',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder', 'HR / Talent Acquisition'],
        dsa: 20,
        systemDesign: 20,
        behavioral: 60,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'High level architectural overview of your personal projects.',
        hrQuestions: 'Adobe culture: Genuine, Exceptional, Innovative, Involved. Discuss your creative interests.',
        juniorTips: 'Adobe appreciates engineers with an eye for design, aesthetics, and user experience.'
      }
    ]
  },
  {
    company: 'PhonePe',
    roles: ['Software Engineer Backend', 'Android SDE', 'QA Engineer'],
    collegePool: ['cmrit.ac.in', 'rvce.edu.in', 'pes.edu', 'bmsce.ac.in', 'dsce.edu.in'],
    entries: [
      {
        round: 1,
        role: 'Software Engineer Backend',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 80,
        systemDesign: 10,
        behavioral: 10,
        topics: ['Dynamic Programming & Recursion', 'Arrays, Strings & HashMaps', 'Graphs, BFS/DFS & Shortest Path'],
        technicalQuestions: 'PhonePe OA: 3 coding problems. DP with bitmasking + Connected components in dynamic graph with disjoint-set union (DSU).',
        hrQuestions: 'None.',
        juniorTips: 'PhonePe has one of the highest OA cutoff bars in Bangalore. Speed in DSU and DP is essential.'
      },
      {
        round: 2,
        role: 'Software Engineer Backend',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 50,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Machine Coding round: Implement a UPI Split-Bill payment ledger with multiple currency splits, settlement graph minimization, and transaction history.',
        hrQuestions: 'Walk through your class models and edge case handling.',
        juniorTips: 'Keep models clean: User, SplitGroup, Transaction, SettlementStrategy. Code must run and pass test cases.'
      },
      {
        round: 3,
        role: 'Software Engineer Backend',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Dynamic Programming & Recursion', 'High Throughput Concurrency', 'Database Management Systems (DBMS)'],
        technicalQuestions: 'Data Structures round: Implement Concurrent Skip List. Detailed questions on database locking (Pessimistic vs Optimistic Locking) in UPI transactions.',
        hrQuestions: 'How do you handle ambiguous requirements under pressure?',
        juniorTips: 'Be ready to write thread-safe Java/Go code with atomic references.'
      },
      {
        round: 4,
        role: 'Software Engineer Backend',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder'],
        dsa: 20,
        systemDesign: 30,
        behavioral: 50,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Engineering VP round: Scale of PhonePe UPI transactions (billions of transactions per month) and failure resilience.',
        hrQuestions: 'PhonePe cultural pillars: High ownership, humility, and engineering excellence.',
        juniorTips: 'Demonstrate deep passion for building high-scale fintech systems for India.'
      }
    ]
  },
  {
    company: 'Atlassian',
    roles: ['Graduate Software Engineer', 'Site Reliability Engineer', 'Full Stack SDE'],
    collegePool: ['rvce.edu.in', 'pes.edu', 'iiitb.ac.in', 'bmsce.ac.in', 'cmrit.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Graduate Software Engineer',
        durationMinutes: 90,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 75,
        systemDesign: 15,
        behavioral: 10,
        topics: ['Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion'],
        technicalQuestions: 'Atlassian OA on HackerRank: 3 questions. Custom file system path resolution with symlinks + Rate limiter + Segment tree query.',
        hrQuestions: 'None.',
        juniorTips: 'Read all questions before writing code. Clean modular code with helper methods is evaluated.'
      },
      {
        round: 2,
        role: 'Graduate Software Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 20,
        behavioral: 10,
        topics: ['Low-Level System Design (LLD / Design Patterns)', 'Object-Oriented Programming (OOPs)'],
        technicalQuestions: 'Code Craft / Data Structures: Design Jira issue dependency tracker with cycle detection and priority queues.',
        hrQuestions: 'How do you test your code while building features?',
        juniorTips: 'Atlassian emphasizes test-driven development (TDD). Write unit tests during the interview.'
      },
      {
        round: 3,
        role: 'Graduate Software Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 50,
        behavioral: 10,
        topics: ['High-Level System Design (HLD / Microservices / Scalability)', 'Distributed Caching & Redis'],
        technicalQuestions: 'System Design: Design Confluence real-time collaborative document editing with conflict resolution (Operational Transformation or CRDTs).',
        hrQuestions: 'Tell me about a time you gave constructive feedback to a peer.',
        juniorTips: 'Understand OT vs CRDT trade-offs for collaborative canvas editing.'
      },
      {
        round: 4,
        role: 'Graduate Software Engineer',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['College Alumni', 'HR / Talent Acquisition'],
        dsa: 10,
        systemDesign: 10,
        behavioral: 80,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'None.',
        hrQuestions: 'Values interview: Open company no bullshit, Play as a team, Build with heart and balance, Be the change you seek.',
        juniorTips: 'Atlassian values round can make or break your offer. Be authentic, self-reflective, and collaborative.'
      }
    ]
  },
  {
    company: 'Intuit',
    roles: ['Software Development Engineer - SDE 1', 'FinTech Data Engineer'],
    collegePool: ['cmrit.ac.in', 'rvce.edu.in', 'pes.edu', 'msrit.edu', 'bmsce.ac.in'],
    entries: [
      {
        round: 1,
        role: 'Software Development Engineer - SDE 1',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 70,
        systemDesign: 15,
        behavioral: 15,
        topics: ['Arrays, Strings & HashMaps', 'Trees, Binary Search Trees & Heaps', 'Dynamic Programming & Recursion'],
        technicalQuestions: 'Intuit OA on Karat/HackerRank: 2 problems. Longest substring with K distinct characters + Course Schedule cycle detection.',
        hrQuestions: 'None.',
        juniorTips: 'Review standard graph traversal and sliding window algorithms.'
      },
      {
        round: 2,
        role: 'Software Development Engineer - SDE 1',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 65,
        systemDesign: 25,
        behavioral: 10,
        topics: ['Trees, Binary Search Trees & Heaps', 'Object-Oriented Programming (OOPs)', 'Low-Level System Design (LLD / Design Patterns)'],
        technicalQuestions: 'Design TurboTax tax deduction calculator with rule engine and extensible deduction plugins.',
        hrQuestions: 'Why Intuit? How do you view customer obsession in financial software?',
        juniorTips: 'Demonstrate design patterns (Decorator, Strategy) for tax rules.'
      },
      {
        round: 3,
        role: 'Software Development Engineer - SDE 1',
        durationMinutes: 60,
        overallDifficulty: 'Hard',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 45,
        behavioral: 15,
        topics: ['High-Level System Design (HLD / Microservices / Scalability)', 'Database Indexing & SQL', 'Distributed Caching & Redis'],
        technicalQuestions: 'Design QuickBooks small-business invoice generation and payment tracking microservice handling 5 million invoices a month.',
        hrQuestions: 'Tell me about an instance where you pushed back against poor design.',
        juniorTips: 'Emphasize data consistency, idempotency, and audit logging in financial services.'
      },
      {
        round: 4,
        role: 'Software Development Engineer - SDE 1',
        durationMinutes: 45,
        overallDifficulty: 'Medium',
        panelTypes: ['Executive / Founder', 'HR / Talent Acquisition'],
        dsa: 15,
        systemDesign: 15,
        behavioral: 70,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Review of open source contributions.',
        hrQuestions: 'Intuit core values: Customer Obsession, Integrity Without Compromise, Courage, We Care and Give Back.',
        juniorTips: 'Highlight user-centric thinking and community involvement.'
      }
    ]
  },
  {
    company: 'SAP Labs',
    roles: ['Associate Developer', 'Cloud ERP Engineer', 'Platform SDE'],
    collegePool: ['cmrit.ac.in', 'bmsce.ac.in', 'rvce.edu.in', 'msrit.edu', 'dsce.edu.in', 'bit-bangalore.edu.in'],
    entries: [
      {
        round: 1,
        role: 'Associate Developer',
        durationMinutes: 90,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 60,
        systemDesign: 20,
        behavioral: 20,
        topics: ['Arrays, Strings & HashMaps', 'Object-Oriented Programming (OOPs)', 'SQL Queries, Indexing & Joins'],
        technicalQuestions: 'SAP Labs OA on SHL / Mettl: 2 coding questions on 2D arrays and linked lists + 30 MCQs on Java, DBMS, and OS.',
        hrQuestions: 'None.',
        juniorTips: 'Revise Core Java concepts: garbage collection, JVM memory areas, and collections framework.'
      },
      {
        round: 2,
        role: 'Associate Developer',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Senior Developer / Peer'],
        dsa: 60,
        systemDesign: 25,
        behavioral: 15,
        topics: ['Object-Oriented Programming (OOPs)', 'Database Management Systems (DBMS)', 'Trees, Binary Search Trees & Heaps'],
        technicalQuestions: 'Code binary search tree validation. Write SQL queries to find employees with second highest salary in each department.',
        hrQuestions: 'What is enterprise software and why is SAP relevant in global supply chains?',
        juniorTips: 'Show knowledge of SAP ERP applications and in-memory HANA database concepts.'
      },
      {
        round: 3,
        role: 'Associate Developer',
        durationMinutes: 60,
        overallDifficulty: 'Medium',
        panelTypes: ['Technical Lead / Manager'],
        dsa: 40,
        systemDesign: 40,
        behavioral: 20,
        topics: ['High-Level System Design (HLD / Microservices / Scalability)', 'RESTful APIs, WebSockets & GraphQL', 'Cloud Computing & Microservices'],
        technicalQuestions: 'Design an enterprise inventory supply chain tracking API with authentication and multi-tenant isolation.',
        hrQuestions: 'How do you handle working on legacy enterprise codebases while introducing modern microservices?',
        juniorTips: 'Demonstrate architectural maturity: API versioning, backward compatibility, and automated integration tests.'
      },
      {
        round: 4,
        role: 'Associate Developer',
        durationMinutes: 30,
        overallDifficulty: 'Easy',
        panelTypes: ['HR / Talent Acquisition'],
        dsa: 10,
        systemDesign: 10,
        behavioral: 80,
        topics: ['Engineering Ethics & Teamwork'],
        technicalQuestions: 'Discussion of university projects.',
        hrQuestions: 'SAP culture fit, campus training expectations, and willingness to work at the Whitefield, Bangalore campus.',
        juniorTips: 'Be polite, structured, and show genuine excitement about joining SAP Labs Bangalore.'
      }
    ]
  }
];

export const generateExpandedBotFeedbacks = (): InterviewFeedback[] => {
  const result: InterviewFeedback[] = [];
  let idCounter = 1;

  for (const template of TEMPLATES) {
    template.entries.forEach((entry, entryIndex) => {
      const college = template.collegePool[entryIndex % template.collegePool.length];
      const entryId = `bot-${template.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${entry.round}-${idCounter++}`;
      
      const feedback: InterviewFeedback = {
        id: entryId,
        feedbackType: 'bot',
        company: template.company,
        role: entry.role,
        round: entry.round,
        durationMinutes: entry.durationMinutes,
        overallDifficulty: entry.overallDifficulty,
        panelTypes: entry.panelTypes,
        questionStyles: {
          dsa: entry.dsa,
          systemDesign: entry.systemDesign,
          behavioral: entry.behavioral,
          techPercent: entry.dsa,
          techDifficulty: entry.overallDifficulty,
          aiPercent: entry.systemDesign,
          aiDifficulty: entry.overallDifficulty === 'Hard' ? 'Medium' : 'Easy',
          aptitudePercent: entry.behavioral,
          aptitudeDifficulty: 'Medium'
        },
        topicsTested: entry.topics,
        technicalQuestions: entry.technicalQuestions,
        hrQuestions: entry.hrQuestions,
        juniorTips: entry.juniorTips,
        collegeDomain: college,
        userEmail: `bot.seed@${college}`,
        submittedByUid: `system-bot-generator`,
        authorUid: `system-bot-generator`,
        submittedAt: new Date(Date.now() - (idCounter * 86400000 * 2)).toISOString(),
        year: 2026
      };

      result.push(feedback);
    });
  }

  return result;
};

export const BOT_SEED_FEEDBACKS = generateExpandedBotFeedbacks();
