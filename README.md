https://github.com/user-attachments/assets/745fc13f-ce15-4c31-81b7-bbb481e230e6

# CreditSea - Credit Report Processing App

CreditSea is a **full-stack MERN (MongoDB, Express, React, Node.js) application** that processes XML files containing soft credit pull data from Experian. It extracts, stores, and displays key credit report information in a **user-friendly UI**.

## 🚀 Features

✅ **Drag & Drop XML Upload**  
✅ **Processes & Extracts Credit Data**  
✅ **Stores Extracted Data in MongoDB**  
✅ **Displays Data in a Beautiful UI**  
✅ **Real-Time Upload Status**  
✅ **Fully Responsive with Tailwind CSS**  

---

## 🏗️ Tech Stack

### **Frontend**
- React + TypeScript
- Tailwind CSS
- Axios (API Requests)
- Lucide-React (Icons)

### **Backend**
- Node.js + Express.js
- Multer (File Upload Handling)
- xml2js (XML Parsing)
- Mongoose (MongoDB ORM)
- dotenv (Environment Variables)

### **Database**
- MongoDB (Self-hosted or MongoDB Atlas)

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/HIMANSHU00KUMAR/CreditShow.git
cd CreditShow
```

### 2️⃣ **Install Dependencies**

#### 📌 Backend
```sh
cd backend
npm install
```

#### 📌 Frontend
```sh
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### **Backend (`backend/.env`)**
Create a `.env` file in the backend folder and set your MongoDB connection string:

```
MONGO_URI=mongodb://localhost:27017/creditsea
PORT=5000
```

---

## 🚀 Running the Application

### **1️⃣ Start the Backend**
```sh
cd backend
npm start
```
> The backend will run at `http://localhost:5000/`

### **2️⃣ Start the Frontend**
```sh
cd frontend
npm start
```
> The frontend will be available at `http://localhost:3000/`

---

## 📂 Project Structure

```
creditsea/
│── backend/
│   ├── controllers/
│   │   ├── uploadController.js  # Handles XML file processing
│   ├── models/
│   │   ├── CreditReport.js      # Mongoose schema for storing credit data  
│   ├── server.js                # Express server setup
│   ├── .env                     # Environment variables
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.tsx   # User-friendly file upload UI
│   │   ├── types.ts             # TypeScript types
│   │   ├── App.tsx              # Main UI
│   ├── tailwind.config.js        # Tailwind CSS config
│
│── README.md                     # Documentation
```

---

## 📌 API Endpoints

### **1️⃣ Upload XML File**
- **Endpoint:** `POST /api/upload`
- **Description:** Uploads an XML file, processes it, stores the data in MongoDB, and returns the extracted report.

#### 📩 **Request**
```http
POST /upload
Content-Type: multipart/form-data
```
```json
{
  "file": "credit_report.xml"
}
```

#### ✅ **Response**
```json
{
  "message": "Credit report processed successfully",
  "creditReport": {
    "basicDetails": {
      "name": "John Doe",
      "mobilePhone": "1234567890",
      "pan": "ABCDE1234F",
      "creditScore": 750
    },
    "reportSummary": {
      "totalAccounts": 10,
      "activeAccounts": 5,
      "closedAccounts": 5,
      "currentBalanceAmount": 50000,
      "securedAccountsAmount": 20000,
      "unsecuredAccountsAmount": 30000,
      "lastSevenDaysCreditEnquiries": 2
    },
    "creditAccounts": [
      {
        "bank": "HDFC Bank",
        "accountNumber": "XXXX1234",
        "address": "Mumbai, India",
        "amountOverdue": 1000,
        "currentBalance": 15000
      }
    ]
  }
}
```

---

## 🎯 Future Improvements
🔹 Pagination for Credit Accounts  
🔹 Dark Mode Support  
🔹 More Credit Metrics  

---

## 👨‍💻 Author
- **Your Name**
- GitHub: https://github.com/HIMANSHU00KUMAR/

---





