# 🏃 Pace

### An AI-powered running coach built to help you run smarter, not harder.

Pace is a full-stack web application designed to help runners **track their runs, maintain a running history, and get personalized guidance from an AI running coach**.

The goal is simple: help runners improve consistently without over-exerting themselves or turning every run into a competition.

---

## 🌐 Live Deployment

**Drive:**
https://drive.google.com/drive/u/1/folders/1551gFupubHmh_gHj5M13nWXTdV79iB6V

**Live Website:**
https://pace-topaz-chi.vercel.app/

**Backend:**
https://pace-n60f.onrender.com/

---

## 📌 What is Pace?

Pace is an online running companion that combines **run tracking, persistent run history, and AI-powered coaching** into one platform.

Instead of simply recording how far or how fast someone ran, Pace focuses on the bigger picture — helping users understand their running habits and make better decisions about their next workout.

The application is fully deployed, meaning the frontend, backend, and database work together through cloud-hosted services without requiring the application to run on localhost.

---

## ✨ Features

### 🏃 Run Recording

Users can submit details about their runs through a dedicated run form.

The submitted run data is properly stored so that users can revisit their previous runs and keep track of their running activity over time.

### 📖 Run History

Pace maintains a persistent history of recorded runs.

Instead of losing information after closing the website, users can return later and view their previously submitted running data.

### 🤖 AI Running Coach

After recording a run, users can interact with an AI coach and ask for suggestions about what they should do next.

The coach is designed around sustainable running — helping users avoid unnecessary over-exertion and make smarter decisions about their training.

### 🎨 Interactive UI

The website has been designed to feel like a proper modern web application rather than a basic form-based project.

It uses interactive visual effects and components inspired by **React Bits** to match the running-focused theme and make the interface more engaging.

---

## 🏗️ Architecture

Pace follows a separated full-stack architecture:

```text
                    ┌─────────────────────┐
                    │     Pace Frontend   │
                    │        React        │
                    └──────────┬──────────┘
                               │
                               │ API Requests
                               ▼
                    ┌─────────────────────┐
                    │     Pace Backend    │
                    │   Node.js + Express │
                    └──────────┬──────────┘
                               │
                               │ Database Operations
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │    Cloud Database   │
                    └─────────────────────┘
```

### Deployment

```text
React Frontend
      │
      ▼
   Vercel
      │
      │ API Requests
      ▼
Node.js / Express Backend
      │
      ▼
    Render
      │
      ▼
MongoDB Atlas
```

Each major part of the application is independently deployed while working together as one complete product.

---

## 💻 Tech Stack

### Frontend

* React
* HTML
* CSS
* JavaScript
* React Bits components / visual effects
* Vercel

### Backend

* Node.js
* Express.js
* JavaScript
* REST API
* Render

### Database

* MongoDB
* MongoDB Atlas

### Development

* Git
* GitHub
* VS Code
* Postman

---

## 🔄 How the Application Works

### 1. User records a run

The user enters their running information through the Pace interface.

### 2. Frontend sends the data

The React frontend sends the submitted information to the backend through an API request.

### 3. Backend processes the request

The Node.js/Express server receives the request and handles the required operations.

### 4. Data is stored

The backend communicates with MongoDB Atlas to persist the user's running information.

### 5. User can revisit their runs

Previously submitted runs can be retrieved from the database and displayed back to the user.

### 6. AI coaching

The user can then interact with the AI coach and receive suggestions based on their running activity.

---

## 🔗 Project Repositories

The frontend and backend are maintained as separate repositories.

**Frontend Repository:**
[Add Frontend GitHub Repository]

**Backend Repository:**
[Add Backend GitHub Repository]

---

## 🚀 Project Highlights

* Fully deployed full-stack application
* React-based frontend
* Node.js + Express backend
* MongoDB Atlas cloud database
* Persistent run history
* AI-powered running guidance
* Separate frontend and backend deployments
* REST API communication between frontend and backend
* Responsive and interactive user interface
* Modern UI effects and animations
* No dependency on localhost for the deployed application

---

## 🎯 Why I Built Pace

Running can easily become focused on speed, distance, and constantly pushing for better numbers.

Pace was built around a different idea:

> **Consistency matters more than constantly pushing your limits.**

The purpose of the application is to make running more sustainable by helping users keep track of their activity and giving them an intelligent way to think about what they should do next.

---

## 🔮 Future Improvements

Some features that could be added in future versions include:

* 📊 Running performance analytics
* 📈 Progress and trend visualizations
* 🗺️ GPS-based route tracking
* ❤️ Heart-rate integration
* 🏅 Personal running goals
* 📅 AI-generated training plans
* 🔔 Recovery and rest-day reminders
* 👤 User profiles and authentication
* 📱 Improved mobile experience
* 🤖 More personalized AI coaching based on long-term running history

---

## 📂 Project Structure

The project is divided into two main repositories:

```text
Pace
│
├── Frontend
│   └── React
│       ├── Components
│       ├── Pages
│       ├── Assets
│       └── Styling
│
└── Backend
    └── Node.js / Express
        ├── Routes
        ├── Models
        ├── Controllers
        └── API
```

The frontend communicates with the backend through HTTP requests, while the backend handles data processing and communication with MongoDB Atlas.

---

## 🌍 Deployment Links

**Drive:**
https://drive.google.com/drive/u/1/folders/1551gFupubHmh_gHj5M13nWXTdV79iB6V

**Live Website:**
https://pace-topaz-chi.vercel.app/

**Backend:**
https://pace-n60f.onrender.com/

---

## 🏁 Pace

**Run smarter. Stay consistent. Enjoy the run.**
