import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Settings,
  Shield,
  FileText,
  LogOut,
  CheckCircle,
  Activity,
  Server,
  Database,
  Zap,
  Eye,
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Globe,
  Lock,
  Camera,
  Award,
  Clock,
  Wifi,
  HardDrive
} from 'lucide-react'
import { mockApi } from '../../services/mockApi'

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [user.id])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await mockApi.admin.getDashboard(user.id)
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

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const navigation = [
    { id: 'overview', label: 'Master Dashboard', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'departments', label: 'Department Analytics', icon: TrendingUp },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'biometric', label: 'Biometric Management', icon: Shield },
    { id: 'reports', label: 'Advanced Reports', icon: FileText }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_created': return Users
      case 'system_update': return Settings
      case 'backup_completed': return Database
      case 'course_created': return BookOpen
      default: return Activity
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_created': return 'text-blue-600 bg-blue-100'
      case 'system_update': return 'text-purple-600 bg-purple-100'
      case 'backup_completed': return 'text-green-600 bg-green-100'
      case 'course_created': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSystemHealthColor = (status) => {
    return status === 'Healthy' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
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
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center"
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AttendEase</h1>
                <p className="text-sm text-gray-600">Admin Control Center</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-right hidden sm:block"
              >
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-600">System Administrator</p>
              </motion.div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
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
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
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
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-xl p-6 text-white relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">System Overview</h2>
                        <p className="text-blue-100 mb-4">
                          Managing {dashboardData?.overview?.totalUsers} users across{' '}
                          {dashboardData?.overview?.totalDepartments} departments
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Wifi className="w-4 h-4" />
                            <span>Uptime: {dashboardData?.overview?.systemUptime}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            <span>{dashboardData?.overview?.dailyActiveUsers} active today</span>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="hidden md:block"
                      >
                        <Globe className="w-16 h-16 text-white/30" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                </motion.div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: 'Total Users',
                      value: dashboardData?.overview?.totalUsers,
                      icon: Users,
                      color: 'blue',
                      trend: '+12 this week'
                    },
                    {
                      label: 'Active Courses',
                      value: dashboardData?.overview?.totalCourses,
                      icon: BookOpen,
                      color: 'green',
                      trend: '+3 this month'
                    },
                    {
                      label: 'Biometric Registration',
                      value: `${dashboardData?.overview?.biometricRegistration}%`,
                      icon: Camera,
                      color: 'purple',
                      trend: '+8% this week'
                    },
                    {
                      label: 'Daily Attendance',
                      value: dashboardData?.overview?.attendanceToday,
                      icon: Award,
                      color: 'orange',
                      trend: '+15 vs yesterday'
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

                {/* System Health */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
                    <span className="text-green-600 text-sm font-medium">All Systems Operational</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        label: 'Server Status',
                        value: dashboardData?.systemHealth?.serverStatus,
                        icon: Server,
                        status: 'healthy'
                      },
                      {
                        label: 'Database',
                        value: dashboardData?.systemHealth?.databaseStatus,
                        icon: Database,
                        status: 'healthy'
                      },
                      {
                        label: 'Response Time',
                        value: dashboardData?.systemHealth?.apiResponseTime,
                        icon: Zap,
                        status: 'healthy'
                      },
                      {
                        label: 'Storage',
                        value: `${dashboardData?.systemHealth?.storageUsage}%`,
                        icon: HardDrive,
                        status: 'healthy'
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getSystemHealthColor(item.status)}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.label}</p>
                          <p className="text-xs text-gray-600">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Department Overview */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Department Overview</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All Departments
                    </motion.button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dashboardData?.departmentStats?.map((dept, index) => (
                      <motion.div
                        key={dept.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        {...cardHoverVariants}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-800">{dept.name}</h4>
                            <p className="text-sm text-gray-600">{dept.faculty} faculty, {dept.courses} courses</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            dept.avgAttendance >= 80
                              ? 'bg-green-100 text-green-800'
                              : dept.avgAttendance >= 70
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {dept.avgAttendance}% attendance
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Students</span>
                            <span className="font-medium">{dept.students}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Face Registration</span>
                            <span className="font-medium">{dept.faceRegistration}%</span>
                          </div>
                        </div>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${dept.avgAttendance}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className={`h-2 rounded-full ${
                              dept.avgAttendance >= 80
                                ? 'bg-green-500'
                                : dept.avgAttendance >= 70
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Method Analytics & Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Method Analytics */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Methods</h3>
                    <div className="space-y-4">
                      {Object.entries(dashboardData?.methodAnalytics || {}).map(([method, data], index) => {
                        const methodName = method === 'qrCode' ? 'QR Code' :
                                         method === 'faceRecognition' ? 'Face Recognition' : 'Manual'
                        const colors = ['blue', 'purple', 'green']
                        return (
                          <div key={method} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full bg-${colors[index]}-500`} />
                              <span className="text-sm font-medium text-gray-700">{methodName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-800">{data.usage}%</span>
                              <span className={`text-xs ${
                                data.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {data.trend}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {dashboardData?.recentActivity?.slice(0, 4).map((activity, index) => {
                        const ActivityIcon = getActivityIcon(activity.type)
                        return (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                              <ActivityIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                              <p className="text-xs text-gray-600">{activity.department} • {activity.time}</p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                  variants={itemVariants}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {[
                    {
                      title: 'Manage Users',
                      description: 'Add, edit, or remove user accounts',
                      icon: Users,
                      action: () => setActiveTab('users'),
                      color: 'blue'
                    },
                    {
                      title: 'System Settings',
                      description: 'Configure attendance and security settings',
                      icon: Settings,
                      action: () => setActiveTab('settings'),
                      color: 'purple'
                    },
                    {
                      title: 'Generate Reports',
                      description: 'Create comprehensive system reports',
                      icon: FileText,
                      action: () => setActiveTab('reports'),
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {navigation.find(n => n.id === activeTab)?.icon &&
                    React.createElement(navigation.find(n => n.id === activeTab).icon, {
                      className: "w-8 h-8 text-blue-600"
                    })
                  }
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {navigation.find(n => n.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600 mb-4">This advanced feature is coming soon!</p>
                <p className="text-sm text-gray-500">
                  We're building comprehensive admin tools for complete system control.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard