import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import AboutWebsite from './pages/AboutWebsite';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:projectId" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-this-site" element={<AboutWebsite />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}

export default App;