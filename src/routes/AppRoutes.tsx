import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
// import ChatPage from "../components/Chat/ChatLayout";
import Login from "../pages/login";
import Chat from "../pages/chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/login"
        element={
          <Login />
        }
      />

      <Route
        path="/signup"
        element={
          <Signup />
        }
      />

      <Route
        path="/chat"
        element={
          <Chat />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
