const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection status
let isDatabaseConnected = false;

// MongoDB Connection - UPDATED WITH YOUR DATABASE
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dynastrytv:Dynastry2003@cluster0.wlkvf5s.mongodb.net/tibaasili';
    
    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    isDatabaseConnected = true;
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    console.log(`📊 Database name: ${conn.connection.name}`);
    
    // Create sample admin user after successful connection
    await createSampleAdmin();
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    isDatabaseConnected = false;
    
    // Retry connection after 5 seconds
    setTimeout(() => {
      console.log('🔄 Retrying database connection...');
      connectDB();
    }, 5000);
  }
};

// ==================== MODELS ====================

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'nurse'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  specialty: {
    type: String,
    required: function() { return this.role === 'doctor'; }
  },
  licenseNumber: {
    type: String,
    required: function() { return this.role === 'doctor'; }
  }
}, {
  timestamps: true
});

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

// Patient Schema - FIXED PHONE VALIDATION
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number'] // Fixed regex
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot be more than 120']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: 500
  },
  medicalHistory: {
    type: String,
    maxlength: 1000
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '']
  },
  allergies: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  }
}, {
  timestamps: true
});

patientSchema.index({ email: 1 });
patientSchema.index({ status: 1 });
patientSchema.index({ name: 'text', email: 'text' });
patientSchema.index({ createdAt: -1 });

patientSchema.virtual('ageGroup').get(function() {
  if (this.age < 18) return 'child';
  if (this.age < 60) return 'adult';
  return 'senior';
});

const Patient = mongoose.model('Patient', patientSchema);

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient ID is required']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor ID is required']
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  type: {
    type: String,
    enum: ['consultation', 'checkup', 'followup', 'emergency'],
    default: 'consultation'
  },
  reason: {
    type: String,
    required: [true, 'Reason for appointment is required'],
    maxlength: 500
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled'
  },
  duration: {
    type: Number,
    default: 30,
    min: [5, 'Duration must be at least 5 minutes'],
    max: [240, 'Duration cannot exceed 4 hours']
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

appointmentSchema.index({ date: 1, time: 1 });
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ doctorId: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ date: 1, status: 1 });

appointmentSchema.virtual('datetime').get(function() {
  const timeParts = this.time.split(':');
  const date = new Date(this.date);
  date.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
  return date;
});

appointmentSchema.virtual('isPast').get(function() {
  return this.datetime < new Date();
});

appointmentSchema.virtual('isToday').get(function() {
  const today = new Date();
  return this.date.toDateString() === today.toDateString();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// ==================== SAMPLE DATA ====================

const createSampleAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@tibaasili.com' });
    
    if (!existingAdmin) {
      // Create admin user with plain text password (pre-save hook will hash it)
      const adminUser = new User({
        name: 'System Administrator',
        email: 'admin@tibaasili.com',
        password: 'admin123', // Plain text - will be hashed by pre-save hook
        role: 'admin',
        isActive: true
      });
      
      await adminUser.save();
      console.log('✅ Sample admin user created:');
      console.log('   Email: admin@tibaasili.com');
      console.log('   Password: admin123');
    } else {
      // Update existing admin to use correct hashing
      existingAdmin.password = 'admin123'; // Will be re-hashed by pre-save hook
      await existingAdmin.save();
      console.log('🔄 Updated existing admin user password');
    }

    // Similarly update sample doctors to use plain text passwords
    const sampleDoctors = [
      {
        name: 'Dr. John Smith',
        email: 'john.smith@tibaasili.com',
        password: 'doctor123', // Plain text
        role: 'doctor',
        specialty: 'General Medicine',
        licenseNumber: 'MD-001234'
      },
      {
        name: 'Dr. Mary Johnson',
        email: 'mary.johnson@tibaasili.com',
        password: 'doctor123', // Plain text
        role: 'doctor',
        specialty: 'Pediatrics',
        licenseNumber: 'MD-005678'
      }
    ];

    for (const doctorData of sampleDoctors) {
      let doctor = await User.findOne({ email: doctorData.email });
      if (!doctor) {
        doctor = new User(doctorData);
        await doctor.save();
        console.log(`✅ Sample doctor created: ${doctorData.email}`);
      } else {
        // Update existing doctor password
        doctor.password = doctorData.password;
        await doctor.save();
        console.log(`🔄 Updated existing doctor: ${doctorData.email}`);
      }
    }

    console.log('🎉 Sample data setup completed!');

  } catch (error) {
    console.error('Error creating sample data:', error);
  }
};

