import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  Users,
  BarChart3,
  QrCode,
  Camera,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Play
} from 'lucide-react'


const HomePage = () => {
    const navigate = useNavigate()

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

  const features = [
    {
      icon: QrCode,
      title: "QR Code Scanning",
      description: "Quick and seamless attendance marking with QR codes"
    },
    {
      icon: Camera,
      title: "Facial Recognition",
      description: "Advanced biometric attendance with face detection"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and attendance analytics"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Live attendance monitoring and instant updates"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with data protection"
    },
    {
      icon: Users,
      title: "Multi-role Access",
      description: "Student, Faculty, and Admin role management"
    }
  ]

  const stats = [
    { value: "95%", label: "Accuracy Rate" },
    { value: "30s", label: "Avg. Marking Time" },
    { value: "100%", label: "Digital Coverage" },
    { value: "24/7", label: "System Uptime" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-200">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-50"
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">AttendEase</span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {['Features', 'Analytics', 'Security', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </motion.button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-32 pb-20 px-6"
      >
        <div className="container mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div
              className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <Users className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Automated Student
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Attendance System
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your institution with cutting-edge attendance monitoring using QR codes,
              facial recognition, and comprehensive analytics for smarter academic management.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={floatVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.5}s` }}
                className="bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-200 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-10 px-6 bg-white/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive attendance management with modern technology and intelligent analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Analytics Preview */}
      <motion.section
        id="analytics"
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Advanced Analytics Dashboard
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get comprehensive insights into attendance patterns, student engagement,
                and institutional performance with real-time analytics and reporting.
              </p>

              <div className="space-y-4">
                {[
                  "Real-time attendance tracking",
                  "Student engagement metrics",
                  "Attendance pattern analysis",
                  "Automated report generation"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                variants={floatVariants}
                animate="animate"
                className="bg-white rounded-2xl shadow-2xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Attendance Overview</h3>
                  <span className="text-green-500 font-medium">+12% this week</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Present", value: 85, color: "bg-green-500" },
                    { label: "Late", value: 10, color: "bg-yellow-500" },
                    { label: "Absent", value: 5, color: "bg-red-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-gray-600 flex-1">{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        id="security"
        className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Your data is protected with industry-standard encryption, secure biometric storage,
              and comprehensive privacy controls ensuring complete compliance.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "Data Encryption", desc: "End-to-end encryption" },
                { icon: Zap, title: "Fast Processing", desc: "Real-time recognition" },
                { icon: Star, title: "GDPR Compliant", desc: "Privacy by design" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-6 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of educational institutions worldwide who trust AttendEase
            for their attendance management needs.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all inline-flex items-center gap-2"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-800 text-white py-12 px-6"
      >
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AttendEase</span>
          </div>

          <p className="text-gray-400 mb-4">
            Revolutionizing attendance management for the digital age
          </p>

          <div className="text-gray-500 text-sm">
            © 2024 AttendEase. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default HomePage