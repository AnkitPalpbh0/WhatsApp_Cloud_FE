import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
// import ChatPage from "../components/Chat/ChatLayout";
import Login from "../pages/login";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import Chat from "../pages/chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
