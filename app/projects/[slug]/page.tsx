import { sanity } from "@/utilities/sanity";
import { PortableText, PortableTextComponents, PortableTextBlock} from "@portabletext/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineExternalLink } from "react-icons/hi";

type Project = {
  title: string;
  description: string;
  tech: string[];
  body: PortableTextBlock[];
  liveUrl?: string;
  githubUrl?: string;
  img?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  images?: {
    asset: {
      _id: string;
      url: string;
    };
  }[];
};

export async function generateStaticParams() {
  const slugs = await sanity.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project"]{ slug }`
  );
  return slugs.map(({ slug }) => ({ slug: slug.current }));
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?._ref
        ?.replace("image-", "https://cdn.sanity.io/images/3t26pmqp/production/")
        .replace(/-(\d+x\d+)-\w+$/, ".$1.webp");

      return url ? (
        <div className="my-8">
          <img 
            src={url} 
            alt="" 
            className="w-full h-auto rounded-2xl shadow-lg border border-[#d8c4a6]" 
          />
        </div>
      ) : null;
    },
    youtube: ({ value }) => {
      const url = new URL(value.url);
      const videoId = url.searchParams.get("v") || value.url.split('/').pop()?.split('?')[0];
      
      return (
        <div className="my-8">
          <div className="aspect-video bg-[#f4efe7] rounded-2xl overflow-hidden shadow-lg border border-[#d8c4a6]">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-[#5c5c4a] leading-relaxed mb-6 text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-[#3e3e2d] mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-[#3e3e2d] mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-[#3e3e2d] mb-4 mt-6">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-2 mb-6 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 ml-4 text-[#5c5c4a]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-[#5c5c4a]">
        <div className="w-2 h-2 bg-[#6b8e4e] rounded-full mt-2 flex-shrink-0"></div>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#3e3e2d]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[#5c5c4a]">{children}</em>
    ),
    link: ({ children, value }) => (
      <a 
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#6b8e4e] hover:text-[#5c7f42] underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ProjectPage({ params }: any) {
  const project: Project | null = await sanity.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      description,
      tech,
      body,
      liveUrl,
      githubUrl,
      img{ asset->{_id, url} },
      images[]{ asset->{_id, url} }
    }`,
    { slug: params.slug }
  );

  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-[#6b8e4e] hover:text-[#5c7f42] transition-colors duration-200 group"
          >
            <HiOutlineArrowLeft className="mr-2 w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Projects
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          {/* Cover Image */}
          {project.img?.asset?.url && (
            <div className="mb-8">
              <img
                src={project.img.asset.url}
                alt={project.title}
                className="w-full h-auto rounded-2xl shadow-xl border border-[#d8c4a6]"
              />
            </div>
          )}

          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#3e3e2d] bg-gradient-to-r from-[#3e3e2d] to-[#6b8e4e] bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-[#5c5c4a] leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-[#6b8e4e] text-white rounded-full font-medium hover:bg-[#5c7f42] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <HiOutlineExternalLink className="mr-2 w-5 h-5" />
                View Live Project
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-[#6b8e4e] text-[#6b8e4e] rounded-full font-medium hover:bg-[#6b8e4e] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            )}
          </div>

          {/* Tech Tags */}
          {project.tech?.length > 0 && (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#3e3e2d] mb-4">Technologies Used</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-[#f4efe7] text-[#6b8e4e] border border-[#d8c4a6] rounded-full font-medium hover:bg-[#eaf1e5] transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-[#f4efe7] rounded-2xl p-8 sm:p-12 shadow-lg border border-[#d8c4a6] mb-12">
          <article className="prose prose-lg max-w-none">
            <PortableText value={project.body} components={components} />
          </article>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#3e3e2d] mb-8 text-center">Project Gallery</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.images.map((image, index) => (
                <div key={image.asset._id} className="group">
                  <img
                    src={image.asset.url}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-auto rounded-2xl shadow-lg border border-[#d8c4a6] group-hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center pt-12 border-t border-[#d8c4a6]">
          <h3 className="text-2xl font-bold text-[#3e3e2d] mb-4">
            Interested in working together?
          </h3>
          <p className="text-[#5c5c4a] mb-6">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:vinodabhinav54@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-[#6b8e4e] text-white rounded-full font-medium hover:bg-[#5c7f42] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border-2 border-[#6b8e4e] text-[#6b8e4e] rounded-full font-medium hover:bg-[#6b8e4e] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;