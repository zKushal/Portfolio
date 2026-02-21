import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

const roles = [
  "Full-Stack Developer",
  "ML Enthusiast",
  "CS Student",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.slice(0, text.length + 1));
          if (text.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setText(currentRole.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-[1]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.p
          className="text-primary font-mono text-sm mb-4 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-gradient">Kushal</span>
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl text-muted-foreground mb-8 h-8 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>{text}</span>
          <span className="animate-pulse-glow text-primary">|</span>
        </motion.div>

        <motion.p
          className="max-w-xl mx-auto text-muted-foreground mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Building real-world applications with modern web technologies and
          machine learning. Turning ideas into elegant, functional products.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity glow"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          className="flex justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href="https://github.com/zKushal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/kushal-bhandari-a67b5530a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={22} />
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
