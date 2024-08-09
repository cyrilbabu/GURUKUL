import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeInfo from "./pages/Employee_Info";
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import PrivateRoute from "./ui/PrivateRoute";
import Course from "./pages/Course";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import AdminSignup from "./pages/AdminSignup";
import EmployeeSignup from "./pages/EmployeeSignup";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<EmployeeInfo />} />
          <Route path="course" element={<Course />} />
          <Route path="courses" element={<Courses />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="adminsignup" element={<AdminSignup />} />
          <Route path="empsignup" element={<EmployeeSignup />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}
