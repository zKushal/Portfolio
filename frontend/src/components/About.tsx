import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import meImage from "../images/Kushal.png";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-xl" />
                <img
                  src={meImage}
                  alt="Kushal"
                  className="relative w-full h-full object-cover rounded-full glass border border-primary/20"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-primary font-mono text-sm mb-3 tracking-widest uppercase">
                About Me
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Passionate about building{" "}
                <span className="text-gradient">meaningful software</span>
              </h2>

              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  I'm a Computer Science student with a deep passion for full-stack
                  development and machine learning. I thrive on solving complex
                  problems and transforming ideas into products that make an impact.
                </p>
                <p>
                  My journey spans building ML prediction systems, full-stack
                  dashboards, and dynamic web applications. I believe in writing
                  clean, efficient code and continuously expanding my skill set
                  across the entire development stack.
                </p>
                <p>
                  My career goal is to work at the intersection of AI and software
                  engineering — building intelligent applications that push the
                  boundaries of what's possible with modern technology.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: "5+", label: "Projects Built" },
              { value: "3+", label: "Tech Stacks" },
              { value: "ML", label: "& AI Focus" },
              { value: "∞", label: "Curiosity" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center glass rounded-lg p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
