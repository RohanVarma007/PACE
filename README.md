# 🏃 Pace

### An AI-powered running coach built to help you run smarter, not harder.

**Pace** is a full-stack web application designed to help runners keep track of their runs, understand their running patterns, and avoid over-exerting themselves.

The goal is simple: **running should be something you enjoy, not something that leaves you constantly dealing with fatigue or injuries.**

  Live Website : pace-topaz-chi.vercel.app


  Backend:https://pace-n60f.onrender.com

---

## ✨ What is Pace?

Pace acts as a personal digital running companion.

Instead of simply recording runs and displaying numbers, Pace focuses on the bigger picture — helping runners understand whether they are pushing themselves appropriately and giving them guidance based on their recent running activity.

Users can:

* 🏃 Record their runs
* 📊 Store and review previous running sessions
* 🗂️ Access their running history whenever they want
* 🤖 Interact with an AI running coach
* 💡 Get suggestions based on their running information
* 🌐 Access everything directly through the web
* ☁️ Keep their data stored online rather than locally

The application is designed around the idea of **sustainable running** — encouraging users to improve while also listening to their bodies.

---

# 🚀 Features

## 📝 Run Recording

Users can submit information about their running session through the run form.

Once submitted, the run is processed and stored so that it can be accessed later.

This allows Pace to gradually build a history of the user's running activity instead of treating every run as an isolated session.

---

## 📚 Run History

All submitted runs are stored in an online database.

Users can return to the application and view their previous running sessions instead of losing their data whenever they close the website.

This makes the application useful not just for recording a single run, but for **tracking running activity over time**.

---

## 🤖 AI Running Coach

One of the main features of Pace is the integrated AI coach.

After submitting a run, users can interact with the coach directly below the run form and ask for suggestions.

The AI can use the running information to provide guidance such as:

* Whether the current effort seems excessive
* How the user should approach their next run
* Whether they should consider taking it easier
* General training suggestions
* Ways to maintain a more sustainable running routine

The idea isn't to replace a professional coach or medical advice.

Instead, it acts as an **accessible first layer of guidance** that helps runners think about how they are approaching their training.

---

# 🎨 Frontend

The frontend of Pace is built using **React** and is deployed completely online using **Vercel**.

🌐 **Frontend:** Vercel

The interface was designed to be more than just a collection of forms and buttons. A major focus of the project was creating a clean, modern experience that actually feels like a running-focused application.

The UI has been carefully structured around the flow of the application:

**Record Run → View Information → Get AI Guidance → Continue Running**

### Design

The project also makes use of components and visual effects inspired by **React Bits**, including the splash/cursor-style effects used to complement the overall visual identity of the website.

Rather than adding effects randomly, the animations were chosen to fit the overall vibe of Pace and make the application feel more interactive and polished.

The goal was to make the application feel like an actual product rather than simply a college/demo project.

---

# ⚙️ Backend

The backend is responsible for handling the application's data and communication between the frontend, database, and AI functionality.

The backend is hosted on **Render**, allowing the application to communicate with the frontend remotely through APIs.

### Backend responsibilities include:

* Handling requests from the React frontend
* Receiving submitted running data
* Storing and retrieving run information
* Communicating with the database
* Handling AI-coach related requests
* Sending processed information back to the frontend

The frontend and backend are therefore completely separated.

```text
React Frontend
      │
      │ API Requests
      ▼
Backend / API
(Render)
      │
      ├──────────────► MongoDB Atlas
      │
      └──────────────► AI Coach
```

---

# ☁️ Database

Pace uses **MongoDB Atlas** for online data storage.

Instead of storing runs inside the local machine, the application's data is stored remotely in a cloud-hosted MongoDB database.

This means that the application can:

* Persist data between sessions
* Retrieve previous runs
* Work with a remotely hosted backend
* Keep the application independent from a local database

The database forms the persistent storage layer of the application.

```text
User
 │
 ▼
React
 │
 ▼
Render Backend
 │
 ▼
MongoDB Atlas
 │
 ▼
Stored Running Data
```

---

