import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import ModernLayout from './components/ModernLayout/ModernLayout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ModernDashboard from './components/Dashboard/ModernDashboard';
import PatientList from './components/Patients/PatientList';
import PatientForm from './components/Patients/PatientForm';
import PatientDetails from './components/Patients/PatientDetails';
import AppointmentList from './components/Appointments/AppointmentList';
import AppointmentForm from './components/Appointments/AppointmentForm';
import CalendarView from './components/Appointments/CalendarView';
import VideoSection from './components/Video/VideoSection';
import VideoManager from './components/Video/VideoManager';
import ExpertsSection from './components/Experts/ExpertsSection';
import ExpertsManager from './components/Experts/ExpertsManager';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Import CSS files
import './styles/index.css';
import './styles/Modern.css';
import './styles/Layout.css';
import './styles/Auth.css';
import './styles/Dashboard.css';
import './styles/Table.css';
import './styles/Forms.css';
import './styles/Buttons.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes with Modern Layout */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <ModernDashboard />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/patients" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <PatientList />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/patients/new" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <PatientForm />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/patients/:id" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <PatientDetails />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/appointments" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <AppointmentList />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/appointments/new" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <AppointmentForm />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/calendar" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <CalendarView />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/videos" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <VideoSection />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/manage-videos" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <VideoManager />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/experts" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <ExpertsSection />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/manage-experts" element={
                  <ProtectedRoute>
                    <ModernLayout>
                      <ExpertsManager />
                    </ModernLayout>
                  </ProtectedRoute>
                } />
                
                {/* 404 Page */}
                <Route path="*" element={
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
                      <p style={{ fontSize: '1.5rem' }}>Page Not Found</p>
                      <a 
                        href="/" 
                        style={{
                          color: 'white',
                          textDecoration: 'underline',
                          fontSize: '1.1rem'
                        }}
                      >
                        Go back to Dashboard
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#27ae60',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#e74c3c',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;