"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaDownload, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { HiOutlineCode, HiOutlineAcademicCap, HiOutlineLightBulb } from "react-icons/hi";

export default function Home() {
  const [typed, setTyped] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Hi, I'm Abhi", "Software Engineer", "Georgia Tech Student", "Site Reliability Engineer", "Data Visualization Enthusiast"];
  
  useEffect(() => {
    const word = words[currentWordIndex];
    let i = 0;
    const typeInterval = setInterval(() => {
      setTyped(word.slice(0, i + 1));
      i++;
      if (i === word.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            setTyped(word.slice(0, i - 1));
            i--;
            if (i === 0) {
              clearInterval(deleteInterval);
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, [currentWordIndex]);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const skills = [
    "Python", "JavaScript", "React", "Node.js", "TypeScript", "Next.js", 
    "Machine Learning", "Data Visualization", "System Design", "Docker",
    "AWS", "GCP", "SQL", "REST APIs", "Agile Methodologies", "CI/CD", "Jenkins",
    "Git", "Shell Scripting", "Web Development"
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Georgia Institute of Technology, Atlanta, GA",
      year: "Expected 2025",
      focus: "Computing Systems"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Georgia Institute of Technology, Atlanta, GA",
      year: "2024",
      focus: "Computer Science concentration in Artificial Intelligence and Computer Media."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4efe7] via-[#eaf1e5] to-[#e8f5e8]">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center max-w-4xl mx-auto gap-8 relative">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#6b8e4e] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-6 h-6 bg-[#5c7f42] rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-16 w-3 h-3 bg-[#8ea968] rounded-full opacity-25 animate-ping"></div>

        {/* Profile Image with enhanced styling */}
        <div className="relative group">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-[#d8c4a6] bg-[#f4efe7] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/IMG_1184.JPG"
              alt="Abhinav Vinod"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Dynamic Typing Effect */}
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-wide text-[#3e3e2d] bg-gradient-to-r from-[#3e3e2d] to-[#6b8e4e] bg-clip-text text-transparent">
            {typed}
            <span className="blinking-cursor text-[#6b8e4e]">|</span>
          </h1>
        </div>

        {/* Enhanced Description */}
        <div className="max-w-2xl space-y-4">
          <p className="text-lg sm:text-xl text-[#5c5c4a] leading-relaxed">
            I'm an MSCS student at Georgia Tech focused on Computing Systems and Data Visualization. 
            I love building fast, thoughtful tools that make people's lives better and love making the developer experience pleasant!
          </p>
          
          {/* Location and Status */}
          <div className="flex items-center justify-center gap-6 text-sm text-[#5c5c4a]">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#6b8e4e]" />
              <span>Atlanta, GA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>@ Flock Safety Summer 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-[#6b8e4e]" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/projects"
            className="group bg-[#6b8e4e] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#5c7f42] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
          >
            <HiOutlineCode className="group-hover:rotate-12 transition-transform" />
            View Projects
          </Link>
          <Link
            href="/blog"
            className="group border-2 border-[#6b8e4e] text-[#6b8e4e] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#6b8e4e] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
          >
            <HiOutlineLightBulb className="group-hover:animate-pulse" />
            Read Blog
          </Link>
          <a
            href="/Abhinav_Vinod_Resume.pdf"
            download
            className="group border-2 border-[#6b8e4e] text-[#6b8e4e] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#eaf1e5] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
          >
            <FaDownload className="group-hover:animate-bounce" />
            Resume
          </a>
        </div>

        {/* Enhanced Social Links */}
        <div className="flex gap-6 mt-8">
          <a 
            href="https://github.com/Abhi2668" 
            target="_blank" 
            aria-label="GitHub" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#5c5c4a] hover:text-white hover:bg-[#333] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaGithub size={20} />
          </a>
          <a 
            href="https://www.instagram.com/tiesfound/" 
            target="_blank" 
            aria-label="Instagram" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#5c5c4a] hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaInstagram size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/abhinav-vinod" 
            target="_blank" 
            aria-label="LinkedIn" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#5c5c4a] hover:text-white hover:bg-[#0077b5] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <HiOutlineAcademicCap className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#3e3e2d] mb-4">Education</h2>
            <p className="text-[#5c5c4a] text-lg">My academic journey at Georgia Tech</p>
          </div>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#d8c4a6]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#3e3e2d] mb-2">{edu.degree}</h3>
                    <p className="text-[#6b8e4e] font-semibold mb-1">{edu.institution}</p>
                    <p className="text-[#5c5c4a] text-sm">{edu.focus}</p>
                  </div>
                  <div className="bg-[#eaf1e5] px-4 py-2 rounded-full">
                    <span className="text-[#6b8e4e] font-semibold">{edu.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#3e3e2d] mb-8">Technologies I Work With</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-white px-6 py-3 rounded-full text-[#5c5c4a] font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#eaf1e5] border border-[#d8c4a6]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#6b8e4e] to-[#5c7f42] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-lg mb-8 opacity-90">
            I'm always excited to work on interesting projects and collaborate with amazing people.
          </p>
          <a
            href="mailto:vinodabhinav54@gmail.com"
            className="inline-block bg-white text-[#6b8e4e] px-8 py-4 rounded-full font-semibold hover:bg-[#f4efe7] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}
