# 🏥 Doctor Appointment System

A full-stack **Doctor Appointment Management System** built using **Node.js, Express.js, MongoDB, and React.js**.  
This project allows patients to book appointments, doctors to manage approvals, and admins to manage doctors and the system.

---

## 📌 Features

### 👥 User Roles
- **Admin**
  - Add, approve, or delete doctors
  - View and manage all appointments
- **Doctor**
  - Approve or decline appointment requests
  - View their appointment schedule
- **Patient**
  - Register and log in
  - Book appointments with available doctors
  - View appointment status

---

### 🔐 Authentication
- Role-based login (**Admin / Doctor / Patient**)
- JWT-based authentication for secure API access
- Passwords encrypted using **bcrypt**

---

### 🗓 Appointment Management
- Patients request an appointment slot
- Doctors can **approve** or **decline**
- Admins can view all appointments in the system

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Axios
- Bootstrap / Custom CSS

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Authentication**
- JWT (JSON Web Token)
- bcrypt

---

## 📂 Folder Structure

