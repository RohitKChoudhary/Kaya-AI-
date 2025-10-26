# Kaya AI: Intelligent Career Navigator

A sophisticated AI-powered resume analysis platform that uses a multi-LLM ensemble approach to provide comprehensive career insights.

## 🎯 Features

- **AI-Powered Analysis**: Multi-LLM ensemble (Gemini, ChatGPT, Grok, Claude) for accurate resume evaluation
- **Intelligent Scoring**: 100-point internal scoring system with outlier detection and adaptive learning
- **Gap Analysis**: Detailed comparison between your resume and ideal resume for target roles
- **Personalized Recommendations**: Actionable insights mapped to identified gaps
- **User Feedback Loop**: Continuous improvement through user feedback mechanism

## 🏗️ Architecture

### Frontend (Implemented)
- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Features**:
  - Hero landing page with compelling value proposition
  - Multi-step input form (Company/Industry/Roles/Resume Upload)
  - Animated processing screen with real-time progress
  - Comprehensive results dashboard with tabbed interface
  - User feedback component for continuous improvement

### Backend (API Abstraction)

The application communicates with two main API endpoints that must be implemented:

#### 1. `/api/analyze-resume` (POST)
This endpoint executes the **Three-Stage Multi-LLM Ensemble Approach**:

**Stage 1: Reference Resume Generation**
- Generate "ideal" resume based on user's role/company input
- **LLM Priority**: Gemini → ChatGPT → Grok

**Stage 2: User Resume Evaluation**
- Three LLMs rate user's resume on 100-point internal scale
- **Scoring Logic**:
  - If scores within 20% difference: Average all scores
  - If two similar, one outlier: Average similar scores
  - If all far apart: Use highest-priority LLM score (Gemini)

**Stage 3: Suggestion Synthesis**
- Final score synthesis and recommendations
- **LLM Priority**: Claude → ChatGPT → Gemini → Grok

**Request Body**:
```json
{
  "company": "string",
  "industry": "string",
  "roles": ["string"],
  "resumeFile": "base64_encoded_file"
}
```

**Response**:
```json
{
  "overallScore": "number (0-10)",
  "analysis": {
    "geminiScore": "number (0-100)",
    "chatGPTScore": "number (0-100)",
    "grokScore": "number (0-100)",
    "averageScore": "number",
    "strengths": ["string"],
    "weaknesses": ["string"]
  },
  "idealResume": {
    "summary": "string",
    "experience": ["string"],
    "skills": ["string"]
  },
  "gaps": [
    {
      "category": "string",
      "severity": "high|medium|low",
      "description": "string",
      "examples": ["string"],
      "missing": ["string"],
      "suggestions": ["string"]
    }
  ],
  "recommendations": [
    {
      "title": "string",
      "description": "string",
      "priority": "high|medium|low",
      "actionItems": ["string"]
    }
  ]
}
```

#### 2. `/api/submit-feedback` (POST)
This endpoint receives user feedback to trigger adaptive learning and adjust LLM priorities.

**Request Body**:
```json
{
  "analysisId": "string",
  "feedbackType": "positive|negative",
  "feedbackText": "string",
  "idealResumeAccurate": "boolean",
  "recommendationsHelpful": "boolean"
}
```

## 🚀 Deployment Requirements

**To deploy the full application**, you must:

1. **Implement Backend Logic**:
   - Multi-LLM orchestration for the three-stage analysis
   - LLM priority queue management with adaptive learning
   - Resume parsing (PDF/DOCX)
   - Scoring logic with outlier detection

2. **Setup Persistence Layer**:
   - Store LLM priorities (adjustable via feedback)
   - Save analysis results and feedback
   - Track user sessions

3. **Configure LLM Access**:
   - API keys for Gemini, ChatGPT, Grok, and Claude
   - Rate limiting and error handling
   - Fallback mechanisms per priority queue

4. **Environment Variables**:
   ```env
   GEMINI_API_KEY=your_key
   OPENAI_API_KEY=your_key
   GROK_API_KEY=your_key
   CLAUDE_API_KEY=your_key
   DATABASE_URL=your_connection_string
   ```

## 🎨 Design System

The application uses a sophisticated design system with:
- **Primary Colors**: Deep indigo/purple (#4F46E5) for AI/tech feel
- **Accent Colors**: Bright cyan (#06B6D4) for interactive elements
- **Gradients**: Custom gradients for hero sections and CTAs
- **Success/Warning**: Green and amber for score visualization
- **Shadows & Effects**: Elegant shadows with glow effects
- **Smooth Transitions**: Custom easing for all interactions

## 📱 Responsive Design

Fully mobile-responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Input Validation

Client-side validation includes:
- File type validation (PDF/DOCX only)
- File size limits (max 10MB)
- Required field validation
- Form data sanitization

## 📊 User Flow

1. **Landing** → Hero page with value proposition
2. **Input** → Multi-step form for data collection
3. **Processing** → Animated progress with step indicators
4. **Results** → Comprehensive dashboard with tabs
5. **Feedback** → User feedback loop for improvement
6. **Repeat** → Analyze another resume

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State**: React Hooks
- **Toast Notifications**: Sonner

## 🤝 Contributing

When implementing the backend:
1. Follow the API contract specified above
2. Implement proper error handling and rate limiting
3. Add logging for debugging multi-LLM calls
4. Test the scoring logic thoroughly with edge cases
5. Ensure feedback properly triggers adaptive learning

## 📝 License

This project is part of the Lovable platform.

## 🔗 Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Project URL](https://lovable.dev/projects/7e91b56e-34e9-48ad-904d-4cef11466777)

---

**Note**: The frontend is fully functional with mock data. Backend implementation is required for production deployment with actual AI analysis capabilities.
