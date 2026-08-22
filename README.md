# ORBIT

## Optimal Resource and Bin Intelligence System

ORBIT is an AI-powered waste management and resource intelligence platform designed to improve waste segregation, collection efficiency, analytics, and resource recovery.

The system combines AI-based waste classification, collection prioritization, waste analytics, recovery analysis, and an AI assistant into a unified platform for intelligent waste management.

---

## 1. Problem Statement

Urban waste management faces several challenges:

* Improper segregation of waste at the source.
* Inefficient and reactive waste collection.
* Difficulty in identifying recyclable and recoverable materials.
* Limited visibility into waste generation and operational trends.
* Lack of centralized intelligence for waste-management decisions.

Traditional systems often depend on fixed collection schedules and manual classification, which can lead to unnecessary collection trips, overflowing bins, poor segregation, and loss of recoverable resources.

ORBIT addresses these challenges through an integrated AI and data-driven approach.

---

## 2. Solution

ORBIT provides an end-to-end waste intelligence pipeline:

```text
Waste Input
     |
     v
AI Waste Classification
     |
     v
Waste Category & Confidence
     |
     +----------------------+
     |                      |
     v                      v
Waste Analytics       Collection Intelligence
                            |
                            v
                     Priority Decision
                            |
                            v
                     Recovery Analysis
                            |
                            v
                    AI Recommendations
```

This allows waste-management operations to move from reactive collection toward data-driven decision making.

---

## 3. Key Features

### 3.1 AI Waste Classification

ORBIT uses AI-powered image classification to identify waste materials.

Supported categories include:

* Organic
* Paper
* Plastic
* Glass
* Metal
* E-Waste

The classification system provides:

* Detected waste object
* Waste category
* Material information
* Confidence score
* Recommended disposal action
* Environmental impact
* Recovery potential

**Endpoint**

```http
POST /api/v1/waste/classify
```

---

### 3.2 Smart Collection Prioritization

ORBIT evaluates bin conditions and determines collection urgency.

The system considers parameters such as:

* Fill level
* Bin status
* Waste type
* Estimated time to overflow
* Collection priority

This allows collection operations to prioritize bins that require attention instead of relying exclusively on fixed schedules.

**Endpoint**

```http
POST /api/v1/collection/check
```

---

### 3.3 Waste Analytics

The analytics layer provides an overview of waste generation and segregation patterns.

It can display:

* Total waste
* Waste by category
* Organic waste
* Plastic waste
* Paper waste
* E-waste
* Recyclable percentage
* Collection statistics
* Operational efficiency
* Environmental impact metrics

**Endpoints**

```http
GET /api/v1/dashboard
GET /api/v1/waste/stats
```

---

### 3.4 AI Recommendations

ORBIT generates operational recommendations from current waste-management conditions.

Recommendations can assist with:

* Collection planning
* Priority identification
* Bin monitoring
* Operational decision making

**Endpoint**

```http
GET /api/v1/recommendations
```

---

### 3.5 Resource Recovery

ORBIT extends waste management beyond collection by identifying potential resource recovery opportunities.

The recovery module can analyze waste and maintain recovery records.

It provides information such as:

* Recoverable material
* Recovery potential
* Recommended recovery action
* Environmental impact
* Recovery history

**Endpoints**

```http
POST /api/v1/recovery/analyze
GET /api/v1/recovery/records
```

---

### 3.6 Smart City Resource Map

The platform provides a map-based visualization layer for waste-management resources.

The map is designed to represent relevant waste-treatment and resource-recovery facilities and provide a geographic view of the waste-management ecosystem.

---

### 3.7 AI Assistant

ORBIT includes an AI assistant that acts as a natural-language interface for the platform.

It is designed to help users understand waste-management information and interact with the system using conversational queries.

---

## 4. System Architecture

```text
                    +----------------------+
                    |      ORBIT UI        |
                    |   React + Vite       |
                    +----------+-----------+
                               |
                               | REST API
                               v
                    +----------------------+
                    |    FastAPI Backend   |
                    |       Python         |
                    +----------+-----------+
                               |
          +--------------------+--------------------+
          |                    |                    |
          v                    v                    v
   +-------------+     +--------------+     +-------------+
   | AI Waste    |     | Collection   |     | Resource    |
   | Classifier  |     | Intelligence |     | Recovery    |
   +-------------+     +--------------+     +-------------+
          |                    |                    |
          +--------------------+--------------------+
                               |
                               v
                    +----------------------+
                    |      Supabase        |
                    |      PostgreSQL      |
                    +----------------------+
```

