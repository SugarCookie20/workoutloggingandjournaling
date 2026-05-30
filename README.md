# HARD LOG 🏋️‍♂️

A comprehensive, Brutalist-designed workout logging and journaling application. Track your lifts, monitor your energy levels, and analyze your progress with zero fluff.

## 🚀 Features

- **Workout Logger:** Log exercises, sets, reps, and weights in real-time.
- **Journal:** Track energy levels, mood, and daily notes to correlate with performance.
- **Progress Charts:** Visualize your strength gains with interactive charts.
- **Calendar View:** Monthly overview of your training consistency.
- **Plans & Templates:** (Coming Soon) Management for custom workout splits and exercise templates.
- **Brutalist UI:** A bold, high-contrast aesthetic built with Tailwind CSS 4 and React.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS 4, Recharts, Lucide React.
- **Backend:** Java 21, Spring Boot 3.5, Spring Data JPA.
- **Database:** MySQL (Production) / H2 (Development).
- **Containerization:** Docker & Docker Compose.

---

## 💻 Local Setup

### 1. Prerequisites
- Java 21
- Node.js 22+
- Docker & Docker Compose

### 2. Database Setup
Start the MySQL database using Docker:
```bash
docker-compose up -d
```

### 3. Backend Setup (Spring Boot)
```bash
cd backend
./mvnw clean spring-boot:run
```
The backend will be available at `http://localhost:8080`.

### 4. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

---

## 🌐 Deployment

### Backend (on Render)
1. **Prepare for MySQL:** Render provides managed PostgreSQL, but for MySQL, you can use an external provider or use Render's "Web Service" with a MySQL Docker image.
2. **Spring Boot App:**
   - Connect your GitHub repository to a new **Web Service**.
   - **Environment:** Docker or Java.
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/workout-backend-0.0.1-SNAPSHOT.jar`
   - Add environment variables for `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD`.

### Frontend (on Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `frontend` directory.
3. **Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables:**
   - Set `VITE_API_URL` to your Render backend URL (if applicable).

---

## 📜 License
MIT
