import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import ProjectPage from './components/ProjectPage';
import Main from './components/Main';
import { projects as projectPageData } from "./constants";
import { Navbar, StarsCanvas } from "./components";

const ScrollToSection = () => {
  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [hash]);

  return null;
};

const App = () => {
  return (
    <HashRouter>
      
      <div className="relative z-0 bg-primary">
        <Navbar />
        <ScrollToSection />
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/pgen" element={<PasswordGenerator />} />
            <Route path="/projects/:projectName" element={<ProjectPage />} />
            {projectPageData.map((project) => (
              <Route
                key={project.name}
                path={`/projects/${encodeURIComponent(project.name)}`}
                element={<ProjectPage project={project} />}
              />
            ))}
          </Routes>
        </div>
        <div className="relative z-0">
          {/* <StarsCanvas /> */}
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
