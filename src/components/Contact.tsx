import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-surface/50">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-primary font-mono text-sm mb-3 tracking-widest uppercase text-center">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Let's work together
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
            Have a project in mind or want to collaborate? Drop me a message.
          </p>

          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    kushalbhandari803@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <a href="https://maps.app.goo.gl/nVfCfgFeu26znL3R7">Arjundhara Municipality, Jhapa</a>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://github.com/zKushal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/kushal-bhandari-a67b5530a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://x.com/KushalB81950209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.facebook.com/kushal.bhandari.3551380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/impullstackdeveloper?igsh=MWIxcHc5bHFpdHZ6aA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <form
              className="md:col-span-3 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity glow"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
