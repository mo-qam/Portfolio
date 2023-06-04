import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import Main from './components/Main';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/p-gen" element={<PasswordGenerator />} />
          </Routes>
        </div>
        <div className="relative z-0">
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
