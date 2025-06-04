import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import FeedbackCategoryPage from './components/FeedbackCategoryPage';
import Appointment from './components/Forms/Appointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/feedback-category" element={<FeedbackCategoryPage />} />
        <Route path="/feedback-category/appointment" element={<Appointment />} />
      </Routes>
    </Router>
  );
}

export default App;
