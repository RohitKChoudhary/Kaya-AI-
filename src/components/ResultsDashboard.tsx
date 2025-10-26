import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Award, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Download, 
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { toast } from "sonner";

interface ResultsDashboardProps {
  onAnalyzeAnother: () => void;
}

// Mock data - will be replaced with actual API data
const mockResults = {
  overallScore: 7.2,
  analysis: {
    geminiScore: 78,
    chatGPTScore: 73,
    grokScore: 75,
    averageScore: 75.3,
    strengths: [
      "Strong technical skills listed",
      "Clear work experience timeline",
      "Relevant certifications included"
    ],
    weaknesses: [
      "Missing quantifiable achievements",
      "Lacks industry-specific keywords",
      "Education section could be more detailed"
    ]
  },
  idealResume: {
    summary: "Senior Software Engineer with 5+ years of experience in cloud architecture, leading teams of 10+ engineers, and delivering scalable solutions that serve 10M+ users. Expert in AWS, React, and microservices.",
    experience: [
      "Led development of core platform features serving 10M+ users",
      "Architected microservices infrastructure reducing latency by 40%",
      "Mentored team of 5 junior engineers, improving code quality by 30%"
    ],
    skills: ["React", "TypeScript", "AWS", "Docker", "Kubernetes", "Python", "System Design"]
  },
  gaps: [
    {
      category: "Quantifiable Achievements",
      severity: "high",
      description: "Your resume lacks specific metrics and numbers that demonstrate impact",
      examples: ["Users impacted", "Performance improvements", "Team size managed"]
    },
    {
      category: "Keywords",
      severity: "medium",
      description: "Missing industry-standard keywords for your target role",
      missing: ["Cloud Architecture", "CI/CD", "Agile/Scrum", "System Design"]
    },
    {
      category: "Leadership",
      severity: "medium",
      description: "Limited evidence of leadership experience",
      suggestions: ["Mention team leadership", "Cross-functional collaboration", "Mentorship"]
    }
  ],
  recommendations: [
    {
      title: "Add Quantifiable Metrics",
      description: "Include specific numbers showing your impact (users, performance, revenue)",
      priority: "high",
      actionItems: [
        "Review each bullet point and add metrics",
        "Use the STAR method (Situation, Task, Action, Result)",
        "Focus on business impact, not just tasks"
      ]
    },
    {
      title: "Include Missing Keywords",
      description: "Add industry-standard terms to pass ATS screening",
      priority: "high",
      actionItems: [
        "Research job descriptions for target role",
        "Naturally incorporate keywords into experience",
        "Add a technical skills section"
      ]
    },
    {
      title: "Highlight Leadership",
      description: "Emphasize team leadership and mentorship experiences",
      priority: "medium",
      actionItems: [
        "Mention team sizes and cross-functional work",
        "Include mentorship and training activities",
        "Describe project ownership and decision-making"
      ]
    }
  ]
};

export const ResultsDashboard = ({ onAnalyzeAnother }: ResultsDashboardProps) => {
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-destructive";
  };

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, any> = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    return variants[severity] || "secondary";
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackType) {
      toast.error("Please select if the analysis was helpful");
      return;
    }

    // Mock API call to /api/submit-feedback
    console.log("Submitting feedback:", { feedbackType, feedbackText });
    
    toast.success("Thank you for your feedback!");
    setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header with Score */}
        <Card className="p-8 mb-8 shadow-elegant">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">Resume Analysis Complete</h1>
              <p className="text-muted-foreground">
                Here's your comprehensive career report
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-2 text-sm font-medium text-muted-foreground">Overall Score</div>
              <div className={`text-6xl font-bold ${getScoreColor(mockResults.overallScore)}`}>
                {mockResults.overallScore}
              </div>
              <div className="text-sm text-muted-foreground">out of 10</div>
            </div>
          </div>
        </Card>

        {/* Tabs for Different Sections */}
        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="analysis" className="flex items-center gap-2 py-3">
              <Award className="w-4 h-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="ideal" className="flex items-center gap-2 py-3">
              <Target className="w-4 h-4" />
              Ideal Resume
            </TabsTrigger>
            <TabsTrigger value="gaps" className="flex items-center gap-2 py-3">
              <AlertCircle className="w-4 h-4" />
              Gap Analysis
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 py-3">
              <Lightbulb className="w-4 h-4" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Ensemble Scores
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: "Gemini", score: mockResults.analysis.geminiScore },
                  { name: "ChatGPT", score: mockResults.analysis.chatGPTScore },
                  { name: "Grok", score: mockResults.analysis.grokScore },
                ].map((model) => (
                  <div key={model.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{model.name}</span>
                      <span className="text-muted-foreground">{model.score}/100</span>
                    </div>
                    <Progress value={model.score} className="h-2" />
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Average Score</span>
                    <span className="font-semibold text-primary">{mockResults.analysis.averageScore}/100</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-5 h-5" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {mockResults.analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-warning">
                  <AlertCircle className="w-5 h-5" />
                  Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {mockResults.analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning mt-1 flex-shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* Ideal Resume Tab */}
          <TabsContent value="ideal" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                {mockResults.idealResume.summary}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Key Experience Points</h3>
              <ul className="space-y-3">
                {mockResults.idealResume.experience.map((exp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Essential Skills</h3>
              <div className="flex flex-wrap gap-2">
                {mockResults.idealResume.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Gap Analysis Tab */}
          <TabsContent value="gaps" className="space-y-6">
            {mockResults.gaps.map((gap, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{gap.category}</h3>
                  <Badge variant={getSeverityBadge(gap.severity)}>
                    {gap.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{gap.description}</p>
                
                {gap.examples && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Examples needed:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {gap.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {gap.missing && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Missing keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {gap.missing.map((keyword, i) => (
                        <Badge key={i} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {gap.suggestions && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium">Suggestions:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {gap.suggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            {mockResults.recommendations.map((rec, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-warning" />
                    {rec.title}
                  </h3>
                  <Badge variant={rec.priority === 'high' ? 'destructive' : 'default'}>
                    {rec.priority.toUpperCase()} PRIORITY
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{rec.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Action Items:</p>
                  <ul className="space-y-2">
                    {rec.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Feedback Section */}
        {!feedbackSubmitted ? (
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">How was this analysis?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your feedback helps us improve our AI recommendations
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant={feedbackType === 'positive' ? 'default' : 'outline'}
                  onClick={() => setFeedbackType('positive')}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Helpful
                </Button>
                <Button
                  variant={feedbackType === 'negative' ? 'default' : 'outline'}
                  onClick={() => setFeedbackType('negative')}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="w-4 h-4" />
                  Needs Improvement
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Additional Comments (Optional)</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us more about your experience..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                />
              </div>
              
              <Button onClick={handleFeedbackSubmit} variant="accent">
                Submit Feedback
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 mt-8 bg-success/5 border-success">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-success" />
              <div>
                <h3 className="font-semibold text-success">Thank you for your feedback!</h3>
                <p className="text-sm text-muted-foreground">
                  Your input helps us improve our AI analysis
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onAnalyzeAnother}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Analyze Another Resume
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="flex items-center gap-2"
            onClick={() => toast.info("Download feature coming soon!")}
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};
