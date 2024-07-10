
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormPage from './pages/FirstPage';
import SecondPage from './pages/SeacondPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
