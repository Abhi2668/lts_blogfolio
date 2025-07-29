import { sanity } from "@/utilities/sanity";
import Link from "next/link";
import { HiOutlineCode, HiOutlineExternalLink } from "react-icons/hi";

export const dynamic = "force-dynamic";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  img?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export default async function ProjectsPage() {
  const projects: Project[] = await sanity.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      img{ asset->{_id, url} },
      technologies,
      liveUrl,
      githubUrl
    }
  `);

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-16 text-center">
          <HiOutlineCode className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#3e3e2d] bg-gradient-to-r from-[#3e3e2d] to-[#6b8e4e] bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-lg text-[#5c5c4a] max-w-2xl mx-auto leading-relaxed">
            A collection of things I've built, from web applications to data visualization tools
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-[#f4efe7] rounded-2xl p-12 shadow-lg border border-[#d8c4a6]">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-xl text-[#3e3e2d] mb-2">
                Projects coming soon
              </p>
              <p className="text-[#5c5c4a]">
                Check back later for updates!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project._id}
                className="group bg-[#f4efe7] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-[#d8c4a6] transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Project Image */}
                {project.img?.asset?.url ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.img.asset.url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-[#eaf1e5] to-[#d8c4a6] flex items-center justify-center">
                    <HiOutlineCode className="w-16 h-16 text-[#6b8e4e] opacity-50" />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-[#3e3e2d] leading-tight group-hover:text-[#6b8e4e] transition-colors duration-200">
                    {project.title}
                  </h2>

                  <p className="text-[#5c5c4a] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-[#eaf1e5] text-[#6b8e4e] px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-[#eaf1e5] text-[#6b8e4e] px-2 py-1 rounded-full text-xs font-medium">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#d8c4a6]">
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="inline-flex items-center text-[#6b8e4e] font-medium hover:text-[#5c7f42] transition-colors duration-200 group"
                    >
                      View Details
                      <svg
                        className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-[#eaf1e5] rounded-full flex items-center justify-center text-[#6b8e4e] hover:bg-[#6b8e4e] hover:text-white transition-all duration-200"
                          aria-label="View on GitHub"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-[#eaf1e5] rounded-full flex items-center justify-center text-[#6b8e4e] hover:bg-[#6b8e4e] hover:text-white transition-all duration-200"
                          aria-label="View Live Project"
                        >
                          <HiOutlineExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {projects.length > 0 && (
          <div className="text-center mt-16 pt-16 border-t border-[#d8c4a6]">
            <h3 className="text-2xl font-bold text-[#3e3e2d] mb-4">
              Want to see more?
            </h3>
            <p className="text-[#5c5c4a] mb-6">
              Check out my GitHub for more projects and contributions
            </p>
            <a
              href="https://github.com/Abhi2668"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#6b8e4e] text-white rounded-full font-medium hover:bg-[#5c7f42] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View GitHub Profile
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
