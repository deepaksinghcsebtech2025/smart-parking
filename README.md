# 🚗 Smart Parking Lot System

A Node.js + Express backend for managing a **smart multi-floor parking lot**.  
It provides **automatic spot allocation**, **check-in/out tracking**, **real-time slot updates**,  
and **parking fee calculation** based on duration and vehicle type.

---

## ✨ Features
- 🔄 **Automatic Spot Allocation** — assigns slots based on vehicle type & availability.  
- 🕒 **Check-In & Check-Out** — records vehicle entry/exit times.  
- 💰 **Fee Calculation** — duration × rate (per vehicle type).  
- 📡 **Real-Time Updates** — WebSocket-based slot availability updates.  
- 🔐 **JWT Authentication** — secure user login & token-based API access.  

---

## 🏗 Tech Stack
- **Backend**: Node.js, Express  
- **Database**: PostgreSQL + Sequelize ORM  
- **Auth**: JWT + bcrypt  
- **Realtime**: Socket.IO  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/deepaksinghcsebtech2025/smart-parking.git
cd smart-parking

2. Install dependencies

npm install

3. Setup environment variables

Create a .env file in the project root:

PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/smart_parking
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

4. Run the development server

npm run dev


⸻

📌 API Endpoints

Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login (JWT issued)
GET	/api/parking/availability?lotId=1	Get available slots in lot
POST	/api/reservations	Reserve a parking slot
POST	/api/checkin	Vehicle check-in
POST	/api/checkout/:reservationId	Vehicle checkout & fee calc


⸻

🧪 Sample Usage (cURL)

Register

curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"a@x.com","password":"pass123"}'

Login

curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@x.com","password":"pass123"}'

Reserve a Slot

curl -X POST http://localhost:4000/api/reservations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"vehicleId":1,"lotId":1,"slotType":"CAR"}'


⸻

📌 Next Steps
	•	Integrate payment gateways (Stripe, PayTM).
	•	Add License Plate Recognition (LPR) support.
	•	Build Admin dashboard with analytics.
	•	Add automated tests & CI/CD pipeline.

⸻

📜 License

MIT License © 2025 Deepak Singh
