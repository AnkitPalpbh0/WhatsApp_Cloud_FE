WhatsApp Business Messaging Platform – Frontend
This is the frontend for a WhatsApp Cloud API-based Business Messaging Platform. It allows authenticated users to chat with contacts, send and receive messages, and manage sessions in real-time.
[Tools] Tech Stack
React.js (with Vite)
TypeScript
Redux Toolkit Query (RTK Query)
JWT Auth using React Context
Tailwind CSS
React Router v6
Backend via Java + Kafka
[Structure] Project Structure
cssCopyEditsrc/
├── api/
├── components/
│   └── Chat/
├── context/
├── pages/
├── routes/
├── App.tsx└── main.tsx 
[Getting Started]
bashCopyEditgit clone https://github.com/your-username/whatsapp-cloud-frontend.gitcd whatsapp-cloud-frontend
npm install
Create .env:
envCopyEditVITE_API_BASE_URL=https://your-backend-domain.com
Start server:
bashCopyEditnpm run dev
[Authentication]
Login using JWT token.
Token is stored in localStorage.
AuthContext manages global access to user and auth actions.
[API] Endpoints
POST /api/auth/login
GET /api/chats/:userId
GET /api/chats/:chatId
POST /api/messages/sendTextMessage
[Linting]
bashCopyEditnpm run lint
ESLint with:
@typescript-eslint
eslint-plugin-react-hooks
eslint-plugin-react-refresh
[Build]
bashCopyEditnpm run build