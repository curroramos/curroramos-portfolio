import { useState } from 'react';
import { 
  industryProjects, 
  researchProjects, 
  publications, 
  courseProjects 
} from '../constants/index.js';
import Button from '../components/Button.jsx';

const ProjectCard = ({ project, index }) => {
  return (
    
    <div
      className="flex flex-col gap-8 mb-16 lg:mb-0"
    >
      <div className="w-full">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center overflow-hidden">
              <img className = "w-full h-full rounded-lg"
                src={project.icon} 
                alt={project.company || project.authors} 
                onError={(e) => {e.target.src = '/assets/default-company.png'}} 
              />
            </div>
            <span className="text-gray-400">{project.company || project.authors}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
            <span>{project.date}</span>
            {project.location && (
              <>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                <span>{project.location}</span>
              </>
            )}
            {project.course && (
              <>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                <span>{project.course}</span>
              </>
            )}
          </div>
          
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {project.links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`rounded-md px-3 py-1 text-xs flex items-center gap-2 ${
                    link.type === 'orange' ? 'bg-amber-900 text-amber-200' : 
                    link.type === 'red' ? 'bg-red-900 text-red-200' : 
                    link.type === 'blue' ? 'bg-blue-900 text-blue-200' : 
                    'bg-gray-800 text-gray-200'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeProjectType, setActiveProjectType] = useState('Industry');
  const projectTypes = ['Industry', 'Research', 'Publications', 'Course'];
  
  // Get the appropriate projects array based on the active project type
  const getProjectsByType = (type) => {
    switch(type) {
      case 'Industry':
        return industryProjects;
      case 'Research':
        return researchProjects;
      case 'Publications':
        return publications;
      case 'Course':
        return courseProjects;
      default:
        return industryProjects;
    }
  };
  
  const filteredProjects = getProjectsByType(activeProjectType);
  
  return (
    <section className="w-full min-h-screen py-16 px-6 md:px-16" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my professional projects showcasing my experience in AI, 
            machine learning, computer vision, and autonomous systems.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveProjectType(type)}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeProjectType === type 
                    ? 'bg-white text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;