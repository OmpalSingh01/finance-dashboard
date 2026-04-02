# Finance Dashboard

A clean and interactive finance dashboard built with React, Vite, and modern web technologies. This project demonstrates frontend development skills including component architecture, state management, data visualization, and responsive design.

## 🚀 Features

### Dashboard Overview
- **Summary Cards**: Display total balance, income, and expenses with real-time calculations
- **Balance Trend Chart**: Time-based line chart showing balance progression over transactions
- **Spending Breakdown**: Categorical pie chart visualizing expense distribution

### Transactions Management
- **Transaction Table**: Comprehensive list with date, amount, category, and type
- **Advanced Filtering**: Filter by income/expense type
- **Smart Search**: Search transactions by category
- **Sorting**: Click column headers to sort by date, amount, category, or type
- **Empty States**: Graceful handling when no transactions match filters

### Role-Based Access Control
- **Viewer Role**: Read-only access to all data
- **Admin Role**: Full access including ability to add new transactions
- **Role Switcher**: Easy toggle between roles for demonstration

### Smart Insights
- **Highest Spending Category**: Identifies biggest expense category
- **Monthly Analysis**: Current month income and expense tracking
- **Average Transaction**: Statistical insights
- **Balance Status**: Positive/negative balance indicators

### Technical Features
- **State Management**: Zustand for predictable state handling
- **Data Persistence**: Local storage integration
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Data Visualization**: Recharts for interactive charts
- **Form Validation**: Client-side validation for transaction inputs

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Persistence**: Local Storage (via Zustand middleware)

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
├── src/
│   ├── components/
│   │   ├── AddTransactionForm.jsx    # Modal form for adding transactions
│   │   ├── BalanceChart.jsx          # Line chart for balance trend
│   │   ├── ExpensePieChart.jsx       # Pie chart for spending breakdown
│   │   ├── InsightsPanel.jsx         # Smart financial insights
│   │   ├── RoleSwitcher.jsx          # Role-based access control
│   │   ├── SummaryCard.jsx           # Financial summary cards
│   │   └── TransactionTable.jsx      # Transaction list with filtering/sorting
│   ├── data/
│   │   └── mockTransactions.js       # Sample transaction data
│   ├── pages/
│   │   └── Dashboard.jsx             # Main dashboard page
│   ├── store/
│   │   └── useFinanceStore.js        # Zustand state management
│   ├── App.jsx                       # Root component
│   ├── index.css                     # Global styles
│   └── main.jsx                      # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Implementation Details

### State Management Architecture
- **Zustand Store**: Centralized state with computed values
- **Persistent State**: Automatic local storage sync
- **Derived Values**: Computed summaries and insights
- **Actions**: Pure functions for state mutations

### Component Design Patterns
- **Separation of Concerns**: Each component has single responsibility
- **Props Interface**: Clean data flow with well-defined props
- **Conditional Rendering**: Role-based UI elements
- **Reusable Components**: Modular design for maintainability

### Data Visualization
- **Dynamic Charts**: Charts update automatically with transaction changes
- **Responsive Design**: Charts adapt to different screen sizes
- **Interactive Tooltips**: Enhanced user experience with detailed information
- **Empty State Handling**: Graceful degradation when no data available

### User Experience
- **Intuitive Navigation**: Clear information hierarchy
- **Loading States**: Smooth interactions without jank
- **Error Boundaries**: Robust error handling
- **Accessibility**: Semantic HTML and keyboard navigation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The dashboard is fully responsive and works seamlessly across:
- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Adapted grid layouts and touch-friendly interactions
- **Mobile**: Single-column design with collapsible elements

## 🎨 Design Philosophy

- **Clean Aesthetics**: Minimalist design with subtle shadows and rounded corners
- **Consistent Spacing**: Systematic use of Tailwind's spacing scale
- **Color Palette**: Slate-based neutral colors with accent highlights
- **Typography**: Clear hierarchy with Inter font family
- **Interactive Elements**: Hover states and smooth transitions

## 🚀 Future Enhancements

Potential improvements for production use:
- **Dark Mode**: Theme switching capability
- **Export Functionality**: CSV/JSON download features
- **Advanced Filtering**: Date range and multi-category filters
- **Real-time Updates**: WebSocket integration for live data
- **Backend Integration**: REST API connectivity
- **Authentication**: User management and security
- **Performance**: Code splitting and lazy loading

## 📄 License

This project is created for educational and demonstration purposes.
