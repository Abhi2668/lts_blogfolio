import Image from "next/image";
import Link from "next/link";
import { FaGraduationCap, FaBriefcase, FaCode, FaAward, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineCode } from "react-icons/hi";

export default function AboutPage() {
  const experiences = [
    {
      title: "Site Reliability Engineer Intern",
      company: "Flock Safety",
      location: "Atlanta, GA",
      period: "June 2024 - August 2024",
      description: "Enhanced system reliability and monitoring infrastructure for public safety technology platform serving 5000+ communities.",
      achievements: [
        "Improved system monitoring and alerting capabilities",
        "Contributed to infrastructure automation and reliability improvements",
        "Worked with cloud technologies and DevOps practices"
      ]
    },
    {
      title: "Undergraduate Teaching Assistant",
      company: "Georgia Institute of Technology",
      location: "Atlanta, GA", 
      period: "August 2023 - December 2023",
      description: "Teaching assistant for CS 1332 - Data Structures and Algorithms, helping students master fundamental computer science concepts.",
      achievements: [
        "Assisted 200+ students with data structures and algorithms concepts",
        "Led recitation sessions and provided code review feedback",
        "Mentored students in problem-solving and debugging techniques"
      ]
    },
    {
      title: "Software Engineering Intern",
      company: "Flock Safety",
      location: "Atlanta, GA",
      period: "May 2023 - August 2023",
      description: "Developed and maintained software solutions for public safety technology platform.",
      achievements: [
        "Built scalable web applications using modern technologies",
        "Collaborated with cross-functional teams on feature development",
        "Contributed to code quality and testing best practices"
      ]
    }
  ];

  const skills = {
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "C", "SQL", "HTML/CSS"],
    "Frameworks & Libraries": ["React", "Node.js", "Next.js", "Express.js", "Django", "Flask"],
    "Tools & Technologies": ["Git", "Docker", "AWS", "GCP", "Jenkins", "REST APIs", "GraphQL"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    "Other": ["Machine Learning", "Data Visualization", "System Design", "Agile Methodologies"]
  };

  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "Built a modern, responsive portfolio website using Next.js and Tailwind CSS with integrated blog functionality.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"]
    },
    {
      title: "Data Visualization Dashboard",
      description: "Created interactive data visualization tools for analyzing complex datasets with real-time updates.",
      tech: ["React", "D3.js", "Python", "FastAPI"]
    },
    {
      title: "Machine Learning Projects",
      description: "Developed various ML models for classification and prediction tasks using scikit-learn and TensorFlow.",
      tech: ["Python", "TensorFlow", "scikit-learn", "Pandas"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="relative group mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-[#d8c4a6] bg-[#f4efe7] transition-transform duration-300 group-hover:scale-105 mx-auto">
              <Image
                src="/IMG_1184.JPG"
                alt="Abhinav Vinod"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#3e3e2d] bg-gradient-to-r from-[#3e3e2d] to-[#6b8e4e] bg-clip-text text-transparent">
            About Me
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-[#5c5c4a] leading-relaxed">
            <p>
              I'm Abhinav Vinod, a Master's student in Computer Science at Georgia Tech with a passion for 
              building reliable, scalable systems and creating meaningful user experiences. Currently pursuing 
              my MSCS with a focus on Computing Systems, I love tackling complex technical challenges and 
              turning ideas into reality.
            </p>
            <p>
              With experience as a Site Reliability Engineer at Flock Safety and a strong foundation in 
              full-stack development, I'm passionate about the intersection of software engineering, 
              data visualization, and system reliability. I enjoy working on projects that make a 
              positive impact on people's lives.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#5c5c4a]">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#6b8e4e]" />
              <span>Atlanta, GA</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#6b8e4e]" />
              <a href="mailto:vinodabhinav54@gmail.com" className="hover:text-[#6b8e4e] transition-colors">
                vinodabhinav54@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-[#6b8e4e]" />
              <a href="https://linkedin.com/in/avinod34" target="_blank" className="hover:text-[#6b8e4e] transition-colors">
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaGithub className="text-[#6b8e4e]" />
              <a href="https://github.com/Abhi2668" target="_blank" className="hover:text-[#6b8e4e] transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-[#f4efe7]/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <HiOutlineAcademicCap className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Education</h2>
            <p className="text-[#5c5c4a] text-lg">My academic journey at Georgia Tech</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#3e3e2d] mb-2">Master of Science in Computer Science</h3>
                  <p className="text-[#6b8e4e] font-semibold mb-1">Georgia Institute of Technology, Atlanta, GA</p>
                  <p className="text-[#5c5c4a] text-sm">Specialization: Computing Systems</p>
                </div>
                <div className="bg-[#eaf1e5] px-4 py-2 rounded-full">
                  <span className="text-[#6b8e4e] font-semibold">Expected 2025</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#3e3e2d] mb-2">Bachelor of Science in Computer Science</h3>
                  <p className="text-[#6b8e4e] font-semibold mb-1">Georgia Institute of Technology, Atlanta, GA</p>
                  <p className="text-[#5c5c4a] text-sm">Concentration: Artificial Intelligence and Computer Media</p>
                </div>
                <div className="bg-[#eaf1e5] px-4 py-2 rounded-full">
                  <span className="text-[#6b8e4e] font-semibold">2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <FaBriefcase className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Experience</h2>
            <p className="text-[#5c5c4a] text-lg">My professional journey</p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-[#f4efe7] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]">
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#3e3e2d] mb-1">{exp.title}</h3>
                      <p className="text-[#6b8e4e] font-semibold">{exp.company}</p>
                      <p className="text-[#5c5c4a] text-sm">{exp.location}</p>
                    </div>
                    <div className="bg-[#eaf1e5] px-4 py-2 rounded-full">
                      <span className="text-[#6b8e4e] font-semibold text-sm">{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-[#5c5c4a] mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#5c5c4a]">
                        <div className="w-2 h-2 bg-[#6b8e4e] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-[#f4efe7]/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <FaCode className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Skills & Technologies</h2>
            <p className="text-[#5c5c4a] text-lg">Technologies I work with</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]">
                <h3 className="text-lg font-bold text-[#3e3e2d] mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#eaf1e5] text-[#6b8e4e] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#6b8e4e] hover:text-white transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <HiOutlineCode className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Featured Projects</h2>
            <p className="text-[#5c5c4a] text-lg">Some things I've built</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-[#f4efe7] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]">
                <h3 className="text-lg font-bold text-[#3e3e2d] mb-3">{project.title}</h3>
                <p className="text-[#5c5c4a] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-[#eaf1e5] text-[#6b8e4e] px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-[#6b8e4e] text-white rounded-full font-medium hover:bg-[#5c7f42] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <HiOutlineCode className="mr-2" />
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6b8e4e] to-[#5c7f42] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Connect!</h2>
          <p className="text-lg mb-8 opacity-90">
            I'm always interested in new opportunities and interesting projects. Let's chat!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:vinodabhinav54@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-white text-[#6b8e4e] rounded-full font-semibold hover:bg-[#f4efe7] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaEnvelope className="mr-2" />
              Get In Touch
            </a>
            <a
              href="/Abhinav_Vinod_Resume.pdf"
              download
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#6b8e4e] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaAward className="mr-2" />
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}