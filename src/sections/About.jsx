import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';
import { motion } from 'framer-motion';

// Tech stack data with logos
const techStack = [
  { name: "Java Spring", logo: "assets/tech/java-spring.png" },
  { name: "Python", logo: "assets/tech/python.png" },
  { name: "React", logo: "assets/tech/react.png" },
  { name: "Next.js", logo: "assets/tech/nextjs.png" },
  { name: "Angular", logo: "assets/tech/angular.png" },
  { name: "TypeScript", logo: "assets/tech/typescript.png" },
  { name: "Azure", logo: "assets/tech/azure.png" },
  { name: "SQL", logo: "assets/tech/sql.png" },
  { name: "PostgreSQL", logo: "assets/tech/postgresql.png" },
  { name: "MongoDB", logo: "assets/tech/mongodb.png" },
  { name: "Docker", logo: "assets/tech/docker.png" },
  { name: "LLM/RAG", logo: "assets/tech/ai.png" },
];

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [visibleTech, setVisibleTech] = useState(6);
  const [showMore, setShowMore] = useState(false);
  const globeRef = useRef();

  const handleCopy = () => {
    navigator.clipboard.writeText('francisco_ramos@berkeley.edu');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleTech(showMore ? 6 : techStack.length);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleTech(showMore ? techStack.length : 6);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [showMore]);
  
  // Add globe auto-rotation
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.75;
        
        const animate = () => {
          controls.update();
          requestAnimationFrame(animate);
        };
        
        animate();
      }
    }
  }, []);

  return (
    <section className="c-space my-10" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">

        {/* Intro */}
        <motion.div 
          className="col-span-1 xl:row-span-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid-container group hover:shadow-lg transition-all duration-300">
            <div className="w-full sm:h-[276px] h-fit overflow-hidden rounded-t-3xl">
              <img 
                src="assets/drawing.png" 
                alt="grid-1" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-500" 
              />
            </div>
            <div className="p-6">
              <p className="grid-headtext">Hi, I'm Francisco Ramos</p>
              <p className="grid-subtext">
                I'm a software engineer and UC Berkeley grad with hands-on experience building agentic AI systems. I recently led development of chatbots and AI dashboards for market intelligence and compliance use cases.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Global Perspective (Swapped with Tech Stack) */}
        <motion.div 
          className="col-span-1 xl:row-span-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="grid-container group hover:shadow-lg transition-all duration-300">
            <div className="w-full sm:h-[276px] h-fit overflow-hidden rounded-t-3xl flex items-center justify-center">
              <Globe
                ref={globeRef}
                height={276}
                width={276}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  { lat: 40.4, lng: -3.7, text: 'Madrid, Spain', color: 'white', size: 15 },
                  { lat: 37.8, lng: -122.3, text: 'California, USA', color: 'white', size: 15 },
                  { lat: 30.2, lng: -97.7, text: 'Texas, USA', color: 'white', size: 15 }
                ]}
              />
            </div>
            <div className="p-6">
              <p className="grid-headtext">Global Perspective</p>
              <p className="grid-subtext">
                Originally from Spain, I've lived and worked in California and Texas, bringing diverse perspectives to problem-solving.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          className="col-span-1 xl:row-span-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid-container group hover:shadow-lg transition-all duration-300">
            <div
              className={`rounded-t-3xl w-full ${
                showMore ? 'sm:h-auto h-auto' : 'sm:h-[326px] h-fit'
              } flex justify-center items-center overflow-hidden bg-gradient-to-br from-blue-800 to-indigo-900 p-5 transition-all duration-300`}
            >
              <div className="grid grid-cols-3 gap-3">
                {techStack.slice(0, visibleTech).map((tech, index) => (
                    <motion.div 
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex flex-col items-center justify-center p-2"
                    >
                      <img 
                        src={tech.logo} 
                        alt={tech.name} 
                        className="w-10 h-10 object-contain mb-2 hover:scale-110 transition-all" 
                      />
                      <p className="text-xs text-center text-white font-medium">{tech.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <p className="grid-headtext">Tech Stack</p>
                  <button 
                    onClick={toggleShowMore} 
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    {showMore ? 'Show Less' : 'Show All'}
                  </button>
                </div>
                <p className="grid-subtext mt-2">
                  I work across the stack with a focus on LLMs, RAG pipelines, and production-grade AI systems.
                </p>
              </div>
            </div>
          </motion.div>


        {/* Passion */}
        <motion.div 
          className="xl:col-span-2 xl:row-span-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid-container group hover:shadow-lg transition-all duration-300">
            <div className="w-full sm:h-[200px] h-fit overflow-hidden rounded-t-3xl relative">
              <img 
                src="assets/tech/aigrid.png" 
                alt="grid-3" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
            </div>
            <div className="p-6">
              <p className="grid-headtext">What Drives Me</p>
              <p className="grid-subtext">
                I love solving real-world problems through code. With 1 year of full-time and 2 years of part-time experience in AI and software, I bring a strong production mindset with an eye toward scale and clarity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* University Logos + Contact */}
        <motion.div 
          className="xl:col-span-1 xl:row-span-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid-container group hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-3xl">
              <img
                src="assets/berkeley.png"
                alt="universities"
                className="w-full md:h-[150px] sm:h-[120px] h-fit object-contain mx-auto group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <div className="p-6 space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div 
                className="copy-container relative group cursor-pointer hover:bg-gray-800 transition-colors" 
                onClick={handleCopy}
              >
                <img 
                  src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} 
                  alt="copy" 
                  className="transition-all"
                />
                <p className="lg:text-xl md:text-xl font-medium text-gray_gradient text-white">
                  francisco_ramos@berkeley.edu
                </p>
                <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity ${hasCopied ? 'opacity-100' : ''}`}>
                  {hasCopied ? 'Copied!' : 'Click to copy'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
