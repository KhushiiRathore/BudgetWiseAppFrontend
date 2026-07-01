# BudgetWise – AI-Powered Smart Budget & Credit Tracker

A full-stack personal finance application that helps users track income and expenses, visualize spending patterns, and get personalized financial guidance through an AI-powered spending advisor built with Google's Gemini API.

🌐 **Live Demo:** [budget-wise-app-frontend.vercel.app](https://budget-wise-app-frontend.vercel.app)
🔗 **Backend Repo:** [BudgetWiseAppBackend](https://github.com/KhushiiRathore/BudgetWiseAppBackend)

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login and registration with bcrypt password hashing
- 💰 **Income & Expense Tracking** — Add, view, and delete transactions with category and date
- 🤖 **AI Spending Advisor** — Ask natural language questions about your finances and get instant, personalized insights powered by Google Gemini AI
- 📊 **Interactive Dashboards** — Visualize spending trends, income vs expense breakdowns using Chart.js
- 📥 **Export to Excel** — Download income and expense reports as Excel files
- 📱 **Responsive Design** — Clean, mobile-friendly UI built with Tailwind CSS

---

## 🤖 How the AI Advisor Works

The AI Spending Advisor is the standout feature of BudgetWise. Here's how it works:

1. User types a natural language question (e.g. *"How much did I spend on Food in June?"*)
2. The backend fetches the user's complete transaction history from MongoDB
3. A context-aware prompt is built — combining the user's real data with their question
4. The prompt is sent to **Google's Gemini API**
5. Gemini analyzes the data and generates a personalized, formatted response
6. The response is rendered in a clean chat interface with markdown formatting

This approach ensures AI responses are always grounded in the user's **actual financial data**, not generic advice.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Chart.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT, bcrypt |
| AI Integration | Google Gemini API |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📸 Screenshots
<img width="956" height="443" alt="Screenshot 2026-07-01 075742" src="https://github.com/user-attachments/assets/dca1eadc-e920-4749-800d-45cfb4946a4d" />

### Dashboard
<img width="938" height="443" alt="Screenshot 2026-07-01 075835" src="https://github.com/user-attachments/assets/fb4d0bed-f3ab-4f1e-b571-cea6f1b2c164" />

### Income
<img width="940" height="441" alt="Screenshot 2026-07-01 080039" src="https://github.com/user-attachments/assets/5e977392-0902-47e7-b8f2-92a450dfd406" />

### Expense 
<img width="940" height="437" alt="Screenshot 2026-07-01 080103" src="https://github.com/user-attachments/assets/82729110-8c85-4540-9fff-d49bb351bf9f" />

### AI Spending Advisor
<img width="937" height="440" alt="Screenshot 2026-07-01 080122" src="https://github.com/user-attachments/assets/f854fccc-3b1d-4fc7-8749-4f8f150c6f63" />



---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js installed
- MongoDB connection string
- Google Gemini API key (get one free at [aistudio.google.com](https://aistudio.google.com))

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

```bash
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## 📁 Project Structure
BudgetWiseAppFrontend/
└── frontend/
└── src/
├── components/    # Reusable UI components
├── pages/         # Dashboard, Income, Expense, AI Assistant
├── hooks/         # Custom React hooks
├── utils/         # API paths, axios instance, helpers
└── content/       # User context


---

## 👩‍💻 Author

**Khushi Rathore**
- GitHub: [@KhushiiRathore](https://github.com/KhushiiRathore)
- Email: khushirathore1630@gmail.com
