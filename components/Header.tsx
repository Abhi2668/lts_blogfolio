import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center text-sm font-medium">
        <Link href="/" className="hover:text-blue-600 transition">
          Abhinav Vinod
        </Link>
        <div className="flex gap-4">
          <Link href="/projects" className="hover:text-blue-600 transition">
            Projects
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
