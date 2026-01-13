
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './views/WelcomeScreen';
import { GenderQuestion } from './views/GenderQuestion';
import { AgeQuestion } from './views/AgeQuestion';
import { WeightHealthInfo } from './views/WeightHealthInfo';
import { ActivityQuestion } from './views/ActivityQuestion';
import { GoalQuestion } from './views/GoalQuestion';
import { HeightQuestion } from './views/HeightQuestion';
import { WeightQuestion } from './views/WeightQuestion';
import { TargetWeightQuestion } from './views/TargetWeightQuestion';
import { ProcessingScreen } from './views/ProcessingScreen';
import { BMIResultScreen } from './views/BMIResultScreen';
import { IdealWeightScreen } from './views/IdealWeightScreen';
import { DietFamiliarityScreen } from './views/DietFamiliarityScreen';
import { MeatPreferenceScreen } from './views/MeatPreferenceScreen';
import { FishConsumptionScreen } from './views/FishConsumptionScreen';
import { DietExplanationScreen } from './views/DietExplanationScreen';
import { MotivationScreen } from './views/MotivationScreen';
import { WaterIntakeScreen } from './views/WaterIntakeScreen';
import { DailyRoutineScreen } from './views/DailyRoutineScreen';
import { SleepQuestion } from './views/SleepQuestion';
import { WeightSatisfactionScreen } from './views/WeightSatisfactionScreen';
import { BenefitsScreen } from './views/BenefitsScreen';
import { FastResultsScreen } from './views/FastResultsScreen';
import { PersonalPlanScreen } from './views/PersonalPlanScreen';
import { ResultsProjectionScreen } from './views/ResultsProjectionScreen';
import { FinalOfferScreen } from './views/FinalOfferScreen'; 
import { AppStep, UserAnswers, Gender, AgeRange, ActivityLevel, Goal, HeightData, WeightData, DerivedStats, DietFamiliarity, MeatType, FishConsumption, WaterIntake, HydrationLevel, DailyRoutine, MetabolicActivity, SleepHours, SleepQuality, WeightSatisfactionTime, EmotionalState, ProjectionPoint, FinalProjection } from './types';

