# JobPortal - Full Stack Job Portal Application

A modern full-stack job portal application built with the MERN stack (MongoDB, Express, React, Node.js). This platform connects recruiters and job seekers, allowing companies to post jobs and manage applications while candidates can browse and apply for positions.

## 🚀 Features

### For Job Seekers (Students)

- User authentication (signup/login)
- Browse and search jobs
- Filter jobs by category
- Apply for jobs with resume upload
- Track application status
- Manage profile with skills and resume

### For Recruiters

- Company profile management
- Post new job listings
- Manage job postings
- View and manage applicants
- Company branding with logo upload

### General Features

- JWT-based authentication
- Role-based access control (student/recruiter)
- Image and resume upload via Cloudinary
- Responsive UI design
- Real-time notifications

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Password Hashing**: bcryptjs
- **Middleware**: Multer (file uploads), Cookie Parser

### Frontend

- **Framework**: React 18 with Vite
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router DOM v6
- **UI Components**: Radix UI + Custom Components
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
jobportal-yt/
├── backend/
│   ├── controllers/      # Request handlers
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── middlewares/      # Custom middleware
│   │   ├── isAuthenticated.js
│   │   └── mutler.js
│   ├── models/           # Mongoose schemas
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── routes/           # API routes
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   ├── utils/            # Utility functions
│   │   ├── cloudinary.js
│   │   ├── datauri.js
│   │   └── db.js
│   ├── index.js          # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── admin/         # Admin dashboard components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── shared/        # Shared UI components
│   │   │   └── ui/            # Base UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility libraries
│   │   ├── redux/        # Redux slices and store
│   │   ├── utils/        # Frontend utilities
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)

### Backend Setup

1. Navigate to the backend directory:

```
bash
cd jobportal-yt/backend
```

2. Install dependencies:

```
bash
npm install
```

3. Create a `.env` file in the backend directory:

```
env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

4. Start the backend server:

```
bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

```
bash
cd jobportal-yt/frontend
```

2. Install dependencies:

```
bash
npm install
```

3. Start the development server:

```
bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### User Routes (`/api/v1/user`)

- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `GET /api/v1/user/getuser` - Get current user
- `PUT /api/v1/user/profile/update` - Update profile
- `POST /api/v1/user/profile/resume` - Upload resume
- `DELETE /api/v1/user/profile/resume` - Delete resume

### Company Routes (`/api/v1/company`)

- `POST /api/v1/company/register` - Register company
- `GET /api/v1/company/get` - Get company details
- `PUT /api/v1/company/update` - Update company
- `DELETE /api/v1/company/delete` - Delete company

### Job Routes (`/api/v1/job`)

- `POST /api/v1/job/post` - Create new job
- `GET /api/v1/job/getall` - Get all jobs
- `GET /api/v1/job/get/:id` - Get job by ID
- `GET /api/v1/job/adminjobs` - Get admin's jobs
- `PUT /api/v1/job/update/:id` - Update job
- `DELETE /api/v1/job/delete/:id` - Delete job

### Application Routes (`/api/v1/application`)

- `POST /api/v1/application/apply/:id` - Apply for job
- `GET /api/v1/application/getall` - Get all applications
- `GET /api/v1/application/get/:id` - Get application by ID

## 🎨 UI Components

The frontend uses a modern component architecture with:

- **Navbar**: Navigation with user/auth state
- **HeroSection**: Landing page hero
- **LatestJobs**: Display recent job postings
- **CategoryCarousel**: Job category browsing
- **FilterCard**: Job filtering options
- **Browse**: Full job browsing page
- **Profile**: User profile management
- **Admin Dashboard**: Company and job management

## 🔐 Authentication Flow

1. User registers with role (student/recruiter)
2. Password is hashed using bcryptjs
3. JWT token is generated on login
4. Token stored in cookies for secure authentication
5. Protected routes check for valid JWT
6. Role-based access control for admin features

## 📦 Environment Variables

### Backend (.env)

| Variable              | Description               |
| --------------------- | ------------------------- |
| PORT                  | Server port number        |
| MONGODB_URI           | MongoDB connection string |
| JWT_SECRET            | Secret key for JWT        |
| CLOUDINARY_API_KEY    | Cloudinary API key        |
| CLOUDINARY_API_SECRET | Cloudinary API secret     |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name     |

## 🧪 Development

### Running Tests

```
bash
# Backend tests
cd backend
npm test

# Frontend tests (if configured)
cd frontend
npm test
```

### Building for Production

```
bash
# Frontend build
cd frontend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC License

## 👤 Author

Your Name - [Your GitHub Profile]

## 🙏 Acknowledgments

- Radix UI for accessible components
- Tailwind CSS for styling
- Cloudinary for media management
- MongoDB for database
