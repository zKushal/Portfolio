import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Mobile Phone Price Prediction",
    description:
      "Machine learning model that predicts mobile phone prices using multiple regression models with data visualization and preprocessing pipelines.",
    tech: ["Python", "Scikit-learn", "Pandas", "Flask"],
    category: "ML",
    github: "https://github.com/zKushal/Mobile_Price_Prediction",
    live: "#",
  },
  {
    title: "College Performance Dashboard",
    description:
      "Full-stack dashboard for student management, attendance tracking, and performance analytics with interactive data visualization charts.",
    tech: ["React", "Node.js", "MySQL", "Chart.js"],
    category: "Full-Stack",
    github: "https://github.com/zKushal/College_Performance_Dashboard",
    live: "#",
  },
  {
    title: "Collibra - E-Library Management",
    description:
      "Modern web-based E-Library Management System that digitally manages books, users, and library operations efficiently. Features admin panel for book management, user browsing with search capabilities, and integrated resource access.",
    tech: ["React", "Node.js", "MySQL", "Express"],
    category: "Full-Stack",
    github: "https://github.com/zKushal/Collibra",
    live: "#",
  }
];

const filters = ["All", "Full-Stack", "ML", "Frontend"];

const Projects = () => {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-3 tracking-widest uppercase text-center">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Featured Work
          </h2>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 text-sm rounded-full border transition-all duration-200 ${
                  active === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                className="glass rounded-xl overflow-hidden group hover:glow transition-shadow duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
                layout
              >
                <div className="h-40 bg-gradient-to-br from-primary/10 via-secondary to-muted flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary/30 font-mono">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono bg-muted text-muted-foreground rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
