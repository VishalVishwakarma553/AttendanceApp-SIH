// Mock API service to simulate backend with promises

// Mock user data
const mockUsers = [
  {
    id: 'student_001',
    name: 'John Doe',
    email: 'student@demo.com',
    role: 'student',
    department: 'Computer Science',
    year: '3rd Year',
    rollNumber: 'CS2021001',
    profileImage: '/api/placeholder/150/150',
    faceData: {
      isRegistered: true,
      registeredAt: new Date('2024-01-15'),
      lastUpdated: new Date('2024-09-01'),
      confidence: 95.2
    },
    preferences: {
      attendanceMethod: 'qr',
      notifications: true,
      privacySettings: {
        shareAttendance: false,
        allowFacialData: true
      }
    },
    enrolledCourses: ['CS301', 'CS302', 'CS303', 'MA301']
  },
  {
    id: 'faculty_001',
    name: 'Dr. Sarah Wilson',
    email: 'faculty@demo.com',
    role: 'faculty',
    department: 'Computer Science'
  },
  {
    id: 'admin_001',
    name: 'Michael Johnson',
    email: 'admin@demo.com',
    role: 'admin',
    department: 'Administration'
  }
]

// Mock courses data
const mockCourses = [
  {
    id: 'CS301',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    department: 'Computer Science',
    facultyId: 'faculty_001',
    facultyName: 'Dr. Sarah Wilson',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '09:00 AM - 10:30 AM',
      room: 'CS-101'
    },
    semester: 'Fall 2024',
    totalClasses: 45,
    conductedClasses: 32
  },
  {
    id: 'CS302',
    name: 'Database Management Systems',
    code: 'CS302',
    department: 'Computer Science',
    facultyId: 'faculty_001',
    facultyName: 'Dr. Robert Brown',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '11:00 AM - 12:30 PM',
      room: 'CS-102'
    },
    semester: 'Fall 2024',
    totalClasses: 30,
    conductedClasses: 24
  },
  {
    id: 'CS303',
    name: 'Computer Networks',
    code: 'CS303',
    department: 'Computer Science',
    facultyId: 'faculty_001',
    facultyName: 'Dr. Emily Davis',
    schedule: {
      days: ['Monday', 'Thursday'],
      time: '02:00 PM - 03:30 PM',
      room: 'CS-103'
    },
    semester: 'Fall 2024',
    totalClasses: 30,
    conductedClasses: 22
  },
  {
    id: 'MA301',
    name: 'Discrete Mathematics',
    code: 'MA301',
    department: 'Mathematics',
    facultyId: 'faculty_002',
    facultyName: 'Dr. James Miller',
    schedule: {
      days: ['Tuesday', 'Friday'],
      time: '10:00 AM - 11:30 AM',
      room: 'MA-101'
    },
    semester: 'Fall 2024',
    totalClasses: 30,
    conductedClasses: 25
  }
]

// Mock attendance records
const mockAttendanceRecords = [
  {
    id: 'att_001',
    studentId: 'student_001',
    courseId: 'CS301',
    courseName: 'Data Structures and Algorithms',
    sessionId: 'session_001',
    date: '2024-09-16',
    status: 'present',
    markedAt: new Date('2024-09-16T09:05:00'),
    markedBy: 'faculty_001',
    method: 'qr',
    metadata: {
      confidence: 100,
      deviceInfo: 'Mobile App',
      location: 'CS-101'
    }
  },
  {
    id: 'att_002',
    studentId: 'student_001',
    courseId: 'CS302',
    courseName: 'Database Management Systems',
    sessionId: 'session_002',
    date: '2024-09-15',
    status: 'present',
    markedAt: new Date('2024-09-15T11:02:00'),
    markedBy: 'student_001',
    method: 'facial_recognition',
    metadata: {
      confidence: 94.8,
      deviceInfo: 'Web Camera',
      location: 'CS-102',
      verificationAttempts: 1
    }
  },
  {
    id: 'att_003',
    studentId: 'student_001',
    courseId: 'CS301',
    courseName: 'Data Structures and Algorithms',
    sessionId: 'session_003',
    date: '2024-09-14',
    status: 'late',
    markedAt: new Date('2024-09-14T09:15:00'),
    markedBy: 'faculty_001',
    method: 'manual',
    metadata: {
      confidence: 100,
      deviceInfo: 'Faculty Portal',
      location: 'CS-101',
      notes: 'Arrived 15 minutes late'
    }
  },
  {
    id: 'att_004',
    studentId: 'student_001',
    courseId: 'CS303',
    courseName: 'Computer Networks',
    sessionId: 'session_004',
    date: '2024-09-13',
    status: 'absent',
    markedAt: null,
    markedBy: 'faculty_001',
    method: 'manual',
    metadata: {
      confidence: 100,
      deviceInfo: 'Faculty Portal',
      location: 'CS-103',
      notes: 'Medical leave'
    }
  }
]

