export type Project = {
    title: string;
    slug: string;
    description: string;
    tech?: string[];
  };
  
  export const projects: Project[] = [
    {
      title: "GBA Horror Game",
      slug: "gba-horror-game",
      description: "A Game Boy Advance horror puzzle game written in C.",
      tech: ["C", "GBA", "Tilemaps"],
    },
    {
      title: "Distributed Systems Simulator",
      slug: "distributed-sim",
      description: "Visualizing Raft, Lamport clocks, and more in the browser.",
      tech: ["TypeScript", "React", "D3.js"],
    },
    {
      title: "Blogfolio Site",
      slug: "blogfolio",
      description: "This site, built with Next.js, MDX, and Tailwind CSS.",
      tech: ["Next.js", "Tailwind", "MDX"],
    },
  ];
  