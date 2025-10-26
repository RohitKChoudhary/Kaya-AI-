# 🧠 Kaya AI: Intelligent Career Navigator

<div align="center">

![Kaya AI](https://img.shields.io/badge/Kaya%20AI-Intelligent%20Career%20Navigator-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

**Transform your career journey with AI-powered resume analysis**

[Live Demo](https://lovable.dev/projects/7e91b56e-34e9-48ad-904d-4cef11466777) • [Report Bug](https://github.com/yourusername/kaya-ai/issues) • [Request Feature](https://github.com/yourusername/kaya-ai/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Specification](#-api-specification)
- [Design System](#-design-system)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Kaya AI is a sophisticated AI-powered career platform that revolutionizes resume analysis through a multi-LLM ensemble approach. The platform evaluates resumes against ideal industry standards, identifies gaps, and provides actionable recommendations to help professionals land their dream jobs.

### Why Kaya AI?

- **🤖 Multi-LLM Intelligence**: Leverages Gemini, ChatGPT, Grok, and Claude for comprehensive analysis
- **📊 Smart Scoring**: 100-point internal scoring with outlier detection and adaptive learning
- **🎯 Gap Analysis**: Detailed comparison with industry-standard ideal resumes
- **💡 Actionable Insights**: Personalized recommendations mapped to specific gaps
- **🔄 Continuous Learning**: Adaptive system that improves through user feedback

---

## ✨ Features

### 🎨 User Interface
- **Stunning Hero Landing**: Eye-catching gradient design with clear value proposition
- **Multi-Step Input Form**: Intuitive company/industry/role selection with drag-and-drop resume upload
- **Real-Time Processing**: Animated progress screen showing AI analysis stages
- **Comprehensive Dashboard**: Tabbed interface for Analysis, Ideal Resume, Gap Analysis, and Recommendations
- **Feedback Loop**: Built-in mechanism for users to rate and improve AI accuracy

### 🧠 AI Intelligence
- **Three-Stage Analysis**:
  1. **Reference Generation**: Creates ideal resume for target role
  2. **Multi-LLM Evaluation**: Three AI models score resume independently
  3. **Synthesis**: Claude combines insights for final recommendations

- **Smart Scoring Logic**:
  ```
  IF scores within 20% → Average all scores
  IF 2 similar, 1 outlier → Average similar scores
  IF all far apart → Use highest-priority LLM (Gemini)
  ```

- **Adaptive Learning**: Feedback adjusts LLM priority queue over time

### 📱 User Experience
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Toast notifications for user actions
- Accessible keyboard navigation
- SEO-optimized for search engines

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │  Hero  │→│  Input │→│Process │→│Results │            │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/JSON
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                      Backend API Layer                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              POST /api/analyze-resume                │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Stage 1: Reference Resume (Gemini→GPT→Grok)  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Stage 2: Evaluation (Gemini, GPT, Grok)      │  │   │
│  │  │           ↓ Scoring Logic ↓                    │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Stage 3: Synthesis (Claude→GPT→Gemini→Grok)  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            POST /api/submit-feedback                 │   │
│  │          (Adaptive Learning Trigger)                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    Persistence Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  User Data  │  │LLM Priority │  │  Analytics  │         │
│  │   Storage   │  │    Queue    │  │   & Logs    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### LLM Priority Queues

| Stage | Primary | Secondary | Tertiary | Quaternary |
|-------|---------|-----------|----------|------------|
| Reference Generation | Gemini | ChatGPT | Grok | - |
| Evaluation | Gemini, ChatGPT, Grok (parallel) | - | - | - |
| Synthesis | Claude | ChatGPT | Gemini | Grok |

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kaya-ai.git
   cd kaya-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📡 API Specification

### Endpoint 1: Analyze Resume

**`POST /api/analyze-resume`**

Executes the three-stage multi-LLM analysis pipeline.

#### Request

```typescript
interface AnalyzeResumeRequest {
  company: string;           // Target company name
  industry: string;          // Industry sector
  roles: string[];          // Up to 3 target roles
  resumeFile: string;       // Base64-encoded PDF/DOCX
}
```

**Example:**
```json
{
  "company": "Google",
  "industry": "technology",
  "roles": ["software-engineer", "data-scientist"],
  "resumeFile": "data:application/pdf;base64,JVBERi0xLjQKJ..."
}
```

#### Response

```typescript
interface AnalyzeResumeResponse {
  overallScore: number;              // 0-10 final score
  analysis: {
    geminiScore: number;             // 0-100
    chatGPTScore: number;            // 0-100
    grokScore: number;               // 0-100
    averageScore: number;            // Calculated average
    strengths: string[];             // Identified strengths
    weaknesses: string[];            // Areas to improve
  };
  idealResume: {
    summary: string;                 // Professional summary
    experience: string[];            // Key experience points
    skills: string[];                // Essential skills
  };
  gaps: Array<{
    category: string;                // Gap category
    severity: 'high' | 'medium' | 'low';
    description: string;             // Gap description
    examples?: string[];             // Examples needed
    missing?: string[];              // Missing keywords
    suggestions?: string[];          // Improvement suggestions
  }>;
  recommendations: Array<{
    title: string;                   // Recommendation title
    description: string;             // Detailed description
    priority: 'high' | 'medium' | 'low';
    actionItems: string[];           // Concrete action steps
  }>;
}
```

#### Status Codes

- `200 OK`: Analysis completed successfully
- `400 Bad Request`: Invalid input (missing fields, invalid file format)
- `413 Payload Too Large`: Resume file exceeds 10MB
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: LLM API failure or processing error

---

### Endpoint 2: Submit Feedback

**`POST /api/submit-feedback`**

Collects user feedback to improve AI accuracy through adaptive learning.

#### Request

```typescript
interface SubmitFeedbackRequest {
  analysisId: string;                    // UUID from analysis response
  feedbackType: 'positive' | 'negative'; // Overall satisfaction
  feedbackText?: string;                 // Optional detailed feedback
  idealResumeAccurate: boolean;          // Was ideal resume helpful?
  recommendationsHelpful: boolean;       // Were recommendations useful?
}
```

**Example:**
```json
{
  "analysisId": "550e8400-e29b-41d4-a716-446655440000",
  "feedbackType": "positive",
  "feedbackText": "The gap analysis was extremely helpful!",
  "idealResumeAccurate": true,
  "recommendationsHelpful": true
}
```

#### Response

```typescript
interface SubmitFeedbackResponse {
  success: boolean;
  message: string;
}
```

#### Status Codes

- `200 OK`: Feedback recorded successfully
- `400 Bad Request`: Invalid analysis ID or missing required fields
- `500 Internal Server Error`: Database error

---

## 🎨 Design System

### Color Palette

```css
/* Primary - Deep Indigo/Violet */
--primary: hsl(243, 75%, 59%)
--primary-glow: hsl(243, 75%, 70%)

/* Accent - Bright Cyan */
--accent: hsl(189, 94%, 43%)
--accent-glow: hsl(189, 94%, 60%)

/* Semantic Colors */
--success: hsl(142, 71%, 45%)    /* Green for high scores */
--warning: hsl(38, 92%, 50%)     /* Amber for medium scores */
--destructive: hsl(0, 84%, 60%)  /* Red for low scores */
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, hsl(243 75% 59%), hsl(271 91% 65%))
--gradient-accent: linear-gradient(135deg, hsl(189 94% 43%), hsl(243 75% 59%))
--gradient-hero: linear-gradient(180deg, hsl(0 0% 100%), hsl(243 75% 98%))
```

### Typography

```css
/* Headings */
Hero: 5xl-6xl (48-60px) - Bold
Section: 3xl (30px) - Bold
Subsection: xl (20px) - Semibold

/* Body */
Large: lg (18px) - Regular
Default: base (16px) - Regular
Small: sm (14px) - Regular
```

### Spacing & Effects

```css
--radius: 0.75rem              /* Border radius */
--shadow-elegant: 0 10px 40px -10px hsl(243 75% 59% / 0.3)
--shadow-glow: 0 0 60px hsl(243 75% 70% / 0.25)
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.0+
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Notifications**: Sonner
- **Forms**: React Hook Form + Zod

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Manager**: npm

### Required Backend (Not Implemented)
- **LLM APIs**: Google Gemini, OpenAI GPT, Grok, Anthropic Claude
- **Database**: PostgreSQL / MongoDB
- **File Storage**: AWS S3 / Azure Blob Storage
- **Resume Parser**: Apache Tika / pdf.js
- **API Framework**: Express.js / FastAPI / Flask

---

## 📁 Project Structure

```
kaya-ai/
├── public/
│   ├── robots.txt              # SEO configuration
│   └── placeholder.svg         # Fallback images
├── src/
│   ├── assets/
│   │   └── hero-ai-career.jpg  # Hero background image
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   ├── Hero.tsx            # Landing page hero section
│   │   ├── InputForm.tsx       # Resume submission form
│   │   ├── ProcessingScreen.tsx # AI processing animation
│   │   └── ResultsDashboard.tsx # Results with tabs
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   └── use-toast.ts        # Toast notifications hook
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── pages/
│   │   ├── Index.tsx           # Main application page
│   │   └── NotFound.tsx        # 404 error page
│   ├── App.tsx                 # App root with routing
│   ├── index.css               # Global styles & design tokens
│   └── main.tsx                # Application entry point
├── index.html                  # HTML template with SEO
├── tailwind.config.ts          # Tailwind configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 🚢 Deployment

### Frontend Deployment (Current State)

The frontend is **fully functional with mock data** and can be deployed immediately to:

- **Lovable Platform** (Recommended): Click "Publish" in the editor
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **AWS Amplify**: Connect GitHub repository
- **GitHub Pages**: `npm run build` + push to gh-pages branch

### Backend Implementation Required

To deploy the **complete application**, you must implement:

#### 1. LLM Integration

```typescript
// Example pseudo-code structure
class LLMOrchestrator {
  async generateIdealResume(company: string, role: string): Promise<Resume> {
    try {
      return await this.geminiClient.generate({ company, role });
    } catch (error) {
      // Fallback to ChatGPT
      return await this.openaiClient.generate({ company, role });
    }
  }

  async evaluateResume(resume: string, ideal: Resume): Promise<Scores> {
    const [gemini, gpt, grok] = await Promise.all([
      this.geminiClient.score(resume, ideal),
      this.openaiClient.score(resume, ideal),
      this.grokClient.score(resume, ideal)
    ]);
    
    return this.applyOutlierLogic({ gemini, gpt, grok });
  }

  async synthesizeRecommendations(scores: Scores): Promise<Recommendations> {
    try {
      return await this.claudeClient.synthesize(scores);
    } catch (error) {
      // Fallback chain
      return await this.fallbackSynthesis(scores);
    }
  }
}
```

#### 2. Scoring Logic

```typescript
function applyOutlierLogic(scores: { gemini: number; gpt: number; grok: number }): number {
  const values = [scores.gemini, scores.gpt, scores.grok];
  const max = Math.max(...values);
  const min = Math.min(...values);
  
  // Within 20% difference - average all
  if ((max - min) / max <= 0.2) {
    return values.reduce((a, b) => a + b, 0) / 3;
  }
  
  // Find outlier
  const sorted = values.sort();
  const diff1 = Math.abs(sorted[0] - sorted[1]);
  const diff2 = Math.abs(sorted[1] - sorted[2]);
  
  // Two similar, one outlier - average similar
  if (diff1 < diff2 * 0.5 || diff2 < diff1 * 0.5) {
    const similar = diff1 < diff2 ? [sorted[0], sorted[1]] : [sorted[1], sorted[2]];
    return (similar[0] + similar[1]) / 2;
  }
  
  // All far apart - use highest priority (Gemini)
  return scores.gemini;
}
```

#### 3. Environment Variables

Create `.env` file:

```env
# LLM API Keys
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
GROK_API_KEY=your_grok_key_here
CLAUDE_API_KEY=your_claude_key_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kaya_ai

# Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
S3_BUCKET_NAME=kaya-ai-resumes

# Application
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-frontend-domain.com
```

#### 4. Database Schema

```sql
CREATE TABLE analyses (
  id UUID PRIMARY KEY,
  user_id UUID,
  company VARCHAR(255),
  industry VARCHAR(100),
  roles JSON,
  resume_file_url TEXT,
  gemini_score INTEGER,
  chatgpt_score INTEGER,
  grok_score INTEGER,
  overall_score DECIMAL(3,1),
  results JSON,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  analysis_id UUID REFERENCES analyses(id),
  feedback_type VARCHAR(20),
  feedback_text TEXT,
  ideal_resume_accurate BOOLEAN,
  recommendations_helpful BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE llm_priorities (
  stage VARCHAR(50),
  priority_order JSON,
  performance_scores JSON,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with clear, descriptive commits
4. **Test thoroughly** (add tests if applicable)
5. **Update documentation** if needed
6. **Submit a pull request**

### Code Standards

- Use TypeScript for type safety
- Follow the existing design system (no hardcoded colors!)
- Write semantic HTML for accessibility
- Add comments for complex logic
- Keep components small and focused
- Use semantic tokens from `index.css`

### Commit Messages

Follow conventional commits:
```
feat: Add gap analysis visualization
fix: Resolve file upload validation
docs: Update API specification
style: Improve button hover effects
refactor: Simplify scoring logic
test: Add unit tests for LLM orchestrator
```

---

## 📄 License

This project is built on the [Lovable](https://lovable.dev) platform.

**Project URL**: https://lovable.dev/projects/7e91b56e-34e9-48ad-904d-4cef11466777

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lucide** for the comprehensive icon set
- **Tailwind CSS** for the utility-first CSS framework
- **Lovable** for the rapid development platform

---

## 📞 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/kaya-ai/issues)
- **Email**: support@kaya-ai.com

---

<div align="center">

**Built with ❤️ using [Lovable](https://lovable.dev)**

⭐ Star this repo if you find it helpful!

</div>
