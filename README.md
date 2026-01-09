# Expense Tracker Web Application

A full-stack web application for tracking personal expenses with user authentication, expense management, and data visualization.

## Features

- 🔐 **User Authentication**: Secure signup and login with JWT tokens
- 💰 **Expense Management**: Add, view, and delete expenses
- 📊 **Data Visualization**: Interactive charts showing expense trends and category breakdowns
- 📱 **Responsive Design**: Mobile-friendly interface with tab navigation
- 📈 **Expense Summary**: Quick overview of total expenses and statistics
- 🏷️ **Category Tracking**: Organize expenses by categories

## Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** 6.9.0 - Client-side routing
- **Chart.js** 4.2.1 & **React-Chartjs-2** 5.2.0 - Data visualization
- **Axios** 1.3.4 - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express** 4.18.2 - Web framework
- **MongoDB** with **Mongoose** 7.0.3 - Database and ODM
- **JWT** (jsonwebtoken) 9.0.0 - Authentication
- **bcryptjs** 2.4.3 - Password hashing
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.0.3 - Environment variable management

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Expense-Tracker-App
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**Example MongoDB connection strings:**
- Local MongoDB: `mongodb://localhost:27017/expense-tracker`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority`

**JWT Secret**: Use a strong, random string for production (e.g., generate using `openssl rand -base64 32`)

### Frontend API Configuration

The frontend API base URL is configured in `client/src/api.js`. By default, it points to `http://localhost:5000/api`. Update this if your backend runs on a different port or domain.

## Running the Application

### Development Mode

1. **Start the MongoDB server** (if using local MongoDB)
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev
       or
   node server.js
   ```
   The server will run on `http://localhost:5000` (or the port specified in your `.env` file)

3. **Start the frontend development server** (in a new terminal)
   ```bash
   cd client
   npm start
   ```
   The React app will open in your browser at `http://localhost:3000`

### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

## Project Structure

```
ExpenseTrackerWebApp/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── Charts.js
│   │   │   ├── ExpenseForm.js
│   │   │   ├── ExpenseList.js
│   │   │   ├── Navbar.js
│   │   │   └── Sidebar.js
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── api.js         # API configuration
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
│
└── server/                 # Node.js backend application
    ├── config/
    │   └── db.js          # Database configuration
    ├── controllers/        # Route controllers
    │   ├── authController.js
    │   └── expenseController.js
    ├── middleware/
    │   └── authMiddleware.js  # JWT authentication middleware
    ├── models/             # Mongoose models
    │   ├── Expense.js
    │   └── User.js
    ├── routes/             # API routes
    │   ├── authRoutes.js
    │   └── expenseRoutes.js
    ├── server.js           # Server entry point
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Expenses (Protected - requires JWT token)
- `GET /api/expenses` - Get all expenses for the authenticated user
- `POST /api/expenses` - Create a new expense
- `DELETE /api/expenses/:id` - Delete an expense

**Note**: All expense endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Usage

1. **Sign Up**: Create a new account by providing your name, email, and password
2. **Login**: Sign in with your credentials
3. **Add Expenses**: Fill out the expense form with title, amount, category, and date
4. **View Expenses**: Browse your expense list on the dashboard
5. **Analyze Data**: Check the charts and summary sidebar for insights
6. **Delete Expenses**: Remove expenses you no longer need

## Development Scripts

### Server
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-restart on changes)

### Client
- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Security Features

- Password hashing using bcryptjs
- JWT-based authentication
- Protected API routes with middleware
- CORS configuration for secure cross-origin requests

## Future Enhancements

- [ ] Edit expense functionality
- [ ] Expense filtering and search
- [ ] Date range filtering
- [ ] Export expenses to CSV/PDF
- [ ] Budget setting and tracking
- [ ] Recurring expenses
- [ ] Email notifications
- [ ] Dark mode theme

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## Author

Created as part of Full Stack College coursework.

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. Add `.env` to your `.gitignore` file.