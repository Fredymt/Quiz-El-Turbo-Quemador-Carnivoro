
export enum AppStep {
  WELCOME = 'WELCOME',
  GENDER = 'GENDER',
  AGE = 'AGE',
  INFO_WEIGHT = 'INFO_WEIGHT',
  ACTIVITY = 'ACTIVITY',
  RESULTS = 'RESULTS'
}

export type Gender = 'male' | 'female';
export type AgeRange = '18-29' | '30-39' | '40-49' | '50+';
export type ActivityLevel = 'none' | 'light' | 'moderate' | 'active' | 'intense';

export interface UserAnswers {
  gender?: Gender;
  ageRange?: AgeRange;
  activityLevel?: ActivityLevel;
}

export interface QuizState {
  currentStep: AppStep;
  progress: number; // 0 to 100
  answers: UserAnswers;
}