// Generate more attendance records for the last 30 days
const generateAttendanceHistory = (studentId) => {
  const records = [...mockAttendanceRecords]
  const today = new Date()

  for (let i = 5; i <= 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue

    mockCourses.forEach((course, courseIndex) => {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      if (course.schedule.days.includes(dayName)) {
        const statuses = ['present', 'present', 'present', 'late', 'absent']
        const methods = ['qr', 'facial_recognition', 'manual']
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const method = methods[Math.floor(Math.random() * methods.length)]

        records.push({
          id: `att_${i}_${courseIndex}`,
          studentId,
          courseId: course.id,
          courseName: course.name,
          sessionId: `session_${i}_${courseIndex}`,
          date: date.toISOString().split('T')[0],
          status,
          markedAt: status !== 'absent' ? new Date(date.getTime() + Math.random() * 3600000) : null,
          markedBy: status === 'manual' ? 'faculty_001' : studentId,
          method,
          metadata: {
            confidence: method === 'facial_recognition' ? 90 + Math.random() * 10 : 100,
            deviceInfo: method === 'qr' ? 'Mobile App' : method === 'facial_recognition' ? 'Web Camera' : 'Faculty Portal',
            location: course.schedule.room
          }
        })
      }
    })
  }

  return records
}

// Mock API functions
// Mock student data for faculty
const mockStudents = [
  {
    id: 'student_001',
    name: 'John Doe',
    email: 'student@demo.com',
    rollNumber: 'CS2021001',
    department: 'Computer Science',
    year: '3rd Year',
    profileImage: '/api/placeholder/80/80',
    faceData: {
      isRegistered: true,
      registeredAt: new Date('2024-01-15'),
      confidence: 95.2
    },
    enrolledCourses: ['CS301', 'CS302', 'CS303', 'MA301']
  },
  {
    id: 'student_002',
    name: 'Alice Johnson',
    email: 'alice.johnson@college.edu',
    rollNumber: 'CS2021002',
    department: 'Computer Science',
    year: '3rd Year',
    profileImage: '/api/placeholder/80/80',
    faceData: {
      isRegistered: true,
      registeredAt: new Date('2024-02-10'),
      confidence: 92.8
    },
    enrolledCourses: ['CS301', 'CS302', 'CS303']
  },
  {
    id: 'student_003',
    name: 'Bob Wilson',
    email: 'bob.wilson@college.edu',
    rollNumber: 'CS2021003',
    department: 'Computer Science',
    year: '3rd Year',
    profileImage: '/api/placeholder/80/80',
    faceData: {
      isRegistered: false,
      registeredAt: null,
      confidence: 0
    },
    enrolledCourses: ['CS301', 'CS303']
  },
  {
    id: 'student_004',
    name: 'Sarah Davis',
    email: 'sarah.davis@college.edu',
    rollNumber: 'CS2021004',
    department: 'Computer Science',
    year: '3rd Year',
    profileImage: '/api/placeholder/80/80',
    faceData: {
      isRegistered: true,
      registeredAt: new Date('2024-01-20'),
      confidence: 97.1
    },
    enrolledCourses: ['CS301', 'CS302', 'MA301']
  }
]

