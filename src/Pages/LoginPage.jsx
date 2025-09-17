import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  Shield,
  Star,
  ArrowLeft,
  Loader
} from 'lucide-react'
import { mockApi } from '../services/mockApi'

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const slideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await mockApi.login(formData)
      if (response.success) {
        // Store user data and token
        sessionStorage.setItem('authToken', response.token)
        sessionStorage.setItem('userData', JSON.stringify(response.user))

        // Call parent component's login handler
        if (onLogin) {
          onLogin(response.user)
        }

        // Navigate based on role
        switch (response.user.role) {
          case 'student':
            navigate('/student/dashboard')
            break
          case 'faculty':
            navigate('/faculty/dashboard')
            break
          case 'admin':
            navigate('/admin/dashboard')
            break
          default:
            navigate('/dashboard')
        }
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-200 flex">
      {/* Left Side - Branding & Animation */}
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-500 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="mb-8"
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl font-bold mb-4 text-center"
          >
            Welcome to AttendEase
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl text-blue-100 text-center mb-8 max-w-md"
          >
            Transform your institution with cutting-edge attendance monitoring
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-4"
          >
            {[
              { icon: Shield, text: "Secure & Encrypted" },
              { icon: Star, text: "Advanced Analytics" },
              { icon: CheckCircle, text: "Multi-role Access" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.2, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <item.icon className="w-5 h-5 text-white" />
                <span className="text-blue-100">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <motion.button
            variants={itemVariants}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>

          {/* Logo for mobile */}
          <motion.div
            variants={itemVariants}
            className="lg:hidden flex items-center justify-center mb-8"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">AttendEase</span>
          </motion.div>

          {/* Form Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </motion.div>

          {/* Role Selection */}
          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['student', 'faculty', 'admin'].map((role) => (
                <motion.button
                  key={role}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({...formData, role})}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.role === role
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium capitalize">{role}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </motion.a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{
                scale: loading ? 1 : 1.02,
                boxShadow: loading ? "none" : "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              Don't have an account?{' '}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up here
              </motion.a>
            </p>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            variants={itemVariants}
            className="mt-8 p-4 bg-gray-50 rounded-lg"
          >
            <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Student:</strong> student@demo.com / password</div>
              <div><strong>Faculty:</strong> faculty@demo.com / password</div>
              <div><strong>Admin:</strong> admin@demo.com / password</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage