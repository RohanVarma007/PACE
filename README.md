# 🏃 Pace

### An AI-powered running coach built to help you run smarter, not harder.

**Pace** is a full-stack web application designed to help runners keep track of their runs, understand their running patterns, and avoid over-exerting themselves.

The goal is simple: **running should be something you enjoy, not something that leaves you constantly dealing with fatigue or injuries.**

---

## 🌐 Live Deployment

**Live Website:**
https://pace-orjbvdfy4-winners-3ea1.vercel.app

**Backend:**
https://pace-n60f.onrender.com/

The frontend and backend are independently deployed, with the frontend hosted on **Vercel** and the backend hosted on **Render**. The application uses **MongoDB Atlas** for persistent cloud-based data storage.

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

The AI coach is intended as a supportive tool rather than a replacement for professional coaching or medical advice.

---

# 🎨 Frontend

The frontend of Pace is built using **React** and is deployed completely online using **Vercel**.

### Frontend responsibilities include:

* Creating the user interface
* Handling user interaction
* Collecting running information
* Communicating with the backend through APIs
* Displaying stored running data
* Providing the AI coach interface

The interface was designed to be more than just a collection of forms and buttons. A major focus of the project was creating a clean, modern experience that actually feels like a running-focused application.

The UI has been carefully structured around the flow of the application:

**Record Run → View Information → Get AI Guidance → Continue Running**

---

## ✨ UI & Design

A major part of Pace was the visual design and overall user experience.

The application uses custom styling along with components and visual effects inspired by **React Bits**. Interactive effects such as the splash/cursor effect were incorporated to complement the overall vibe of the website.

The visual elements were chosen to make the application feel interactive and polished rather than looking like a basic form-based project.

The goal was to create something that feels closer to an actual product than a simple college/demo application.

---

# ⚙️ Backend

The backend is responsible for handling the application's data and communication between the frontend, database, and AI functionality.

The backend is built using **Node.js and Express.js** and is hosted on **Render**.

### Backend responsibilities include:

* Handling requests from the React frontend
* Receiving submitted running data
* Processing API requests
* Storing and retrieving run information
* Communicating with MongoDB Atlas
* Handling AI-coach related requests
* Sending processed information back to the frontend

The frontend and backend are completely separated and communicate through API requests.

```
```


🌐 **https://pace-topaz-chi.vercel.app/**

---

> **Pace — Run smarter. Stay consistent. Enjoy the run.**