export const mockApi = {
  // Authentication
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          u => u.email === credentials.email && u.role === credentials.role
        )

        if (user && credentials.password === 'password') {
          resolve({
            success: true,
            user,
            token: 'mock_jwt_token_' + user.id,
            message: 'Login successful'
          })
        } else {
          reject({
            success: false,
            message: 'Invalid credentials'
          })
        }
      }, 1000)
    })
  },

  // Student API
  student: {
    // Get student profile
    getProfile: (studentId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const student = mockUsers.find(u => u.id === studentId)
          resolve({
            success: true,
            data: student
          })
        }, 500)
      })
    },

    // Get student dashboard data
    getDashboard: (studentId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const student = mockUsers.find(u => u.id === studentId)
          const enrolledCourses = mockCourses.filter(c =>
            student.enrolledCourses.includes(c.id)
          )
          const attendanceRecords = generateAttendanceHistory(studentId)

          // Calculate attendance statistics
          const totalClasses = attendanceRecords.length
          const presentClasses = attendanceRecords.filter(r => r.status === 'present').length
          const lateClasses = attendanceRecords.filter(r => r.status === 'late').length
          const attendancePercentage = totalClasses > 0 ?
            Math.round(((presentClasses + lateClasses * 0.5) / totalClasses) * 100) : 0

          // Course-wise attendance
          const courseAttendance = enrolledCourses.map(course => {
            const courseRecords = attendanceRecords.filter(r => r.courseId === course.id)
            const coursePresent = courseRecords.filter(r => r.status === 'present').length
            const courseLate = courseRecords.filter(r => r.status === 'late').length
            const courseTotal = courseRecords.length
            const percentage = courseTotal > 0 ?
              Math.round(((coursePresent + courseLate * 0.5) / courseTotal) * 100) : 0

            return {
              ...course,
              attendancePercentage: percentage,
              presentClasses: coursePresent,
              lateClasses: courseLate,
              absentClasses: courseRecords.filter(r => r.status === 'absent').length,
              totalAttended: courseRecords.length
            }
          })

          resolve({
            success: true,
            data: {
              student,
              overview: {
                totalCourses: enrolledCourses.length,
                overallAttendance: attendancePercentage,
                presentClasses,
                lateClasses,
                absentClasses: attendanceRecords.filter(r => r.status === 'absent').length,
                totalClasses
              },
              courses: courseAttendance,
              recentAttendance: attendanceRecords
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 10)
            }
          })
        }, 800)
      })
    },

    // Get attendance history
    getAttendanceHistory: (studentId, filters = {}) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let records = generateAttendanceHistory(studentId)

          // Apply filters
          if (filters.courseId) {
            records = records.filter(r => r.courseId === filters.courseId)
          }
          if (filters.startDate) {
            records = records.filter(r => r.date >= filters.startDate)
          }
          if (filters.endDate) {
            records = records.filter(r => r.date <= filters.endDate)
          }
          if (filters.status) {
            records = records.filter(r => r.status === filters.status)
          }

          resolve({
            success: true,
            data: records.sort((a, b) => new Date(b.date) - new Date(a.date))
          })
        }, 600)
      })
    },

    // Mark attendance via QR
    markAttendanceQR: (qrData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate QR validation
          if (qrData.code && qrData.code.includes('ATTEND_')) {
            const newRecord = {
              id: 'att_' + Date.now(),
              studentId: qrData.studentId,
              courseId: qrData.courseId,
              courseName: qrData.courseName,
              sessionId: qrData.sessionId,
              date: new Date().toISOString().split('T')[0],
              status: 'present',
              markedAt: new Date(),
              markedBy: qrData.studentId,
              method: 'qr',
              metadata: {
                confidence: 100,
                deviceInfo: 'Mobile App',
                location: qrData.location
              }
            }

            resolve({
              success: true,
              data: newRecord,
              message: 'Attendance marked successfully via QR code'
            })
          } else {
            reject({
              success: false,
              message: 'Invalid QR code'
            })
          }
        }, 1500)
      })
    },

    // Mark attendance via Face Recognition
    markAttendanceFace: (faceData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate face recognition
          const confidence = 90 + Math.random() * 10

          if (confidence > 85) {
            const newRecord = {
              id: 'att_' + Date.now(),
              studentId: faceData.studentId,
              courseId: faceData.courseId,
              courseName: faceData.courseName,
              sessionId: faceData.sessionId,
              date: new Date().toISOString().split('T')[0],
              status: 'present',
              markedAt: new Date(),
              markedBy: faceData.studentId,
              method: 'facial_recognition',
              metadata: {
                confidence: Math.round(confidence * 100) / 100,
                deviceInfo: 'Web Camera',
                location: faceData.location,
                verificationAttempts: 1
              }
            }

            resolve({
              success: true,
              data: newRecord,
              message: `Attendance marked successfully via face recognition (${confidence.toFixed(1)}% confidence)`
            })
          } else {
            reject({
              success: false,
              message: 'Face recognition failed. Please try again or use alternative method.'
            })
          }
        }, 2000)
      })
    },

    // Update profile
    updateProfile: (studentId, profileData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: { ...profileData, id: studentId },
            message: 'Profile updated successfully'
          })
        }, 1000)
      })
    },

    // Register face data
    registerFace: (studentId, faceDescriptor) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              isRegistered: true,
              registeredAt: new Date(),
              confidence: 98.5
            },
            message: 'Face data registered successfully'
          })
        }, 2000)
      })
    }
  },

  // Faculty API
  faculty: {
    // Get faculty dashboard data
    getDashboard: (facultyId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const faculty = mockUsers.find(u => u.id === facultyId)
          const facultyCourses = mockCourses.filter(c => c.facultyId === facultyId)

          // Calculate overall statistics
          const totalStudents = mockStudents.length
          const studentsWithFace = mockStudents.filter(s => s.faceData.isRegistered).length
          const totalClasses = facultyCourses.reduce((sum, course) => sum + course.conductedClasses, 0)

          // Generate attendance data for courses
          const courseStats = facultyCourses.map(course => {
            const enrolledStudents = mockStudents.filter(s =>
              s.enrolledCourses.includes(course.id)
            )
            const attendanceRate = 75 + Math.random() * 20 // 75-95%

            return {
              ...course,
              enrolledStudents: enrolledStudents.length,
              averageAttendance: Math.round(attendanceRate),
              studentsWithFace: enrolledStudents.filter(s => s.faceData.isRegistered).length,
              recentSessions: course.conductedClasses
            }
          })

          resolve({
            success: true,
            data: {
              faculty,
              overview: {
                totalCourses: facultyCourses.length,
                totalStudents,
                studentsWithFace,
                faceRegistrationRate: Math.round((studentsWithFace / totalStudents) * 100),
                totalClasses,
                averageAttendance: 82
              },
              courses: courseStats,
              recentActivity: [
                {
                  id: 1,
                  type: 'qr_generated',
                  course: 'CS301',
                  time: '2 hours ago',
                  description: 'QR code generated for Data Structures class'
                },
                {
                  id: 2,
                  type: 'attendance_marked',
                  course: 'CS302',
                  time: '1 day ago',
                  description: '28 students marked present via face recognition'
                },
                {
                  id: 3,
                  type: 'student_registered',
                  course: 'CS301',
                  time: '2 days ago',
                  description: 'New student registered face data'
                }
              ]
            }
          })
        }, 800)
      })
    },

    // Get students for a course
    getCourseStudents: (courseId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const course = mockCourses.find(c => c.id === courseId)
          const students = mockStudents.filter(s =>
            s.enrolledCourses.includes(courseId)
          ).map(student => {
            // Generate attendance data for this student in this course
            const attendanceRecords = generateAttendanceHistory(student.id)
              .filter(r => r.courseId === courseId)

            const presentCount = attendanceRecords.filter(r => r.status === 'present').length
            const lateCount = attendanceRecords.filter(r => r.status === 'late').length
            const totalCount = attendanceRecords.length
            const attendancePercentage = totalCount > 0 ?
              Math.round(((presentCount + lateCount * 0.5) / totalCount) * 100) : 0

            return {
              ...student,
              attendance: {
                percentage: attendancePercentage,
                present: presentCount,
                late: lateCount,
                absent: attendanceRecords.filter(r => r.status === 'absent').length,
                total: totalCount
              },
              lastAttendance: attendanceRecords.length > 0 ?
                attendanceRecords.sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null
            }
          })

          resolve({
            success: true,
            data: {
              course,
              students
            }
          })
        }, 600)
      })
    },

    // Generate QR code for attendance
    generateQRCode: (sessionData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const qrCode = {
            id: 'qr_' + Date.now(),
            code: `ATTEND_${sessionData.courseId}_${Date.now()}`,
            courseId: sessionData.courseId,
            courseName: sessionData.courseName,
            sessionId: 'session_' + Date.now(),
            facultyId: sessionData.facultyId,
            location: sessionData.location,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
            createdAt: new Date(),
            isActive: true
          }

          resolve({
            success: true,
            data: qrCode,
            message: 'QR code generated successfully'
          })
        }, 1000)
      })
    },

    // Mark attendance manually
    markAttendance: (attendanceData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const records = attendanceData.students.map(studentData => ({
            id: 'att_' + Date.now() + '_' + studentData.studentId,
            studentId: studentData.studentId,
            courseId: attendanceData.courseId,
            courseName: attendanceData.courseName,
            sessionId: attendanceData.sessionId,
            date: attendanceData.date,
            status: studentData.status,
            markedAt: new Date(),
            markedBy: attendanceData.facultyId,
            method: 'manual',
            metadata: {
              confidence: 100,
              deviceInfo: 'Faculty Portal',
              location: attendanceData.location,
              notes: studentData.notes || ''
            }
          }))

          resolve({
            success: true,
            data: records,
            message: `Attendance marked for ${records.length} students`
          })
        }, 1500)
      })
    },

    // Setup face recognition session
    setupFaceRecognition: (sessionData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const session = {
            id: 'face_session_' + Date.now(),
            courseId: sessionData.courseId,
            courseName: sessionData.courseName,
            facultyId: sessionData.facultyId,
            location: sessionData.location,
            startTime: new Date(),
            duration: sessionData.duration || 120, // minutes
            settings: {
              confidenceThreshold: sessionData.confidenceThreshold || 85,
              autoMarkAttendance: sessionData.autoMarkAttendance || true,
              allowMultipleAttempts: sessionData.allowMultipleAttempts || true
            },
            isActive: true
          }

          resolve({
            success: true,
            data: session,
            message: 'Face recognition session started successfully'
          })
        }, 1200)
      })
    },

    // Get attendance analytics
    getAnalytics: (facultyId, filters = {}) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const facultyCourses = mockCourses.filter(c => c.facultyId === facultyId)

          // Generate analytics data
          const analytics = {
            overview: {
              totalSessions: 120,
              averageAttendance: 82,
              qrScans: 450,
              faceRecognitions: 380,
              manualEntries: 45
            },
            methodBreakdown: [
              { method: 'QR Code', count: 450, percentage: 52 },
              { method: 'Face Recognition', count: 380, percentage: 43 },
              { method: 'Manual', count: 45, percentage: 5 }
            ],
            coursePerformance: facultyCourses.map(course => ({
              courseId: course.id,
              courseName: course.name,
              attendanceRate: 75 + Math.random() * 20,
              studentsEnrolled: mockStudents.filter(s => s.enrolledCourses.includes(course.id)).length,
              sessionsCompleted: course.conductedClasses
            })),
            weeklyTrends: Array.from({ length: 7 }, (_, i) => ({
              day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
              attendance: 70 + Math.random() * 25
            }))
          }

          resolve({
            success: true,
            data: analytics
          })
        }, 900)
      })
    },

    // Generate reports
    generateReport: (reportConfig) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const report = {
            id: 'report_' + Date.now(),
            type: reportConfig.type,
            courseId: reportConfig.courseId,
            dateRange: reportConfig.dateRange,
            generatedAt: new Date(),
            data: {
              summary: {
                totalClasses: 32,
                averageAttendance: 84,
                studentsTracked: 25,
                methodsUsed: ['QR Code', 'Face Recognition', 'Manual']
              },
              methodBreakdown: {
                qr: { count: 156, percentage: 55 },
                face: { count: 98, percentage: 35 },
                manual: { count: 28, percentage: 10 }
              }
            },
            downloadUrl: '/api/reports/download/' + Date.now()
          }

          resolve({
            success: true,
            data: report,
            message: 'Report generated successfully'
          })
        }, 2000)
      })
    }
  },

  // Admin API
  admin: {
    // Get admin dashboard data
    getDashboard: (adminId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const admin = mockUsers.find(u => u.id === adminId)

          // Institution-wide statistics
          const totalUsers = mockUsers.length + mockStudents.length - 1 // Exclude duplicate student
          const totalFaculty = mockUsers.filter(u => u.role === 'faculty').length
          const totalStudents = mockStudents.length
          const totalCourses = mockCourses.length
          const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry']

          // Biometric statistics
          const studentsWithFace = mockStudents.filter(s => s.faceData.isRegistered).length
          const biometricAccuracy = 94.2

          // System activity
          const dailyLogins = 145
          const attendanceMarked = 320
          const systemUptime = 99.8

          resolve({
            success: true,
            data: {
              admin,
              overview: {
                totalUsers,
                totalFaculty,
                totalStudents,
                totalCourses,
                totalDepartments: departments.length,
                biometricRegistration: Math.round((studentsWithFace / totalStudents) * 100),
                systemUptime,
                dailyActiveUsers: dailyLogins,
                attendanceToday: attendanceMarked
              },
              departmentStats: departments.map(dept => ({
                name: dept,
                faculty: Math.floor(Math.random() * 5) + 2,
                students: Math.floor(Math.random() * 100) + 50,
                courses: Math.floor(Math.random() * 8) + 5,
                avgAttendance: Math.floor(Math.random() * 20) + 75,
                faceRegistration: Math.floor(Math.random() * 30) + 70
              })),
              systemHealth: {
                serverStatus: 'Healthy',
                databaseStatus: 'Healthy',
                apiResponseTime: '120ms',
                storageUsage: 68,
                lastBackup: '2 hours ago'
              },
              recentActivity: [
                {
                  id: 1,
                  type: 'user_created',
                  description: 'New faculty account created for Dr. Emily Clark',
                  time: '30 minutes ago',
                  department: 'Computer Science'
                },
                {
                  id: 2,
                  type: 'system_update',
                  description: 'Face recognition accuracy threshold updated to 85%',
                  time: '2 hours ago',
                  department: 'System'
                },
                {
                  id: 3,
                  type: 'backup_completed',
                  description: 'Daily database backup completed successfully',
                  time: '3 hours ago',
                  department: 'System'
                },
                {
                  id: 4,
                  type: 'course_created',
                  description: 'New course "Advanced Algorithms" added to CS department',
                  time: '1 day ago',
                  department: 'Computer Science'
                }
              ],
              methodAnalytics: {
                qrCode: { usage: 52, trend: '+5%' },
                faceRecognition: { usage: 38, trend: '+12%' },
                manual: { usage: 10, trend: '-3%' }
              }
            }
          })
        }, 1000)
      })
    },

    // Get all users for management
    getUsers: (filters = {}) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let users = [...mockUsers, ...mockStudents.map(s => ({ ...s, role: 'student' }))]

          if (filters.role) {
            users = users.filter(u => u.role === filters.role)
          }
          if (filters.department) {
            users = users.filter(u => u.department === filters.department)
          }
          if (filters.search) {
            users = users.filter(u =>
              u.name.toLowerCase().includes(filters.search.toLowerCase()) ||
              u.email.toLowerCase().includes(filters.search.toLowerCase())
            )
          }

          resolve({
            success: true,
            data: users.map(user => ({
              ...user,
              lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
              accountStatus: Math.random() > 0.1 ? 'active' : 'inactive',
              createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
            }))
          })
        }, 800)
      })
    },

    // Create new user
    createUser: (userData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newUser = {
            id: userData.role + '_' + Date.now(),
            ...userData,
            createdAt: new Date(),
            accountStatus: 'active',
            lastLogin: null
          }

          resolve({
            success: true,
            data: newUser,
            message: 'User created successfully'
          })
        }, 1200)
      })
    },

    // Update user
    updateUser: (userId, userData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: { ...userData, id: userId, updatedAt: new Date() },
            message: 'User updated successfully'
          })
        }, 1000)
      })
    },

    // Delete user
    deleteUser: (userId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: 'User deleted successfully'
          })
        }, 800)
      })
    },

    // Get all courses for management
    getCourses: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const coursesWithStats = mockCourses.map(course => ({
            ...course,
            enrolledCount: mockStudents.filter(s => s.enrolledCourses.includes(course.id)).length,
            completionRate: Math.floor(Math.random() * 30) + 70,
            avgAttendance: Math.floor(Math.random() * 25) + 70,
            createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
          }))

          resolve({
            success: true,
            data: coursesWithStats
          })
        }, 600)
      })
    },

    // Create new course
    createCourse: (courseData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newCourse = {
            id: 'COURSE_' + Date.now(),
            ...courseData,
            enrolledCount: 0,
            completionRate: 0,
            avgAttendance: 0,
            createdAt: new Date()
          }

          resolve({
            success: true,
            data: newCourse,
            message: 'Course created successfully'
          })
        }, 1200)
      })
    },

    // Get system settings
    getSystemSettings: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              attendance: {
                qrCodeExpiry: 30, // minutes
                lateThreshold: 15, // minutes
                minimumAttendance: 75, // percentage
                allowProxyAttendance: false
              },
              faceRecognition: {
                confidenceThreshold: 85, // percentage
                maxAttempts: 3,
                sessionTimeout: 120, // minutes
                enableMultiface: false,
                requireLiveness: true
              },
              notifications: {
                emailNotifications: true,
                smsNotifications: false,
                lowAttendanceAlerts: true,
                systemMaintenanceAlerts: true
              },
              security: {
                sessionTimeout: 480, // minutes
                passwordExpiry: 90, // days
                twoFactorAuth: false,
                auditLogging: true
              },
              privacy: {
                dataRetention: 365, // days
                faceDataEncryption: true,
                consentRequired: true,
                allowDataExport: true
              }
            }
          })
        }, 700)
      })
    },

    // Update system settings
    updateSystemSettings: (settings) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: settings,
            message: 'System settings updated successfully'
          })
        }, 1000)
      })
    },

    // Get biometric management data
    getBiometricData: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const biometricStats = {
            totalRegistrations: mockStudents.filter(s => s.faceData.isRegistered).length,
            totalUsers: mockStudents.length,
            averageAccuracy: 94.2,
            recentRegistrations: 12,
            failedAttempts: 5,
            registrationsByDepartment: {
              'Computer Science': 85,
              'Mathematics': 78,
              'Physics': 92,
              'Chemistry': 81
            }
          }

          const registrationHistory = Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            registrations: Math.floor(Math.random() * 10) + 1,
            accuracy: 90 + Math.random() * 10
          })).reverse()

          resolve({
            success: true,
            data: {
              stats: biometricStats,
              history: registrationHistory,
              users: mockStudents.map(student => ({
                ...student,
                registrationDate: student.faceData.registeredAt,
                lastVerification: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
                verificationCount: Math.floor(Math.random() * 50) + 10,
                accuracy: student.faceData.confidence
              }))
            }
          })
        }, 900)
      })
    },

    // Generate advanced reports
    generateAdvancedReport: (reportConfig) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const report = {
            id: 'admin_report_' + Date.now(),
            type: reportConfig.type,
            generatedAt: new Date(),
            parameters: reportConfig,
            data: {
              institutionSummary: {
                totalSessions: 450,
                totalAttendance: 15680,
                averageAttendance: 82.3,
                methodBreakdown: {
                  qr: 52,
                  face: 38,
                  manual: 10
                }
              },
              departmentAnalysis: [
                {
                  department: 'Computer Science',
                  attendance: 84.5,
                  students: 120,
                  courses: 8,
                  preferredMethod: 'QR Code'
                },
                {
                  department: 'Mathematics',
                  attendance: 81.2,
                  students: 95,
                  courses: 6,
                  preferredMethod: 'Face Recognition'
                }
              ],
              trends: {
                weekly: Array.from({ length: 7 }, (_, i) => ({
                  day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                  attendance: 70 + Math.random() * 25
                })),
                monthly: Array.from({ length: 12 }, (_, i) => ({
                  month: i + 1,
                  attendance: 75 + Math.random() * 20
                }))
              }
            },
            downloadUrl: '/api/admin/reports/download/' + Date.now()
          }

          resolve({
            success: true,
            data: report,
            message: 'Advanced report generated successfully'
          })
        }, 2500)
      })
    },

    // Get department analytics
    getDepartmentAnalytics: (departmentId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const analytics = {
            overview: {
              totalFaculty: Math.floor(Math.random() * 8) + 5,
              totalStudents: Math.floor(Math.random() * 150) + 100,
              totalCourses: Math.floor(Math.random() * 12) + 8,
              avgAttendance: Math.floor(Math.random() * 20) + 75
            },
            methodPreferences: [
              { method: 'QR Code', usage: 45, satisfaction: 4.2 },
              { method: 'Face Recognition', usage: 40, satisfaction: 4.5 },
              { method: 'Manual', usage: 15, satisfaction: 3.8 }
            ],
            performanceMetrics: {
              attendance: {
                current: 82.5,
                target: 85,
                trend: '+2.3%'
              },
              engagement: {
                current: 78.2,
                target: 80,
                trend: '+1.8%'
              },
              completion: {
                current: 91.4,
                target: 90,
                trend: '+3.2%'
              }
            }
          }

          resolve({
            success: true,
            data: analytics
          })
        }, 800)
      })
    }
  }
}

export default mockApi