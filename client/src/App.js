import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { React, useRef, useEffect, useState } from "react";
import ApplicationsPage from "./pages/ApplicationsPage";
import ResumesPage from "./pages/ResumesPage";

function App() {
  const workerRef = useRef(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    if (!workerRef.current) {
      console.log('Creating new worker');
      
      workerRef.current = new Worker(
        new URL('./summarizerWorker.js', import.meta.url),
        { type: 'module' }
      );
      setWorker(workerRef.current);
      console.log('Worker created');

      workerRef.current.postMessage('');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<ApplicationsPage />} />
        <Route path={'/resumes'} element={<ResumesPage worker={worker} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
