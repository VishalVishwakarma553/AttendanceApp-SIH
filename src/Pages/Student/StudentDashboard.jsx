import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  BarChart3,
  QrCode,
  Camera,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Book,
  Users,
  LogOut
} from 'lucide-react'
import { mockApi } from '../../services/mockApi'

const StudentDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [user.id])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await mockApi.student.getDashboard(user.id)
      setDashboardData(response.data)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'qr-scanner', label: 'QR Scanner', icon: QrCode },
    { id: 'face-recognition', label: 'Face Recognition', icon: Camera },
    { id: 'attendance', label: 'Attendance History', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100'
      case 'late': return 'text-yellow-600 bg-yellow-100'
      case 'absent': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return CheckCircle
      case 'late': return AlertCircle
      case 'absent': return XCircle
      default: return Clock
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-200 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-200">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AttendEase</h1>
                <p className="text-sm text-gray-600">Student Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-600">{user.rollNumber}</p>
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Welcome Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white"
                >
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                  <p className="text-blue-100">
                    Your overall attendance is {dashboardData?.overview?.overallAttendance}%.
                    Keep up the good work!
                  </p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    {
                      label: 'Overall Attendance',
                      value: `${dashboardData?.overview?.overallAttendance}%`,
                      icon: BarChart3,
                      color: 'blue'
                    },
                    {
                      label: 'Present Classes',
                      value: dashboardData?.overview?.presentClasses,
                      icon: CheckCircle,
                      color: 'green'
                    },
                    {
                      label: 'Late Classes',
                      value: dashboardData?.overview?.lateClasses,
                      icon: AlertCircle,
                      color: 'yellow'
                    },
                    {
                      label: 'Total Courses',
                      value: dashboardData?.overview?.totalCourses,
                      icon: Book,
                      color: 'purple'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Course-wise Attendance */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Course-wise Attendance</h3>
                  <div className="space-y-4">
                    {dashboardData?.courses?.map((course, index) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-800">{course.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            course.attendancePercentage >= 75
                              ? 'bg-green-100 text-green-800'
                              : course.attendancePercentage >= 50
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {course.attendancePercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className={`h-2 rounded-full ${
                              course.attendancePercentage >= 75
                                ? 'bg-green-500'
                                : course.attendancePercentage >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${course.attendancePercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Present: {course.presentClasses}</span>
                          <span>Late: {course.lateClasses}</span>
                          <span>Absent: {course.absentClasses}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Attendance */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Attendance</h3>
                  <div className="space-y-3">
                    {dashboardData?.recentAttendance?.slice(0, 5).map((record, index) => {
                      const StatusIcon = getStatusIcon(record.status)
                      return (
                        <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(record.status)}`}>
                              <StatusIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{record.courseName}</p>
                              <p className="text-sm text-gray-600">{record.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium capitalize ${getStatusColor(record.status)}`}>
                              {record.status}
                            </p>
                            <p className="text-xs text-gray-500">{record.method}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Other tabs will be implemented in separate components */}
            {activeTab !== 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {navigation.find(n => n.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600 mb-4">This feature is coming soon!</p>
                <p className="text-sm text-gray-500">
                  We're working hard to bring you the best attendance experience.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard