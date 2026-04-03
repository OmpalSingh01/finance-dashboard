# 💰 FIN TRACK - A Product of ZORVYN

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/State-Zustand-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Charts-Recharts-22C55E?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Live-Vercel-black?style=for-the-badge&logo=vercel" />
</p>


## 🌐 Live Demo

- Hosted on Vercel: https://finance-dashboard-lac-rho.vercel.app/

A modern, professional finance dashboard built with React, Vite, and Tailwind CSS. Features real-time financial tracking, role-based access control, dark mode, and a responsive mobile-first design.


## 📸 Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/154703dc-3c34-46fb-8f72-3014632e3257" height="300" />
  <img src="https://github.com/user-attachments/assets/205e419e-a034-499a-8eb0-d398d7f5f52f" height="300" />
</p>


## 🎯 Problem Statement
Managing personal finances manually can be difficult and error-prone. 
This dashboard solves that by providing a clean, responsive interface 
for tracking income, expenses, analytics, and exporting financial data.


## 🚀 Features

### Smart Navigation & UI
- **Professional Navbar**: Sticky navigation with branding, menu links, and quick actions
- **Dark/Light Mode**: Full theme support with persistent preference storage
- **Responsive Design**: Mobile-first approach with hamburger menu on small screens
- **Smooth Scrolling**: Navigation links smoothly scroll to page sections

### Dashboard Overview
- **Summary Cards**: Display total balance, income, and expenses with real-time calculations
- **Balance Trend Chart**: Time-based line chart showing balance progression
- **Spending Breakdown**: Interactive pie chart visualizing expense distribution
- **Smart Insights Panel**: Advanced financial analysis with key metrics and status indicators

### Transactions Management
- **Transaction Table**: Comprehensive list with date, category, type, and amount
- **Mobile-Optimized View**: Shows date + amount on mobile, full details on desktop
- **Advanced Filtering**: Filter by income/expense type
- **Smart Search**: Search transactions by category
- **Smart Sorting**: Click column headers to sort by date, amount, category, or type
- **Top-7 Display**: First 7 transactions visible with scrollable view for more
- **CSV Export**: Download transactions with duration selection (All, This Month, Last 30/90 Days, Last Year)

### Role-Based Access Control
- **Viewer & Admin Roles**: Different permission levels for data access
- **Admin Features**: Ability to add new transactions via modal form
- **Role Indicator**: Display current role with quick toggle in navbar

### Professional Design
- **Dark Mode Support**: Consistent theme switching across all components
- **Professional Cards**: Elevated design with shadows and hover states
- **Icon Integration**: Lucide React icons for visual clarity
- **Accessibility**: Semantic HTML and ARIA labels
- **Professional Footer**: Links and information footer

### Data Visualization & Analytics
- **Interactive Charts**: Real-time updates with Recharts
- **Category Breakdown**: Pie charts for spending visualization
- **Balance Trends**: Line charts for historical analysis
- **Summary Analytics**: Highest spending categories, monthly analysis, balance status

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with Hooks
- **Build Tool**: Vite 8.x (fast development + optimized builds)
- **Styling**: Tailwind CSS 3.x with dark mode support
- **State Management**: Zustand with persistence middleware
- **Data Visualization**: Recharts for interactive charts
- **Icons**: Lucide React for consistent iconography
- **Form Validation**: Client-side validation for transactions
- **Linting**: ESLint for code quality

## 🔄 Data Flow
UI Components → Zustand Store → Derived Analytics → Recharts → CSV Export

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

## 🏗️ Project Structure

```
finance-dashboard/
├── public/
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── AddTransactionForm.jsx    # Modal for adding transactions
│   │   ├── BalanceChart.jsx          # Line chart visualization
│   │   ├── DarkModeToggle.jsx        # Dark mode button (legacy)
│   │   ├── ExpensePieChart.jsx       # Pie chart visualization
│   │   ├── Footer.jsx                # Professional footer
│   │   ├── InsightsPanel.jsx         # Financial insights & metrics
│   │   ├── Navbar.jsx                # Sticky navigation bar NEW
│   │   ├── RoleSwitcher.jsx          # Role-based access control
│   │   ├── SummaryCard.jsx           # Financial summary card
│   │   └── TransactionTable.jsx      # Transaction list with CSV export
│   ├── data/
│   │   └── mockTransactions.js       # Sample transaction data
│   ├── pages/
│   │   └── Dashboard.jsx             # Main dashboard layout
│   ├── store/
│   │   └── useFinanceStore.js        # Zustand state management
│   ├── App.jsx                       # Root with dark mode handler
│   ├── App.css                       # Component-specific styles
│   ├── index.css                     # Global Tailwind styles
│   └── main.jsx                      # Entry point
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🎯 Key Implementation Details

### Navigation Features
- **Sticky Navbar**: Always accessible at top of page
- **Desktop Menu**: Overview, Transactions, Insights links
- **Mobile Menu**: Hamburger menu with responsive navigation
- **Quick Actions**: Dark mode toggle and role indicator in navbar

### Dark Mode Implementation
- **Theme Persistence**: User preference saved to local storage
- **Complete Coverage**: All components support light and dark modes
- **Smooth Toggle**: Instant theme switching with no page reload
- **Accessible**: Proper contrast ratios for both themes

### Transaction Table Enhancements
- **Responsive Columns**: Desktop shows all columns; mobile shows date + amount + category
- **Scrollable View**: Max height of 460px with overflow for viewing top transactions
- **CSV Export**: Download filtered transactions with duration options
- **Advanced Controls**: Search, filter, and sort all in one place
- **Empty States**: Helpful messaging when no transactions found

### State Management
- **Zustand Store**: Centralized with computed values
- **Persistent Storage**: Automatic local storage synchronization
- **Derived Values**: Dynamic calculations for summaries and insights
- **Clean Actions**: Pure function mutations for predictability

### Mobile Optimization
- **Mobile Menu**: Hamburger navigation for small screens
- **Responsive Table**: Optimized column visibility for mobile
- **Touch-Friendly**: Larger tap targets and better spacing
- **Readable Text**: Responsive font sizes and spacing

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint code quality check
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px - Single column, hamburger menu, optimized tables
- **Tablet**: 640px - 1024px - Two-column layouts, visible menu
- **Desktop**: > 1024px - Full multi-column layouts, all features visible

## 🎨 Design System

- **Color Palette**: Slate (primary), Blue (accent), Green (income), Red (expense), Purple (admin)
- **Typography**: Clear hierarchy with font weights (normal, medium, semibold, bold)
- **Spacing**: Systematic spacing scale from Tailwind (4px base unit)
- **Shadows**: Subtle depth with rounded corners (8px-16px radius)
- **Transitions**: Smooth 200ms transitions for interactions
- **Icons**: Lucide React icons (4px-5px sizes) for consistency

## ✨ UI/UX Highlights

- **Visual Feedback**: Hover states and smooth transitions on all interactive elements
- **Status Indicators**: Color-coded badges for income (green) and expenses (red)
- **Empty States**: Helpful messaging with icons when no data available
- **Professional Layout**: Consistent spacing and alignment throughout
- **Accessibility**: Semantic HTML, aria-labels, and keyboard navigation support

## ⚡ Performance Optimizations
- Zustand selectors to avoid unnecessary re-renders
- Lazy loaded charts
- Memoized derived analytics
- Optimized Vite production bundle

## 📚 Challenges & Learnings
- Built responsive financial charts using Recharts
- Managed complex global state using Zustand
- Implemented dark mode persistence
- Optimized mobile transaction table UX
- Added CSV export with time filtering

## 🚀 Recent Updates (v2.0)

- ✅ **Professional Navbar** - Sticky navigation with dark mode toggle and role switcher
- ✅ **Dark Mode** - Fully implemented theme switching with persistence
- ✅ **Mobile Optimization** - Transaction table responsive with date/amount on mobile
- ✅ **CSV Export** - Export transactions with duration selection dropdown
- ✅ **Professional Footer** - Added company links and information
- ✅ **Enhanced Insights** - Card-based layout with better visual hierarchy
- ✅ **FAB Button** - Floating action button for mobile transaction creation

## 🚀 Future Enhancements

Potential improvements for production:
- **Budget Management**: Set spending limits by category with warnings
- **Monthly Comparison**: Year-over-year and month-over-month comparisons
- **Recurring Transactions**: Detect and flag subscription patterns
- **Multiple Accounts**: Track checking, savings, credit cards separately
- **Financial Goals**: Trackers with progress visualization
- **Data Import**: Upload CSV for bulk transaction sync
- **Real-time Sync**: WebSocket integration for live updates
- **Backend Integration**: REST API connectivity with authentication
- **Advanced Analytics**: Machine learning for spending predictions
- **Mobile App**: React Native cross-platform version

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Author Notes

This dashboard demonstrates modern React development practices including:
- Component-based architecture with separation of concerns
- State management using Zustand for predictable updates
- Responsive design with mobile-first approach
- Accessibility and semantic HTML
- Professional UI/UX with Tailwind CSS
- Data visualization with interactive charts
- Local storage persistence
- Role-based access control patterns

