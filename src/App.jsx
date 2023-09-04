import { HashRouter, Route, Routes } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import Main from './components/Main';

import {
  Navbar,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <HashRouter>
      <div className="relative z-0 bg-primary">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/pgen" element={<PasswordGenerator />} />
          </Routes>
        </div>
        <div className="relative z-0">
          <StarsCanvas />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
