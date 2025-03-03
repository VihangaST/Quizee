import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import QuestionPage from './pages/QuestionPage';
import QuizzesList from './pages/QuizzesList';
import Property from './pages/Property';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const excludeNavbarRoutes = ["/"];

  return (
    <>
      {!excludeNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionpage" element={<QuestionPage/>} />
        <Route path="/QuizzesList" element={<QuizzesList/>} />
        <Route path="/property/:propertyId" element={<Property/>}/>
      </Routes>
    </>
  );
}

export default App;
