import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectBySlug } from '../services/api';
import type { Project } from '../services/api';
import { ArrowLeft, ExternalLink, Shield, Cpu, Layers, BookOpen, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (slug) {
      getProjectBySlug(slug).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-sm text-[#D4AF37]">
        Fetching technical project specification...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-2xl text-white mb-4">Project Not Found</h2>
        <p className="text-neutral-400 text-xs mb-6">The requested project could not be located.</p>
        <Link to="/projects" className="px-5 py-2.5 rounded-lg bg-amber-500 text-black font-semibold text-xs">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      
      {/* Back Navigation */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#D4AF37] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects Archive
      </Link>

      {/* Header Badge & Title */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-xs font-mono text-amber-300">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-xs font-mono text-emerald-400">
            {project.status}
          </span>
          {project.slug === 'nexa-bank' && (
            <span className="px-3 py-1 rounded bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-mono flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Flagship Showcase
            </span>
          )}
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F5F7] mb-4">
          {project.title}
        </h1>

        <p className="text-neutral-300 text-base leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Main Thumbnail Image */}
      <div className="rounded-2xl overflow-hidden border border-amber-500/20 mb-12 shadow-2xl">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-[350px] md:h-[450px] object-cover"
        />
      </div>

      {/* Primary Info & Action Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left Side: Technical Breakdown */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Overview */}
          <div className="glass-panel p-8 rounded-xl border border-amber-500/20 bg-[#121212]/90">
            <h2 className="font-serif text-2xl text-[#F5F5F7] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" /> Overview
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Architecture (Special for Flagships like Nexa Bank) */}
          {project.architecture && (
            <div className="glass-panel p-8 rounded-xl border border-amber-500/20 bg-[#121212]/90">
              <h2 className="font-serif text-2xl text-[#F5F5F7] mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" /> Architecture & System Design
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Technical Challenges */}
          {project.challenges && (
            <div className="glass-panel p-8 rounded-xl border border-amber-500/20 bg-[#121212]/90">
              <h2 className="font-serif text-2xl text-[#F5F5F7] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" /> Engineering Challenges
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Key Lessons Learned */}
          {project.lessonsLearned && (
            <div className="glass-panel p-8 rounded-xl border border-amber-500/20 bg-[#121212]/90">
              <h2 className="font-serif text-2xl text-[#F5F5F7] mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" /> Key Takeaways & Lessons
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {project.lessonsLearned}
              </p>
            </div>
          )}

        </div>

        {/* Right Side: Meta Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-amber-500/20 bg-[#121212]/90 sticky top-28">
            <h3 className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider mb-4">
              Project Specification
            </h3>

            {/* Technologies */}
            <div className="mb-6">
              <span className="text-xs text-neutral-400 block mb-2 font-mono">Technologies Used:</span>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-amber-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 hover:text-[#D4AF37] hover:border-amber-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-black font-semibold text-xs font-mono hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> View Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
