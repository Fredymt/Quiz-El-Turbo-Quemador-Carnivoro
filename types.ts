
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
  MOTIVATION = 'MOTIVATION',
  WATER_INTAKE = 'WATER_INTAKE',
  DAILY_ROUTINE = 'DAILY_ROUTINE',
  SLEEP = 'SLEEP',
  WEIGHT_SATISFACTION = 'WEIGHT_SATISFACTION',
  BENEFITS_INFO = 'BENEFITS_INFO',
  FAST_RESULTS = 'FAST_RESULTS',
  PERSONAL_PLAN = 'PERSONAL_PLAN',
  FINAL_PROCESSING = 'FINAL_PROCESSING',
  RESULTS = 'RESULTS',
  FINAL_OFFER = 'FINAL_OFFER'
}

export type Gender = 'male' | 'female';
export type AgeRange = '18-29' | '30-39' | '40-49' | '50+';
export type ActivityLevel = 'none' | 'light' | 'moderate' | 'active' | 'intense';
export type Goal = 'lose_weight' | 'gain_energy' | 'improve_health' | 'transformation' | 'confidence';
export type DietFamiliarity = 'beginner' | 'basic' | 'advanced';
export type MeatType = 'all' | 'poultry' | 'pork' | 'beef' | 'lamb' | 'veal';
export type FishConsumption = 'yes' | 'sometimes' | 'no';
export type WaterIntake = 'coffee_tea' | 'less_16oz' | '16_48oz' | '56_80oz' | 'no_count';
export type HydrationLevel = 'very_low' | 'low' | 'moderate' | 'high' | 'unknown';
export type DailyRoutine = 'desk_job' | 'active_move' | 'always_exercise' | 'home';
export type MetabolicActivity = 'sedentary' | 'active' | 'very_active';
export type SleepHours = 'less_than_5' | '5_6' | '7_8' | 'more_than_8';
export type SleepQuality = 'very_low' | 'low' | 'ideal' | 'good';
export type WeightSatisfactionTime = 'less_than_year' | 'one_to_three_years' | 'more_than_three_years' | 'never';
export type EmotionalState = 'recent' | 'moderate' | 'chronic' | 'lifelong';

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

export interface ProjectionPoint {
  orden: number;
  date: string; // YYYY-MM-DD
  weight: number;
  labelX: string; // "Now", "Feb", etc.
  labelWeight: string; // "96 kg", "Goal 78 kg"
  x: number; // 0-100 for graph positioning
  y: number; // 0-100 for graph positioning
}

export interface FinalProjection {
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  finalWeight: number;
  finalDate: string;
  points: ProjectionPoint[];
}

export interface FinalOfferContent {
  encabezado: string;
  beneficios: string[];
  bono: string;
  garantia: string;
  precio_plan_4_semanas: string;
  precio_plan_12_semanas: string;
  precio_mensual: string;
  boton: string;
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
  projection?: FinalProjection;
  finalOffer?: FinalOfferContent;
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
  waterIntake?: WaterIntake;
  hydrationLevel?: HydrationLevel;
  dailyRoutine?: DailyRoutine;
  metabolicActivity?: MetabolicActivity;
  sleepHours?: SleepHours;
  sleepQuality?: SleepQuality;
  weightSatisfactionTime?: WeightSatisfactionTime;
  emotionalState?: EmotionalState;
  email?: string;
}

export interface QuizState {
  currentStep: AppStep;
  progress: number; // 0 to 100
  answers: UserAnswers;
}