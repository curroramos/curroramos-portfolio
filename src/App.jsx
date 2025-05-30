// App.jsx
import Media from './sections/Media.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Agents from './sections/Agents.jsx'
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/WorkExperience.jsx';
import Hero from './sections/Hero.jsx';
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero/>
      <About />
      <Agents />
      <Projects />
      <WorkExperience />
      {/* <Clients /> */}
      <Media />
      <Contact />
      <Footer />
      <Analytics />
    </main>
  );
};

export default App;
