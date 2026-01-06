"use client";

import Link from "next/link";
import { HomeIcon, FolderIcon, UserIcon, DocumentTextIcon, CalendarIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-green-50/90 backdrop-blur-xl border-b border-green-200/60 dark:bg-green-950/90 dark:border-green-800/60 shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5 text-white" />
          </Link>
          <div className="flex gap-2">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100/80 hover:bg-green-200 dark:bg-green-900/80 dark:hover:bg-green-800/50 text-green-800 dark:text-green-200 hover:text-green-900 dark:hover:text-green-100 font-medium transition-all duration-200 border border-green-200/50 dark:border-green-700/50 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <FolderIcon className="w-4 h-4" />
              Projects
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-100/80 hover:bg-emerald-200 dark:bg-emerald-900/80 dark:hover:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200 hover:text-emerald-900 dark:hover:text-emerald-100 font-medium transition-all duration-200 border border-emerald-200/50 dark:border-emerald-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <UserIcon className="w-4 h-4" />
              About
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-100/80 hover:bg-teal-200 dark:bg-teal-900/80 dark:hover:bg-teal-800/50 text-teal-800 dark:text-teal-200 hover:text-teal-900 dark:hover:text-teal-100 font-medium transition-all duration-200 border border-teal-200/50 dark:border-teal-700/50 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <DocumentTextIcon className="w-4 h-4" />
              Blog
            </Link>
            <Link
              href="/year"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100/80 hover:bg-amber-200 dark:bg-amber-900/80 dark:hover:bg-amber-800/50 text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 font-medium transition-all duration-200 border border-amber-200/50 dark:border-amber-700/50 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <CalendarIcon className="w-4 h-4" />
              Year
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-md"
          >
            <HomeIcon className="w-5 h-5 text-white" />
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100/80 text-green-800 dark:bg-green-900/80 dark:text-green-200 border border-green-200/50 dark:border-green-700/50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-2 animate-in fade-in slide-in-from-top-5 duration-200">
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-100/80 hover:bg-green-200 dark:bg-green-900/80 dark:hover:bg-green-800/50 text-green-800 dark:text-green-200 font-medium transition-all duration-200 border border-green-200/50 dark:border-green-700/50"
            >
              <FolderIcon className="w-5 h-5" />
              Projects
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-100/80 hover:bg-emerald-200 dark:bg-emerald-900/80 dark:hover:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200 font-medium transition-all duration-200 border border-emerald-200/50 dark:border-emerald-700/50"
            >
              <UserIcon className="w-5 h-5" />
              About
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-100/80 hover:bg-teal-200 dark:bg-teal-900/80 dark:hover:bg-teal-800/50 text-teal-800 dark:text-teal-200 font-medium transition-all duration-200 border border-teal-200/50 dark:border-teal-700/50"
            >
              <DocumentTextIcon className="w-5 h-5" />
              Blog
            </Link>
            <Link
              href="/year"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-100/80 hover:bg-amber-200 dark:bg-amber-900/80 dark:hover:bg-amber-800/50 text-amber-800 dark:text-amber-200 font-medium transition-all duration-200 border border-amber-200/50 dark:border-amber-700/50"
            >
              <CalendarIcon className="w-5 h-5" />
              Year
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
