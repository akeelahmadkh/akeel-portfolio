import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-amber-500/15 pt-16 pb-12 relative z-10 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-neutral-800/80 gap-8">
          <div>
            <span className="font-mono text-xs text-[#D4AF37] tracking-widest uppercase mb-1 block">
              AKEEL • PORTFOLIO
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#F5F5F7]">
              AI + Mobile Application Developer
            </h3>
            <p className="text-xs text-neutral-400 mt-2 max-w-md">
              Building intelligent applications, React Native software, and production full-stack systems.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2.5 rounded-lg glass-panel border border-amber-500/30 text-xs font-mono text-[#D4AF37] hover:bg-amber-500/10 transition-all flex items-center gap-2 group self-end md:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Footer Navigation & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          <div>
            <h4 className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/skills" className="hover:text-white transition-colors">Skills</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider mb-4">
              Primary Focus
            </h4>
            <ul className="space-y-2 text-xs">
              <li>React Native Mobile Apps</li>
              <li>AI / ML Model Integration</li>
              <li>Node.js & Express REST APIs</li>
              <li>Deep Learning (RNN/LSTM)</li>
              <li>Full Stack Web Architecture</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider mb-4">
              Connect & Socials
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-amber-500/40 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-amber-500/40 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:akeel@developer.com"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] hover:border-amber-500/40 transition-all"
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider mb-4">
              Administration
            </h4>
            <Link
              to="/admin"
              className="text-xs font-mono text-neutral-400 hover:text-[#D4AF37] transition-colors underline"
            >
              Portal Login →
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-neutral-900 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Akeel. All rights reserved.</p>
          <p className="font-mono text-[11px] mt-2 md:mt-0">
            Crafted with React, Three.js, Express & MERN Stack
          </p>
        </div>

      </div>
    </footer>
  );
};
