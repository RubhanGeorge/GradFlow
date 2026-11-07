import { TopicCategory } from '../types';

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'cat-dsa',
    name: '1. Data Structures & Core Algorithms',
    topics: [
      'Arrays, Strings & HashMaps',
      'Trees, Binary Search Trees & Heaps',
      'Graphs, BFS/DFS & Shortest Path',
      'Dynamic Programming & Recursion',
      'Greedy Algorithms & Backtracking',
      'Sorting, Searching & Two-Pointers',
      'Tries & Segment Trees'
    ]
  },
  {
    id: 'cat-fundamentals',
    name: '2. Advanced CS Fundamentals & Systems',
    topics: [
      'Object-Oriented Programming (OOPs)',
      'Operating Systems (Process Scheduling, Threading, Deadlocks)',
      'Memory Management & Pointers (C/C++)',
      'Computer Networks (TCP/IP, HTTP/S, DNS, OSI Model)',
      'Low-Level System Design (LLD / Design Patterns)',
      'High-Level System Design (HLD / Microservices / Scalability)',
      'Database Management Systems (DBMS / ACID Properties)',
      'SQL Queries, Indexing & Joins',
      'NoSQL Databases (MongoDB, Redis, Firestore)',
      'Compiler Design & Parsing Basics'
    ]
  },
  {
    id: 'cat-web',
    name: '3. Software Engineering & Web Architecture',
    topics: [
      'RESTful APIs, WebSockets & GraphQL',
      'Web Technologies (HTML, CSS, JavaScript, DOM)',
      'Frontend Frameworks (React, Vue, Angular)',
      'Backend Development (Node.js, Express, Flask, Django, Spring Boot)',
      'System Caching & Message Queues (Redis, RabbitMQ, Kafka)',
      'Web Security (JWT, OAuth, CORS, XSS, CSRF)',
      'Git Version Control & CI/CD Pipelines',
      'Docker, Containers & Kubernetes',
      'Cloud Computing Services (AWS, GCP, Azure, Firebase)',
      'Linux Shell Scripting & Command Line Tools'
    ]
  },
  {
    id: 'cat-ai',
    name: '4. AI, ML & Advanced Emerging Tech',
    topics: [
      'Machine Learning Basics (Regression, Classification, Clustering)',
      'Deep Learning & Neural Networks (CNN, RNN, Transformers)',
      'Natural Language Processing (NLP) & Sentiment Analysis',
      'LLMs, Prompting & AI API Integration (Gemini, OpenAI, Claude)',
      'Vector Databases & Embeddings (Pinecone, Chroma, FAISS)',
      'RAG Architecture & AI Agents Frameworks',
      'AI Code Generation & Vibe Coding Tools (Cursor, AI Studio, GitHub Copilot)',
      'Computer Vision & OpenCV Basics',
      'Big Data Pipelines (Spark, Hadoop, PySpark)'
    ]
  },
  {
    id: 'cat-qa',
    name: '5. Testing, QA & Maintenance',
    topics: [
      'Unit Testing, Mocking & Test-Driven Development (TDD)',
      'Code Refactoring, Optimization & Profiling',
      'Software Debugging & Stack Trace Analysis'
    ]
  },
  {
    id: 'cat-aptitude',
    name: '6. Aptitude, Reasoning & Business Logic',
    topics: [
      'Quantitative Aptitude & Mathematics',
      'Logical Reasoning & Data Interpretation',
      'Analytical Puzzles & Lateral Thinking',
      'Verbal Ability & Technical Communication',
      'Case Study & Business Problem Solving',
      'Code Output Prediction & Tracing'
    ]
  },
  {
    id: 'cat-behavioral',
    name: '7. Behavioral & Professional Context',
    topics: [
      'Project Deep-Dive & Architecture Explanation',
      'Internship Experience & Contribution Highlights',
      'System Trade-offs & Engineering Decision Making',
      'Conflict Resolution & Teamwork Scenarios',
      'Resume Verification & Tech Stack Validation'
    ]
  }
];

export const ALL_TOPICS: string[] = TOPIC_CATEGORIES.flatMap(c => c.topics);
