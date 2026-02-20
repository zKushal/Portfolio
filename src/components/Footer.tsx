import { Github, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border bg-surface/30">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kushal. Built with React & Tailwind CSS.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="YouTube"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