# 🌍 Fully Deployed Architecture

One of the important aspects of this project is that **Pace is not dependent on localhost**.

The complete application is deployed online.

### Deployment

| Component     | Technology             | Hosting       |
| ------------- | ---------------------- | ------------- |
| Frontend      | React                  | Vercel        |
| Backend       | Node.js / API          | Render        |
| Database      | MongoDB                | MongoDB Atlas |
| AI Coach      | AI API integration     | Cloud         |
| UI Components | React Bits + custom UI | —             |

This allows the application to function as a real distributed web application:

```text
                    ┌─────────────────┐
                    │      USER       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ React Frontend  │
                    │     Vercel      │
                    └────────┬────────┘
                             │
                        API Requests
                             │
                             ▼
                    ┌─────────────────┐
                    │     Backend     │
                    │     Render      │
                    └───────┬─┬───────┘
                            │ │
              ┌─────────────┘ └─────────────┐
              ▼                             ▼
     ┌─────────────────┐          ┌─────────────────┐
     │  MongoDB Atlas  │          │    AI Coach     │
     │   Data Storage  │          │   Suggestions   │
     └─────────────────┘          └─────────────────┘
```

Because the frontend, backend, and database are all hosted remotely, the project can be accessed from anywhere with an internet connection.

---

# 🧠 Why I Built Pace

Running can be a very accessible sport, but it is also easy to fall into the mindset of **"more is always better."**

Running faster, running longer, or running more frequently doesn't necessarily mean that someone is training better.

Pace was built around the idea that runners should be able to look at their activity, understand how they are progressing, and receive guidance that encourages **consistency over excessive effort**.

The application therefore combines:

**Running Data + Persistent Storage + AI Guidance + A Focused User Experience**

into one platform.

---

# 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML
* CSS
* React Bits
* Vercel

### Backend

* Node.js
* Express.js
* REST APIs
* Render

### Database

* MongoDB
* MongoDB Atlas

### AI

* AI-powered running coach
* API-based AI integration

---

# 🔄 Application Flow

A typical interaction with Pace looks like this:

### 1. Open Pace

The user accesses the application through the deployed Vercel website.

### 2. Record a Run

The user enters their running information through the run form.

### 3. Send Data

The React frontend sends the information to the backend hosted on Render.

### 4. Store the Run

The backend processes the request and stores the running data in MongoDB Atlas.

### 5. Access Running History

The stored data can later be retrieved and displayed to the user.

### 6. Ask the AI Coach

The user can interact with the AI coach directly from the application and ask for suggestions based on their running activity.

### 7. Get Guidance

The AI processes the relevant information and provides recommendations intended to help the user approach their training more sustainably.

---

# 📌 Project Highlights

* 🌐 Fully deployed full-stack application
* ⚛️ React-based frontend
* 🖥️ Node.js/Express backend
* ☁️ MongoDB Atlas cloud database
* 🚀 Vercel frontend deployment
* 🔧 Render backend deployment
* 🤖 Integrated AI running coach
* 📚 Persistent running history
* 🎨 Custom modern UI
* ✨ Interactive visual effects
* 🔗 Frontend-backend API communication
* 📱 Accessible remotely without localhost dependencies

---

# 🎯 Future Improvements

Pace can be expanded into a much more comprehensive running platform.

Potential improvements include:

* 📈 Running analytics and graphs
* 📊 Pace and distance trends
* ❤️ Heart-rate integration
* 🗓️ Training plans
* 🎯 Personalized running goals
* 🏆 Progress tracking
* 🔔 Recovery reminders
* 🧠 More advanced AI coaching
* 📱 Improved mobile experience
* ⌚ Integration with running/wearable devices

---

# 👨‍💻 Project

Pace was developed as a full-stack project combining frontend development, backend API development, cloud database management, deployment, and AI integration.

The project was built with the intention of going beyond a locally running prototype and creating an application that is **actually accessible, persistent, and usable online.**

### Live Demo

🌐 **https://pace-topaz-chi.vercel.app/**

---

> **Pace — Run smarter. Stay consistent. Enjoy the run.**
