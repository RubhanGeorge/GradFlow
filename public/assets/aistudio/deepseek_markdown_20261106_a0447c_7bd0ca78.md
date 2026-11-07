# Career Guidance and Information Portal
**Department:** Computer Science and Engineering (CSE)  
**Team Members:** Shraddha N Kumar (1CR25CS171), S Saanvi (1CR25CS155), Rubhan (1CR25CS145)  
**Mentor:** Mr. Prateek V Kumar

---

## 1. Project Overview
The **Career Guidance and Information Portal** is a centralized, user-friendly web platform designed to help students make informed career decisions. It reduces the confusion of searching across multiple platforms by bringing career options, required skills, courses, internships, and placement preparation resources into one place. 

A core, specialized feature of this portal is the **Anonymous Interview Feedback System**, which collects data from students who have recently attended placement interviews and visualizes this data to help juniors prepare better.

---

## 2. Core Feature: Anonymous Interview Feedback System
To help students prepare for placements effectively, the portal includes a feedback mechanism inspired by platforms like Glassdoor, but with a **college-specific and structured approach**.

### How it Works:
1. **Data Collection:** Right after an interview, students fill out a mobile-friendly form. They select the **Panel Type** (Technical, HR, etc.), **Topics Asked** (DSA, System Design, Aptitude, HR, Other), **Difficulty Level** (Easy, Moderate, Hard), and can leave an **Optional Comment**.
2. **Anonymity & Privacy:** Student identities and individual responses are kept strictly private. 
3. **Data Visualization:** The backend aggregates the responses and displays them on a **Company Dashboard** as topic-wise percentages and year-on-year trends (e.g., 2022–2025).
4. **College-Specific Insights:** Unlike global tools, this data is exclusively from our college, ensuring relevance. 

### Differences from Existing Tools (e.g., Glassdoor):
* **College-Specific:** Feedback is collected only from students of our college.
* **MCQ-Based:** Structured input (topics, panel type, difficulty) rather than open-ended text.
* **Percentage-Based:** Results are displayed as aggregated topic-wise percentages.
* **Trend Analysis:** Compares interview patterns across different placement years.

---

## 3. Broader Project Objectives
* Help students explore different career options based on their interests and skills.
* Provide information about courses, colleges, educational programs, internships, and jobs.
* Guide students on the skills and qualifications required for their desired careers.
* Provide personalized career recommendations based on student profiles.
* Centralize all career-related information into a single, user-friendly platform.

---

## 4. Tech Stack & Development Tools
* **Frontend:** HTML, CSS, JavaScript (Focus on a **Mobile-First** design, as feedback forms will mostly be filled on phones immediately after interviews).
* **Backend:** Python, Flask *(Note: Will transition to Firebase for database/auth integration)*.
* **Database:** **Firebase Firestore**.
* **Development Tool:** **Google AI Studio** (Using "Vibe Coding" for rapid development).
* **Compatibility:** Cross-browser compatible (Chrome, Safari, Firefox, Edge, etc.).
* **Version Control:** Git & GitHub.

---

## 5. Authentication & Security (Data Integrity)
To ensure the accuracy of the displayed stats, the portal prevents "fake" users from submitting feedback. 
* **Strict Validation:** During signup/login, users must use their official college email ID.
* **Domain Whitelisting:** The system will check the email domain against a pre-loaded list of valid colleges (e.g., `username@cmrit.ac.in`). 
* **Access Control:** Only authenticated users with valid college domains will be allowed to access and submit the feedback form.

---

## 6. AI Integration & Automation (Add-On Features)
To make the portal a true "career guide," AI and automation will be used for supplementary features:

### A. Automated Opportunity Scraper (Internships & Hackathons)
* **Goal:** Display the latest internships, hackathons, and career opportunities.
* **Execution:** An automated script (e.g., Firebase Cloud Function) will run at midnight (low traffic) to fetch data from APIs (like Unstop, Devpost, Adzuna) or scrape specific sites. 
* **AI Usage:** A free AI model (like **Google Gemini 1.5 Flash**) will be used to summarize the fetched data, categorize it, and format it before saving it to Firestore.

### B. AI-Powered Course Recommendations
* Based on the topics students select in the feedback forms (e.g., struggling with DSA), the portal will use AI to recommend specific free courses or resources to help them improve.

### C. AI-Generated Quizzes (Low Priority)
* If time permits, the AI (Gemini Flash) will be used to generate dynamic quizzes based on the topics selected by the user, helping them test their preparation.

---

## 7. System Flow
`Student (attends interview & fills form anonymously on mobile)` → `Feedback Form (panel type, topics, difficulty)` → `Firestore Database (stores anonymously with timestamp)` → `Data Analysis (calculates percentages & trends)` → `Company Dashboard (displays visual charts)`.

---

## 8. Relevance of the Project
Students often struggle to find reliable, centralized information about aptitude tests, courses, scholarships, internships, and placement opportunities. This project provides a centralized platform that reduces the time spent searching across different platforms. By identifying skill gaps and providing real, college-specific interview data, it supports better career decisions and helps students plan their futures confidently.

---

## 9. Development Roadmap (Starting from Zero)
Since development is starting from scratch using Google AI Studio, the following roadmap will be followed:

* **Phase 1: Foundation & Auth:** Set up Firebase, implement Email/Password authentication, and write the domain validation logic (e.g., `@cmrit.ac.in`).
* **Phase 2: Feedback System:** Build the mobile-first HTML/CSS feedback form. Write the JavaScript to push the MCQ data to Firestore.
* **Phase 3: Dashboard & Charts:** Use a charting library (like Chart.js or ApexCharts) to query Firestore and render topic-wise percentages and year-on-year trends.
* **Phase 4: AI Add-ons:** Integrate the Gemini API for course recommendations and set up the midnight automated fetching of internships/hackathons.

---
*End of Document*