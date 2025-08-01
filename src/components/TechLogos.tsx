import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TechLogo {
  name: string;
  url: string;
}

const TechLogos: React.FC = () => {
  const techLogos1: TechLogo[] = [
    { name: "MongoDB", url: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
    { name: "Flask", url: "https://cdn.worldvectorlogo.com/logos/flask.svg" },
    { name: "Flutter", url: "https://cdn.worldvectorlogo.com/logos/flutter.svg" },
    { name: "Python", url: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
    { name: "React", url: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "JavaScript", url: "https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" },
    { name: "TypeScript", url: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
    { name: "Node.js", url: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
    {name:"Sqlite", url:"https://cdn.worldvectorlogo.com/logos/sqlite.svg"}
  ];

  const techLogos2: TechLogo[] = [
    { name:"Supabase", url:"/image.svg"},
    { name: "MySQL", url: "https://cdn.worldvectorlogo.com/logos/mysql-2.svg" },
    { name: "Firebase", url: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg" },
    { name: "Git", url: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" },
    { name: "HTML5", url: "https://cdn.worldvectorlogo.com/logos/html-1.svg" },
    { name: "CSS3", url: "https://cdn.worldvectorlogo.com/logos/css-3.svg" },
    { name: "Tailwind CSS", url: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" },
    { name: "Docker", url: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
    { name: "GitHub", url: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" },
  ];

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [pauseRow1, setPauseRow1] = React.useState(false);
  const [pauseRow2, setPauseRow2] = React.useState(false);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
  
    if (!row1 || !row2) return;
  
    let row1X = 0;
    let row2X = 0;
  
    const baseSpeed = 50; // pixels per second (slow and smooth)
  
    const singleLoopWidth1 = row1.scrollWidth / 4;
    const singleLoopWidth2 = row2.scrollWidth / 4;
  
    let lastTimestamp = performance.now();
  
    const animate = (timestamp: number) => {
      const delta = (timestamp - lastTimestamp) / 1000; // time in seconds
      lastTimestamp = timestamp;
  
      const distance = baseSpeed * delta;
  
      if (!pauseRow1) {
        row1X -= distance;
        if (Math.abs(row1X) >= singleLoopWidth1) {
          row1X = 0;
        }
        row1.style.transform = `translateX(${row1X}px)`;
      }
  
      if (!pauseRow2) {
        row2X += distance;
        if (row2X >= singleLoopWidth2) {
          row2X = 0;
        }
        row2.style.transform = `translateX(${row2X}px)`;
      }
  
      requestAnimationFrame(animate);
    };
  
    const animationId = requestAnimationFrame(animate);
  
    return () => cancelAnimationFrame(animationId);
  }, [pauseRow1, pauseRow2]);
  
  
  
  

  const quadLogos1 = [...techLogos1, ...techLogos1, ...techLogos1, ...techLogos1];
  const quadLogos2 = [...techLogos2, ...techLogos2, ...techLogos2, ...techLogos2];

  return (
    <div className="py-16 relative overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-12 text-center text-red-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technologies I Work With
        </motion.h2>
      </div>
      
      <div className="relative mb-8 overflow-hidden">
        <div 
          ref={row1Ref}
          className="flex space-x-12"
          style={{ width: '400%' }}
          onMouseEnter={() => setPauseRow1(true)}
          onMouseLeave={() => setPauseRow1(false)}
        >
          {quadLogos1.map((   logo, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 py-4 px-6 bg-gray-900/50 backdrop-blur-sm rounded-lg min-w-[120px] h-20 flex items-center justify-center transition-all duration-300 hover:bg-gray-800/80 border border-gray-800/50 hover:border-gray-700"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-12 w-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                title={logo.name}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative mb-8 overflow-hidden">
      <div 
  ref={row2Ref}
  className="flex space-x-12"
  style={{ width: '400%' }}
  onMouseEnter={() => setPauseRow2(true)}
  onMouseLeave={() => setPauseRow2(false)}
>

  {quadLogos2.map((logo, index) => (
    <div
      key={`row2-${index}`}
      className="flex-shrink-0 py-4 px-6 bg-gray-900/50 backdrop-blur-sm rounded-lg min-w-[120px] h-20 flex items-center justify-center transition-all duration-300 hover:bg-gray-800/80 border border-gray-800/50 hover:border-gray-700"
    >
      <img 
        src={logo.url} 
        alt={logo.name} 
        className="h-12 w-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
        title={logo.name}
      />
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default TechLogos;