import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/api';
import type { Project } from '../services/api';
import { Hero3D } from '../components/Hero3D';
import { ProjectCard } from '../components/ProjectCard';
import { Testimonials } from '../components/Testimonials';
import { ArrowRight, Code, Smartphone, Cpu, Database, Shield, Layers, ExternalLink } from 'lucide-react';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const nexaBank = projects.find((p) => p.slug === 'nexa-bank') || projects[0];
  const otherFeatured = projects.filter((p) => p.slug !== 'nexa-bank').slice(0, 3);

  return (
    <div className="relative z-10">
      
      {/* 1. HERO SECTION (Editorial Dark Gold Style) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-12 pb-20">
        
        {/* Floating Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-xs font-mono text-[#D4AF37] mb-6 shadow-lg shadow-amber-950/20">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>AKEEL • AI + MOBILE APPLICATION DEVELOPER</span>
        </div>

        {/* Hero Title & Typography */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-[#F5F5F7] tracking-tight mb-4 uppercase">
          Akeel
        </h1>

        <p className="font-serif italic text-xl md:text-3xl text-gold-gradient max-w-3xl mb-6">
          "Building intelligent applications that solve real-world problems."
        </p>

        <p className="max-w-2xl text-neutral-300 text-sm md:text-base leading-relaxed mb-10">
          Computer science developer specializing in <strong className="text-white">React Native</strong> mobile development, <strong className="text-white">Artificial Intelligence</strong> model integration, and full-stack REST API backends.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            to="/projects"
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2"
          >
            <span>View My Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-lg glass-panel border border-amber-500/30 text-[#F5F5F7] font-semibold text-xs tracking-wider uppercase hover:bg-amber-500/10 transition-all"
          >
            Let's Talk
          </Link>
        </div>

        {/* 3D Selective Canvas Element */}
        <div className="w-full max-w-lg mx-auto my-2">
          <Hero3D />
        </div>

        {/* Table of Contents / Section Jump Bar */}
        <div className="w-full max-w-5xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { num: '01', title: 'ABOUT ME', href: '#about-intro' },
            { num: '02', title: 'SERVICES', href: '#services' },
            { num: '03', title: 'SKILLS', href: '#skills-preview' },
            { num: '04', title: 'FLAGSHIP', href: '#flagship' },
            { num: '05', title: 'TESTIMONIALS', href: '#testimonials' },
            { num: '06', title: 'CONTACT', href: '/contact' },
          ].map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="glass-panel p-3 rounded-lg border border-amber-500/15 hover:border-amber-500/40 text-left transition-all group"
            >
              <span className="font-mono text-xs text-[#D4AF37] block group-hover:translate-x-0.5 transition-transform">
                {item.num}
              </span>
              <span className="font-serif text-[11px] text-neutral-300 font-semibold tracking-wider block uppercase">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 2. SHORT INTRODUCTION */}
      <section id="about-intro" className="py-20 bg-[#0A0A0A]/90 border-t border-amber-500/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="glass-panel p-8 md:p-12 rounded-2xl border border-amber-500/20 bg-[#121212]/90">
            <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
              01 • INTRODUCTION & PHILOSOPHY
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7] mb-6">
              Turning Complex Ideas Into Scalable Products
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
              I am a computer science student dedicated to mastering the full lifecycle of modern software engineering. My development direction merges <strong className="text-[#D4AF37]">Mobile Applications (React Native)</strong> with <strong className="text-[#D4AF37]">Artificial Intelligence & Deep Learning</strong>, backed by robust Node.js/MongoDB infrastructure.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono text-neutral-300">Mobile First</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-mono text-neutral-300">AI / ML Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono text-neutral-300">Scalable Backends</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono text-neutral-300">TypeScript Mastery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP PROJECT SPOTLIGHT — NEXA BANK */}
      {nexaBank && (
        <section id="flagship" className="py-24 relative bg-gradient-to-b from-[#0A0A0A] via-[#121212] to-[#0A0A0A] border-t border-amber-500/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 font-mono text-xs text-amber-300 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
                  <Shield className="w-3.5 h-3.5 text-amber-400" /> FLAGSHIP PROJECT
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-[#F5F5F7]">
                  Nexa Bank Digital System
                </h2>
              </div>
              <Link
                to="/projects/nexa-bank"
                className="hidden sm:flex items-center gap-1 text-xs font-mono text-[#D4AF37] hover:underline"
              >
                Deep Technical Breakdown →
              </Link>
            </div>

            <div className="glass-panel p-6 md:p-10 rounded-2xl border border-amber-500/30 bg-[#121212]/95 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Screenshot Preview */}
              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-amber-500/20 relative group">
                <img
                  src={nexaBank.thumbnail}
                  alt="Nexa Bank Project Screenshot"
                  className="w-full h-80 md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-neutral-300">
                  <span>Full-Stack Banking Architecture</span>
                  <span className="text-emerald-400">Production Verified</span>
                </div>
              </div>

              {/* Project Details Content */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-serif text-2xl text-[#F5F5F7] mb-3">
                    Simulating Modern Enterprise Financial Workflows
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {nexaBank.fullDescription}
                  </p>

                  <div className="space-y-3 mb-6 text-xs text-neutral-300 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Multi-factor OTP authentication & JWT authorization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Transactional MongoDB balance safety locks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Role-based admin dashboard & user account portals</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {nexaBank.technologies.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-neutral-900 border border-amber-500/20 text-[11px] font-mono text-amber-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-800">
                  <Link
                    to="/projects/nexa-bank"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 hover:opacity-90"
                  >
                    View Architecture & Details
                  </Link>

                  {nexaBank.githubUrl && (
                    <a
                      href={nexaBank.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg glass-panel border border-amber-500/20 text-neutral-300 hover:text-white"
                      aria-label="GitHub Repository"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED PROJECTS GRID */}
      <section className="py-20 bg-[#0A0A0A]/90 border-t border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
                04 • FEATURED WORKS
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
                AI & Mobile Applications
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 font-mono text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              View All Projects ({projects.length}) →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center font-mono text-xs text-amber-400">Loading projects database...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherFeatured.map((project) => (
                <ProjectCard key={project._id || project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="services" className="py-20 bg-[#0A0A0A] border-t border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
              02 • SERVICES & CAPABILITIES
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
              Technical Offerings
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-xl border border-amber-500/20 bg-[#121212]/90 glass-panel-hover">
              <Smartphone className="w-10 h-10 text-[#D4AF37] mb-6" />
              <h3 className="font-serif font-bold text-xl text-[#F5F5F7] mb-3">
                React Native Mobile Apps
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Cross-platform iOS and Android mobile development using React Native, Expo, and native device module integrations.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-amber-500/20 bg-[#121212]/90 glass-panel-hover">
              <Cpu className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="font-serif font-bold text-xl text-[#F5F5F7] mb-3">
                AI & Deep Learning Pipelines
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Integration of TensorFlow, PyTorch, RNN, and LSTM models into interactive web and mobile client applications.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-amber-500/20 bg-[#121212]/90 glass-panel-hover">
              <Layers className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="font-serif font-bold text-xl text-[#F5F5F7] mb-3">
                Full-Stack MERN Systems
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Production-ready Node.js, Express REST API development with MongoDB transactions, JWT security, and dynamic React UIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <div id="testimonials">
        <Testimonials />
      </div>

    </div>
  );
};
