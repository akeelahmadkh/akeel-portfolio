import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-amber-500/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Monogram Crest */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] via-amber-600 to-amber-900 p-[1px] flex items-center justify-center shadow-lg shadow-amber-950/30">
            <div className="w-full h-full bg-[#0A0A0A] rounded-[7px] flex items-center justify-center group-hover:bg-amber-950/40 transition-colors">
              <span className="font-mono text-sm font-bold text-gold-gradient">AK</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base text-[#F5F5F7] tracking-wide group-hover:text-[#D4AF37] transition-colors">
              AKEEL
            </span>
            <span className="text-[10px] font-mono text-amber-500/80 tracking-widest uppercase flex items-center gap-1">
              <Terminal className="w-2.5 h-2.5 inline" /> AI + Mobile Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-all relative py-1 ${
                isActive(link.path)
                  ? 'text-[#D4AF37]'
                  : 'text-neutral-300 hover:text-[#F5F5F7]'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-amber-500 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Status Badge & CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-amber-500/20 text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Projects</span>
          </div>

          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-md shadow-amber-600/20 flex items-center gap-1.5 group"
          >
            Let's Talk
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-[#D4AF37] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-amber-500/10 px-4 pt-3 pb-6 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2 px-3 rounded-lg ${
                isActive(link.path)
                  ? 'bg-amber-500/10 text-[#D4AF37] border border-amber-500/20'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-amber-500/20 text-xs font-mono text-neutral-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Projects</span>
            </div>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase shadow-md shadow-amber-600/20"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
