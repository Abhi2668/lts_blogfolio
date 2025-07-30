import Image from "next/image";
import Link from "next/link";
import { FaGraduationCap, FaBriefcase, FaCode, FaAward, FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub, FaPhone } from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineCode, HiOutlineChartBar } from "react-icons/hi";

export default function AboutPage() {
  const experiences = [
    {
      title: "Site Reliability Engineer Intern",
      company: "Flock Safety",
      location: "Atlanta, GA",
      period: "May 2025 – Present",
      description: "Enhanced system reliability and monitoring infrastructure for public safety technology platform serving 5000+ communities.",
      achievements: [
        "Maintained Grafana dashboards and pipelines, improving system visibility and reducing incident detection time by 45%",
        "Streamlined CI/CD workflows using Jenkins, Terraform, and GitHub Actions boosting deployment success rate by 25%",
        "Integrated Gemini Code Assist with private Gerrit VPC to allow indexing for improved code development, by up to 50%"
      ]
    },
    {
      title: "Graduate Teaching Assistant",
      company: "Georgia Institute of Technology",
      location: "Atlanta, GA",
      period: "August 2024 – Present",
      description: "Supporting student learning in data visualization technologies and theory for 170+ students.",
      achievements: [
        "Assisted 170 students with visualization technologies and theory, emphasizing the use of Tableau, Datawrapper, and D3.js",
        "Spearheaded 15 recitations, graded and organized 10+ assignments, projects, and activities for 25+ students using Javascript",
        "Supported learning of Javascript to enhance understanding of visualization principles achieving a class total GPA of 3.45"
      ]
    },
    {
      title: "Software Development Intern",
      company: "Corpay, Inc",
      location: "Atlanta, GA",
      period: "June 2024 – August 2024",
      description: "Developed containerized solutions and database integrations for enterprise-scale financial technology systems.",
      achievements: [
        "Implemented a 3-container approach integrating React.js and Adobe ColdFusion enabling rapid transitional development",
        "Engineered an integration of MS SQL databases with Docker containers for a team of 200+ engineers enabling transition",
        "Innovated an application using Podman to conduct service containerization reducing software developer startup time by 40%"
      ]
    },
    {
      title: "Software Development Intern",
      company: "Wabtec Corporation",
      location: "Atlanta, GA",
      period: "May 2023 – August 2023",
      description: "Built calibration and maintenance solutions for railway systems across 50+ locations and 23,000+ locomotives.",
      achievements: [
        "Developed a Calibration Module using wxWidgets that increased calibration efficiency by 100% for maintenance staff",
        "Engineered C++ frameworks that integrate with existing backends via CMake, streamlining maintenance operations by 30%",
        "Designed a scalable solution for maintenance across 50+ locations and 23,000+ locomotives ensuring system integration"
      ]
    }
  ];

  const skills = {
    "Programming Languages": ["Python (Numpy, Pandas, TensorFlow, PyTorch)", "Java", "C#", "C++", "Javascript", "Typescript", "SQL", "HTML"],
    "Frontend Technologies": ["React.js", "Vue.js", "Next.js", "Nuxt.js", "Angular", "D3.js", "Leaflet.js"],
    "Backend & Databases": ["Node.js", "Adobe ColdFusion", ".NET", "MS SQL", "MySQL", "REST API"],
    "DevOps & Cloud": ["Docker", "Podman", "CI/CD", "Jenkins", "Terraform", "GitHub Actions", "Azure", "GCP", "UNIX"],
    "Data & Visualization": ["Tableau", "Datawrapper", "D3.js", "Scikit-learn", "Statistical Analysis"],
    "Development Tools": ["Visual Studio", "wxWidgets", "Postman", "JSON", "CMake", "Grafana", "Gerrit"],
    "Mobile & Game Dev": ["Swift", "Unity", "Unity 3D"],
    "Mathematics": ["Statistics", "Linear Algebra", "Number Theory", "Probability Theory", "Graph Theory"],
    "Languages": ["English (Proficient)", "French (Proficient)", "Malayalam (Proficient)", "Arabic (Beginner)"]
  };

  const projects = [
    {
      title: "SMART-PAD",
      description: "Developed a real-time localization and movement analysis system for volleyball players using 5 ESP32 UWB sensors with a 4-layer IoT pipeline leveraging WebSockets, Python, and NumPy for trilateration and jerk calculations.",
      tech: ["Python", "ESP32", "UWB", "Nuxt.js", "Vue.js", "D3.js", "Numpy", "WebSockets"],
      achievements: [
        "Designed frontend dashboard achieving visualization of player motion metrics in 500ms",
        "Real-time localization tracking with sub-meter accuracy"
      ]
    },
    {
      title: "XCountry",
      description: "Programmed a Python tool for collegiate cross-country race selection and performance prediction inside a Vue.js application, processing 102,000 athletes and 8,500 races.",
      tech: ["Python", "XGBoost", "LightGBM", "Leaflet.js", "Vue.js", "Nuxt.js", "D3.js", "Postman"],
      achievements: [
        "Enhanced prediction accuracy achieving 94% variance explanation with XGBoost",
        "Implemented collaborative filtering for race recommendations"
      ]
    },
    {
      title: "HellWeek",
      description: "A Unity 3D game featuring advanced mechanics and AI systems. Programmed over 30 unique scripts to enhance audio, spatial interactions, ragdoll mechanics, and chase cameras.",
      tech: ["Unity", "C#", "Unity 3D"],
      achievements: [
        "Crafted over 30 objects in Unity3D strategically encoded to improve game feel",
        "Conducted 10+ thorough playtesting sessions, improving the alpha by 25%"
      ]
    },
    {
      title: "Sign Catalog Browser",
      description: "Developed a React.js web app with management dashboards for streamlined file organization, backed by C# and .NET with bag-of-words approach for metadata extraction.",
      tech: ["React.js", "C#", ".NET", "Docker", "Azure Active Directory"],
      achievements: [
        "Enhanced search and navigation by 30% through intelligent metadata extraction",
        "Integrated secure Azure AD login for 30 team members"
      ]
    }
  ];

  const coursework = [
    "SDLC", "Web Development", "Advanced Algorithms", "Advanced Operating Systems", 
    "Machine Learning", "Embedded Systems", "Data Visualization", "Data Structures", 
    "Computer Vision", "Internet Architecture", "Data Analytics", "Computer Networking", 
    "Computer Graphics", "Video Game Development", "App Development", "Databases", 
    "Statistics & Probability"
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
            Abhinav Vinod
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-[#5c5c4a] leading-relaxed">
            <p>
              I'm a Master's student in Computer Science at Georgia Tech with a passion for 
              building reliable, scalable systems and creating meaningful user experiences. Currently pursuing 
              my MSCS in Computing Systems with a 3.7 GPA, having completed my B.S. in Computer Science 
              with concentrations in Artificial Intelligence and Computer Media (3.8 GPA).
            </p>
            <p>
              With experience as a Site Reliability Engineer at Flock Safety, Software Development roles 
              at Corpay and Wabtec Corporation, and as a Graduate Teaching Assistant, I'm passionate about 
              the intersection of software engineering, data visualization, system reliability, and education. 
              I enjoy working on projects that make a positive impact on people's lives.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#5c5c4a]">
            <div className="flex items-center gap-2">
              <FaPhone className="text-[#6b8e4e]" />
              <span>(470) 812-9969</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#6b8e4e]" />
              <span>Atlanta, GA</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#6b8e4e]" />
              <a href="mailto:avinod34@gatech.edu" className="hover:text-[#6b8e4e] transition-colors">
                avinod34@gatech.edu
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-[#6b8e4e]" />
              <a href="https://linkedin.com/in/avinod34/" target="_blank" className="hover:text-[#6b8e4e] transition-colors">
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
                  <p className="text-[#5c5c4a] text-sm mb-1">Specialization: Computing Systems</p>
                  <p className="text-[#5c5c4a] text-sm font-medium">GPA: 3.7</p>
                </div>
                <div className="bg-[#eaf1e5] px-4 py-2 rounded-full">
                  <span className="text-[#6b8e4e] font-semibold">Expected December 2025</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#3e3e2d] mb-2">Bachelor of Science in Computer Science</h3>
                  <p className="text-[#6b8e4e] font-semibold mb-1">Georgia Institute of Technology, Atlanta, GA</p>
                  <p className="text-[#5c5c4a] text-sm mb-1">Concentrations: Artificial Intelligence and Computer Media</p>
                  <p className="text-[#5c5c4a] text-sm font-medium">GPA: 3.8</p>
                </div>
                <div className="bg-[#eaf1e5] px-4 py-2 rounded-full">
                  <span className="text-[#6b8e4e] font-semibold">2024</span>
                </div>
              </div>
            </div>

            {/* Relevant Coursework */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#d8c4a6]">
              <h3 className="text-xl font-bold text-[#3e3e2d] mb-4">Relevant Coursework</h3>
              <div className="flex flex-wrap gap-2">
                {coursework.map((course, index) => (
                  <span
                    key={index}
                    className="bg-[#eaf1e5] text-[#6b8e4e] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {course}
                  </span>
                ))}
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
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Professional Experience</h2>
            <p className="text-[#5c5c4a] text-lg">My professional journey across tech companies</p>
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
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Technical Skills</h2>
            <p className="text-[#5c5c4a] text-lg">Technologies and tools I work with</p>
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
            <p className="text-[#5c5c4a] text-lg">Key projects showcasing my technical expertise</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-[#f4efe7] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]">
                <h3 className="text-xl font-bold text-[#3e3e2d] mb-3">{project.title}</h3>
                <p className="text-[#5c5c4a] mb-4">{project.description}</p>
                
                {project.achievements && (
                  <ul className="space-y-2 mb-4">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#5c5c4a] text-sm">
                        <div className="w-1.5 h-1.5 bg-[#6b8e4e] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
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

      {/* Languages Section */}
      <section className="py-20 bg-[#f4efe7]/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <HiOutlineLightBulb className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Languages & Mathematics</h2>
            <p className="text-[#5c5c4a] text-lg">Multilingual capabilities and mathematical expertise</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Languages */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#d8c4a6]">
              <h3 className="text-xl font-bold text-[#3e3e2d] mb-4">Languages</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#5c5c4a]">English</span>
                  <span className="bg-[#eaf1e5] text-[#6b8e4e] px-3 py-1 rounded-full text-sm font-medium">Proficient</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5c5c4a]">French</span>
                  <span className="bg-[#eaf1e5] text-[#6b8e4e] px-3 py-1 rounded-full text-sm font-medium">Proficient</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5c5c4a]">Malayalam</span>
                  <span className="bg-[#eaf1e5] text-[#6b8e4e] px-3 py-1 rounded-full text-sm font-medium">Proficient</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5c5c4a]">Arabic</span>
                  <span className="bg-[#f0f0f0] text-[#888] px-3 py-1 rounded-full text-sm font-medium">Beginner</span>
                </div>
              </div>
            </div>

            {/* Mathematical Theory */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#d8c4a6]">
              <h3 className="text-xl font-bold text-[#3e3e2d] mb-4">Mathematical Theory</h3>
              <div className="flex flex-wrap gap-2">
                {["Statistics", "Linear Algebra", "Number Theory", "Probability Theory", "Graph Theory", "Statistical Analysis"].map((math, index) => (
                  <span
                    key={index}
                    className="bg-[#eaf1e5] text-[#6b8e4e] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {math}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6b8e4e] to-[#5c7f42] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Connect!</h2>
          <p className="text-lg mb-8 opacity-90">
            I'm always interested in new opportunities, challenging projects, and meaningful collaborations. Let's discuss how we can work together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:avinod34@gatech.edu"
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
            <a
              href="tel:(470) 812-9969"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#6b8e4e] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaPhone className="mr-2" />
              Call Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}