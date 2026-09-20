# 🚀 Servigo — Service Marketplace

> **Connect with trusted professionals and book services with ease.**

Servigo is a full-stack **MERN service marketplace** that connects customers with trusted professionals. Users can discover services, view professional profiles, book appointments, manage bookings, and share reviews.

The platform is designed with a modern, responsive UI and smooth animations using **GSAP and Motion**.

---

## ✨ Features

### 👤 Customer

* User registration and login
* Secure authentication
* Browse available services
* Search and discover services
* View professional profiles
* View service details
* Book services
* Manage bookings
* Track booking status
* Leave reviews and ratings
* Manage personal profile

### 🧑‍🔧 Professional

* Professional registration/login
* Create and manage professional profile
* Add offered services
* Manage service information
* View customer bookings
* Accept/reject bookings
* Update booking status
* View customer reviews

### 🛡️ Admin

* Work in progress

---

## 🎨 UI & Animation

Servigo focuses on a modern and interactive user experience.

* GSAP animations
* Motion animations
* Smooth page transitions
* Scroll-based animations
* Animated service cards
* Hover interactions
* Animated navigation
* Responsive layouts
* Modern dark/premium UI
* Micro-interactions
* Loading animations

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* GSAP
* Motion
* React Router
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Cookie Parser
* CORS
* Zod
* Nodemon / TSX

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* MongoDB

---

## 🏗️ Project Structure

```text
servigo/
│
├── src/
│   ├── animations/
│   ├── components/
│   │   ├── common/
│   │   ├── footer/
│   │   ├── home/
│   │   └── navbar/
│   │
│   ├── context/
│   ├── data/
│   ├── hooks/
│   │
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── customer/
│   │   ├── professional/
│   │   └── public/
│   │
│   ├── services/
│   ├── types/
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   └── ...
│
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/LALITCHAVAN/servigo.git
```

### 2. Navigate to the project

```bash
cd servigo
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd server
npm install
```

### 5. Create environment variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

SMTP_USER=your_email
SMTP_PASS=your_app_password
```

> ⚠️ Never commit your `.env` file to GitHub.

---

## ▶️ Running the Project

### Start Backend

From the `server` directory:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal in the project root:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🔐 Authentication

Servigo uses secure authentication with:

* JWT
* HTTP cookies
* Password hashing with bcryptjs
* Protected routes
* Role-based authorization

Supported roles:

```text
Customer
Professional
Admin
```

---

## 📅 Booking Flow

The basic booking workflow is:

```text
Customer
   ↓
Browse Services
   ↓
Select Service
   ↓
View Professional
   ↓
Create Booking
   ↓
Professional Reviews Request
   ↓
Accept / Reject
   ↓
Booking Status Updated
   ↓
Service Completed
   ↓
Customer Leaves Review
```

---

## ⭐ Reviews & Ratings

Customers can review completed services.

Reviews can contain:

* Rating
* Review text
* Customer profile
* Professional information
* Service information

This helps customers choose reliable professionals.

---

## 🔌 API Structure

The backend follows a REST API architecture.

Example routes:

```text
/api/auth
/api/users
/api/services
/api/bookings
/api/reviews
/api/professionals
/api/admin
```

---

## 🔒 Environment Variables

The following environment variables may be required:

| Variable     | Description                |
| ------------ | -------------------------- |
| `PORT`       | Backend server port        |
| `MONGO_URI`  | MongoDB connection string  |
| `JWT_SECRET` | JWT authentication secret  |
| `CLIENT_URL` | Frontend URL               |
| `SMTP_USER`  | Email service username     |
| `SMTP_PASS`  | Email service app password |

---

## 📱 Responsive Design

Servigo is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

The UI adapts to different screen sizes while maintaining smooth animations and usability.

---

## 🚀 Future Improvements

Planned improvements include:

* 💳 Online payment integration
* 📍 Location-based service discovery
* 🗺️ Google Maps integration
* 💬 Real-time chat
* 🔔 Real-time notifications
* 📧 Advanced email notifications
* 📊 Advanced admin analytics
* 🤖 AI-powered service recommendations
* 📱 Progressive Web App support
* ⭐ Professional verification system

---

## 🧪 Testing

API endpoints can be tested using:

* Postman
* Thunder Client

Frontend functionality can be tested manually through the application.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a Pull Request

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

## 👨‍💻 Author

**Lalit Chavan**

GitHub:
https://github.com/LALITCHAVAN

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

### 🚀 Servigo

**Find trusted professionals.
Book services easily.
Get things done.**
