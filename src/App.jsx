import { useState, useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import StudentDashboard from "./Pages/Student/StudentDashboard"
import FacultyDashboard from "./Pages/Faculty/FacultyDashboard"
import AdminDashboard from "./Pages/Admin/AdminDashboard"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication
    const token = sessionStorage.getItem('authToken')
    const userData = sessionStorage.getItem('userData')

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        sessionStorage.removeItem('authToken')
        sessionStorage.removeItem('userData')
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userData')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-200 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={`/${user.role}/dashboard`} replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/student/dashboard"
        element={
          user && user.role === 'student' ? (
            <StudentDashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/faculty/dashboard"
        element={
          user && user.role === 'faculty' ? (
            <FacultyDashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          user && user.role === 'admin' ? (
            <AdminDashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App