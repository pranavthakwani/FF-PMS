export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'employee';
  team_id?: string;
}

export interface Feedback {
  id: string;
  manager_id: string;
  employee_id: string;
  manager_name: string;
  employee_name: string;
  strengths: string;
  areas_to_improve: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
  created_at: string;
  updated_at: string;
  acknowledged: boolean;
}

export interface Acknowledgment {
  id: string;
  feedback_id: string;
  employee_id: string;
  acknowledged_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface FeedbackStats {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}