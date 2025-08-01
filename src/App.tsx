import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, User, Download, ChevronRight, ChevronLeft, Award, Building2 } from 'lucide-react';
import TechLogos from './components/TechLogos';
import { Typed } from "/home/theseus/Portfolio/node_modules/react-typed/dist/mjs/index"

function App() {
  const certificatesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const typedRef = useRef(null);
  const typedInstance = useRef<Typed | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  useEffect(() => {
    if (typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [
          "Akash",
          "Full Stack Developer",
          "API Builder",
          "Certified Ethical Hacker"
        ],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
      });
    }
  
    return () => {
      typedInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (certificatesRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = certificatesRef.current;
        
        // Check if we've reached the end or start
        if (scrollDirection === 'right' && scrollLeft + clientWidth >= scrollWidth) {
          setScrollDirection('left');
        } else if (scrollDirection === 'left' && scrollLeft <= 0) {
          setScrollDirection('right');
        }

        scroll(certificatesRef, scrollDirection);
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, scrollDirection]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const form = e.currentTarget;
  
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Message sent successfully!");
          form.reset(); // Reset the form fields
        } else {
          alert("Failed to send message. Please try again."); // Display error message
        }
      })
      .catch(() => alert("An error occurred. Please try again.")); // Handle network errors
  };
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const certificates = [
    {
      title: "Certified Ethical Hacker",
      issuer: "Ec-Council",
      date: "2024-2027",
      image: "/certs/CEH.png",
      link: "https://drive.google.com/file/d/1hB3kUw1XWhaaAbaeVSJW2XhdqJ3lHrTG/view?usp=sharing"
    },

    {
      title: "Learn Hacking Using Android From Scratch",
      issuer: "Udemy",
      date: "2024",
      image: "/certs/androidhacking.png",
      link: "https://drive.google.com/file/d/1hB3kUw1XWhaaAbaeVSJW2XhdqJ3lHrTG/view?usp=sharing"
    },
    {
      title: "Complete SQL & Relational Database Management System",
      issuer: "Udemy",
      date: "2024",
      image: "/certs/dbms.png",
      link: "https://drive.google.com/file/d/1hB3kUw1XWhaaAbaeVSJW2XhdqJ3lHrTG/view?usp=sharing"
    },

    {
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      date: "2025",
      image: "/certs/postman.png",
      link: "https://drive.google.com/file/d/1-nkor-70kFai7SEWpRq5F-wE9ZZO29nO/view?usp=sharing"
    },
    {
      title: "Python3 Certification",
      issuer: "CodinGame",
      date: "2025",
      image: "/certs/codingame.png",
      link: "https://drive.google.com/file/d/1AntSLHA_t4ODlQXSKuMRWOBq70JUCCcJ/view?usp=sharing"
    },
    {
      title: "Python (Basic)",
      issuer: "HackerRank",
      date: "2025",
      image: "/certs/PyBasic.png",
      link: "https://www.hackerrank.com/certificates/49a7526c9e0f"
    },
    {
      title: "Rest API (Intermediate)",
      issuer: "HackerRank",
      date: "2025",
      image: "/certs/RESTAPI.png",
      link: "https://www.hackerrank.com/certificates/d01ae16105b3"
    },
    {
      title: "C# (Basic)",
      issuer: "HackerRank",
      date: "2025",
      image: "/certs/Csharp.png",
      link: "https://www.hackerrank.com/certificates/211cbb185738"
    },
    {
      title: "Problem Solving (Basic)",
      issuer: "HackerRank",
      date: "2025",
      image: "/certs/PSbasic.png",
      link: "https://www.hackerrank.com/certificates/2ef53b769dd2"
    },
    {
      title: "SQL (Basic)",
      issuer: "HackerRank",
      date: "2025",
      image: "/certs/SQLBasic.png",
      link: "https://www.hackerrank.com/certificates/7bbbf36ce744"
    },
    {
      title: "Software Engineer",
      issuer: "HackerRank",
      date: "2025",
      image: "/certs/SE.png",
      link: "https://www.hackerrank.com/certificates/0f3f7b4df252"
    },
    {
      title: "Software Engineer Intern",
      issuer: "HackerRank",
      date: "2025",
      image: "/certs/SE-intern.png",
      link: "https://www.hackerrank.com/certificates/79808e1024e8"
    }
  ];
  

  const projects = [
    {
      title: "Protobase",
      description: "A beginner-friendly backend alternative to Firebase/Supabase with simple APIs and auth.",
      image: "/projects/protobase.png",
      tech: ["Python", "Sql", "RESTapi", "Flask"],
      link: "https://protobase.pythonanywhere.com"
    },
    {
      title: "AnarchKey",
      description: "Secure API key management system with encryption and developer-friendly access.",
      image: "/projects/anarchkey.png",
      tech: ["HTML", "Crypto", "Flask"],
      link: "https://anarchkey.pythonanywhere.com"
    },
    {
      title: "ScrapeNest",
      description: "A web scraping API service to extract structured data from websites.",
      image: "/projects/scrapenest.png",
      tech: ["Python", "Flask", "BeautifulSoup"],
      link: "https://scrapenest.pythonanywhere.com"
    },
    {
      title: "Protobase Flutter Client",
      description: "Flutter client SDK for Protobase to easily integrate auth and database functions.",
      image: "/projects/protobasefclient.png",
      tech: ["Flutter", "Dart"],
      link: "https://pub.dev/packages/proto_base_client"
    },
    {
      title: "Protobase Python Client - PyPi Package",
      description: "Python client for integrating Protobase with Python web apps and more.",
      image: "/projects/protobasepclient.png",
      tech: ["Python", "Twio", "ProtoBase", "RESTapi"],
      link: "https://pypi.org/project/protobase-client/"
    },
    {
      title: "URL Masker",
      description: "A Flask app to mask and beautify long or suspicious-looking URLs.",
      image: "/projects/urlmask.png",
      tech: ["Python", "Flask"],
      link: "https://maskurl.pythonanywhere.com"
    },
    {
      title: "SRM Attendance Tracker API",
      description: "API for managing student attendance in real-time using CRUD operations.",
      image: "/projects/srmcrud.png",
      tech: ["Python", "Flask"],
      link: "https://github.com/AkiTheMemeGod/attendanceapiCRUD"
    },
    {
      title: "SRM Attendance Tracker Mobile APP",
      description: "A personal tool to track SRM university attendance and notify absences.",
      image: "./projects/srmapiapp.png",
      tech: ["Flutter", "Dart"],
      link: "https://github.com/AkiTheMemeGod/SRM-Attendance-Tracker"
    },
    {
      title: "SpendIt - Expense Tracker",
      description: "A budget tracking and expense management app to help manage finances.",
      image: "/projects/spendit.png",
      tech: ["Sqlite", "Streamlit", "Python"],
      link: "https://spend-it.streamlit.app",
    },
    {
      title: "VaultBot Discord",
      description: "A Discord bot to securely store notes, secrets, and commands.",
      image: "/projects/vaultbot.png",
      tech: ["Python", "Discord.py"],
      link: "https://github.com/AkiTheMemeGod/Vault-Bot-discord"
    },
    {
      title: "CarryMyNotes",
      description: "A simple app for managing and sharing study notes between students.",
      image: "/projects/carrymynotes.png",
      tech: ["Streamlit", "Sqlite"],
      link: "https://carrymynotes.streamlit.app"
    },
    {
      title: "Dot-Dash Encryption",
      description: "A CLI tool for advanced text and file encryption using custom dot (.) and (-) encryption.",
      image: "/projects/enc_dec.png",
      tech: ["Python", "Cryptography"],
      link: "https://github.com/AkiTheMemeGod/Cryptography_enc_decrypt"
    },
    {
      title: "Python Ransomware",
      description: "A research tool demonstrating how ransomware can be simulated for educational purposes.",
      image: "/projects/pyransomware.png",
      tech: ["Python"],
      link: "https://github.com/AkiTheMemeGod/Python_ransomware"
    },
    {
      title: "Password Checker 2.0",
      description: "A tool to verify password strength and to securely store and manage them",
      image: "/projects/passwordschecker.png",
      tech: ["Python", "API"],
      link: "https://github.com/AkiTheMemeGod/Password_Checker-v2.0"
    },
    {
      title: "BitBot",
      description: "A multipurpose Discord bot with utilities, tech tools, and fun features.",
      image: "/projects/bitbot.png",
      tech: ["Python", "Discord.py"],
      link: "https://github.com/AkiTheMemeGod/BitBot"
    },
    {
      title: "SendFiles API",
      description: "API to securely upload and send files with temporary links.",
      image: "/projects/sendfiles.png",
      tech: ["Python", "Streamlit"],
      link: "https://sendfiles.streamlit.app"
    },
    {
      title: "QuickTalk",
      description: "A real-time chat app built with Flutter and Supabase, supporting replies and notifications.",
      image: "/projects/quicktalk.png",
      tech: ["Flutter", "Supabase", "WebSocket"],
      link: "https://github.com/AkiTheMemeGod/QuickTalk"
    },
    {
      title: "SkyCast",
      description: "A weather forecasting app providing real-time climate updates by location.",
      image: "/projects/skycast.webp",
      tech: ["Flutter", "REST API"],
      link: "https://github.com/AkiTheMemeGod/SkyCast"
    }
  ];
  

  const experience = [
    {
      company: "Checkpoint Systems",
      position: "Project Intern",
      period: "2025 Feb - Present",
      description: "Working on a developing an API that interacts with the production database.",
      tech: ["Python3", "MongoDB", "Flask", "HTML/CSS"],
      link: "https://checkpointsystems.com/"
    },
    {
      company: "ProtoBase",
      position: "Owner - Creator",
      period: "2024 Dec - Present",
      description: "Alternate to Firebase/Supabase that handles cloud authentication into less lines of code simplifying developer experience.",
      tech: ["Flask", "MySql", "Node.js", "HTML/CSS", "SwaggerUI", "RESTapi"],
      link: "https://protobase.pythonanywhere.com/"

    },
    {
      company: "AnarchKey",
      position: "Owner - Creator",
      period: "2025 April - Present",
      description: "Secure Cloud Api-key manager to prevent api-key leaks.",
      tech: ["Python3", "MongoDB", "MySQL", "Flask", "RESTapi"],
      link: "https://anarchkey.pythonanywhere.com/"

    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header/Navigation */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Akash's Portfolio
            </motion.span>
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-300 hover:text-red-500 transition-colors">About</a>
              <a href="#experience" className="text-gray-300 hover:text-red-500 transition-colors">Experience</a>
              <a href="#projects" className="text-gray-300 hover:text-red-500 transition-colors">Projects</a>
              <a href="#certificates" className="text-gray-300 hover:text-red-500 transition-colors">Certificates</a>
              <a href="#contact" className="text-gray-300 hover:text-red-500 transition-colors">Contact</a>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#about" className="text-gray-300 hover:text-red-500 transition-colors">About</a>
              <a href="#experience" className="text-gray-300 hover:text-red-500 transition-colors">Experience</a>
              <a href="#projects" className="text-gray-300 hover:text-red-500 transition-colors">Projects</a>
              <a href="#certificates" className="text-gray-300 hover:text-red-500 transition-colors">Certificates</a>
              <a href="#contact" className="text-gray-300 hover:text-red-500 transition-colors">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          <span ref={typedRef}></span>
        </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              I build secure, high-impact apps that merge clean design with real-world functionality — from intuitive UIs to hacker-proof backends.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/AkiTheMemeGod" className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/akash-k19052022" className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:k.akashkumar@gmail.com" className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-black px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-500">About Me</h2>
              <p className="text-gray-400 mb-4">
                I'm Akash — a full-stack Python & Flutter developer and CEH-certified ethical hacker. Currently pursuing Cybersecurity at SRM University, I focus on building secure, scalable, and developer-friendly tools.
              </p>
              <div className="flex space-x-4 mt-6">
                <a
                  href="/resume.pdf"
                  download="Akash_Resume.pdf"
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download size={20} />
                  Resume
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                <Code2 className="text-red-500 mb-4" size={32} />
                <h3 className="font-semibold mb-2 text-gray-100">Frontend</h3>
                <p className="text-gray-400 text-sm">Flutter, HTML/CSS, React, Streamlit</p>
              </div>
              <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                <Briefcase className="text-red-500 mb-4" size={32} />
                <h3 className="font-semibold mb-2 text-gray-100">Backend</h3>
                <p className="text-gray-400 text-sm">MongoDB, Python, MySql, C/C++, Flask, RESTapi, Dart/Flutter</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Logos Section - Added after About section */}
      <TechLogos />

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-black px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-red-500">Work Experience</h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.a
                  key={index}
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900 p-6 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-red-500">{job.position}</h3>
                      <p className="text-gray-400 mt-1 flex items-center gap-2">
                        <Building2 size={16} />
                        {job.company}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">{job.period}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mt-4">{job.description}</p>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {job.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-black px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-red-500">Featured Projects</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(projectsRef, 'left')}
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll(projectsRef, 'right')}
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div 
              ref={projectsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 min-w-[300px] sm:min-w-[350px]"
                  whileHover={{ y: -5 }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-40 sm:h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg sm:text-xl mb-2 text-gray-100">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="inline-flex items-center text-red-500 hover:text-red-400"
                    >
                      View Project <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-16 bg-black px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-red-500">Certificates</h2>
            <div
              ref={certificatesRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {certificates.map((certificate, index) => (
                <motion.a
                  key={index}
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 min-w-[300px] sm:min-w-[350px] hover:bg-gray-800 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-6">
                      <h3 className="font-semibold text-lg sm:text-xl mb-2 text-white">
                      {certificate.title}
                    </h3>
                    <p className="text-red-500 mb-2">{certificate.issuer}</p>
                    <p className="text-gray-400 text-sm">{certificate.date}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-red-500">Get In Touch</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-xl border border-gray-700">
              <form
                action="https://formspree.io/f/xblgnjpy"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-gray-100"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-gray-100"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Akash K. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;