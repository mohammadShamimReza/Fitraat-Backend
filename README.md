# Fitraat Backend using strapi

## Overview

**Fitraat** is a 40-day marathon program designed to help individuals overcome addiction to adult content (porn). The app provides daily tasks, an emergency help section for uncontrollable moments, and community support. Users can also access informative blogs to aid their recovery journey.

## Key Features

- **Daily Progress Steps**  
  Users complete four types of tasks each day for 40 days:
  - Videos  
  - Kegel exercises  
  - Quizzes  
  - Blogs  

- **Community Support**  
  - Logged-in users can post questions and provide answers through comments in the feed section.  
  - Guests (non-logged-in users) can only view the feed but cannot interact.  

- **Emergency Help**  
  - A dedicated section for moments of intense cravings or lack of control.  
  - Includes videos, quotes, advice, and achievements for successfully overcoming such moments.  

- **Free and Pro Access**  
  - Free users have access to the system for 3 days.  
  - Paid users gain Pro membership via **SSL Commerz** integration.  

- **Blogs**  
  - Accessible to all users.  
  - Features answers to common myths and questions related to addiction and recovery.  

---

## API Documentation

### Header
- **Authorization Token**: `Bearer ${token}`

---

### **Free-Blog**
1. **Find All**: `/api/free-blogs` [GET]
2. **Find One**: `/api/free-blogs/:id` [GET]

---

### **Blog**
1. **Find All**: `/api/blogs` [GET]
2. **Find One**: `/api/blogs/:id` [GET]

---

### **Emergency**
1. **Find All**: `/api/emergencies` [GET]
2. **Find One**: `/api/emergencies/:id` [GET]

---

### **Kagel-Times**
1. **Find All**: `/api/kagel-times` [GET]
2. **Find One**: `/api/kagel-times/:id` [GET]

---

### **Kegel**
1. **Find All**: `/api/kegel` [GET]
2. **Find One**: `/api/kegel/:id` [GET]

---

### **Post**
1. **Find All**: `/api/posts` [GET]
2. **Find One**: `/api/posts/:id` [GET]

---

### **Post-Comment**
1. **Create**: `/api/post-comments` [POST]
2. **Find All**: `/api/post-comments` [GET]
3. **Find One**: `/api/post-comments/:id` [GET]
4. **Delete**: `/api/post-comments/:id` [DELETE]

---

### **Quiz-Content**
1. **Find All**: `/api/quiz-contants` [GET]
2. **Find One**: `/api/quiz-contants/:id` [GET]

---

### **Subscribers**
1. **Find All**: `/api/subscribers` [GET]
2. **Find One**: `/api/subscribers/:id` [GET]
3. **Create**: `/api/subscribers` [POST]
4. **Delete**: `/api/subscribers/:id` [DELETE]

---

### **Video**
1. **Find All**: `/api/videos` [GET]
2. **Find One**: `/api/videos/:id` [GET]

---

### **Day**
1. **Find All**: `/api/days` [GET]
2. **Find One**: `/api/days/:id` [GET]
3. **Create**: `/api/days` [POST]
4. **Delete**: `/api/days/:id` [DELETE]

---


## How to run in locally


### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (if using a local database)

### .env setup
NEXT_PUBLIC_BASE_URL="you backend setup"


### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone <gh repo clone mohammadShamimReza/Fitraat-Backend>
   cd <Cloned repo>
   npm install
   npm run dev
```
