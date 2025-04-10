export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 3,
    name: 'Media',
    href: '#media',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    position: 'Marketing Director at GreenLeaf',
    img: 'assets/review1.png',
    review:
      'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
  },
  {
    id: 2,
    name: 'Mark Rogers',
    position: 'Founder of TechGear Shop',
    img: 'assets/review2.png',
    review:
      'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
  },
  {
    id: 3,
    name: 'John Dohsas',
    position: 'Project Manager at UrbanTech ',
    img: 'assets/review3.png',
    review:
      'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
  },
  {
    id: 4,
    name: 'Ether Smith',
    position: 'CEO of BrightStar Enterprises',
    img: 'assets/review4.png',
    review:
      'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Smith & Associates, L.P.',
    pos: 'Software Engineer',
    duration: 'Jun 2024 – Apr 2025',
    title:
      'Led development of an AI-powered legal chatbot for 100+ traders, integrating real-time web data, internal APIs, and a large-scale document knowledge base to reduce legal response times from 24 hours to under 1 minute. Built a document ingestion and semantic search pipeline using Azure Search and GraphAPI.',
    icon: '/assets/smith.jpeg',
    animation: 'lightning',
  },
  {
    id: 2,
    name: 'General Motors',
    pos: 'Machine Learning Engineer',
    duration: 'Jan 2024 – May 2024',
    title:
      'Analyzed EV infrastructure usage data across California to identify bottlenecks and reduce user frustration. Built a personalized charging station recommendation engine with LSTM-based predictions and behavioral heuristics, achieving an 84% hit rate in top-5 results.',
    icon: '/assets/gm.jpeg',
    animation: 'gear',
  },
  {
    id: 3,
    name: 'AI Racing Tech',
    pos: 'Software Engineer',
    duration: 'Aug 2023 – May 2024',
    title:
      'Engineered real-time LiDAR and camera+IMU sensor fusion for autonomous driving in CARLA simulation. Implemented A* motion planning and parallelized scenario testing, cutting lap times by 3% and reducing collisions by 5%.',
    icon: '/assets/airacingtech.jpeg',
    animation: 'speed',
  },
  {
    id: 4,
    name: 'Advanced Center for Aerospace Technologies',
    pos: 'Computer Vision Engineer',
    duration: 'Feb 2022 – Feb 2023',
    title:
      'Developed aerial object detection systems for UAVs using HAPS-based photogrammetry. Improved onboard inference performance and aerial safety through model optimization and system integration.',
    icon: '/assets/catec.jpeg',
    animation: 'vision',
  },
];

export const industryProjects = [
  {
    title: "Agentic AI Legal Dashboard and Multi-Agent Chatbot for Trader Support and Market Intelligence",
    company: "Smith & Associates, L.P.",
    date: "June 2024 – April 2025",
    location: "Houston, TX, USA",
    image: "assets/chatbot.png", 
    icon: "/assets/smith.jpeg", 
    links: []
  },
  {
    title: "Personalized EV Charging Recommendation System with LSTM-Based Wait-Time Prediction",
    company: "General Motors",
    date: "January 2024 - May 2024",
    location: "Berkeley, California",
    image: "assets/gm.png",
    icon: "/assets/gm.jpeg",
    links: []
  },
  {
    title: "Development of Autonomous GoKart including Perception, Planning, and Control through AI",
    company: "AI Racing Tech - ROAR: Robot Open Autonomous Racing",
    date: "August 2023 - May 2024",
    location: "Berkeley, California",
    image: "assets/gokart.jpg",
    icon: "/assets/airacingtech.jpeg",
    links: []
  },
  {
    title: "End-to-End Self-Driving with Behavioral Cloning in CARLA Simulator",
    company: "AI Racing Tech - ROAR: Robot Open Autonomous Racing",
    date: "January 2024 - May 2024",
    location: "Berkeley, California",
    image: "assets/behcloning2.jpeg",
    icon: "/assets/airacingtech.jpeg",
    links: [
      { label: "Paper", url: "files/ME292B.pdf", type: "orange" }
    ]
  }
];

