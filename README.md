# Command Center - Personal Dashboard

A professional dark-themed dashboard with real Todoist integration, Eisenhower Matrix, fitness tracking, finance overview, and client management.

## 🚀 Quick Start (Demo Mode)

The app works immediately in **demo mode** with sample data. Just open it and explore!

## 🔗 Connect Real Todoist Data

### Option 1: Deploy to Vercel (Recommended)

1. **Fork/clone this repo**
2. **Deploy to Vercel:**
   ```bash
   npm install -g vercel
   vercel
   ```
3. **That's it!** The serverless function at `/api/todoist.ts` will proxy your Todoist requests.

Your Todoist API token is already configured in `src/services/todoist.ts`.

### Option 2: Local Development with CORS Proxy

For local development, the app tries multiple CORS proxies automatically:
- `corsproxy.io`
- `codetabs.com`

If these fail, you'll see demo data instead.

## 📁 Project Structure

```
├── api/
│   └── todoist.ts          # Vercel serverless proxy
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx    # Main overview
│   │   ├── TasksView.tsx    # Todoist tasks
│   │   ├── EisenhowerMatrix.tsx  # Priority matrix
│   │   ├── FitnessView.tsx  # Fitness tracking
│   │   ├── FinanceView.tsx  # Financial overview
│   │   ├── ClientsView.tsx  # Client management
│   │   └── Sidebar.tsx      # Navigation
│   ├── services/
│   │   └── todoist.ts       # API service with fallbacks
│   └── data/                # Mock data for other sections
└── vercel.json              # Deployment config
```

## 🎯 Features

- ✅ **Real Todoist Integration** - Fetch and complete tasks
- 🎯 **Eisenhower Matrix** - Drag & drop task prioritization
- 💪 **Fitness Tracking** - Weekly workout overview
- 💰 **Finance Dashboard** - Income/expenses with charts
- 👥 **Client Management** - Active projects and revenue

## 🔧 Customization

### Change Todoist Token
Edit `src/services/todoist.ts`:
```typescript
const TODOIST_API_TOKEN = 'your-token-here';
```

### Connect Other Services
The fitness, finance, and clients sections currently use mock data. To connect real APIs:
- **Fitness**: Strava, Fitbit, or Garmin API
- **Finance**: Plaid, YNAB, or Google Sheets
- **Clients**: Notion, Airtable, or Google Sheets

See the `src/data/` files for the data structure each section expects.

## 🎨 Design

Inspired by [this Dribbble shot](https://dribbble.com/shots/25596172-professional-Project-management-dashboard-web-ui-design) with:
- Dark theme with green accents
- Collapsible sidebar
- Card-based layout
- Smooth transitions

## 📝 Notes

- The app automatically falls back to demo data if the API is unreachable
- Task categorizations in the Eisenhower Matrix are saved in localStorage
- All mock data is clearly labeled when in demo mode
