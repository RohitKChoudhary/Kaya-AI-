import { useEffect, useState } from "react";
import { Brain, Sparkles, CheckCircle2 } from "lucide-react";

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Parsing your resume...", icon: Sparkles, duration: 2000 },
    { label: "Generating ideal resume...", icon: Brain, duration: 3000 },
    { label: "Evaluating with AI ensemble...", icon: Brain, duration: 3000 },
    { label: "Analyzing gaps...", icon: Sparkles, duration: 2000 },
    { label: "Synthesizing recommendations...", icon: CheckCircle2, duration: 2000 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setTimeout(onComplete, 1000);
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center space-y-8">
          {/* Animated Brain Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl animate-pulse" />
            <div className="relative p-6 rounded-3xl bg-gradient-primary shadow-glow">
              <Brain className="w-20 h-20 text-primary-foreground animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Analyzing Your Resume
            </h2>
            <p className="text-muted-foreground">
              Our AI ensemble is processing your information...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% complete
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 mt-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isComplete = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <div
                  key={index}
                  className={`
                    flex items-center gap-4 p-4 rounded-lg border transition-all duration-300
                    ${isCurrent ? 'border-primary bg-primary/5 shadow-elegant' : ''}
                    ${isComplete ? 'border-success bg-success/5' : ''}
                    ${!isCurrent && !isComplete ? 'border-border bg-card/50 opacity-50' : ''}
                  `}
                >
                  <div className={`
                    p-2 rounded-full transition-colors
                    ${isCurrent ? 'bg-primary text-primary-foreground' : ''}
                    ${isComplete ? 'bg-success text-success-foreground' : ''}
                    ${!isCurrent && !isComplete ? 'bg-muted text-muted-foreground' : ''}
                  `}>
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <StepIcon className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} />
                    )}
                  </div>
                  <p className={`
                    font-medium
                    ${isCurrent ? 'text-foreground' : ''}
                    ${isComplete ? 'text-success' : ''}
                    ${!isCurrent && !isComplete ? 'text-muted-foreground' : ''}
                  `}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Fun fact or tip */}
          <p className="text-sm text-muted-foreground italic">
            💡 Tip: A well-crafted resume can increase your interview chances by up to 40%
          </p>
        </div>
      </div>
    </div>
  );
};
