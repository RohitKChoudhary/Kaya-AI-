import { useState } from "react";
import { Hero } from "@/components/Hero";
import { InputForm } from "@/components/InputForm";
import { ProcessingScreen } from "@/components/ProcessingScreen";
import { ResultsDashboard } from "@/components/ResultsDashboard";

type AppState = 'hero' | 'input' | 'processing' | 'results';

interface FormData {
  company: string;
  industry: string;
  roles: string[];
  resumeFile: File | null;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleGetStarted = () => {
    setAppState('input');
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setAppState('processing');
  };

  const handleProcessingComplete = () => {
    // Here you would normally have the API response data
    // For now, we transition to results with mock data
    setAppState('results');
  };

  const handleAnalyzeAnother = () => {
    setFormData(null);
    setAppState('input');
  };

  const handleBackToHome = () => {
    setAppState('hero');
  };

  return (
    <>
      {appState === 'hero' && <Hero onGetStarted={handleGetStarted} />}
      {appState === 'input' && (
        <InputForm onSubmit={handleFormSubmit} onBack={handleBackToHome} />
      )}
      {appState === 'processing' && (
        <ProcessingScreen onComplete={handleProcessingComplete} />
      )}
      {appState === 'results' && (
        <ResultsDashboard onAnalyzeAnother={handleAnalyzeAnother} />
      )}
    </>
  );
};

export default Index;
