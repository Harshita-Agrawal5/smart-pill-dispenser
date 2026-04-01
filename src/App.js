import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const [nextDose, setNextDose] = useState("10:00 AM");
  const [status, setStatus] = useState("Pending");
  const [device, setDevice] = useState("Online");
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [history, setHistory] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [adherence, setAdherence] = useState(85);
  const [missedCount, setMissedCount] = useState(0);
  const [themeColor, setThemeColor] = useState("#4f7cff");
  const [language, setLanguage] = useState("en");

  const canvasRef = useRef(null);

  const text = {
    en: {
      login: "Login", dashboard: "Dashboard", logs: "Logs", settings: "Settings",
      welcome: "Welcome", addPrescription: "Add Prescription", nextDose: "Next Dose",
      status: "Status", device: "Device", adherence: "Adherence", missed: "Missed Doses",
      systemStatus: "System Status", caregiver: "Caregiver Monitoring"
    },
    hi: {
      login: "लॉगिन", dashboard: "डैशबोर्ड", logs: "रिकॉर्ड", settings: "सेटिंग्स",
      welcome: "स्वागत है", addPrescription: "दवा जोड़ें", nextDose: "अगली खुराक",
      status: "स्थिति", device: "डिवाइस", adherence: "पालन", missed: "छूटी हुई खुराक",
      systemStatus: "सिस्टम स्थिति", caregiver: "देखभाल निगरानी"
    }
  };

  // PARTICLE SYSTEM
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: `rgba(255,255,255,${Math.random() * 0.5})`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  // STATUS UPDATES
  useEffect(() => {
    const interval = setInterval(() => {
      const taken = Math.random() > 0.5;
      const newStatus = taken ? "Taken" : "Missed";
      setStatus(newStatus);
      if (!taken) setMissedCount((prev) => prev + 1);
      setAdherence(Math.floor(Math.random() * 100));
      setHistory((prev) => [...prev, {
        medicine: "Scheduled Medicine",
        time: new Date().toLocaleTimeString(),
        status: newStatus
      }]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🎨 THEME BACKGROUND UPDATE - FIXED!
  useEffect(() => {
    const container = document.querySelector('.theme-container');
    if (container) {
      const color1 = hexToRGBA(themeColor, 0.15);
      const color2 = hexToRGBA(themeColor, 0.08);
      container.style.background = `radial-gradient(circle at 20% 80%, ${color1} 0%, transparent 50%), 
                                    linear-gradient(135deg, ${color2} 0%, rgba(30,41,59,0.95) 70%), 
                                    linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`;
    }
  }, [themeColor]);

  const login = () => {
    if (name.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        setPage("dashboard");
        setIsAnimating(false);
      }, 600);
    }
  };

  const canEdit = role === "doctor";
  const hexToRGBA = (hex, opacity) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "taken": return "#10b981"; case "pending": return "#f59e0b";
      case "missed": return "#ef4444"; default: return "#6b7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "taken": return "✅"; case "pending": return "⏳";
      case "missed": return "❌"; default: return "⏳";
    }
  };

  if (page === "login") {
    return (
      <div style={styles.container} className="theme-container">
        <canvas ref={canvasRef} style={styles.canvas} />
        <div style={styles.glassOverlay}>
          <div style={styles.logoContainer}>
            <div style={styles.pillIcon}>💊</div>
            <h1 style={styles.logoText}>Smart Pill Dispenser</h1>
            <p style={styles.tagline}>Medication, Mastered</p>
          </div>
          
          <div style={styles.formContainer}>
            <input
              style={styles.modernInput}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select 
              style={styles.modernInput}
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">👤 Patient</option>
              <option value="caregiver">🩺 Caregiver</option>
              <option value="doctor">👨‍⚕️ Doctor</option>
            </select>
            <button 
              style={{
                ...styles.ctaButton,
                background: `linear-gradient(135deg, ${themeColor}, ${hexToRGBA(themeColor, 0.8)})`
              }}
              onClick={login}
              disabled={!name.trim()}
            >
              {text[language].login} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} className="theme-container">
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.glassOverlay}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.userInfo}>
            <div style={{...styles.avatar, background: themeColor}}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>{text[language].welcome}, {name}</h2>
              <span style={styles.roleBadge}>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </div>
          </div>
          <button style={styles.logoutBtn} onClick={() => setPage("login")}>🚪</button>
        </div>

        {/* Navigation */}
        <div style={styles.navContainer}>
          <button style={{...styles.navBtn, ...(page === "dashboard" && styles.navBtnActive)}} onClick={() => setPage("dashboard")}>
            📊 {text[language].dashboard}
          </button>
          {(role === "doctor" || role === "caregiver") && (
            <button style={{...styles.navBtn, ...(page === "schedule" && styles.navBtnActive)}} onClick={() => setPage("schedule")}>
              {role === "doctor" ? "📝 Prescription" : "👀 Monitoring"}
            </button>
          )}
          <button style={{...styles.navBtn, ...(page === "history" && styles.navBtnActive)}} onClick={() => setPage("history")}>
            📋 {text[language].logs}
          </button>
          <button style={{...styles.navBtn, ...(page === "settings" && styles.navBtnActive)}} onClick={() => setPage("settings")}>
            ⚙️ {text[language].settings}
          </button>
        </div>

        {/* Content */}
        <main style={styles.content}>
          {page === "dashboard" && renderDashboard()}
          {page === "schedule" && renderSchedule()}
          {page === "history" && renderHistory()}
          {page === "settings" && renderSettings()}
        </main>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );

  function renderDashboard() {
    return (
      <div style={styles.dashboard}>
        <h3 style={styles.sectionTitle}>{text[language].systemStatus}</h3>
        
        <div style={styles.metricGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>💊</div>
            <div style={styles.metricValue}>{nextDose}</div>
            <div style={{...styles.statusBadge, background: getStatusColor(status)}}>
              {getStatusIcon(status)} {status}
            </div>
            <p style={styles.metricLabel}>{text[language].nextDose}</p>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricIcon}>📶</div>
            <div style={styles.metricValue}>{device}</div>
            <p style={styles.metricLabel}>{text[language].device}</p>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.progressRing}>
              <svg width="90" height="90" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" strokeDasharray="251" strokeDashoffset="0"/>
                <circle cx="45" cy="45" r="40" stroke={adherence > 80 ? '#10b981' : '#f59e0b'} strokeWidth="8" fill="none" 
                  strokeDasharray="251" strokeDashoffset={251 - (adherence * 2.51)} strokeLinecap="round"/>
                <text x="45" y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1f2937">{adherence}%</text>
              </svg>
            </div>
            <p style={styles.metricLabel}>{text[language].adherence}</p>
            <p style={{...styles.missedCount, color: '#ef4444'}}>Missed: {missedCount}</p>
          </div>
        </div>
      </div>
    );
  }

  function renderSchedule() {
    return (
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          {role === "doctor" ? text[language].addPrescription : text[language].caregiver}
        </h3>
        {role === "doctor" && (
          <div style={styles.formCard}>
            <input style={styles.modernInput} placeholder="Medicine Name" value={medicine} onChange={(e) => setMedicine(e.target.value)} />
            <input style={styles.modernInput} type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <button 
              style={{
                ...styles.ctaButton,
                background: canEdit ? `linear-gradient(135deg, ${themeColor}, ${hexToRGBA(themeColor, 0.8)})` : '#9ca3af'
              }}
              disabled={!canEdit || !medicine || !time}
              onClick={() => {
                if (canEdit && medicine && time) {
                  setPrescription([...prescription, { medicine, time }]);
                  setMedicine(""); setTime("");
                }
              }}
            >
              ➕ Add Prescription
            </button>
            {prescription.map((p, i) => (
              <div key={i} style={styles.prescriptionItem}>
                <span>💊 {p.medicine}</span>
                <span>🕐 {p.time}</span>
              </div>
            ))}
          </div>
        )}
        {role === "caregiver" && (
          <div style={styles.metricCard}>
            <div style={{...styles.statusBadge, background: getStatusColor(status), fontSize: '18px'}}>
              {getStatusIcon(status)} {status}
            </div>
            <p><b>{text[language].nextDose}:</b> {nextDose}</p>
          </div>
        )}
      </div>
    );
  }

  function renderHistory() {
    return (
      <div style={styles.historySection}>
        <h3 style={styles.sectionTitle}>{text[language].logs}</h3>
        <div style={styles.historyList}>
          {history.slice().reverse().slice(0, 10).map((item, i) => (
            <div key={i} style={styles.historyItem}>
              <div>
                <div style={styles.historyMedicine}>{item.medicine}</div>
                <div style={styles.historyTime}>{item.time}</div>
              </div>
              <div style={{...styles.statusBadge, background: getStatusColor(item.status), fontSize: '20px'}}>
                {getStatusIcon(item.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div style={styles.settingsSection}>
        <h3 style={styles.sectionTitle}>{text[language].settings}</h3>
        <div style={styles.formCard}>
          <label style={styles.label}>🎨 Theme Color</label>
          <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={styles.colorPicker} />
          
          <label style={styles.label}>🌐 Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.modernInput}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #283b59 0%, #0f172a 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: 'hidden'
  },

  canvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  },

  glassOverlay: {
    position: 'relative',
    zIndex: 2,
    minHeight: '100vh',
    padding: '20px',
    backdropFilter: 'blur(8px)'
  },

  logoContainer: {
    textAlign: 'center',
    marginBottom: '40px'
  },

  pillIcon: {
    width: '90px',
    height: '90px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.13)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    margin: '0 auto 20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
  },

  logoText: {
    fontSize: '34px',
    fontWeight: '700',
    color: '#f8fafc',
    margin: '0 0 10px 0'
  },

  tagline: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '16px',
    margin: 0
  },

  formContainer: {
    maxWidth: '420px',
    margin: '0 auto'
  },

  modernInput: {
    width: '100%',
    padding: '16px 20px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.05)',
    color: '#e2e8f0',
    fontSize: '15px',
    marginBottom: '18px',
    outline: 'none'
  },

  ctaButton: {
    width: '100%',
    padding: '16px',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    background: '#2563eb'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '20px 28px',
    marginBottom: '28px',
    border: '1px solid rgba(255,255,255,0.08)'
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },

  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
    color: 'white'
  },

  roleBadge: {
    background: 'rgba(255,255,255,0.08)',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    color: '#cbd5f5'
  },

  navContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  navBtn: {
    padding: '12px 20px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },

  navBtnActive: {
    background: '#2563eb',
    color: 'white'
  },

  content: {
    minHeight: '60vh'
  },

  sectionTitle: {
    fontSize: '28px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '32px',
    color: '#f1f5f9'
  },

  metricGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    maxWidth: '900px',
    margin: '0 auto'
  },

  metricCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.08)',
    textAlign: 'center'
  },

  metricIcon: {
    fontSize: '42px',
    marginBottom: '16px'
  },

  metricValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white'
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '999px',
    fontWeight: '600',
    fontSize: '14px',
    color: 'white',
    margin: '12px 0',
    background: '#16a34a'
  },

  section: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  },

  formCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '20px',
    padding: '28px',
    border: '1px solid rgba(255,255,255,0.08)'
  },

  prescriptionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    marginTop: '12px'
  },

  historySection: {
    maxWidth: '700px',
    margin: '0 auto'
  },

  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  historyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px'
  },

  historyMedicine: {
    fontWeight: '600',
    fontSize: '16px',
    color: 'white'
  },

  historyTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '13px'
  },

  settingsSection: {
    maxWidth: '500px',
    margin: '0 auto'
  },

  label: {
    display: 'block',
    fontWeight: '600',
    fontSize: '15px',
    color: '#e2e8f0',
    marginBottom: '8px'
  },

  colorPicker: {
    width: '60px',
    height: '40px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '20px'
  },

  logoutBtn: {
    padding: '10px 16px',
    background: '#dc2626',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer'
  },

  dashboard: {
    maxWidth: '900px',
    margin: '0 auto'
  },

  progressRing: {
    margin: '0 auto 16px'
  },

  missedCount: {
    fontSize: '14px',
    fontWeight: '500',
    margin: '8px 0 0 0'
  }
};    
