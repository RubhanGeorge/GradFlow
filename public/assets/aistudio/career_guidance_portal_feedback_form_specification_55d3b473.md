# Career Guidance and Information Portal
**Project Focus:** Anonymous Interview Feedback System & Main Portal Dashboard Integration

---

## 1. Document Purpose & Scope
This document serves as the complete technical and UI specification for building the **Anonymous Interview Feedback System**. The core goal is to enable students to quickly submit structured, high-value interview feedback within a **2-minute window** using a mobile-first interface. This data is securely stored in Firebase Firestore and automatically aggregated to power company-specific insights on the main portal dashboard.

---

## 2. Question 1: Company Master List (Bangalore Recruiters)
*Use this JSON/Array dataset to populate the live autocomplete search dropdown for Question 1.*

```json
[
  "Accenture", "Adobe", "Acko", "Akamai Technologies", "Amazon", "AMD", "Amdocs", 
  "Analog Devices", "Ansys", "Apollo 24|7", "Apple", "Applied Materials", "Atlassian", 
  "Autodesk", "Bosch", "Boston Consulting Group", "Byju's", "Cadence Design Systems", 
  "Capgemini", "Cisco", "Citrix", "Cognizant", "Commvault", "Cred", "CrowdStrike", 
  "Dell Technologies", "Deloitte", "Deutsche Bank", "Directi", "Dmart", "Dream11", 
  "Dynamics 365", "Ernst & Young (EY)", "Elastic", "Experian", "Flipkart", 
  "Fractal Analytics", "Freshworks", "Games24x7", "Goldman Sachs", "Google", 
  "HackerRank", "HCLTech", "Hewlett Packard Enterprise (HPE)", "Honeywell", 
  "HP Inc.", "HSBC", "IBM", "InMobi", "Infosys", "Intel", "Intuit", 
  "JPMorgan Chase", "Jio", "Juniper Networks", "KPMG", "KreditBee", 
  "LTI Mindtree", "Lenovo", "LinkedIN", "McKinsey & Company", "Meesho", 
  "Mercedes-Benz R&D India", "Meta", "Microchip Technology", "Micron Technology", 
  "Microsoft", "MongoDB", "Morgan Stanley", "Mu Sigma", "NetApp", "Nokia", 
  "Nvidia", "Oracle", "Paytm", "Palo Alto Networks", "PayPal", "PhonePe", 
  "PwC", "Qualcomm", "Razorpay", "Red Hat", "Reliance", "Ripple", "Salesforce", 
  "Samsung R&D", "SAP Labs", "Schneider Electric", "ServiceNow", "Siemens", 
  "Societe Generale", "Swiggy", "Synopsys", "Target", "Tata Consultancy Services (TCS)", 
  "Tesco", "Texas Instruments", "Thoughtworks", "Uber", "Urban Company", 
  "Walmart Global Tech", "Wells Fargo", "Wipro", "Workday", "Zeta", "Zomato", "Zoho"
]
```

---

## 3. Complete Interview Feedback Form Questionnaire & UI Specifications

### Question 1: Company Name
* **Question Text:** "Which company did you interview with?"
* **UI Component:** Text Entry with Live Autocomplete Dropdown (filtering from the Master List above). Allows custom entry if a company is missing.
* **Firestore Data Type:** `String`

### Question 2: Role / Job Profile
* **Question Text:** "What was your targeted role or job profile?"
* **UI Component:** Free-text input box with placeholder examples (e.g., *Software Development Engineer, Data Analyst*).
* **Firestore Data Type:** `String`

### Question 3: Interview Round
* **Question Text:** "Which interview round was this?"
* **UI Component:** Segmented button / Step selector.
* **Options:** `[1] Online Assessment`, `[2] Technical Round 1`, `[3] Technical Round 2 / System Design`, `[4] HR / Behavioral Round`, `[5] Final Composite Round`.
* **Firestore Data Type:** `Number`

### Question 4: Round Duration
* **Question Text:** "How long did this interview round last?"
* **UI Component:** Interactive drag slider with a live badge counter. Range: 15 to 120 minutes (Step: 5 mins).
* **Firestore Data Type:** `Number` (Minutes)

### Question 5: Overall Difficulty Level
* **Question Text:** "What was the overall difficulty level of this round?"
* **UI Component:** 3-Option segmented card selector.
* **Options:** `Easy`, `Medium`, `Hard`.
* **Firestore Data Type:** `String`

### Question 6: Panel Type / Interviewer Background
* **Question Text:** "Who was on your interview panel? (Select all that apply)"
* **UI Component:** Multi-select pill chips.
* **Options:** `Technical Lead / Manager`, `Senior Developer / Peer`, `HR / Talent Acquisition`, `College Alumni`, `Executive / Founder`.
* **Firestore Data Type:** `Array of Strings`

