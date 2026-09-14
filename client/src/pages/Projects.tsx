import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import type { Project } from '../services/api';
import { ProjectCard } from '../components/ProjectCard';
import { Search, FolderKanban } from 'lucide-react';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI / ML', 'Mobile', 'Full Stack', 'Backend'];

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
          PROJECT ARCHIVE & DISCOVERY
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
          Software & AI Applications
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Explore mobile applications, machine learning integration pipelines, and full-stack software built with React Native, Node.js, and PyTorch.
        </p>
      </div>

      {/* Filter Tabs & Search Control */}
      <div className="glass-panel p-4 rounded-xl border border-amber-500/20 bg-[#121212]/90 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-[#D4AF37] border-amber-500/50 font-bold'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search tech, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center font-mono text-sm text-[#D4AF37]">
          Loading dynamic project database...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="glass-panel p-16 rounded-xl border border-neutral-800 text-center max-w-md mx-auto my-12">
          <FolderKanban className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white mb-2">No Projects Found</h3>
          <p className="text-xs text-neutral-400">
            No projects in this category match your search criteria yet. New AI & Mobile apps are added continuously.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id || project.slug} project={project} />
          ))}
        </div>
      )}

    </div>
  );
};