const SIMULATION_DATE = new Date(2025, 11, 8); 

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.WELCOME);
  const [progress, setProgress] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

  // Meta Pixel PageView Tracking on step change
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView', { step: currentStep });
    }
  }, [currentStep]);

  // Navigation Handlers
  const handleStartQuiz = () => {
    setCurrentStep(AppStep.GENDER);
    setProgress(5);
  };

  const handleGenderSelect = (gender: Gender) => {
    setAnswers(prev => ({ ...prev, gender }));
    setCurrentStep(AppStep.AGE);
    setProgress(10); 
  };

  const handleAgeSelect = (ageRange: AgeRange) => {
    setAnswers(prev => ({ ...prev, ageRange }));
    setCurrentStep(AppStep.INFO_WEIGHT);
    setProgress(15);
  };

  const handleInfoContinue = () => {
    setCurrentStep(AppStep.ACTIVITY);
    setProgress(20); 
  };

  const handleActivitySelect = (activityLevel: ActivityLevel) => {
    setAnswers(prev => ({ ...prev, activityLevel }));
    setCurrentStep(AppStep.GOAL);
    setProgress(25);
  };

  const handleGoalSelect = (goal: Goal) => {
    setAnswers(prev => ({ ...prev, goal }));
    setCurrentStep(AppStep.HEIGHT);
    setProgress(35);
  };

  const handleHeightSelect = (heightData: HeightData) => {
    setAnswers(prev => ({ ...prev, height: heightData }));
    setCurrentStep(AppStep.WEIGHT);
    setProgress(45);
  };

  const handleWeightSelect = (weightData: WeightData) => {
    setAnswers(prev => ({ ...prev, weight: weightData }));
    setCurrentStep(AppStep.TARGET_WEIGHT);
    setProgress(55);
  };

  const handleTargetWeightSelect = (targetWeightData: WeightData) => {
    const currentWeight = answers.weight!;
    const height = answers.height!;

    const toKg = (data: WeightData) => data.unit === 'kg' ? data.value : data.value * 0.453592;
    
    const getHeightMeters = (h: HeightData) => {
      if (h.unit === 'cm' && h.valueCm) return h.valueCm / 100;
      if (h.unit === 'ft' && h.valueFt !== undefined && h.valueIn !== undefined) {
        return (h.valueFt * 30.48 + h.valueIn * 2.54) / 100;
      }
      return 1.70; 
    };

    const currentKg = toKg(currentWeight);
    const targetKg = toKg(targetWeightData);
    const heightM = getHeightMeters(height);

    const diff = currentKg - targetKg;
    let direction: 'lose' | 'gain' | 'maintain' = 'maintain';
    if (diff > 0.5) direction = 'lose';
    if (diff < -0.5) direction = 'gain';

    const bmiVal = currentKg / (heightM * heightM);
    const bmi = parseFloat(bmiVal.toFixed(1));
    
    let bmiCategory = "Peso normal";
    let risk = "Riesgo bajo. Tendencia saludable general.";

    if (bmi < 18.5) {
      bmiCategory = "Bajo peso";
      risk = "Riesgo por nutrición insuficiente y metabolismo inestable.";
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = "Peso normal";
      risk = "Riesgo bajo. Tendencia saludable general.";
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = "Sobrepeso";
      risk = "Mayor riesgo de aumento de peso, resistencia a la insulina y baja energía.";
    } else if (bmi >= 30) {
      bmiCategory = "Obesidad";
      risk = "Alto riesgo: alteraciones metabólicas, inflamación y dificultad para quemar grasa.";
    }

    const idealWeightMin = parseFloat((18.5 * heightM * heightM).toFixed(1));
    const idealWeightMax = parseFloat((24.9 * heightM * heightM).toFixed(1));
    const differenceToIdeal = parseFloat((currentKg - idealWeightMax).toFixed(1));

    const derived: DerivedStats = {
      heightM,
      currentWeightKg: currentKg,
      targetWeightKg: targetKg,
      weightDifferenceKg: diff,
      goalDirection: direction,
      bmi,
      bmiCategory,
      risk,
      idealWeightMin,
      idealWeightMax,
      differenceToIdeal
    };

    setAnswers(prev => ({ 
      ...prev, 
      targetWeight: targetWeightData,
      derived
    }));

    setProgress(65);
    setCurrentStep(AppStep.PROCESSING); 
  };

  const handleProcessingComplete = () => {
    setCurrentStep(AppStep.BMI_RESULT);
    setProgress(75);
  };

  const handleBMIResultNext = () => {
    setCurrentStep(AppStep.IDEAL_WEIGHT);
    setProgress(85);
  };

  const handleIdealWeightNext = () => {
    setCurrentStep(AppStep.DIET_FAMILIARITY);
    setProgress(90);
  };

  const handleDietFamiliaritySelect = (familiarity: DietFamiliarity) => {
    setAnswers(prev => ({ ...prev, dietFamiliarity: familiarity }));
    setCurrentStep(AppStep.MEAT_PREFERENCE);
    setProgress(95);
  };

  const handleMeatPreferenceNext = (selectedMeats: MeatType[]) => {
    const includeAll = selectedMeats.includes('all');
    setAnswers(prev => ({
      ...prev,
      preferredMeats: selectedMeats,
      includeAllMeats: includeAll
    }));
    setCurrentStep(AppStep.FISH_CONSUMPTION);
    setProgress(98);
  };

  const handleFishConsumptionSelect = (fishConsumption: FishConsumption) => {
    setAnswers(prev => ({ ...prev, fishConsumption }));
    setCurrentStep(AppStep.DIET_EXPLANATION);
    setProgress(100);
  };

  const handleDietExplanationNext = () => {
    setCurrentStep(AppStep.MOTIVATION);
    setProgress(100);
  };

  const handleMotivationNext = () => {
    setCurrentStep(AppStep.WATER_INTAKE);
    setProgress(100); 
  };

  const handleWaterIntakeSelect = (waterIntake: WaterIntake) => {
    let hydrationLevel: HydrationLevel = 'unknown';
    switch (waterIntake) {
      case 'coffee_tea': hydrationLevel = 'very_low'; break;
      case 'less_16oz': hydrationLevel = 'low'; break;
      case '16_48oz': hydrationLevel = 'moderate'; break;
      case '56_80oz': hydrationLevel = 'high'; break;
      case 'no_count': hydrationLevel = 'unknown'; break;
    }
    setAnswers(prev => ({ ...prev, waterIntake, hydrationLevel }));
    setCurrentStep(AppStep.DAILY_ROUTINE);
    setProgress(100);
  };

  const handleDailyRoutineSelect = (dailyRoutine: DailyRoutine) => {
    let metabolicActivity: MetabolicActivity = 'sedentary';
    if (dailyRoutine === 'desk_job' || dailyRoutine === 'home') {
      metabolicActivity = 'sedentary';
    } else if (dailyRoutine === 'active_move') {
      metabolicActivity = 'active';
    } else if (dailyRoutine === 'always_exercise') {
      metabolicActivity = 'very_active';
    }
    setAnswers(prev => ({ ...prev, dailyRoutine, metabolicActivity }));
    setCurrentStep(AppStep.SLEEP);
    setProgress(100);
  };

  const handleSleepSelect = (sleepHours: SleepHours) => {
    let sleepQuality: SleepQuality = 'ideal';
    switch (sleepHours) {
      case 'less_than_5': sleepQuality = 'very_low'; break;
      case '5_6': sleepQuality = 'low'; break;
      case '7_8': sleepQuality = 'ideal'; break;
      case 'more_than_8': sleepQuality = 'good'; break;
    }
    setAnswers(prev => ({ ...prev, sleepHours, sleepQuality }));
    setCurrentStep(AppStep.WEIGHT_SATISFACTION);
    setProgress(100);
  };

  const handleWeightSatisfactionSelect = (time: WeightSatisfactionTime) => {
    let emotionalState: EmotionalState = 'moderate';
    switch (time) {
      case 'less_than_year': emotionalState = 'recent'; break;
      case 'one_to_three_years': emotionalState = 'moderate'; break;
      case 'more_than_three_years': emotionalState = 'chronic'; break;
      case 'never': emotionalState = 'lifelong'; break;
    }
    setAnswers(prev => ({ ...prev, weightSatisfactionTime: time, emotionalState }));
    setCurrentStep(AppStep.BENEFITS_INFO);
    setProgress(100);
  };

  const handleBenefitsNext = () => {
    setCurrentStep(AppStep.FAST_RESULTS);
    setProgress(100);
  };

  const handleFastResultsNext = () => {
    setCurrentStep(AppStep.PERSONAL_PLAN);
    setProgress(100);
  };

  const handlePersonalPlanNext = (email: string) => {
    setAnswers(prev => ({ ...prev, email }));
    
    // TRACK META LEAD EVENT
    if (window.fbq) {
      window.fbq('track', 'Lead', { email: email });
    }

    if (!answers.derived) return;

    const currentWeight = answers.derived.currentWeightKg;
    const targetWeight = answers.derived.targetWeightKg;
    const bmi = answers.derived.bmi;
    const activityLevel = answers.activityLevel || 'moderate';
    const dietFamiliarity = answers.dietFamiliarity || 'beginner';

    let minLoss = 0;
    let maxLoss = 0;
    if (bmi < 25) { minLoss = 0.25; maxLoss = 0.5; }
    else if (bmi < 30) { minLoss = 0.5; maxLoss = 1.0; }
    else { minLoss = 0.8; maxLoss = 1.5; }

    const activityScores: Record<string, number> = { 'none': 0, 'light': 0.25, 'moderate': 0.5, 'active': 0.75, 'intense': 1.0 };
    const famScores: Record<string, number> = { 'beginner': 0, 'basic': 0.5, 'advanced': 1.0 };
    const actScore = activityScores[activityLevel] || 0.5;
    const famScore = famScores[dietFamiliarity] || 0;
    const factor = (actScore + famScore) / 2;
    const estimatedWeeklyLoss = minLoss + (maxLoss - minLoss) * factor;

    const kgToLose = currentWeight - targetWeight;
    let daysTotal = 30; 
    if (kgToLose > 0) {
      const weeks = kgToLose / estimatedWeeklyLoss;
      daysTotal = Math.round(weeks * 7);
    }
    if (daysTotal < 30) daysTotal = 30;

    const startDate = SIMULATION_DATE ? new Date(SIMULATION_DATE) : new Date();
    const formatDateISO = (d: Date) => d.toISOString().split('T')[0];
    const getMonthLabel = (d: Date) => d.toLocaleString('es-ES', { month: 'short' });
    const getFullDateLabel = (d: Date) => {
        const day = d.getDate();
        const month = d.toLocaleString('es-ES', { month: 'long' });
        return `${day} de ${month}`;
    };

    const points: ProjectionPoint[] = [];
    points.push({ orden: 1, date: formatDateISO(startDate), weight: currentWeight, labelX: 'Hoy', labelWeight: `${Math.round(currentWeight)} kg`, x: 0, y: 0 });
    const p2Date = new Date(startDate); p2Date.setDate(startDate.getDate() + Math.round(daysTotal * 0.33));
    const p2Weight = currentWeight - (kgToLose > 0 ? (kgToLose * 0.40) : 0);
    points.push({ orden: 2, date: formatDateISO(p2Date), weight: parseFloat(p2Weight.toFixed(1)), labelX: getMonthLabel(p2Date), labelWeight: `${parseFloat(p2Weight.toFixed(1))} kg`, x: 33, y: 0 });
    const p3Date = new Date(startDate); p3Date.setDate(startDate.getDate() + Math.round(daysTotal * 0.66));
    const p3Weight = currentWeight - (kgToLose > 0 ? (kgToLose * 0.75) : 0);
    points.push({ orden: 3, date: formatDateISO(p3Date), weight: parseFloat(p3Weight.toFixed(1)), labelX: getMonthLabel(p3Date), labelWeight: `${parseFloat(p3Weight.toFixed(1))} kg`, x: 66, y: 0 });
    const targetDate = new Date(startDate); targetDate.setDate(startDate.getDate() + daysTotal);
    points.push({ orden: 4, date: formatDateISO(targetDate), weight: targetWeight, labelX: getMonthLabel(targetDate), labelWeight: `Meta ${targetWeight} kg`, x: 100, y: 0 });

    const allWeights = points.map(p => p.weight);
    const minW = Math.min(...allWeights);
    const maxW = Math.max(...allWeights);
    const margin = (maxW - minW) * 0.2 || 5; 
    const scaleMax = maxW + margin;
    const scaleMin = minW - margin;
    const scaleRange = scaleMax - scaleMin;
    points.forEach(p => { p.y = ((scaleMax - p.weight) / scaleRange) * 100; });

    const targetDateLabel = getFullDateLabel(targetDate);
    const finalProjection: FinalProjection = {
      headlineLine1: "En base a tus respuestas,",
      headlineLine2: "predecimos que pesarás", 
      headlineLine3: `${targetWeight} kg el ${targetDateLabel}.`,
      finalWeight: targetWeight,
      finalDate: formatDateISO(targetDate),
      points
    };

    setAnswers(prev => ({ ...prev, derived: { ...prev.derived!, projection: finalProjection } }));
    setCurrentStep(AppStep.FINAL_PROCESSING);
    setProgress(100);
  };

  const handleFinalProcessingComplete = () => {
    setCurrentStep(AppStep.RESULTS);
  };

  const handleResultsContinue = () => {
    if (!answers.derived) return;
    setCurrentStep(AppStep.FINAL_OFFER);
  };

  const handleFinalPurchase = () => {
    alert("¡Gracias por tu compra! Redirigiendo a pasarela de pago...");
  };

  const handleBack = () => {
    switch (currentStep) {
      case AppStep.GENDER: setCurrentStep(AppStep.WELCOME); setProgress(0); break;
      case AppStep.AGE: setCurrentStep(AppStep.GENDER); setProgress(5); break;
      case AppStep.INFO_WEIGHT: setCurrentStep(AppStep.AGE); setProgress(10); break;
      case AppStep.ACTIVITY: setCurrentStep(AppStep.INFO_WEIGHT); setProgress(15); break;
      case AppStep.GOAL: setCurrentStep(AppStep.ACTIVITY); setProgress(20); break;
      case AppStep.HEIGHT: setCurrentStep(AppStep.GOAL); setProgress(25); break;
      case AppStep.WEIGHT: setCurrentStep(AppStep.HEIGHT); setProgress(35); break;
      case AppStep.TARGET_WEIGHT: setCurrentStep(AppStep.WEIGHT); setProgress(45); break;
      case AppStep.BMI_RESULT: setCurrentStep(AppStep.TARGET_WEIGHT); setProgress(55); break;
      case AppStep.IDEAL_WEIGHT: setCurrentStep(AppStep.BMI_RESULT); setProgress(75); break;
      case AppStep.DIET_FAMILIARITY: setCurrentStep(AppStep.IDEAL_WEIGHT); setProgress(85); break;
      case AppStep.MEAT_PREFERENCE: setCurrentStep(AppStep.DIET_FAMILIARITY); setProgress(90); break;
      case AppStep.FISH_CONSUMPTION: setCurrentStep(AppStep.MEAT_PREFERENCE); setProgress(95); break;
      case AppStep.DIET_EXPLANATION: setCurrentStep(AppStep.FISH_CONSUMPTION); setProgress(98); break;
      case AppStep.MOTIVATION: setCurrentStep(AppStep.DIET_EXPLANATION); setProgress(100); break;
      case AppStep.WATER_INTAKE: setCurrentStep(AppStep.MOTIVATION); setProgress(100); break;
      case AppStep.DAILY_ROUTINE: setCurrentStep(AppStep.WATER_INTAKE); setProgress(100); break;
      case AppStep.SLEEP: setCurrentStep(AppStep.DAILY_ROUTINE); setProgress(100); break;
      case AppStep.WEIGHT_SATISFACTION: setCurrentStep(AppStep.SLEEP); setProgress(100); break;
      case AppStep.BENEFITS_INFO: setCurrentStep(AppStep.WEIGHT_SATISFACTION); setProgress(100); break;
      case AppStep.FAST_RESULTS: setCurrentStep(AppStep.BENEFITS_INFO); setProgress(100); break;
      case AppStep.PERSONAL_PLAN: setCurrentStep(AppStep.FAST_RESULTS); setProgress(100); break;
      default: break;
    }
  };

  const renderScreen = () => {
    if ((currentStep === AppStep.BMI_RESULT || currentStep === AppStep.IDEAL_WEIGHT || currentStep === AppStep.PROCESSING || currentStep === AppStep.DIET_FAMILIARITY || currentStep === AppStep.MEAT_PREFERENCE || currentStep === AppStep.FISH_CONSUMPTION || currentStep === AppStep.DIET_EXPLANATION || currentStep === AppStep.MOTIVATION || currentStep === AppStep.WATER_INTAKE || currentStep === AppStep.DAILY_ROUTINE || currentStep === AppStep.SLEEP || currentStep === AppStep.WEIGHT_SATISFACTION || currentStep === AppStep.BENEFITS_INFO || currentStep === AppStep.FAST_RESULTS || currentStep === AppStep.PERSONAL_PLAN || currentStep === AppStep.FINAL_PROCESSING || currentStep === AppStep.RESULTS || currentStep === AppStep.FINAL_OFFER) && !answers.derived) {
      return <WelcomeScreen onStart={handleStartQuiz} />;
    }

    switch (currentStep) {
      case AppStep.WELCOME: return <WelcomeScreen onStart={handleStartQuiz} />;
      case AppStep.GENDER: return <GenderQuestion onSelect={handleGenderSelect} />;
      case AppStep.AGE: return <AgeQuestion onSelect={handleAgeSelect} gender={answers.gender} />;
      case AppStep.INFO_WEIGHT: return <WeightHealthInfo onContinue={handleInfoContinue} />;
      case AppStep.ACTIVITY: return <ActivityQuestion onSelect={handleActivitySelect} />;
      case AppStep.GOAL: return <GoalQuestion onSelect={handleGoalSelect} />;
      case AppStep.HEIGHT: return <HeightQuestion onNext={handleHeightSelect} />;
      case AppStep.WEIGHT: return <WeightQuestion onNext={handleWeightSelect} />;
      case AppStep.TARGET_WEIGHT: return <TargetWeightQuestion onNext={handleTargetWeightSelect} />;
      case AppStep.PROCESSING: return <ProcessingScreen onComplete={handleProcessingComplete} />;
      case AppStep.BMI_RESULT: return <BMIResultScreen stats={answers.derived!} gender={answers.gender || 'male'} onNext={handleBMIResultNext} />;
      case AppStep.IDEAL_WEIGHT: return <IdealWeightScreen stats={answers.derived!} gender={answers.gender || 'male'} onNext={handleIdealWeightNext} />;
      case AppStep.DIET_FAMILIARITY: return <DietFamiliarityScreen onSelect={handleDietFamiliaritySelect} />;
      case AppStep.MEAT_PREFERENCE: return <MeatPreferenceScreen onNext={handleMeatPreferenceNext} />;
      case AppStep.FISH_CONSUMPTION: return <FishConsumptionScreen onSelect={handleFishConsumptionSelect} />;
      case AppStep.DIET_EXPLANATION: return <DietExplanationScreen onNext={handleDietExplanationNext} />;
      case AppStep.MOTIVATION: return <MotivationScreen onNext={handleMotivationNext} />;
      case AppStep.WATER_INTAKE: return <WaterIntakeScreen onSelect={handleWaterIntakeSelect} />;
      case AppStep.DAILY_ROUTINE: return <DailyRoutineScreen onSelect={handleDailyRoutineSelect} />;
      case AppStep.SLEEP: return <SleepQuestion onSelect={handleSleepSelect} />;
      case AppStep.WEIGHT_SATISFACTION: return <WeightSatisfactionScreen onSelect={handleWeightSatisfactionSelect} />;
      case AppStep.BENEFITS_INFO: return <BenefitsScreen onNext={handleBenefitsNext} />;
      case AppStep.FAST_RESULTS: return <FastResultsScreen onNext={handleFastResultsNext} />;
      case AppStep.PERSONAL_PLAN: return <PersonalPlanScreen targetWeight={answers.derived!.targetWeightKg} onNext={handlePersonalPlanNext} />;
      case AppStep.FINAL_PROCESSING: return <ProcessingScreen onComplete={handleFinalProcessingComplete} duration={4000} />;
      case AppStep.RESULTS: return <ResultsProjectionScreen projection={answers.derived!.projection!} onContinue={handleResultsContinue} />;
      case AppStep.FINAL_OFFER: return <FinalOfferScreen userAnswers={answers} onPurchase={handleFinalPurchase} />;
      default: return <WelcomeScreen onStart={handleStartQuiz} />;
    }
  };

  return (
    <Layout 
      progress={progress} 
      showBackArrow={currentStep !== AppStep.WELCOME && currentStep !== AppStep.PROCESSING && currentStep !== AppStep.FINAL_PROCESSING && currentStep !== AppStep.PERSONAL_PLAN && currentStep !== AppStep.RESULTS && currentStep !== AppStep.FINAL_OFFER}
      hideHeader={currentStep === AppStep.FINAL_OFFER} 
      onBack={handleBack}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;
