# 🧠 Kaya AI: Intelligent Career Navigator

**AI-powered resume analysis platform concept using multi-LLM architecture**

[View Code](your-github-repo) • [LinkedIn](your-linkedin-url)

---

## 🎯 What It Is

Kaya AI is a career platform I designed and built the frontend for, demonstrating how multiple AI models could work together to analyze resumes against industry standards. The project showcases full-stack architecture design, UI/UX implementation, and AI orchestration patterns.

### Why I Built This

I wanted to explore how different AI models could complement each other's strengths and create a more reliable analysis system than any single model could provide. This project demonstrates my ability to design complex systems and build production-ready interfaces.

---

## ✨ Key Features

- **Multi-AI Analysis**: Designed orchestration for Gemini, ChatGPT, Grok, and Claude
- **Smart Scoring System**: 100-point scoring with outlier detection algorithm
- **Gap Analysis**: Compares resumes against ideal industry standards
- **Actionable Recommendations**: Specific, prioritized improvement suggestions
- **Adaptive Learning**: Feedback loop design for continuous improvement

---

## 🏗️ How It Works

### Three-Stage Analysis Pipeline

1. **Reference Generation**
   - AI creates an "ideal resume" for target role
   - Based on company, industry, and position requirements

2. **Multi-Model Evaluation**
   - Three AI models score resume independently (0-100)
   - Outlier detection ensures no single AI skews results
   - Identifies strengths and weaknesses

3. **Synthesis & Recommendations**
   - Claude combines all insights
   - Generates specific, prioritized action items
   - Maps recommendations to identified gaps

### Smart Scoring Logic
```
IF all scores within 20% → Average them
IF 2 similar, 1 outlier → Average the similar ones
IF all different → Use highest-priority model
```

This prevents any single AI from giving wildly inaccurate scores.

---

## 🛠️ Tech Stack

**Frontend** (Fully Implemented)
- React + TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for component library
- Vite for build tooling
- React Router for navigation

**Backend Architecture** (Designed, not implemented)
- Multi-LLM orchestration system (Gemini, GPT, Grok, Claude)
- PostgreSQL schema design for analytics
- RESTful API specification
- Adaptive learning algorithm design
- File processing pipeline for resumes

---

## 📡 API Design

### POST /api/analyze-resume

Executes the three-stage multi-LLM analysis pipeline.

#### Request
```typescript
interface AnalyzeResumeRequest {
  company: string;
  industry: string;
  roles: string[];
  resumeFile: string;  // Base64-encoded PDF/DOCX
}
```

#### Response
```typescript
interface AnalyzeResumeResponse {
  overallScore: number;
  analysis: {
    geminiScore: number;
    chatGPTScore: number;
    grokScore: number;
    strengths: string[];
    weaknesses: string[];
  };
  idealResume: {
    summary: string;
    experience: string[];
    skills: string[];
  };
  gaps: Array<{
    category: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    actionItems: string[];
  }>;
}
```

### POST /api/submit-feedback

Collects user feedback for adaptive learning.

#### Request
```typescript
interface SubmitFeedbackRequest {
  analysisId: string;
  feedbackType: 'positive' | 'negative';
  feedbackText?: string;
  idealResumeAccurate: boolean;
  recommendationsHelpful: boolean;
}
```

---

## 🎨 Design Philosophy

- **User-First**: Clean, intuitive interface with real-time feedback
- **Mobile-Responsive**: Works seamlessly on all devices
- **Accessible**: Keyboard navigation and WCAG compliant
- **Performance**: Optimized builds with smooth animations

---

## 📁 Project Structure
```
kaya-ai/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── Hero.tsx
│   │   ├── InputForm.tsx
│   │   ├── ProcessingScreen.tsx
│   │   └── ResultsDashboard.tsx
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   └── App.tsx
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started
```bash
# Clone the repo
git clone https://github.com/yourusername/kaya-ai.git

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## 📊 Project Scope

- **Frontend**: Fully implemented and production-ready
- **Backend**: Architected with complete API specs and logic flows
- **AI Integration**: Design patterns and orchestration logic defined
- **Database**: Schema designed for analytics and feedback
- **Deployment**: Frontend ready to deploy, backend ready for implementation

---

## 💡 Technical Challenges Solved

**Frontend**
- Complex multi-step form with file upload handling
- Real-time processing animations for better UX
- Responsive dashboard with multiple data views
- State management for analysis flow

**System Design**
- Multi-LLM coordination with fallback chains
- Outlier detection algorithm for score accuracy
- Adaptive learning system architecture
- Efficient data flow between components

---

## 🎯 Future Enhancements

- Cover letter generation based on resume
- LinkedIn profile optimization
- Interview prep recommendations
- Job matching algorithm
- Real-time collaboration features
- API rate limiting and caching strategies

---
