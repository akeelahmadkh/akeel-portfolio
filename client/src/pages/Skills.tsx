import React, { useEffect, useState } from 'react';
import { getSkills } from '../services/api';
import type { Skill } from '../services/api';
import { Smartphone, Cpu, Server, Code2, Database } from 'lucide-react';

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSkills().then((data) => {
      setSkills(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    { title: 'Mobile Development', icon: Smartphone, color: 'text-[#D4AF37]' },
    { title: 'AI & Machine Learning', icon: Cpu, color: 'text-blue-400' },
    { title: 'Backend & APIs', icon: Server, color: 'text-emerald-400' },
    { title: 'Programming Languages', icon: Code2, color: 'text-amber-400' },
    { title: 'Databases & Tools', icon: Database, color: 'text-purple-400' },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Working With':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40';
      case 'Learning':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'Exploring':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/40';
      default:
        return 'bg-neutral-900 text-neutral-300';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
          TECHNICAL COMPETENCY & STACK
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
          Skills & Technologies
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
          Honest categorization of tools, frameworks, and languages actively used in my mobile and AI software engineering projects.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12 font-mono text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-neutral-300">Working With (Active Usage)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-neutral-300">Learning (Deepening Proficiency)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <span className="text-neutral-300">Exploring (Future Roadmap)</span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-mono text-sm text-[#D4AF37]">
          Loading dynamic technical skills matrix...
        </div>
      ) : (
        /* Categories Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((group, idx) => {
            const Icon = group.icon;
            const categorySkills = skills.filter((s) => s.category === group.title);
            if (categorySkills.length === 0) return null;

            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-2xl border border-amber-500/20 bg-[#121212]/95"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`w-6 h-6 ${group.color}`} />
                  <h2 className="font-serif text-xl text-[#F5F5F7] font-bold">
                    {group.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categorySkills.map((skill, sIdx) => (
                    <div
                      key={skill._id || sIdx}
                      className="p-3 rounded-lg bg-neutral-900/90 border border-neutral-800 flex items-center justify-between"
                    >
                      <span className="text-xs font-semibold text-white">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getLevelColor(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
