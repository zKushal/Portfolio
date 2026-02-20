import { Github, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border bg-surface/30">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kushal. Built with React & Tailwind CSS.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/zKushal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/kushal-bhandari-a67b5530a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://x.com/KushalB81950209"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://www.facebook.com/kushal.bhandari.3551380"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.instagram.com/impullstackdeveloper?igsh=MWIxcHc5bHFpdHZ6aA=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Instagram"
          >
            <Instagram size={18} />
          </a>
          
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
