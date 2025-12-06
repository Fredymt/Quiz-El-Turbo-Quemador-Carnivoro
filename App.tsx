import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './views/WelcomeScreen';
import { GenderQuestion } from './views/GenderQuestion';
import { AgeQuestion } from './views/AgeQuestion';
import { WeightHealthInfo } from './views/WeightHealthInfo';
import { ActivityQuestion } from './views/ActivityQuestion';
import { AppStep, UserAnswers, Gender, AgeRange, ActivityLevel } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.WELCOME);
  const [progress, setProgress] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

  // Navigation Handlers
  const handleStartQuiz = () => {
    setCurrentStep(AppStep.GENDER);
    setProgress(15);
  };

  const handleGenderSelect = (gender: Gender) => {
    setAnswers(prev => ({ ...prev, gender }));
    // Move to Age Question
    setCurrentStep(AppStep.AGE);
    setProgress(30); 
  };

  const handleAgeSelect = (ageRange: AgeRange) => {
    setAnswers(prev => ({ ...prev, ageRange }));
    // Move to Weight Info
    setCurrentStep(AppStep.INFO_WEIGHT);
    setProgress(45);
  };

  const handleInfoContinue = () => {
    // Move to Activity Question
    setCurrentStep(AppStep.ACTIVITY);
    setProgress(60); 
  };

  const handleActivitySelect = (activityLevel: ActivityLevel) => {
    setAnswers(prev => ({ ...prev, activityLevel }));
    console.log("Activity selected:", activityLevel);
    // TODO: Move to next step (Page 6)
    setProgress(75);
    // setCurrentStep(AppStep.NEXT_STEP);
  };

  const handleBack = () => {
    switch (currentStep) {
      case AppStep.GENDER:
        setCurrentStep(AppStep.WELCOME);
        setProgress(0);
        break;
      case AppStep.AGE:
        setCurrentStep(AppStep.GENDER);
        setProgress(15);
        break;
      case AppStep.INFO_WEIGHT:
        setCurrentStep(AppStep.AGE);
        setProgress(30);
        break;
      case AppStep.ACTIVITY:
        setCurrentStep(AppStep.INFO_WEIGHT);
        setProgress(45);
        break;
      default:
        break;
    }
  };

  // Screen Rendering Logic
  const renderScreen = () => {
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
      case AppStep.RESULTS:
        return <div>Resultados</div>;
      default:
        return <WelcomeScreen onStart={handleStartQuiz} />;
    }
  };

  return (
    <Layout 
      progress={progress} 
      showBackArrow={currentStep !== AppStep.WELCOME}
      onBack={handleBack}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;