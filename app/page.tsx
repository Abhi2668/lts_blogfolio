import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center sm:text-left sm:items-start max-w-3xl mx-auto">
      <Image
        src="/avatar.jpg"
        alt="Abhinav Vinod"
        width={96}
        height={96}
        className="rounded-full mb-6"
      />
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Hi, I'm <span className="text-blue-600">Abhinav</span>
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        I am an MSCS student at Georgia Tech studying Computing Systems.
      </p>

      <div className="flex gap-4 flex-col sm:flex-row">
        <Link
          href="/projects"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition"
        >
          Blog
        </Link>
        <a
          href="mailto:abhi@example.com"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition"
        >
          Contact
        </a>
      </div>
    </section>
  );
}
