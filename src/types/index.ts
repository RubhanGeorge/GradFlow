export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type RoundNumber = 1 | 2 | 3 | 4 | 5;

export interface QuestionStyleDistribution {
  techPercent: number;
  techDifficulty: Difficulty;
  aiPercent: number;
  aiDifficulty: Difficulty;
  aptitudePercent: number;
  aptitudeDifficulty: Difficulty;
}

export interface InterviewFeedback {
  id?: string;
  company: string;
  role: string;
  round: RoundNumber;
  durationMinutes: number;
  overallDifficulty: Difficulty;
  panelTypes: string[];
  questionStyles: QuestionStyleDistribution;
  topicsTested: string[];
  technicalQuestions?: string;
  hrQuestions?: string;
  juniorTips?: string;
  submittedAt: string | number | { seconds: number; nanoseconds: number };
  collegeDomain: string;
  authorUid?: string;
  year?: number;
}

export interface Opportunity {
  id?: string;
  title: string;
  provider: string; // e.g., Unstop, Devpost, Adzuna, Direct
  type: 'Internship' | 'Hackathon' | 'Job' | 'Competition';
  link: string;
  deadline: string;
  location: string;
  requiredSkills: string[];
  descriptionSummary: string;
  stipendOrPrize?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  topics: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  collegeDomain: string;
  usn?: string;
  branch?: string;
  year?: string;
  role: 'student' | 'admin';
}
