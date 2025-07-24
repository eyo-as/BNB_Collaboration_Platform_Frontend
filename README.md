# 🧠 Peer Hub — A Student Collaboration & Q&A Platform

**Peer Hub** is a full-stack web application built to help students collaborate, ask questions, and support each other — inspired by real academic challenges. Designed with simplicity and purpose, Peer Hub aims to foster a helpful and interactive student learning community.

---

## 🚀 Features

- 🧑‍🎓 User registration and login (with JWT authentication)
- ❓ Ask and answer questions
- 👍 Upvote answers from others
- 🛡️ Role-based access (admin & regular users)
- 🔐 Secure routes and session management
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Bootstrap
- Axios

### Backend

- Node.js
- Express.js
- MySQL with `mysql2`
- JSON Web Token (JWT) authentication
- Role-based access control

### Deployment

- 🌐 **Frontend**: [Vercel](https://vercel.com)
- 🧠 **Backend**: [Render](https://render.com)
- 🗃️ **Database**: MySQL on [Clever Cloud](https://www.clever-cloud.com)

---

## 📁 Project Structure

```
Peer-Hub/
│
├── client/             # React frontend
│   ├── components/     # UI components
│   ├── pages/          # Route pages (login, register, etc.)
│   ├── utils/          # Context and helpers
│   └── App.jsx         # Main app component with routing
│
├── server/             # Express backend
│   ├── controllers/    # Business logic for users, questions, etc.
│   ├── routes/         # API route handlers
│   ├── middleware/     # Auth middleware and error handling
│   ├── config/         # Database configuration
│   └── index.js        # Entry point
```

---

## 🔐 Authentication

- Secure login using JWT
- Tokens stored in `localStorage`
- Role-based redirects and route protection

---

## 📍 Future Improvements

- 🔎 Search and filter by tags or topics
- 👍👎 Upvote and downvote functionality for answers and questions
- ✅ Admin analytics dashboard

---

## 👨‍💻 Developed By

**Eyosiyas Tumiso**  
🚀 MERN Full Stack Developer

- 🔗 [LinkedIn](https://www.linkedin.com/in/eyosiyas-tumiso/)
- 🌐 [Portfolio](https://eyoas-dev.vercel.app)

> 🙌 Peer Hub was born out of my love for tech and education — a platform I wish I had in high school, now built to support others.
