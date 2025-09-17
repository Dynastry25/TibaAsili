import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './Components/Footer/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import DoctorsPage from './pages/DoctorPage';
import DiseasesPage from './pages/DiseasesPage';
import { DoctorProvider } from './Context/DoctorContext';
import { DiseasesProvider } from './Context/DiseasesContext';

function App() {
  return (
    <BrowserRouter>
      <DoctorProvider>
        <DiseasesProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/doctors' element={<DoctorsPage />} />
            <Route path='/diseases' element={<DiseasesPage />} />
          </Routes>
          <Footer />
        </DiseasesProvider>
      </DoctorProvider>
    </BrowserRouter>
  );
}

export default App;