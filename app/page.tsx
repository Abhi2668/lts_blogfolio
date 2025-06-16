"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

export default function Home() {
  const [typed, setTyped] = useState("");
  const intro = "Hi, I'm Abhinav";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(intro.slice(0, i + 1));
      i++;
      if (i === intro.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center max-w-xl mx-auto gap-6 relative">
      <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-[#d8c4a6] bg-[#f4efe7]">
        <Image
          src="/avatar.jpg"
          alt="Abhinav Vinod"
          width={144}
          height={144}
          className="object-cover w-full h-full"
        />
      </div>

      <h1 className="text-4xl sm:text-5xl font-semibold tracking-wide text-[#3e3e2d]">
        {typed}
        <span className="blinking-cursor">|</span>
      </h1>

      <p className="text-base sm:text-lg text-[#5c5c4a] leading-relaxed max-w-md">
        I’m an MSCS student at Georgia Tech focused on Computing Systems and Visualization. I love building fast, thoughtful tools for people.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Link
          href="/projects"
          className="bg-[#6b8e4e] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#5c7f42] transition"
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="border border-[#6b8e4e] text-[#6b8e4e] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#eaf1e5] transition"
        >
          Blog
        </Link>
        <a
          href="mailto:vinodabhinav54@gmail.com"
          className="border border-[#6b8e4e] text-[#6b8e4e] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#eaf1e5] transition"
        >
          Contact
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-4 text-[#5c5c4a]">
        <a href="https://github.com/Abhi2668" target="_blank" aria-label="GitHub" rel="noopener noreferrer">
          <FaGithub size={22} className="hover:text-[#000000a0] transition" />
        </a>
        <a href="https://www.instagram.com/tiesfound/" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
          <FaInstagram size={22} className="hover:text-[#c13584a0] transition" />
        </a>
      </div>

      <p className="text-xs text-[#aaa38c]">🕰️ Atlanta, GA — {currentTime}</p>
    </section>
  );
}
