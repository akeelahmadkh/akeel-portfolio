import React from 'react';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const placeholders = [
    {
      quote: 'Client testimonial will appear here once verified real project reviews are conducted.',
      author: 'Future Client / Collaborator',
      role: 'Project Review Placeholder',
    },
    {
      quote: 'Peer review and feedback on mobile application architecture and AI inference pipelines.',
      author: 'Technical Reviewer',
      role: 'Engineering Feedback Placeholder',
    },
  ];

  return (
    <section className="py-20 bg-[#0A0A0A]/90 border-t border-amber-500/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
            05 • ENDORSEMENTS & FEEDBACK
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F7]">
            Testimonials & Collaboration
          </h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {placeholders.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-xl relative border border-amber-500/20 bg-[#121212]/90 flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-amber-500/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500/30 text-amber-500/40" />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm italic leading-relaxed mb-6 font-serif">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-amber-500/30 flex items-center justify-center font-mono text-xs text-[#D4AF37]">
                  {item.author[0]}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#F5F5F7]">{item.author}</h4>
                  <p className="text-[11px] font-mono text-neutral-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
