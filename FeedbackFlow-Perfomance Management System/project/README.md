# FeedbackFlow - Performance Management System

A comprehensive full-stack feedback system designed for modern teams to manage performance reviews, feedback delivery, and employee growth tracking.

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based access control** (Manager/Employee)
- **JWT token authentication** with secure session management
- **Demo accounts** for easy testing and evaluation

### 👥 Manager Dashboard
- **Team management** with comprehensive member overview
- **Structured feedback creation** with strengths, improvement areas, and sentiment tracking
- **Performance analytics** with visual feedback trends and statistics
- **Feedback history** with full CRUD operations

### 📊 Employee Dashboard  
- **Personal feedback timeline** with chronological view of all received feedback
- **Acknowledgment system** to mark feedback as read and reviewed
- **Progress tracking** with sentiment analysis and growth metrics
- **Responsive design** optimized for all devices

### 🎯 Advanced Features
- **Sentiment analysis** (Positive, Neutral, Negative) with emoji indicators
- **Tag system** for categorizing feedback (leadership, communication, etc.)
- **Real-time statistics** and performance metrics
- **Professional UI** with smooth animations and micro-interactions

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern, responsive styling
- **Lucide React** for consistent iconography
- **Axios** for API communication
- **React Router** for navigation

### Backend
- **FastAPI** for high-performance API development
- **SQLAlchemy** for database ORM
- **SQLite** for development (easily configurable for PostgreSQL)
- **JWT** for secure authentication
- **Bcrypt** for password hashing
- **Pydantic** for data validation

### Infrastructure
- **Docker** containerization for easy deployment
- **CORS** configured for cross-origin requests
- **Database migrations** with SQLAlchemy

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.11+
- **Docker** (optional)

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Docker Deployment
```bash
# Build and run the backend container
cd backend
docker build -t feedback-system-backend .
docker run -p 8000:8000 feedback-system-backend
```

## 🔑 Demo Accounts

The system comes pre-configured with demo accounts for immediate testing:

### Manager Account
- **Email:** manager@company.com
- **Password:** manager123
- **Capabilities:** Create feedback, view team analytics, manage team members

### Employee Account  
- **Email:** employee@company.com
- **Password:** employee123
- **Capabilities:** View received feedback, acknowledge feedback, track personal progress

## 📊 Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- name (String)
- email (String, Unique)
- password_hash (String)
- role (Enum: manager, employee)
- team_id (String, Optional)
```

### Feedback Table
```sql
- id (UUID, Primary Key)
- manager_id (Foreign Key → users.id)
- employee_id (Foreign Key → users.id)
- strengths (Text)
- areas_to_improve (Text)
- sentiment (Enum: positive, neutral, negative)
- tags (JSON Array)
- created_at (DateTime)
- updated_at (DateTime)
```

### Acknowledgments Table
```sql
- id (UUID, Primary Key)
- feedback_id (Foreign Key → feedback.id)
- employee_id (Foreign Key → users.id)
- acknowledged_at (DateTime)
```

## 🎨 Design Philosophy

The application follows **Apple-level design aesthetics** with:
- **Clean, intuitive interfaces** with thoughtful spacing and typography
- **Consistent color system** with semantic color coding
- **Smooth animations** and hover states for enhanced user experience
- **Responsive design** that works seamlessly across all devices
- **Professional gradients** and subtle shadows for visual depth

## 🔧 API Documentation

### Authentication Endpoints
- `POST /auth/login` - User authentication
- `GET /auth/me` - Get current user information

### User Management
- `GET /users/team-members` - Get team members (Manager only)

### Feedback Operations
- `GET /feedback` - Get feedback (role-based filtering)
- `POST /feedback` - Create new feedback (Manager only)
- `POST /feedback/{id}/acknowledge` - Acknowledge feedback (Employee only)
- `GET /feedback/stats` - Get feedback statistics

## 🐳 Docker Configuration

The backend includes a production-ready Dockerfile with:
- **Python 3.11** slim base image
- **Security hardening** with non-root user
- **Health checks** for monitoring
- **Optimized layering** for faster builds

## 🚀 Production Deployment

The application is designed for easy deployment on platforms like:
- **Render** - For backend API hosting
- **Vercel** - For frontend hosting  
- **Railway** - For full-stack deployment
- **AWS/GCP/Azure** - For enterprise deployments

## 🛡️ Security Features

- **JWT token authentication** with configurable expiration
- **Password hashing** using bcrypt
- **Role-based access control** with middleware protection
- **CORS configuration** for secure cross-origin requests
- **SQL injection protection** through SQLAlchemy ORM
- **Input validation** with Pydantic models

## 🎥 Demo Capabilities

The application supports comprehensive demonstration scenarios:
- **5-minute feature walkthrough** showcasing all major functionalities
- **10-minute technical deep-dive** explaining architecture and implementation
- **Real-time feedback creation and acknowledgment workflow**
- **Analytics and reporting capabilities**

## 🤖 AI Tools Used

This project was developed with assistance from:
- **Claude 4 (Sonnet)** - Architecture design and code generation
- **GitHub Copilot** - Code completion and optimization suggestions

## 📈 Future Enhancements

Potential improvements and features:
- **Email notifications** for new feedback
- **PDF export** functionality
- **Advanced analytics** with charts and trends
- **Peer feedback** system
- **Goal setting** and tracking
- **Integration** with HR systems
- **Mobile app** development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FastAPI** team for the excellent web framework
- **React** team for the powerful frontend library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set

---

**FeedbackFlow** - Empowering teams through structured feedback and continuous growth 🚀