// ==================== AUTH FUNCTIONS ====================

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '7d' });
};

// ==================== ROUTES ====================

// Auth Routes - Login (Fixed Version)
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 }) // Changed from 6 to 1 for testing
], async (req, res) => {
  try {
    console.log('Login attempt:', req.body); // Debug log

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase(), isActive: true });
    console.log('User found:', user ? 'Yes' : 'No'); // Debug log
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    console.log('Checking password...'); // Debug log
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password valid:', isPasswordValid); // Debug log
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);
    console.log('Login successful for:', email); // Debug log

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialty: user.specialty
      }
    });

  } catch (error) {
    console.error('Login error details:', error);
    res.status(500).json({ 
      message: 'Server error. Please try again later.',
      error: error.message 
    });
  }
});

// Register route
app.post('/api/auth/register', [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['admin', 'doctor', 'nurse'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, specialty, licenseNumber } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ 
      name, 
      email, 
      password, 
      role,
      specialty: role === 'doctor' ? specialty : undefined,
      licenseNumber: role === 'doctor' ? licenseNumber : undefined
    });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialty: user.specialty
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Patients Routes
// Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const patients = await Patient.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Patient.countDocuments(query);

    res.json({
      patients,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single patient
app.get('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create patient
app.post('/api/patients', [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail(),
  body('phone').isLength({ min: 10 }),
  body('age').isInt({ min: 0, max: 120 }),
  body('gender').isIn(['male', 'female', 'other']),
  body('address').trim().isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const patient = new Patient(req.body);
    await patient.save();

    res.status(201).json(patient);
  } catch (error) {
    console.error('Create patient error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Patient with this email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update patient
app.put('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete patient
app.delete('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Doctors Routes
// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', isActive: true })
      .select('name email specialty licenseNumber')
      .sort({ name: 1 });

    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Appointments Routes
// Get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const { page = 1, limit = 10, date, status } = req.query;
    const query = {};

    if (date) {
      query.date = new Date(date);
    }
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'name email specialty')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: 1, time: 1 });

    const total = await Appointment.countDocuments(query);

    res.json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single appointment
app.get('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId', 'name email specialty');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create appointment
app.post('/api/appointments', [
  body('patientId').isMongoId(),
  body('doctorId').isMongoId(),
  body('date').isISO8601(),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('reason').trim().isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();
    
    await appointment.populate('patientId', 'name email phone');
    await appointment.populate('doctorId', 'name email specialty');

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment
app.put('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('patientId', 'name email phone')
    .populate('doctorId', 'name email specialty');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete appointment
app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dashboard Routes
// Dashboard Routes - Get recent activities
app.get('/api/dashboard/activities', async (req, res) => {
  try {
    // Hii ni sample data - badilisha kwa kuchukua data halisi kutoka database
    const activities = [
      {
        id: 1,
        type: 'appointment',
        description: 'New appointment scheduled with Dr. Smith',
        time: '2 minutes ago'
      },
      {
        id: 2,
        type: 'patient',
        description: 'New patient registration: John Doe',
        time: '15 minutes ago'
      },
      {
        id: 3,
        type: 'payment',
        description: 'Payment received from Mary Johnson',
        time: '1 hour ago'
      },
      {
        id: 4,
        type: 'appointment',
        description: 'Appointment completed with Robert Brown',
        time: '2 hours ago'
      },
      {
        id: 5,
        type: 'system',
        description: 'System backup completed successfully',
        time: '3 hours ago'
      }
    ];

    res.json(activities);
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get dashboard statistics
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [
      totalPatients,
      totalAppointments,
      todayAppointments,
      totalDoctors
    ] = await Promise.all([
      Patient.countDocuments(),
      Appointment.countDocuments(),
      Appointment.countDocuments({ 
        date: { 
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }),
      User.countDocuments({ role: 'doctor', isActive: true })
    ]);

    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('patientId', 'name')
      .populate('doctorId', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get appointment status counts
    const appointmentStatus = await Appointment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      stats: {
        totalPatients,
        totalAppointments,
        todayAppointments,
        totalDoctors
      },
      recentAppointments,
      appointmentStatus
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// System Routes
// Get database status
app.get('/api/system/database-status', async (req, res) => {
  try {
    const db = mongoose.connection;
    const status = db.readyState;
    
    let statusText = '';
    switch(status) {
      case 0: statusText = 'Disconnected'; break;
      case 1: statusText = 'Connected'; break;
      case 2: statusText = 'Connecting'; break;
      case 3: statusText = 'Disconnecting'; break;
      default: statusText = 'Unknown';
    }
    
    let stats = null;
    if (status === 1) {
      try {
        stats = await db.db.command({ dbStats: 1 });
      } catch (statsError) {
        console.log('Could not get database stats:', statsError.message);
      }
    }
    
    res.json({
      connected: status === 1,
      status: statusText,
      readyState: status,
      databaseName: db.name || 'Not connected',
      host: db.host || 'Not connected',
      port: db.port || 'Not connected',
      stats: stats
    });
  } catch (error) {
    console.error('Database status error:', error);
    res.status(500).json({ 
      message: 'Error getting database status',
      error: error.message 
    });
  }
});

// Get collection statistics
app.get('/api/system/database-stats', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected' });
    }
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    const stats = {};
    for (const collection of collections) {
      try {
        const collectionStats = await db.collection(collection.name).stats();
        stats[collection.name] = {
          count: collectionStats.count,
          size: collectionStats.size,
          storageSize: collectionStats.storageSize,
          avgObjSize: collectionStats.avgObjSize
        };
      } catch (e) {
        stats[collection.name] = { error: e.message };
      }
    }
    
    res.json({
      database: db.databaseName,
      collections: Object.keys(stats),
      stats: stats
    });
  } catch (error) {
    console.error('Database stats error:', error);
    res.status(500).json({ 
      message: 'Error getting database statistics',
      error: error.message 
    });
  }
});

// ==================== MAIN ROUTES ====================

// Basic route
app.get('/', (req, res)=> {
  res.json({ 
    message: 'Tiba Asili API is running!',
    version: '1.0.0',
    database: isDatabaseConnected ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  let statusText = '';
  
  switch(dbStatus) {
    case 0: statusText = 'Disconnected'; break;
    case 1: statusText = 'Connected'; break;
    case 2: statusText = 'Connecting'; break;
    case 3: statusText = 'Disconnecting'; break;
    default: statusText = 'Unknown';
  }
  
  res.json({ 
    status: 'OK',
    database: {
      status: statusText,
      readyState: dbStatus,
      connected: isDatabaseConnected,
      name: mongoose.connection.name || 'Not connected'
    },
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 3001;

// Start server
const startServer = async () => {
  try {
    console.log('🚀 Starting Tiba Asili Server...');
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Connect to database
    await connectDB();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🔗 API URL: http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
      console.log('\n📋 Available API Endpoints:');
      console.log('  - GET    /api/health');
      console.log('  - POST   /api/auth/login');
      console.log('  - POST   /api/auth/register');
      console.log('  - GET    /api/auth/me');
      console.log('  - GET    /api/patients');
      console.log('  - POST   /api/patients');
      console.log('  - GET    /api/doctors');
      console.log('  - GET    /api/appointments');
      console.log('  - POST   /api/appointments');
      console.log('  - GET    /api/dashboard/stats');
      console.log('  - GET    /api/system/database-status');
      console.log('\n🔐 Sample Admin Login:');
      console.log('  Email: admin@tibaasili.com');
      console.log('  Password: admin123');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();