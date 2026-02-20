import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "C", level: 80 },
      { name: "C++", level: 75 },
      { name: "Python", level: 85 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    title: "Machine Learning",
    skills: [
      { name: "Pandas", level: 80 },
      { name: "NumPy", level: 80 },
      { name: "Scikit-learn", level: 75 },
    ],
  },
];

const tools = ["Git", "GitHub", "VS Code", "Flask", "Django"];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-surface/50">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-3 tracking-widest uppercase text-center">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Technologies I work with
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skillCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.title}
                className="glass rounded-xl p-6 hover:glow transition-shadow duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * catIdx }}
              >
                <h3 className="text-sm font-semibold text-primary font-mono mb-5 uppercase tracking-wider">
                  {cat.title}
                </h3>
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                          initial={{ width: 0 }}
                          animate={
                            isInView ? { width: `${skill.level}%` } : {}
                          }
                          transition={{ duration: 1, delay: 0.2 * catIdx }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 text-sm glass rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
