# AI-Powered-Job-Match-Platform
IT Job Search Platform
A full-stack web application for IT job seekers to search, filter, and discover jobs using both live job APIs and AI-powered recommendations.

Features
User Authentication: Register and log in securely.
Main Homepage: Search IT jobs by skill, company, or job title.
AI Job Search: Get AI-generated job recommendations using OpenAI.
Job Listings: View and filter job postings.
Modern Tech Stack: React, Node.js/Express, PostgreSQL, and OpenAI API.

Tech Stack
Frontend: React, Axios, React Router
Backend: Node.js, Express, Axios, dotenv
Database: PostgreSQL
AI Integration: OpenAI GPT-3.5/4 API (for AI job search)
Job API: (Optional) Jobicy or any public jobs API for real job data

Getting Started
Clone the Repository
bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

Backend Setup
bash
cd backend
npm install
Create a .env file in /backend:

text
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
Start PostgreSQL and create the required tables (see /backend/schema.sql or use the provided SQL in this README).

Start the backend server:

bash
node index.js

Frontend Setup
bash
cd ../frontend
npm install
npm start

Database Schema (PostgreSQL)
sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Environment Variables
Create a .env file in your backend directory with:

text
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

Usage
Register a new user or log in with existing credentials.
After login, you land on the Main Homepage.
Search for IT jobs by entering a skill, company, or job title.
Click the AI Job Search button (top right) for AI-powered job recommendations.
Browse job results and apply directly via provided links.
