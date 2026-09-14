import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../services/api';
import { ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group glass-panel rounded-xl overflow-hidden glass-panel-hover flex flex-col h-full border border-amber-500/15 bg-[#121212]/90">
      
      {/* Thumbnail Container */}
      <div className="relative w-full h-56 overflow-hidden bg-neutral-900">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />

        {/* Category & Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur border border-amber-500/30 text-[11px] font-mono text-[#D4AF37]">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2 py-1 rounded-md bg-amber-500/20 backdrop-blur border border-amber-500/50 text-[10px] font-mono text-amber-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" /> Flagship
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono backdrop-blur border ${
              project.status === 'Completed'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-4">
            {project.shortDescription}
          </p>
        </div>

        <div>
          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-neutral-900 text-[11px] font-mono text-neutral-300 border border-neutral-800"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-0.5 rounded bg-neutral-900 text-[11px] font-mono text-amber-500/80">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Card Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60 text-xs">
            <Link
              to={`/projects/${project.slug}`}
              className="text-[#D4AF37] font-semibold hover:underline flex items-center gap-1 group/btn"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-[#D4AF37] transition-colors"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
