# AI Transcripts Analyzer Frontend ✨

A cutting-edge, enterprise-grade web interface for analyzing and searching transcriptions using artificial intelligence. Built with Next.js 15, React 19, TypeScript, and modern UI/UX principles.

## 🌟 Enhanced Features & Modern UI/UX

### 🎨 **Professional Design System**
- **Design Tokens**: CSS custom properties for consistent theming
- **Dark/Light Mode**: System preference detection with manual toggle
- **Glass Morphism**: Modern translucent UI elements with backdrop blur
- **Micro-Interactions**: Smooth animations and hover effects
- **Responsive Design**: Mobile-first approach with adaptive layouts

### 🧩 **Component Library**
- **Reusable Components**: Button, Card, Input, Badge, Skeleton loaders
- **Accessibility**: WCAG compliant with proper ARIA labels
- **TypeScript**: Full type safety and better developer experience
- **Consistent API**: Unified component interfaces and props

### � **Enhanced User Experience**
- **Loading States**: Smart skeleton loaders and progress indicators
- **Error Handling**: Graceful error messages with retry functionality
- **Empty States**: Helpful guidance when no data is available
- **Status Indicators**: Real-time system status with visual feedback

### � **Advanced Search Interface**
- **Modern Search Bar**: Icon-enhanced input with quick suggestions
- **Smart Filters**: Intuitive category selection with visual feedback  
- **Result Cards**: Beautiful, information-rich search results
- **Pagination**: Elegant navigation between result pages
- **Relevance Scoring**: Visual indicators for search match quality

### 📊 **Analytics Dashboard**
- **Interactive Metrics**: Real-time statistics with visual indicators
- **Quick Actions**: One-click access to common tasks
- **Trending Topics**: Dynamic topic analysis with badges
- **System Health**: Live status indicators and performance metrics

### �️ **Modern Architecture**
- **Component Composition**: Flexible, maintainable component structure
- **Custom Hooks**: Reusable logic for state management
- **Utility Functions**: Type-safe helper functions for common operations
- **Error Boundaries**: Graceful error recovery and reporting
- Reusable components
- Loading and error states
- Optimized light mode

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State**: Custom React Hooks
- **HTTP**: Native Fetch API
- **Linting**: ESLint with Next.js configuration

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-transcripts-analyzer-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your backend URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run in development**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Main layout
│   ├── page.tsx           # Main dashboard
│   ├── search/            # Search page
│   ├── transcripts/       # Transcripts list
│   └── analytics/         # Analytics page
├── components/            # React components
│   ├── analytics/         # Analytics components
│   ├── layout/           # Navigation components
│   ├── search/           # Search components
│   ├── transcripts/      # Transcript components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React Hooks
├── services/             # API services
└── types/                # TypeScript definitions
```

## Backend API

The frontend connects to a NestJS API that provides the following endpoints:

### Main Endpoints

- `GET /api/transcripts/search` - Search transcripts
- `GET /api/transcripts/statistics` - System statistics
- `GET /api/transcripts/topics/frequent` - Most frequent topics
- `GET /api/transcripts` - List all transcripts
- `GET /api/transcripts/:id` - Specific transcript

### Transcript Categories

- `technical_issues` - Technical issues
- `billing_issues` - Billing issues
- `commercial_support` - Commercial support
- `administrative_requests` - Administrative requests
- `service_activation` - Service activation
- `complaints` - Complaints

## Development

### Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

### Component Structure

#### Custom Hooks
- `useSearch` - Search management
- `useTranscripts` - Transcript listing
- `useStatistics` - System statistics
- `useFrequentTopics` - Frequent topics

#### UI Components
- `LoadingSpinner` - Loading indicator
- `ErrorMessage` - Error messages
- `Badge` - Category labels
- `Card` - Content container

### Code Conventions

- Use TypeScript for static typing
- Functional components with Hooks
- Defined Props interfaces
- Loading and error state handling
- Comments in English for documentation

## Production Configuration

1. **Environment variables**
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   npm run start
   ```

## Key Features

### Dashboard
- System statistics overview
- Quick search
- Trending topics
- Performance metrics

### Advanced Search
- Keyword search
- Category filters
- Paginated results
- Highlighted matching messages

### Analytics
- Transcript statistics
- OpenAI token usage
- Cache performance
- Topic analysis by category

### Transcript List
- Complete transcript view
- Filters and sorting
- Real-time search
- Detailed metadata

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or questions, you can:
- Open an issue on GitHub
- Contact the development team
- Review the backend documentation
