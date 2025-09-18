# Student Personalized Career & Skills Advisor

A comprehensive AI-powered career guidance platform that helps students discover personalized career paths, generate detailed learning plans, and track their progress toward career goals.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd career-advisor-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment template
   cp .env.example .env.local
   
   # Edit .env.local with your configuration
   # For development, you can leave most values empty to use mocks
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **UI Components**: Ant Design + Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Authentication**: Firebase Auth (with mock fallback)
- **Database**: Firestore (with localStorage fallback)
- **HTTP Client**: Axios
- **PDF Export**: html2pdf.js
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── SkillChip.jsx
│   ├── ResourceCard.jsx
│   └── Spinner.jsx
├── contexts/           # React Context providers
│   ├── AuthContext.jsx
│   └── PlanContext.jsx
├── pages/             # Route components
│   ├── Landing.jsx
│   ├── Auth.jsx
│   ├── Questionnaire.jsx
│   ├── Results.jsx
│   ├── Plans.jsx
│   └── PlanDetail.jsx
├── services/          # API and external services
│   └── api.js
├── mocks/            # Mock data and API responses
│   └── mockApi.js
├── utils/            # Utility functions
│   └── exportPdf.js
├── App.jsx           # Main app component
├── main.jsx          # App entry point
└── index.css         # Global styles and design system
```

## 🎯 Features

### Core Functionality
- **Multi-step Career Assessment**: Comprehensive questionnaire covering student level, skills, preferences, and goals
- **AI-Powered Recommendations**: Personalized career path suggestions with match scores and explanations
- **Detailed Learning Plans**: Step-by-step roadmaps with timelines, resources, and cost estimates
- **Progress Tracking**: Mark milestones as complete and track learning progress
- **Resource Management**: Curated learning resources with filtering and organization
- **Interview Preparation**: Career-specific interview questions and tips
- **PDF Export**: Generate professional learning plan documents

### UI/UX Features
- **Dark Theme**: Beautiful dark mode with Google color accents
- **Responsive Design**: Mobile-first design that works on all devices
- **Glass Morphism**: Modern frosted glass UI effects
- **Smooth Animations**: Polished transitions and micro-interactions
- **Accessibility**: Keyboard navigation and screen reader support

## 🔧 Configuration

### Firebase Setup (Optional for Development)

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)

2. Enable Authentication and Firestore

3. Copy your Firebase config to `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

### API Backend Setup (Optional for Development)

1. Set your backend API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

2. The app expects these endpoints:
   - `POST /api/ai/suggest` - Career suggestions
   - `POST /api/ai/plan` - Detailed plan generation
   - `GET /api/plans` - Get user plans
   - `POST /api/plans` - Save plan

## 🧪 Development vs Production

### Development Mode (Default)
- Uses mock authentication (no real sign-up required)
- Uses localStorage for data persistence
- Mock AI responses for career suggestions and plan generation
- No external API calls required

### Production Mode
- Requires Firebase configuration for authentication
- Requires backend API for AI features
- Real user accounts and data persistence
- Live AI-powered recommendations

## 📊 API Contracts

### Career Suggestion Request
```json
{
  "userId": "optional-user-id",
  "questionnaire": {
    "studentLevel": "9-10" | "11-12" | "college",
    "education": "string",
    "topSubjects": ["string"],
    "codingPref": 0-10,
    "knownSkills": ["string"],
    "hoursPerWeek": number,
    "budgetPerMonth": number,
    "goalTimeline": 3 | 6 | 12,
    "locationPref": "string",
    "industries": ["string"],
    "githubOrPortfolio": "string",
    "certificationsDesired": boolean,
    "constraints": "string",
    "roleSeeking": "internship" | "full-time" | "freelance",
    "riskAppetite": "startup" | "balanced" | "corporate",
    "resumeText": "string"
  }
}
```

### Career Suggestion Response
```json
{
  "top_paths": [{
    "name": "string",
    "score": number,
    "why": "string",
    "key_skills": ["string"],
    "estimated_cost_range": {
      "low": number,
      "mid": number,
      "high": number
    }
  }],
  "confidence": "high" | "medium" | "low",
  "skill_gap": {
    "have": ["string"],
    "need": ["string"]
  },
  "next_steps": ["string"]
}
```

## 🎨 Design System

The app uses a comprehensive design system built with Tailwind CSS and CSS custom properties:

- **Colors**: Google Material Design color palette
- **Typography**: System font stack with proper hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component variants
- **Glass Effects**: Modern frosted glass morphism
- **Animations**: Smooth transitions and hover effects

## 🔒 Security Notes

- **Development**: Uses mock authentication safe for development
- **Production**: Requires proper Firebase security rules
- **API Keys**: No sensitive keys exposed in frontend code
- **Data**: User data stored securely in Firestore with proper access controls

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables in your deployment platform
3. Deploy automatically on push to main branch

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Development**: The app includes helpful console logs and error messages

## 🎯 Next Steps

1. **Connect Firebase**: Add your Firebase configuration for real authentication
2. **Backend Integration**: Connect to your AI-powered backend API
3. **Enhanced Features**: Add more advanced features like:
   - Social learning features
   - Mentor matching
   - Job board integration
   - Skills assessments
   - Progress analytics

---

**Happy Learning!** 🚀📚