export const researchProjects = [
  {
    title: "Enhancing LLM training optimization algorithms through the application of generalization metrics and correlational analysis",
    company: "Sky Computing Lab. University of California, Berkeley",
    date: "August 2023 - December 2023",
    location: "Berkeley, California",
    image: "assets/llm.png",
    icon: "/assets/berkeley.png",
    links: []
  },
  {
    title: "Autonomous Unmanned Aerial Vehicle System: Drone for Autonomous Drone Racing Competition.",
    authors: "Francisco Ramos Pérez et al.",
    role: "Project Manager (12 team members)",
    date: "September 2022 - June 2023",
    location: "Madrid, Spain",
    image: "assets/droning.png",
    icon: "/assets/madrid.png",
    links: []
  },
  {
    title: "Charge demand and renewable generation forecasting with Deep Learning: application to electric vehicle station optimization",
    authors: "Francisco Ramos Pérez, Francisco Rodríguez Rubio, and Carlos Vivas Venegas",
    date: "September 2021 - July 2022",
    location: "Seville, Spain",
    image: "assets/real_time.gif",
    icon: "/assets/sevilla.png",
    links: [
      { label: "Code", url: "https://github.com/curroramos/EV_Charging_Load_Prediction", type: "red" },
      { label: "Text", url: "files/TFG.pdf", type: "orange" }
    ]
  },
  {
    title: "Utilized High Altitude Platform Station (HAPS) and Computer Vision techniques to apply photogrammetry for crop monitoring, enhancing crop management efficiency and analysis accuracy",
    authors: "HIBA: Hub Iberia Agrotech",
    date: "February 2022 - April 2022",
    location: "Seville, Spain",
    image: "assets/crop2.png",
    icon: "/assets/catec.jpeg",
    links: []
  },
  {
    title: "Implementation and training of anomaly detection algorithms for road inspections using images acquired by drones.",
    authors: "Omicron - Intelligent Road Asset Management Platform",
    date: "May 2022 - June 2022",
    location: "Seville, Spain",
    image: "assets/crack.jpg",
    icon: "/assets/catec.jpeg",
    links: []
  }
];

export const publications = [
  {
    title: "Charge demand and renewable generation forecasting with Deep Learning: application to electric vehicle station optimization",
    authors: "Francisco Ramos-Pérez, Francisco Rodríguez Rubio, and Carlos Vivas Venegas",
    date: "September 2021 - July 2022",
    image: "assets/eV_pred.png",
    icon: "/assets/sevilla.png",
    links: [
      { label: "Paper", url: "https://doi.org/10.17979/spudc.9788497498609.346", type: "orange" },
      { label: "Poster", url: "https://github.com/curroramos/curroramos.github.io/blob/main/files/Poster_JJAA2022-2.pdf", type: "blue" }
    ]
  },
  {
    title: "Benchmark on real-time long-range aircraft detection for safe RPAS operations",
    authors: "Víctor Alarcón, Pablo Santana, Francisco Ramos, Francisco Javier Pérez-Grau, Antidio Viguria, and Aníbal Ollero",
    date: "February 2022 - November 2022",
    image: "assets/plane.png",
    icon: "/assets/catec.jpeg",
    links: [
      { label: "Paper", url: "https://link.springer.com/chapter/10.1007/978-3-031-21062-4_28", type: "orange" }
    ]
  },
  {
    title: "Optimized Operation of an Electric Vehicle Charging Station with Photovoltaic Support and Vehicle-to-Grid Implementation",
    authors: "Carlos Vivas, Francisco R. Rubio, Antonia López, and Francisco Ramos",
    date: "September 2021 - July 2022",
    image: "assets/EV_station.png",
    icon: "/assets/sevilla.png",
    links: [
      { label: "Paper", url: "https://link.springer.com/chapter/10.1007/978-3-031-10047-5_62", type: "orange" }
    ]
  }
];

export const courseProjects = [
  {
    title: "Neural Machine Translation System with baseline encoder-decoder architecture and attention mechanism.",
    authors: "Francisco Ramos",
    course: "CS288: Natural Language Processing. University of California, Berkeley",
    image: "assets/attention.jpeg",
    icon: "/assets/berkeley.png",
    links: []
  },
  {
    title: "Fine tuning LLMs to perform text-to-SQL task using transformers.",
    authors: "Francisco Ramos",
    course: "CS288: Natural Language Processing. University of California, Berkeley",
    image: "assets/text2sql.png",
    icon: "/assets/berkeley.png",
    links: []
  }
];

export const personalProjects = [
  {
    title: "Pan & Tilt servo system autonomously controlled using Facial, Hand and Color Detection",
    authors: "Francisco Ramos Pérez, Carlos Álvarez Cia",
    date: "December 2021",
    image: "assets/pan_tilt.png",
    links: [
      { label: "Code", url: "https://github.com/curroramos/pan-tilt_ai", type: "red" }
    ]
  }
];

export const relevantCourses = [
  {
    name: "CS288: Natural Language Processing",
    institution: "EECS - UC Berkeley Fall '23"
  },
  {
    name: "CS198: Deep Learning for Visual Data",
    institution: "EECS - UC Berkeley Fall '23"
  },
  {
    name: "ME249: Machine Learning Tools for Modeling Energy Transport and Conversion Processes",
    institution: "ME - UC Berkeley Fall '23"
  },
  {
    name: "ME236: Control of Unmanned Aerial Vehicles",
    institution: "ME - UC Berkeley Fall '23"
  },
  {
    name: "ME292B: Artificial Intelligence for Autonomy",
    institution: "ME - UC Berkeley Spring '24"
  },
  {
    name: "Experiential Advanced Control Design",
    institution: "ME236 - UC Berkeley '24"
  }
];