# 📱 WhatsApp Business Messaging Platform – Frontend

This is the frontend application for a **WhatsApp Cloud API-based Business Messaging Platform**. It enables authenticated users to chat with contacts, send and receive real-time messages, and manage conversations efficiently.

---

## 🚀 Tech Stack

* **React.js** (with [Vite](https://vitejs.dev/))
* **TypeScript**
* **Redux Toolkit Query (RTK Query)**
* **JWT Authentication** using React Context
* **Tailwind CSS**
* **React Router v6**
* **Backend:** Java + Kafka

---

## 📁 Project Structure

```
src/
├── api/             # API service calls (RTK Query)
├── components/      # Shared components
│   └── Chat/        # Chat-specific components
├── context/         # AuthContext for managing login state
├── pages/           # Route-based pages
├── routes/          # Route configuration
├── App.tsx          # Root component
└── main.tsx         # App entry point
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/whatsapp-cloud-frontend.git
cd whatsapp-cloud-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file at the root:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

### 4. Start Development Server

```bash
npm run dev
```

---

## 🔐 Authentication

* JWT Token-based authentication.
* Token is stored in `localStorage`.
* Auth state is managed via **React Context**.

---

## 📡 API Endpoints

* `POST   /api/auth/login` — User Login
* `GET    /api/chats/:userId` — Fetch chats for a user
* `GET    /api/chats/:chatId` — Fetch specific chat details
* `POST   /api/messages/sendTextMessage` — Send a text message

---

## 🧹 Linting

Run ESLint:

```bash
npm run lint
```

### ESLint Plugins Used:

* `@typescript-eslint`
* `eslint-plugin-react-hooks`
* `eslint-plugin-react-refresh`

---

## 🏗️ Build

To build for production:

```bash
npm run build
```

---

Let me know if you also want to include deployment steps (Docker, CircleCI, etc.) or update the backend repo link!
