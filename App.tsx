import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimateOnScroll from './components/AnimateOnScroll';
import BackToTopButton from './components/BackToTopButton';
import ParticlesBackground from './components/ParticlesBackground';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0a192f] text-slate-700 dark:text-slate-400 transition-colors duration-500 relative">
      <ParticlesBackground isDarkMode={isDarkMode} />
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main role="main" aria-label="Main content" className="relative z-10">
        <Hero isDarkMode={isDarkMode} />
        <AnimateOnScroll>
          <About />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Skills />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Projects />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Experience />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Certifications />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Testimonials />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <Contact />
        </AnimateOnScroll>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;