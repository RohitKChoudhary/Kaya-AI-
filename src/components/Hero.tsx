import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Target } from "lucide-react";
import heroImage from "@/assets/hero-ai-career.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kaya AI
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Intelligent Career Navigator
          </p>

          {/* Main Description */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Transform your career journey with AI-powered resume analysis. 
            Get personalized insights, identify gaps, and receive actionable 
            recommendations to land your dream job.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 mb-12">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-smooth">
              <Sparkles className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Multi-LLM ensemble approach for accurate career insights
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border hover:border-accent/50 transition-smooth">
              <Target className="w-10 h-10 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Gap Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Identify exactly what's missing from your ideal resume
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border hover:border-success/50 transition-smooth">
              <Brain className="w-10 h-10 text-success mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Personalized action plan to improve your career prospects
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-6 h-auto"
            >
              Let's Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="text-sm text-muted-foreground mt-8">
            Powered by advanced AI • Trusted by professionals worldwide
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
    </div>
  );
};
