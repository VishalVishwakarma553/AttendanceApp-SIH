import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  QrCode,
  Camera,
  Users,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
  CheckCircle,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  AlertCircle,
  Plus,
  Eye,
  Download,
  Activity
} from 'lucide-react'
import { mockApi } from '../../services/mockApi'

const FacultyDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [user.id])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await mockApi.faculty.getDashboard(user.id)
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

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  }

  const navigation = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'qr-generator', label: 'QR Generator', icon: QrCode },
    { id: 'face-recognition', label: 'Face Recognition', icon: Camera },
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'attendance', label: 'Attendance Records', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'qr_generated': return QrCode
      case 'attendance_marked': return CheckCircle
      case 'student_registered': return Users
      default: return Activity
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'qr_generated': return 'text-blue-600 bg-blue-100'
      case 'attendance_marked': return 'text-green-600 bg-green-100'
      case 'student_registered': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
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
                <p className="text-sm text-gray-600">Faculty Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-right hidden sm:block"
              >
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-600">{user.department} Department</p>
              </motion.div>
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
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
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                      <p className="text-blue-100 mb-4">
                        You're managing {dashboardData?.overview?.totalCourses} courses with
                        {dashboardData?.overview?.averageAttendance}% average attendance
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        Quick Actions
                      </motion.button>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="hidden md:block"
                    >
                      <Award className="w-16 h-16 text-white/50" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: 'Total Courses',
                      value: dashboardData?.overview?.totalCourses,
                      icon: BarChart3,
                      color: 'blue',
                      trend: '+2 this semester'
                    },
                    {
                      label: 'Total Students',
                      value: dashboardData?.overview?.totalStudents,
                      icon: Users,
                      color: 'green',
                      trend: '+5 registered'
                    },
                    {
                      label: 'Face Registration',
                      value: `${dashboardData?.overview?.faceRegistrationRate}%`,
                      icon: Camera,
                      color: 'purple',
                      trend: '+12% this week'
                    },
                    {
                      label: 'Avg. Attendance',
                      value: `${dashboardData?.overview?.averageAttendance}%`,
                      icon: TrendingUp,
                      color: 'orange',
                      trend: '+3% vs last week'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover="hover"
                      {...cardHoverVariants}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                        </div>
                        <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Course Overview */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Course Overview</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All
                    </motion.button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dashboardData?.courses?.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        {...cardHoverVariants}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-800 mb-1">{course.name}</h4>
                            <p className="text-sm text-gray-600">{course.code}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.averageAttendance >= 80
                              ? 'bg-green-100 text-green-800'
                              : course.averageAttendance >= 70
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {course.averageAttendance}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-3">
                          <span>{course.enrolledStudents} students</span>
                          <span>{course.studentsWithFace} face registered</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.averageAttendance}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className={`h-2 rounded-full ${
                              course.averageAttendance >= 80
                                ? 'bg-green-500'
                                : course.averageAttendance >= 70
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {dashboardData?.recentActivity?.map((activity, index) => {
                      const ActivityIcon = getActivityIcon(activity.type)
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                            <ActivityIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                            <p className="text-xs text-gray-600">{activity.course} • {activity.time}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  variants={itemVariants}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {[
                    {
                      title: 'Generate QR Code',
                      description: 'Create QR for quick attendance',
                      icon: QrCode,
                      action: () => setActiveTab('qr-generator'),
                      color: 'blue'
                    },
                    {
                      title: 'Start Face Recognition',
                      description: 'Setup facial recognition session',
                      icon: Camera,
                      action: () => setActiveTab('face-recognition'),
                      color: 'purple'
                    },
                    {
                      title: 'Mark Attendance',
                      description: 'Manually mark student attendance',
                      icon: ClipboardList,
                      action: () => setActiveTab('attendance'),
                      color: 'green'
                    }
                  ].map((action, index) => (
                    <motion.div
                      key={index}
                      whileHover="hover"
                      {...cardHoverVariants}
                      onClick={action.action}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer"
                    >
                      <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                        <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Other tabs placeholder */}
            {activeTab !== 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {navigation.find(n => n.id === activeTab)?.icon &&
                    React.createElement(navigation.find(n => n.id === activeTab).icon, {
                      className: "w-8 h-8 text-blue-600"
                    })
                  }
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {navigation.find(n => n.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600 mb-4">This feature is coming soon!</p>
                <p className="text-sm text-gray-500">
                  We're working hard to bring you comprehensive faculty tools.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboard