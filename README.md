# Hospital Appointment System (MedCare Plus)

**Course**: ITUE301 — Advanced Web Development Frameworks  
**Examination**: Open-Book Practical Examination (Set A)  
**Tech Stack**: React + Express.js + MongoDB (Mongoose)

---

## 1. Project Overview
MedCare Plus Hospital Appointment System allows patients to view medical specialists, book appointments, and view real-time appointment status.

### Features & Tasks Summary
- **Task 1 — React Component Architecture**: Reusable `AppointmentCard` component supporting props (`patientName`, `doctorName`, `date`, `timeSlot`, `status`) with dynamic status badges (`confirmed`, `pending`, `cancelled`).
- **Task 2 — React Routing & State Management**: React Router setup (`/`, `/doctors`, `/booking`). Navigation component with client-side links. `BookingPage` with `useState` (`formData`, `selectedDoctor`) and interactive live preview.
- **Task 3 — Express REST API & Middleware**: REST endpoints `GET /api/v1/doctors`, `GET /api/v1/appointments`, `POST /api/v1/appointments`. Custom `requestLogger` middleware logging `[METHOD] [PATH] [TIMESTAMP]` globally and a global error-handling middleware.
- **Task 4 — REST API Consumption in React**: `DoctorsPage` fetching from `GET /api/v1/doctors` using `useEffect` and maintaining `data`, `loading`, `error` states.
- **Task 5 — MongoDB + Mongoose Schema Design & Validation**: Mongoose schemas for `Patient`, `Doctor`, and `Appointment` with strict validation rules (enums, required fields, unique email, max 300 char reason) and error handling.

---

## 2. Required Environment Variables
Create `.env` inside the `backend/` directory (copied from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hospital_system
```

---

## 3. Frontend Setup and Run Command

Navigate to the `frontend/` directory:

```bash
cd frontend
npm install
```

### Run Command:
```bash
npm run dev
```

The React application will be available at `http://localhost:5173`.

---

## 4. Backend Setup and Run Command

Navigate to the `backend/` directory:

```bash
cd backend
npm install
```

### Run Command:
```bash
node server.js
# or
npm start
```

### Optional Seed Script:
```bash
npm run seed
```

The Express API backend runs on `http://localhost:5000`.

---

## 5. MongoDB Setup
1. Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017` (or provide your MongoDB Atlas URI in `backend/.env`).
2. Open MongoDB Compass (or VS Code MongoDB Extension / `mongosh`) and connect to `mongodb://127.0.0.1:27017`.
3. View the `hospital_system` database with `doctors`, `patients`, and `appointments` collections.
