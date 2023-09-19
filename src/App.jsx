import { HashRouter, Route, Routes } from 'react-router-dom';
import PasswordGenerator from './components/PasswordGenerator';
import ProjectPage from './components/ProjectPage';
import Main from './components/Main';

import { projects as projectPageData } from "./constants";

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
