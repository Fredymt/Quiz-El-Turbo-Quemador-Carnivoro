
export enum AppStep {
  WELCOME = 'WELCOME',
  GENDER = 'GENDER',
  AGE = 'AGE',
  INFO_WEIGHT = 'INFO_WEIGHT',
  ACTIVITY = 'ACTIVITY',
  GOAL = 'GOAL',
  HEIGHT = 'HEIGHT',
  WEIGHT = 'WEIGHT',
  TARGET_WEIGHT = 'TARGET_WEIGHT',
  PROCESSING = 'PROCESSING',
  BMI_RESULT = 'BMI_RESULT',
  IDEAL_WEIGHT = 'IDEAL_WEIGHT',
  DIET_FAMILIARITY = 'DIET_FAMILIARITY',
  MEAT_PREFERENCE = 'MEAT_PREFERENCE',
  FISH_CONSUMPTION = 'FISH_CONSUMPTION',
  DIET_EXPLANATION = 'DIET_EXPLANATION',
  RESULTS = 'RESULTS'
}

export type Gender = 'male' | 'female';
export type AgeRange = '18-29' | '30-39' | '40-49' | '50+';
export type ActivityLevel = 'none' | 'light' | 'moderate' | 'active' | 'intense';
export type Goal = 'lose_weight' | 'gain_energy' | 'improve_health' | 'transformation' | 'confidence';
export type DietFamiliarity = 'beginner' | 'basic' | 'advanced';
export type MeatType = 'all' | 'poultry' | 'pork' | 'beef' | 'lamb' | 'veal';
export type FishConsumption = 'yes' | 'sometimes' | 'no';

export interface HeightData {
  unit: 'cm' | 'ft';
  valueCm?: number;
  valueFt?: number;
  valueIn?: number;
}

export interface WeightData {
  unit: 'kg' | 'lb';
  value: number;
}

export interface DerivedStats {
  heightM: number;
  currentWeightKg: number;
  targetWeightKg: number;
  weightDifferenceKg: number;
  goalDirection: 'lose' | 'gain' | 'maintain';
  bmi: number;
  bmiCategory: string;
  risk: string;
  idealWeightMin: number;
  idealWeightMax: number;
  differenceToIdeal: number;
}

export interface UserAnswers {
  gender?: Gender;
  ageRange?: AgeRange;
  activityLevel?: ActivityLevel;
  goal?: Goal;
  height?: HeightData;
  weight?: WeightData;
  targetWeight?: WeightData;
  derived?: DerivedStats;
  dietFamiliarity?: DietFamiliarity;
  preferredMeats?: MeatType[];
  includeAllMeats?: boolean;
  fishConsumption?: FishConsumption;
}

export interface QuizState {
  currentStep: AppStep;
  progress: number; // 0 to 100
  answers: UserAnswers;
}