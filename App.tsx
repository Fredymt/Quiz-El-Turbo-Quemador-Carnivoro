
import React, { useState } from 'react';
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
import { AppStep, UserAnswers, Gender, AgeRange, ActivityLevel, Goal, HeightData, WeightData, DerivedStats, DietFamiliarity, MeatType, FishConsumption } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.WELCOME);
  const [progress, setProgress] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

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
    // 1. Calculate and Normalize Data
    const currentWeight = answers.weight!;
    const height = answers.height!;

    // Helper: Convert to KG
    const toKg = (data: WeightData) => data.unit === 'kg' ? data.value : data.value * 0.453592;
    
    // Helper: Convert Height to Meters
    const getHeightMeters = (h: HeightData) => {
      if (h.unit === 'cm' && h.valueCm) return h.valueCm / 100;
      if (h.unit === 'ft' && h.valueFt !== undefined && h.valueIn !== undefined) {
        return (h.valueFt * 30.48 + h.valueIn * 2.54) / 100;
      }
      return 1.70; // Default fallback
    };

    const currentKg = toKg(currentWeight);
    const targetKg = toKg(targetWeightData);
    const heightM = getHeightMeters(height);

    // Calculate Difference
    const diff = currentKg - targetKg;
    let direction: 'lose' | 'gain' | 'maintain' = 'maintain';
    if (diff > 0.5) direction = 'lose';
    if (diff < -0.5) direction = 'gain';

    // Calculate BMI
    // Formula: kg / m^2
    const bmiVal = currentKg / (heightM * heightM);
    const bmi = parseFloat(bmiVal.toFixed(1));
    
    // BMI Category and Risk
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

    // Calculate Ideal Weight Range (BMI 18.5 - 24.9)
    const idealWeightMin = parseFloat((18.5 * heightM * heightM).toFixed(1));
    const idealWeightMax = parseFloat((24.9 * heightM * heightM).toFixed(1));

    // Calculate Difference to Ideal (Max)
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

    // Move to Processing Screen
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
    setCurrentStep(AppStep.RESULTS); // Final step or Next Funnel Stage
    setProgress(100);
  };

  const handleBack = () => {
    switch (currentStep) {
      case AppStep.GENDER:
        setCurrentStep(AppStep.WELCOME);
        setProgress(0);
        break;
      case AppStep.AGE:
        setCurrentStep(AppStep.GENDER);
        setProgress(5);
        break;
      case AppStep.INFO_WEIGHT:
        setCurrentStep(AppStep.AGE);
        setProgress(10);
        break;
      case AppStep.ACTIVITY:
        setCurrentStep(AppStep.INFO_WEIGHT);
        setProgress(15);
        break;
      case AppStep.GOAL:
        setCurrentStep(AppStep.ACTIVITY);
        setProgress(20);
        break;
      case AppStep.HEIGHT:
        setCurrentStep(AppStep.GOAL);
        setProgress(25);
        break;
      case AppStep.WEIGHT:
        setCurrentStep(AppStep.HEIGHT);
        setProgress(35);
        break;
      case AppStep.TARGET_WEIGHT:
        setCurrentStep(AppStep.WEIGHT);
        setProgress(45);
        break;
      case AppStep.BMI_RESULT:
        setCurrentStep(AppStep.TARGET_WEIGHT);
        setProgress(55);
        break;
      case AppStep.IDEAL_WEIGHT:
        setCurrentStep(AppStep.BMI_RESULT);
        setProgress(75);
        break;
      case AppStep.DIET_FAMILIARITY:
        setCurrentStep(AppStep.IDEAL_WEIGHT);
        setProgress(85);
        break;
      case AppStep.MEAT_PREFERENCE:
        setCurrentStep(AppStep.DIET_FAMILIARITY);
        setProgress(90);
        break;
      case AppStep.FISH_CONSUMPTION:
        setCurrentStep(AppStep.MEAT_PREFERENCE);
        setProgress(95);
        break;
      case AppStep.DIET_EXPLANATION:
        setCurrentStep(AppStep.FISH_CONSUMPTION);
        setProgress(98);
        break;
      default:
        break;
    }
  };

  // Screen Rendering Logic
  const renderScreen = () => {
    // SECURITY CHECK
    if ((currentStep === AppStep.BMI_RESULT || 
         currentStep === AppStep.IDEAL_WEIGHT || 
         currentStep === AppStep.PROCESSING || 
         currentStep === AppStep.DIET_FAMILIARITY ||
         currentStep === AppStep.MEAT_PREFERENCE ||
         currentStep === AppStep.FISH_CONSUMPTION ||
         currentStep === AppStep.DIET_EXPLANATION) && !answers.derived) {
      return <WelcomeScreen onStart={handleStartQuiz} />;
    }

    switch (currentStep) {
      case AppStep.WELCOME:
        return <WelcomeScreen onStart={handleStartQuiz} />;
      case AppStep.GENDER:
        return <GenderQuestion onSelect={handleGenderSelect} />;
      case AppStep.AGE:
        return <AgeQuestion onSelect={handleAgeSelect} />;
      case AppStep.INFO_WEIGHT:
        return <WeightHealthInfo onContinue={handleInfoContinue} />;
      case AppStep.ACTIVITY:
        return <ActivityQuestion onSelect={handleActivitySelect} />;
      case AppStep.GOAL:
        return <GoalQuestion onSelect={handleGoalSelect} />;
      case AppStep.HEIGHT:
        return <HeightQuestion onNext={handleHeightSelect} />;
      case AppStep.WEIGHT:
        return <WeightQuestion onNext={handleWeightSelect} />;
      case AppStep.TARGET_WEIGHT:
        return <TargetWeightQuestion onNext={handleTargetWeightSelect} />;
      case AppStep.PROCESSING:
        return <ProcessingScreen onComplete={handleProcessingComplete} />;
      case AppStep.BMI_RESULT:
        return (
          <BMIResultScreen 
            stats={answers.derived!} 
            gender={answers.gender || 'male'} 
            onNext={handleBMIResultNext} 
          />
        );
      case AppStep.IDEAL_WEIGHT:
        return (
          <IdealWeightScreen
            stats={answers.derived!}
            gender={answers.gender || 'male'}
            onNext={handleIdealWeightNext}
          />
        );
      case AppStep.DIET_FAMILIARITY:
        return <DietFamiliarityScreen onSelect={handleDietFamiliaritySelect} />;
      case AppStep.MEAT_PREFERENCE:
        return <MeatPreferenceScreen onNext={handleMeatPreferenceNext} />;
      case AppStep.FISH_CONSUMPTION:
        return <FishConsumptionScreen onSelect={handleFishConsumptionSelect} />;
      case AppStep.DIET_EXPLANATION:
        return <DietExplanationScreen onNext={handleDietExplanationNext} />;
      case AppStep.RESULTS:
        return (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Próxima Etapa...</h2>
          </div>
        );
      default:
        return <WelcomeScreen onStart={handleStartQuiz} />;
    }
  };

  return (
    <Layout 
      progress={progress} 
      showBackArrow={currentStep !== AppStep.WELCOME && currentStep !== AppStep.PROCESSING}
      onBack={handleBack}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;
