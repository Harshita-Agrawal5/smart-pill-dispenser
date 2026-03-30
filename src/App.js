import React, { useState, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");

  const [nextDose, setNextDose] = useState("10:00 AM");
  const [status, setStatus] = useState("Pending");
  const [device, setDevice] = useState("Online");

  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");

  const [history, setHistory] = useState([]);

  const [adherence, setAdherence] = useState(85);
  const [missedCount, setMissedCount] = useState(0);
  const [prescription, setPrescription] = useState([]);

  // Updated useEffect with history logging
  useEffect(() => {
    const interval = setInterval(() => {
      const taken = Math.random() > 0.5;

      const newStatus = taken ? "Taken" : "Missed";
      setStatus(newStatus);

      if (!taken) {
        setMissedCount((prev) => prev + 1);
      }

      setAdherence(Math.floor(Math.random() * 100));

      // History update
      setHistory((prev) => [
        ...prev,
        {
          medicine: "Scheduled Medicine",
          time: new Date().toLocaleTimeString(),
          status: newStatus
        }
      ]);

    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const login = () => {
    if (name !== "") setPage("dashboard");
  };

  // LOGIN PAGE
  if (page === "login") {
    return (
      <div style={styles.container}>
        <h1>Smart Pill Dispenser</h1>

        <input
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <select onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="patient">Patient</option>
          <option value="caregiver">Caregiver</option>
          <option value="doctor">Doctor</option>
        </select>

        <button onClick={login} style={styles.button}>
          Login
        </button>
      </div>
    );
  }

  // MAIN UI
  return (
    <div style={styles.container}>
      <h2>Welcome {name} ({role})</h2>

      {/* NAVBAR */}
      <div>
        <button onClick={() => setPage("dashboard")} style={styles.nav}>Dashboard</button>

        {role === "doctor" && (
          <button onClick={() => setPage("schedule")} style={styles.nav}>
            Prescription
          </button>
        )}

        {role === "caregiver" && (
          <button onClick={() => setPage("schedule")} style={styles.nav}>
            Monitoring
          </button>
        )}

        <button onClick={() => setPage("history")} style={styles.nav}>Logs</button>
      </div>

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <div>
          <h3>System Status</h3>

          <div style={styles.card}>
            <p><b>Next Dose:</b> {nextDose}</p>
            <p><b>Status:</b> {status}</p>
            <p><b>Device:</b> {device}</p>
          </div>

          <div style={styles.card}>
            <p><b>Adherence:</b> {adherence}%</p>
            <p><b>Missed Doses:</b> {missedCount}</p>
          </div>

          {role === "caregiver" && (
            <div style={styles.card}>
              <h4>Monitoring Panel</h4>
              <p>Monitoring patient adherence</p>
            </div>
          )}

          {role === "doctor" && (
            <div style={styles.card}>
              <h4>Doctor Dashboard</h4>
              <p>Manage prescriptions</p>
            </div>
          )}
        </div>
      )}

      {/* DOCTOR + CAREGIVER PAGE */}
      {page === "schedule" && (
        <div>

          {/* DOCTOR */}
          {role === "doctor" && (
            <>
              <h3>Add Prescription</h3>

              <input
                placeholder="Medicine Name"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                style={styles.input}
              />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={styles.input}
              />

              <button
                onClick={() => {
                  setPrescription([...prescription, { medicine, time }]);
                  setMedicine("");
                  setTime("");
                  alert("Prescription Added");
                }}
                style={styles.button}
              >
                Add Prescription
              </button>

              {prescription.map((p, i) => (
                <div key={i} style={styles.card}>
                  <p><b>{p.medicine}</b></p>
                  <p>{p.time}</p>
                </div>
              ))}
            </>
          )}

          {/* CAREGIVER */}
          {role === "caregiver" && (
            <>
              <h3>Caregiver Monitoring</h3>

              <div style={styles.card}>
                <p><b>Current Status:</b> {status}</p>
                <p><b>Next Dose:</b> {nextDose}</p>
                <p><b>Missed Doses:</b> {missedCount}</p>
              </div>

              <div style={styles.card}>
                <p>Real-time patient monitoring enabled</p>
              </div>
            </>
          )}

        </div>
      )}

      {/* HISTORY */}
      {page === "history" && (
        <div>
          <h3>Medication Logs</h3>

          {history.length === 0 ? (
            <p>No records available</p>
          ) : (
            history.slice().reverse().map((item, i) => (
              <div key={i} style={styles.card}>
                <p><b>Medicine:</b> {item.medicine}</p>
                <p><b>Time:</b> {item.time}</p>
                <p><b>Status:</b> {item.status}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// PROFESSIONAL STYLES
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    background: "linear-gradient(135deg, #dbeafe, #ede9fe)", // soft blue + lavender
    minHeight: "100vh"
  },

  input: {
    display: "block",
    margin: "12px auto",
    padding: "11px",
    width: "240px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    background: "#ffffff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },

  button: {
    padding: "11px 22px",
    background: "#4f7cff",   // strong blue
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
    boxShadow: "0 3px 8px rgba(79,124,255,0.3)"
  },

  nav: {
    margin: "6px",
    padding: "10px 16px",
    cursor: "pointer",
    background: "#ffffff",
    borderRadius: "8px",
    fontSize: "14px",
    border: "1px solid #dbe2ef",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
  },

  card: {
    margin: "16px auto",
    padding: "18px",
    width: "310px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    textAlign: "left",
    borderTop: "4px solid #4f7cff" // subtle color highlight
  }
};