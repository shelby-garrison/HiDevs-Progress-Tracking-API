
# 🧠 Personalized Roadmap Progress Tracking API

This is a RESTful API system designed to help users track their real-time progress through personalized learning roadmaps. It enables logging of completion status, time spent, and user insights for each learning module while providing smart progress metrics and achievement tracking.

---

## 📚 Overview

The roadmap is structured into 5 levels, each containing several modules that users progress through **sequentially**. This API performs the following operations:

- Log module progress (completion, time spent, notes)
- Retrieve roadmap and progress status
- Recommend next sequential module
- Report overall and per-level completion percentages
- Track timestamps and achievements

---

## 🔧 Tech Stack

- **Node.js + Express** for backend logic
- **MongoDB** for database storage
- **JWT** for user authentication
- **Swagger (OpenAPI 3.0)** for API documentation
- **Docker** for containerization

---

## 🚀 Features

- ✅ User authentication via JWT
- ✅ Secure progress tracking with validation
- ✅ RESTful endpoints for roadmap progress
- ✅ Swagger UI for live API testing
- ✅ Timestamp logging and smart response structure
- ✅ Achievement and recommendation logic
- ✅ Containerized using Docker

---

## 📦 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/shelby-garrison/HiDevs-Progress-Tracking-API
cd HiDevs-Progress-Tracking-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3000/auth/google/callback
```

---

### 4. Run the app

## 🐳 Docker Usage

### 1. Build the image

```bash
docker build -t roadmap-tracker-api .
```

### 2. Run the container

```bash
docker run -p 3000:3000 --env-file .env roadmap-tracker-api
```
Service would be running live on port 3000
---

## 📘 API Documentation

After running the app, visit:

```
http://localhost:3000/api-docs
```

You’ll find:

- Full list of endpoints
- Authentication via JWT (Authorize button)
- Example payloads for requests and responses
- Error code documentation

---

## 📊 Example Request Payload

```json
POST /api/progress/update

{
  "levelId": 1,
  "moduleIndex": 3,
  "completionStatus": true,
  "timeSpent": 35,
  "userNotes": "Had difficulty understanding vector embeddings."
}
```

## ✅ Sample Response

```json
{ "message": "Progress updated successfully",
"currentLevelProgress": 100,
"overallCompletion": 33.33,
"nextRecommendedModule": {
 "levelIndex": 2,
"moduleIndex": 1,
"title": "LLM Introduction"
},
 "achievementsUnlocked": [ "Quarter Way There!" ],
"updatedAt": "2025-04-30T14:01:45.426Z"
}
```

---

## 🔐 Authentication

- JWT authentication is required for all progress-related endpoints.
- Use `/auth/google` to obtain a token.
- Use the Swagger "Authorize" button to test authenticated routes.

---