---

## 5. Technology Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* Three.js / React Three Fiber

### Backend

* Python
* FastAPI
* Uvicorn
* REST APIs

### Artificial Intelligence

* Google Gemini
* AI-powered image classification
* AI-assisted recommendations

### Database

* Supabase
* PostgreSQL

### Development and Deployment

* Git
* GitHub
* VS Code
* Render
* Vercel / Static Hosting

---

## 6. API Reference

| Feature              | Method | Endpoint                   |
| -------------------- | ------ | -------------------------- |
| Dashboard            | GET    | `/api/v1/dashboard`        |
| Bins                 | GET    | `/api/v1/bins`             |
| Bin Details          | GET    | `/api/v1/bins/{bin_id}`    |
| Waste Statistics     | GET    | `/api/v1/waste/stats`      |
| Collection Check     | POST   | `/api/v1/collection/check` |
| Recommendations      | GET    | `/api/v1/recommendations`  |
| Waste Classification | POST   | `/api/v1/waste/classify`   |
| Recovery Analysis    | POST   | `/api/v1/recovery/analyze` |
| Recovery Records     | GET    | `/api/v1/recovery/records` |

Interactive API documentation is available through FastAPI Swagger UI:

```text
/api/docs
```

or, depending on the deployment configuration:

```text
/docs
```

---

## 7. Repository Structure

```text
ORBIT/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 8. Backend Setup

### Clone the Repository

```bash
git clone https://github.com/riddhi7890/orbit.git
cd orbit
```

### Navigate to Backend

```bash
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

#### macOS / Linux

```bash
source venv/bin/activate
```

#### Windows

```powershell
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

Do not commit `.env` to the repository.

### Run Backend

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

---

## 9. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a frontend `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

---

## 10. Environment Variables

Sensitive credentials should never be committed to GitHub.

### Backend

```text
GEMINI_API_KEY
GEMINI_MODEL
SUPABASE_URL
SUPABASE_KEY
```

### Frontend

```text
VITE_API_BASE_URL
```

Environment files should be excluded using `.gitignore`.

---

## 11. Deployment

### Backend

The FastAPI backend can be deployed as a web service.

Production start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Required environment variables must be configured through the deployment platform.

### Frontend

The React/Vite application can be deployed as a static web application.

The production environment should contain:

```env
VITE_API_BASE_URL=https://your-backend-url
```

The frontend then communicates with the deployed FastAPI backend through the REST API layer.

---

## 12. Security Considerations

ORBIT follows basic security practices for a prototype deployment:

* API keys are stored through environment variables.
* `.env` files are excluded from version control.
* Frontend and backend communicate through defined REST APIs.
* Backend configuration is separated from application logic.
* Authentication and authorization can be extended as the platform moves toward production deployment.

---

## 13. Future Scope

ORBIT can be further extended with:

* Real-time IoT sensor integration.
* Predictive bin overflow forecasting.
* Advanced collection route optimization.
* Real-time waste-treatment facility availability.
* Contamination detection using computer vision.
* Multilingual AI interaction.
* RAG-powered waste-management knowledge assistant.
* Automated facility routing.
* Advanced city-level waste forecasting.
* Multi-city deployment and centralized administration.

---

## 14. Project Impact

ORBIT is designed to support a transition from conventional waste collection toward intelligent resource management.

### Environmental

* Improved waste segregation.
* Increased recyclable material recovery.
* Reduced unnecessary landfill dependency.
* Better utilization of recoverable resources.

### Operational

* Data-driven collection prioritization.
* Improved visibility into waste conditions.
* Faster identification of critical situations.
* Centralized waste-management intelligence.

### Resource Efficiency

* Identification of recoverable materials.
* Better connection between waste generation and treatment.
* Improved utilization of recyclable resources.

---

## 15. Project Vision

ORBIT aims to transform waste from a disposal problem into a measurable and recoverable resource.

The long-term vision is to create an intelligent waste-management ecosystem where:

```text
Waste Data
    ↓
AI Intelligence
    ↓
Operational Decisions
    ↓
Resource Recovery
    ↓
Sustainable Cities
```

---

## 16. Team

**ORBIT — Optimal Resource and Bin Intelligence System**

Developed as an AI-powered smart waste management solution for sustainable and intelligent urban resource management.

---

## License

This project is developed as a prototype for educational, research, and hackathon purposes.

