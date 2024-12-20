import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { React, useRef, useEffect, useState } from "react";
import ApplicationsPage from "./pages/ApplicationsPage";
import ResumesPage from "./pages/ResumesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<ApplicationsPage />} />
        <Route path={'/resumes'} element={<ResumesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
