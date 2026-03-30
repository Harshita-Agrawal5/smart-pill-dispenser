# 💊 Smart Pill Dispenser

A React-based frontend simulation of an intelligent pill dispenser system designed to improve medication adherence through role-based monitoring and tracking.

---

## 🚀 Features

### 👤 Patient

* View next scheduled dose
* Track medication status (Taken/Missed)
* Monitor adherence percentage

### 👨‍⚕️ Doctor

* Add prescriptions (medicine + time)
* Manage patient medication schedule

### 👩‍⚕️ Caregiver

* Monitor patient adherence
* Track missed doses
* View real-time status updates

### 📊 System Features

* Simulated real-time updates using timers
* Medication history logs
* Adherence tracking
* Role-based UI rendering

---

## 🛠️ Tech Stack

* **Frontend:** React JS
* **Language:** JavaScript (ES6)
* **Styling:** Inline CSS
* **Concepts Used:**

  * React Hooks (useState, useEffect)
  * Conditional Rendering
  * Event Handling
  * State Management

---

## ⚙️ How It Works

* The system simulates pill intake every 5 seconds
* Status is randomly updated as **Taken** or **Missed**
* Adherence percentage and history logs are updated dynamically
* Different dashboards are rendered based on user role

---

## ▶️ How to Run

```bash
npm install
npm start
```

---

## ⚠️ Limitations

* No backend/database integration
* No real IoT device connection
* Data is not stored permanently
* Adherence is simulated (randomized)

---

## 🌟 Future Improvements

* Integrate IoT hardware (ESP32/Arduino)
* Add backend (Node.js / Firebase)
* Real-time notifications (SMS/App alerts)
* AI-based adherence prediction

---

## 📌 Conclusion

This project demonstrates how modern frontend technologies like React can be used to simulate healthcare systems with role-based access and real-time monitoring features.

