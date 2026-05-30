# 💻 ByteShield Dashboard Frontend

> A Modern Cyber-Security Dashboard built with HTML5, CSS3, and Vanilla JavaScript for managing API Keys, monitoring traffic analytics, and interacting with the ByteShield Gateway.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://byteshield-dashboard-frontend.vercel.app/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/UI-Responsive-success)
![Security](https://img.shields.io/badge/Security-JWT%20Protected-brightgreen)

---

# 📌 Overview

**ByteShield Dashboard Frontend** is a responsive cyber-security management console designed to provide developers with complete control over the ByteShield Gateway ecosystem.

The dashboard enables users to:

- 🔐 Authenticate securely using JWT
- 🔑 Generate and manage API Keys
- 📊 Monitor traffic analytics & telemetry data
- 📈 Visualize request activity without external charting libraries
- 🚀 Interact with secure backend services in real time

Built entirely using **Vanilla JavaScript**, **HTML5**, and **CSS3**, the project avoids heavy frameworks while delivering a fast, secure, and modern user experience.

---

# ✨ Features

## 🔐 Authentication & Session Security

### Secure Login & Registration

- JWT-based authentication protocol
- Protected dashboard access using client-side state validation
- Automatic session validation and token lifecycle management
- Secure browser-side authentication handling

### Route Protection

Every protected page validates authentication state before rendering.

```text
No Token Found
      ↓
Redirect to Login Page
```

### Silent Token Refresh

When an access token expires during an active session:

```text
401 Unauthorized
        ↓
Refresh Token Request
        ↓
Generate New Access Token
        ↓
Retry Original Request
```

This creates a seamless experience without forcing users to log in repeatedly.

---

## 🔑 API Key Management

Developers can manage gateway credentials directly from the dashboard.

### Supported Operations

- Create API Keys
- Activate API Keys
- Deactivate API Keys
- Delete API Keys
- Copy API Keys to Clipboard

### One-Time Key Display

For security reasons, newly generated API Keys are displayed only once.

The backend stores only the SHA3-256 hash representation of the key, meaning the original key can never be recovered after generation.

---

## 📊 Traffic Analytics Dashboard

### Live Telemetry

- Total Request Counts
- Average Response Time
- Status Code Distribution
- Gateway Activity Monitoring
- User Analytics Overview

### Pure CSS Analytics Engine

ByteShield includes a lightweight visualization system built without external charting libraries.

Features:

- Pure HTML/CSS Charts
- Dynamic Scaling Logic
- Responsive Layout Rendering
- Real-Time Data Injection

No Chart.js, D3.js, or third-party dependencies required.

---

## 🏗️ Frontend Architecture

```text
User Browser
      │
      ▼
Authentication Layer
      │
      ▼
security_fetch() Wrapper
      │
      ├── Add JWT Bearer Token
      ├── Inject X-ByteShield-Key Header
      ├── Handle 401 Responses
      ├── Refresh Expired Tokens
      └── Retry Original Requests
      │
      ▼
ByteShield Gateway Backend
```

---

# 🛠️ Technology Stack

| Category | Technology |
|-----------|------------|
| Structure | HTML5 |
| Styling | CSS3 |
| Scripting | Vanilla JavaScript (ES6+) |
| Networking | Fetch API |
| Authentication | JWT |
| Storage | localStorage |
| Deployment | Vercel |

---

# 📂 Project Structure

```text
ByteShieldFrontend/
│
├── css/
│   └── dashboard.css
│
├── js/
│   ├── auth.js
│   ├── dashboard.js
│   ├── chart.js
│   └── security.js
│
├── index.html
├── signup.html
├── dashboard.html
├── chart.html
└── README.md
```

---

# 🚀 Pages & Workflows

| Page | Purpose |
|--------|---------|
| index.html | User Authentication & JWT Issuance |
| signup.html | New Account Registration |
| dashboard.html | Analytics & API Key Management |
| chart.html | Traffic Analytics Visualization |

---

# 📦 Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/karan-bairagi/byteshield-frontend.git

cd byteshield-frontend
```

---

## 2. Configure Backend URL

Open:

```javascript
js/security.js
```

### Production Environment

```javascript
const API_BASE_URL =
"https://byteshield-gateway-backend.onrender.com/";
```

### Local Development

```javascript
const API_BASE_URL =
"http://127.0.0.1:8000";
```

---

## 3. Run Locally

### Option 1 (Recommended)

Use the VS Code Live Server Extension.

```text
Right Click index.html
        ↓
Open with Live Server
```

Runs on:

```text
http://127.0.0.1:5500
```

### Option 2

Open `index.html` directly inside any modern browser.

---

# 🔄 Client-Side Security Workflow

```text
[ Incoming Page Load ]
         │
         ▼
[ Route Guard Check ]
         │
         ├── No Token
         │       │
         │       ▼
         │  Redirect to Login
         │
         ▼
   Token Valid
         │
         ▼
[ Render Dashboard ]
         │
         ▼
[ API Requests ]
         │
         ├── 200 OK
         │       │
         │       ▼
         │   Update UI
         │
         └── 401 Unauthorized
                 │
                 ▼
          Refresh Token
                 │
         ┌───────┴────────┐
         ▼                ▼
      Success          Failed
         │                │
         ▼                ▼
 Retry Request     Clear Storage
                         │
                         ▼
                  Redirect Login
```

---

# 🔮 Future Roadmap

### 🔴 Live Logs Streaming

Real-time gateway log monitoring using WebSockets.

### 🏢 Multi-Tenant Dashboard

Shared analytics environments for multiple organizations.

### 🧩 SDK Snippet Generator

Auto-generated integration examples for:

- Python
- JavaScript
- Node.js
- cURL

### 🌍 Geographic Analytics

- Geo-location Tracking
- Traffic Heatmaps
- Threat Intelligence Monitoring

### ⚡ Advanced Dashboard Insights

- Request Trends
- Usage Forecasting
- Security Event Monitoring

---

---

# 👨‍💻 Author

**Karan Bairagi**
- Frontend Engineering & UI/UX Design
- Vanilla JavaScript State & Token Lifecycles
- Custom Network Wrapper Architecture

---

## 🌐 Connect & Explore

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/karan-bairagi/)
[![GitHub Frontend Repo](https://img.shields.io/badge/GitHub-Frontend_Repo-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/karan-bairagi/byteshield-dashboard-frontend)
[![GitHub Backend Repo](https://img.shields.io/badge/GitHub-Backend_Repo-24292e?style=for-the-badge&logo=github&logoColor=white)](https://github.com/karan-bairagi/byteshield-gateway-backend)

---

## 🚀 Live Links

- **Frontend Dashboard (Vercel):** [https://byteshield-frontend.vercel.app](https://byteshield-dashboard-frontend.vercel.app/)
- **Backend API Gateway (Render):** [https://byteshield-gateway-backend.onrender.com](https://byteshield-gateway-backend.onrender.com)

---

## ⭐ Support
If you found this project useful, consider giving it a **Star ⭐** on GitHub.