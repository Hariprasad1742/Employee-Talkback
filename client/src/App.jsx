import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import FeedbackCategoryPage from './components/FeedbackCategoryPage';
import Appointment from './components/Forms/Appointment';
import WaitingRoom from './components/Forms/WaitingRoom';
import Doctors from './components/Forms/Doctors';
import Nurses from './components/Forms/Nurses';
import PatientRooms from './components/Forms/PatientRooms';
import LabReports from './components/Forms/LabReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/feedback-category" element={<FeedbackCategoryPage />} />
        <Route path="/feedback-category/appointment" element={<Appointment />} />
        <Route path="/feedback-category/waiting-room" element={<WaitingRoom />} />
        <Route path="/feedback-category/doctors" element={<Doctors />} />
        <Route path="/feedback-category/nurses" element={<Nurses />} />
        <Route path="/feedback-category/patient-rooms" element={<PatientRooms />} />
        <Route path="/feedback-category/lab-reports" element={<LabReports />} />
      </Routes>
    </Router>
  );
}

export default App;
