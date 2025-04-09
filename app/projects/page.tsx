import { sanity } from "@/utilities/sanity";
import Link from "next/link";


export const dynamic = "force-dynamic";


type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
};

export default async function ProjectsPage() {
  const projects: Project[] = await sanity.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description
    }
  `);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">Projects</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-6 border rounded-xl shadow-sm bg-white dark:bg-gray-900"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>
            <Link
              href={`/projects/${project.slug.current}`}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
