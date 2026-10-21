# Practical-6: Full Stack Task Management Application

A full-stack web application for task management built using the MERN stack (MongoDB, Express.js, React, Node.js) with Vite.

---

## 📌 Features

- **Task Creation**: Add tasks with title, description, and priority level (`low`, `medium`, `high`).
- **Task Listing & Management**: View tasks dynamically sorted by creation time.
- **Toggle Completion**: Mark tasks as completed or pending with immediate UI updates.
- **Edit / Update**: Modify task details (title, description, priority) using an interactive modal.
- **Delete Tasks**: Remove tasks with backend confirmation.
- **Toast Notifications**: User-friendly alerts for actions and errors.
- **Responsive UI**: Clean and modern styling with CSS variables and responsive layouts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Design System with responsive grid & theme variables)
- **HTTP Client**: Fetch API / Custom REST client (`api.js`)

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Database / ODM**: MongoDB with Mongoose
- **CORS Support**: `cors` middleware
- **Environment Management**: `dotenv`

---

## 📂 Project Structure

```text
Practical-6/
├── backend/
│   ├── models/
│   │   └── Task.js          # Mongoose Task schema & model
│   ├── server.js            # Express server & API route endpoints
│   ├── package.json         # Backend dependencies & scripts
│   └── .env                 # Backend environment variables (optional/configurable)
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components (TaskForm, TaskList, UpdateTaskModal, Toast)
│   │   ├── api.js           # API integration service
│   │   ├── App.jsx          # Root component
│   │   ├── index.css        # Stylesheet & UI theme
│   │   └── main.jsx         # Application entry point
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   └── package.json         # Frontend dependencies & scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
   ```

4. Start the backend server:
   - For development (with file watcher):
     ```bash
     npm run dev
     ```
   - Standard start:
     ```bash
     npm start
     ```

   *Backend server will run at `http://localhost:5000`.*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

   *Frontend application will run at `http://localhost:5173`.*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Retrieve all tasks sorted by creation date |
| `POST` | `/tasks` | Create a new task (`title`, `description`, `priority`) |
| `PUT` / `PATCH` | `/tasks/:id` | Update an existing task by ID |
| `DELETE` | `/tasks/:id` | Delete a task by ID |
