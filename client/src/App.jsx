import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import FeedbackCategoryPage from './components/FeedbackCategoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/feedback-category" element={<FeedbackCategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
