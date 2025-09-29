// App.jsx
import { Routes, Route } from 'react-router-dom';
import Media from './sections/Media.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/WorkExperience.jsx';
import Hero from './sections/Hero.jsx';
import Blog from './sections/Blog.jsx';
import BlogPost from './sections/BlogPost.jsx';
import BlogPreview from './sections/BlogPreview.jsx';
import { Analytics } from "@vercel/analytics/react"

// Portfolio Home Page Component
const HomePage = () => (
  <>
    <Hero/>
    <BlogPreview />
    <About />
    <Projects />
    <WorkExperience />
    {/* <Clients /> */}
    <Media />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
      </Routes>
      <Analytics />
    </main>
  );
};

export default App;