### Question 7: Question Style Distribution & Category Difficulty
* **Question Text:** "What percentage of the interview was dedicated to each question style, and how hard was each section?"
* **UI Component:** Combined dynamic percentage sliders (must total 100%) paired with active difficulty toggles (`Easy` | `Medium` | `Hard`) for each chosen category.
* **Categories:**
  1. Programming & Technical Knowledge
  2. AI, Vibe Coding & Efficiency Tools
  3. Aptitude & Brain Testing
* **Firestore Data Type:** `Map / Object`

### Question 8: Specific Topics Tested (Mobile-Optimized Category Flow)
* **Question Text:** "Which specific topics were asked during this round?"
* **UI Optimization for Mobile:** To prevent long vertical scrolls, topics are broken down into **7 distinct collapsible categories or step-by-step tabs**. Users tap a category, select relevant chips, and move to the next.
* **Complete 50-Topic Checklist Structure:**

  * **Category 1: Data Structures & Core Algorithms**
    1. Arrays, Strings & HashMaps
    2. Trees, Binary Search Trees & Heaps
    3. Graphs, BFS/DFS & Shortest Path
    4. Dynamic Programming & Recursion
    5. Greedy Algorithms & Backtracking
    6. Sorting, Searching & Two-Pointers
    7. Tries & Segment Trees

  * **Category 2: Advanced CS Fundamentals & Systems**
    8. Object-Oriented Programming (OOPs)
    9. Operating Systems (Process Scheduling, Threading, Deadlocks)
    10. Memory Management & Pointers (C/C++)
    11. Computer Networks (TCP/IP, HTTP/S, DNS, OSI Model)
    12. Low-Level System Design (LLD / Design Patterns)
    13. High-Level System Design (HLD / Microservices / Scalability)
    14. Database Management Systems (DBMS / ACID Properties)
    15. SQL Queries, Indexing & Joins
    16. NoSQL Databases (MongoDB, Redis, Firestore)
    17. Compiler Design & Parsing Basics

  * **Category 3: Software Engineering & Web Architecture**
    18. RESTful APIs, WebSockets & GraphQL
    19. Web Technologies (HTML, CSS, JavaScript, DOM)
    20. Frontend Frameworks (React, Vue, Angular)
    21. Backend Development (Node.js, Express, Flask, Django, Spring Boot)
    22. System Caching & Message Queues (Redis, RabbitMQ, Kafka)
    23. Web Security (JWT, OAuth, CORS, XSS, CSRF)
    24. Git Version Control & CI/CD Pipelines
    25. Docker, Containers & Kubernetes
    26. Cloud Computing Services (AWS, GCP, Azure, Firebase)
    27. Linux Shell Scripting & Command Line Tools

  * **Category 4: AI, ML & Advanced Emerging Tech**
    28. Machine Learning Basics (Regression, Classification, Clustering)
    29. Deep Learning & Neural Networks (CNN, RNN, Transformers)
    30. Natural Language Processing (NLP) & Sentiment Analysis
    31. LLMs, Prompting & AI API Integration (Gemini, OpenAI, Claude)
    32. Vector Databases & Embeddings (Pinecone, Chroma, FAISS)
    33. RAG Architecture & AI Agents Frameworks
    34. AI Code Generation & Vibe Coding Tools (Cursor, AI Studio, GitHub Copilot)
    35. Computer Vision & OpenCV Basics
    36. Big Data Pipelines (Spark, Hadoop, PySpark)

  * **Category 5: Testing, QA & Maintenance**
    37. Unit Testing, Mocking & Test-Driven Development (TDD)
    38. Code Refactoring, Optimization & Profiling
    39. Software Debugging & Stack Trace Analysis

  * **Category 6: Aptitude, Reasoning & Business Logic**
    40. Quantitative Aptitude & Mathematics
    41. Logical Reasoning & Data Interpretation
    42. Analytical Puzzles & Lateral Thinking
    43. Verbal Ability & Technical Communication
    44. Case Study & Business Problem Solving
    45. Code Output Prediction & Tracing

  * **Category 7: Behavioral & Professional Context**
    46. Project Deep-Dive & Architecture Explanation
    47. Internship Experience & Contribution Highlights
    48. System Trade-offs & Engineering Decision Making
    49. Conflict Resolution & Teamwork Scenarios
    50. Resume Verification & Tech Stack Validation

* **Firestore Data Type:** `Array of Strings`

### Question 9: Specific Coding or Technical Questions (OPTIONAL)
* **Question Text:** "Share any specific coding problems, SQL queries, or technical questions you remember."
* **UI Component:** Multi-line Text Area (Max 1000 characters).
* **Firestore Data Type:** `String`

### Question 10: Behavioral & HR Questions (OPTIONAL)
* **Question Text:** "What HR or situational questions were you asked?"
* **UI Component:** Multi-line Text Area (Max 1000 characters).
* **Firestore Data Type:** `String`

### Question 11: Tips & Advice for Juniors (OPTIONAL)
* **Question Text:** "Any final tips, warnings, or key preparation resources for your juniors?"
* **UI Component:** Multi-line Text Area (Max 1000 characters).
* **Firestore Data Type:** `String`

---
*End of Specification*